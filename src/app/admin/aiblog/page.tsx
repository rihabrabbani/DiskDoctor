'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIBlogDashboard() {
  const router = useRouter();

  // Settings State
  const [aiApiKey, setAiApiKey] = useState('');
  const [aiModel, setAiModel] = useState('gpt-4o-mini');
  const [aiImageModel, setAiImageModel] = useState('gpt-image-1-mini');
  const [aiTavilyKey, setAiTavilyKey] = useState('');
  const [isTestingKey, setIsTestingKey] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Generation State
  const [magicMode, setMagicMode] = useState<'guided' | 'magic'>('magic');
  const [magicTopic, setMagicTopic] = useState('');
  const [magicNotes, setMagicNotes] = useState('');
  const [magicWordCount, setMagicWordCount] = useState(1200);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(1);

  // Analytics State
  const [stats, setStats] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  // Authentication check
  useEffect(() => {
    const aiToken = localStorage.getItem('aiAdminToken');
    if (!aiToken) {
      router.push('/admin/aiblog/login');
      return;
    }
    fetchAISettings();
    fetchAIStats();
  }, [router]);

  const fetchAIStats = async () => {
    try {
      const response = await fetch('/api/admin/ai-logs');
      const data = await response.json();
      if (data.success) {
          setStats(data.stats);
          setLogs(data.logs);
      }
    } catch (err) {
      console.error('Failed to fetch stats', err);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const fetchAISettings = async () => {
    try {
      const response = await fetch('/api/admin/ai-settings');
      const data = await response.json();
      if (data.success && data.settings) {
        setAiApiKey(data.settings.apiKey);
        setAiModel(data.settings.model || 'gpt-4o-mini');
        setAiImageModel(data.settings.imageModel || 'gpt-image-1-mini');
        setAiTavilyKey(data.settings.tavilyApiKey || '');
      }
    } catch (error) {
      console.error('Error fetching AI settings:', error);
    }
  };

  const handleSaveSettings = async () => {
    if (!aiApiKey) {
      alert('API Key is required');
      return;
    }
    setIsTestingKey(true);
    setIsSavingSettings(true);
    try {
      const response = await fetch('/api/admin/ai-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: aiApiKey,
          model: aiModel,
          imageModel: aiImageModel,
          tavilyApiKey: aiTavilyKey,
        })
      });
      const data = await response.json();
      if (data.success) {
        alert('Settings saved successfully!');
        setShowSettings(false);
      } else {
        alert(data.message || 'Failed to save settings. Check your API key.');
      }
    } catch (error) {
      alert('Error testing API key.');
    } finally {
      setIsTestingKey(false);
      setIsSavingSettings(false);
    }
  };

  const handleGenerate = async () => {
    if (!aiApiKey) {
      alert('Please configure your OpenAI API Key in settings first.');
      return;
    }
    if (magicMode === 'guided' && !magicTopic.trim()) {
      alert('Please enter a topic.');
      return;
    }

    setIsGenerating(true);
    setGenerationStep('Initializing AI engines...');
    setCurrentStepIndex(1);

    try {
      const response = await fetch('/api/blogs/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: magicMode,
          topic: magicMode === 'guided' ? magicTopic : undefined,
          notes: magicNotes,
          targetWordCount: magicWordCount
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to start AI generation');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      if (!reader) throw new Error('No stream available');
      
      let done = false;
      let buffer = '';

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;
        
        if (value) {
          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split('\n\n');
          buffer = parts.pop() || '';
          
          for (const part of parts) {
            if (part.startsWith('data: ')) {
               try {
                 const data = JSON.parse(part.slice(6));
                 if (data.error) throw new Error(data.error);
                 
                 if (data.step) {
                   setCurrentStepIndex(data.step);
                   if (data.message) setGenerationStep(data.message);
                 }
                 
                  if (data.draftId) {
                    alert('Draft securely generated and saved!');
                    setIsGenerating(false);
                    fetchAIStats();
                    window.open(`/admin/editor?id=${data.draftId}`, '_blank');
                    return; 
                  }
               } catch (e: any) {
                 if (e.message && e.message.includes('Unexpected end of JSON')) {
                     // partial JSON, skip
                 } else {
                     throw e;
                 }
               }
            }
          }
        }
      }
    } catch (error: any) {
      setIsGenerating(false);
      setTimeout(() => {
        alert(error.message || 'Error generating blog.');
      }, 50);
    } finally {
      setIsGenerating(false);
    }
  };

  const generationStepsList = [
    { id: 1, title: 'Ideation & Topic Selection' },
    { id: 2, title: 'Deep Web Research' },
    { id: 3, title: 'Drafting Content & SEO' },
    { id: 4, title: 'Generating Media & Images' },
    { id: 5, title: 'Finalizing Assets' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* ═══ TOP NAVBAR ═══ */}
      <div className="sticky top-0 z-50 bg-[#0d0d15]/90 backdrop-blur-xl border-b border-white/5 px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-sm">🪄</div>
            <h1 className="text-base font-bold text-white tracking-tight">AI Blog Engine</h1>
        </div>
        <div className="flex items-center gap-2">
            <button
                onClick={() => setShowSettings(true)}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 text-gray-400 hover:text-white"
                title="API Settings"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            <button
                onClick={() => window.open('/admin/dashboard', '_blank')}
                className="px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg text-xs font-medium transition-colors border border-white/5"
            >
                Dashboard ↗
            </button>
            <button 
                onClick={() => {
                    localStorage.removeItem('aiAdminToken');
                    router.push('/admin/aiblog/login');
                }}
                className="px-3 py-2 text-xs text-gray-500 hover:text-red-400 transition-colors"
            >
                Sign Out
            </button>
        </div>
      </div>

      {/* ═══ SETTINGS MODAL ═══ */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-[#14141f] border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">⚙️</span>
                  <h2 className="text-lg font-bold text-white">API Configuration</h2>
                </div>
                <button onClick={() => setShowSettings(false)} className="text-gray-500 hover:text-white transition-colors text-xl leading-none">&times;</button>
              </div>
              
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-2">OpenAI Key</label>
                  <input type="password" value={aiApiKey} onChange={e => setAiApiKey(e.target.value)} placeholder="sk-..." className="w-full px-4 py-2.5 border border-white/10 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-purple-500 outline-none text-sm font-mono placeholder-gray-600" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-2">Text Engine</label>
                    <select value={aiModel} onChange={e => setAiModel(e.target.value)} className="w-full px-4 py-2.5 border border-white/10 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-purple-500 outline-none text-sm">
                      <option value="gpt-4o">GPT-4o (Premium)</option>
                      <option value="gpt-4o-mini">GPT-4o Mini (Efficient)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-2">Image Engine</label>
                    <select value={aiImageModel} onChange={e => setAiImageModel(e.target.value)} className="w-full px-4 py-2.5 border border-white/10 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-purple-500 outline-none text-sm">
                      <option value="gpt-image-1-mini">GPT Image Mini — Best Value</option>
                      <option value="gpt-image-1">GPT Image 1 — Balanced</option>
                      <option value="dall-e-3">DALL-E 3 — Legacy HD</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-2">Tavily Web Search Key</label>
                  <input type="password" value={aiTavilyKey} onChange={e => setAiTavilyKey(e.target.value)} placeholder="tvly-..." className="w-full px-4 py-2.5 border border-white/10 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-purple-500 outline-none text-sm font-mono placeholder-gray-600" />
                </div>
              </div>
              
              <div className="p-6 border-t border-white/5 flex gap-3">
                <button onClick={() => setShowSettings(false)} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-sm font-medium transition-colors border border-white/5">Cancel</button>
                <button onClick={handleSaveSettings} disabled={isSavingSettings} className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
                  {isTestingKey ? 'Verifying...' : 'Save & Verify'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ THREE-PANEL LAYOUT ═══ */}
      <main className="h-[calc(100vh-52px)] grid grid-cols-1 lg:grid-cols-12 overflow-hidden">

        {/* ──── LEFT PANEL: Live Telemetry ──── */}
        <div className="hidden lg:flex lg:col-span-3 flex-col border-r border-white/5 bg-[#0d0d15] overflow-y-auto">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <h3 className="text-sm font-bold text-white tracking-tight">Live Telemetry</h3>
              </div>
              <button onClick={fetchAIStats} className="text-[10px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded transition-colors text-gray-400 hover:text-white">Refresh</button>
            </div>
          </div>

          {isLoadingStats ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : stats ? (
            <div className="p-4 space-y-3 flex-1">
              {/* Cost Card — Hero */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-xl p-5 border border-emerald-500/10">
                <p className="text-[10px] uppercase tracking-widest text-emerald-400/70 mb-1">Total API Spend</p>
                <p className="text-3xl font-black text-emerald-400 tabular-nums">${stats.totalCost.toFixed(2)}</p>
                <p className="text-[10px] text-gray-500 mt-1">{stats.totalGenerations} generations</p>
              </div>

              {/* Stat Grid */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/[0.03] rounded-lg p-3 text-center border border-white/5">
                  <p className="text-[10px] text-gray-500 mb-0.5">Success</p>
                  <p className="text-lg font-bold text-green-400">{stats.successCount}</p>
                </div>
                <div className="bg-white/[0.03] rounded-lg p-3 text-center border border-white/5">
                  <p className="text-[10px] text-gray-500 mb-0.5">Failed</p>
                  <p className="text-lg font-bold text-red-400">{stats.failCount}</p>
                </div>
                <div className="bg-white/[0.03] rounded-lg p-3 text-center border border-white/5">
                  <p className="text-[10px] text-gray-500 mb-0.5">Images</p>
                  <p className="text-lg font-bold text-blue-400">{stats.totalImages}</p>
                </div>
              </div>

              {/* Token Breakdown */}
              <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5 space-y-3">
                <p className="text-[10px] uppercase tracking-widest text-gray-500">Token Usage</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-indigo-300">Prompt (Input)</span>
                    <span className="text-white font-mono tabular-nums">{stats.totalPromptTokens.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5">
                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${Math.min((stats.totalPromptTokens / (stats.totalPromptTokens + stats.totalCompletionTokens)) * 100, 100)}%` }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-300">Completion (Output)</span>
                    <span className="text-white font-mono tabular-nums">{stats.totalCompletionTokens.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5">
                    <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${Math.min((stats.totalCompletionTokens / (stats.totalPromptTokens + stats.totalCompletionTokens)) * 100, 100)}%` }}></div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Total</span>
                    <span className="text-white font-bold font-mono tabular-nums">{(stats.totalPromptTokens + stats.totalCompletionTokens).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Cost Per Blog */}
              {stats.successCount > 0 && (
                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Average Cost Per Blog</p>
                  <p className="text-xl font-bold text-amber-400 tabular-nums">${(stats.totalCost / stats.successCount).toFixed(3)}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-xs text-gray-600">No telemetry data yet</p>
            </div>
          )}
        </div>

        {/* ──── CENTER PANEL: Generation Engine ──── */}
        <div className="lg:col-span-6 flex flex-col overflow-y-auto relative">
          
          {/* Generation Overlay */}
          <AnimatePresence>
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 bg-[#0a0a0f]/95 backdrop-blur-md flex flex-col items-center justify-center p-8"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-2xl mb-6 shadow-[0_0_40px_rgba(168,85,247,0.3)]">
                  🪄
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Generating Blog Post</h3>
                <p className="text-purple-400 font-medium mb-8 text-center text-sm">{generationStep}</p>
                
                <div className="w-full max-w-xs space-y-3">
                  {generationStepsList.map((step) => {
                    const isActive = currentStepIndex === step.id;
                    const isPast = currentStepIndex > step.id;
                    return (
                      <div key={step.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${isActive ? 'bg-purple-500/15 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.1)]' : isPast ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-white/[0.02] border-transparent opacity-40'}`}>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isActive ? 'bg-purple-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.6)]' : isPast ? 'bg-emerald-500/80 text-white' : 'bg-white/5 text-gray-600'}`}>
                          {isPast ? '✓' : step.id}
                        </div>
                        <p className={`text-sm font-medium ${isActive ? 'text-purple-300' : isPast ? 'text-emerald-400/80' : 'text-gray-600'}`}>{step.title}</p>
                        {isActive && <div className="ml-auto w-4 h-4 rounded-full border-2 border-purple-500 border-t-transparent animate-spin"></div>}
                      </div>
                    )
                  })}
                </div>
                <p className="text-[10px] text-gray-600 mt-8">Do not close this tab.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Engine Header */}
          <div className="p-6 border-b border-white/5 bg-gradient-to-r from-purple-500/5 to-indigo-500/5">
            <h2 className="text-lg font-bold text-white">Start Engine</h2>
            <p className="text-gray-500 text-xs mt-0.5">Configure and launch your next high-ranking AI post.</p>
          </div>
          
          {/* Engine Body */}
          <div className="flex-1 p-6 space-y-5">
            {/* Mode Toggle */}
            <div className="flex bg-white/[0.03] rounded-xl overflow-hidden border border-white/5">
              <button
                className={`flex-1 py-3.5 text-sm font-medium transition-all ${magicMode === 'magic' ? 'bg-purple-500/15 text-purple-400 shadow-inner' : 'text-gray-500 hover:text-gray-300'}`}
                onClick={() => setMagicMode('magic')}
              >
                ✨ MagicAI Auto
              </button>
              <button
                className={`flex-1 py-3.5 text-sm font-medium transition-all ${magicMode === 'guided' ? 'bg-indigo-500/15 text-indigo-400 shadow-inner' : 'text-gray-500 hover:text-gray-300'}`}
                onClick={() => setMagicMode('guided')}
              >
                ✍️ Guided
              </button>
            </div>

            {/* Mode-specific UI */}
            {magicMode === 'magic' ? (
              <div className="bg-purple-500/5 border border-purple-500/10 rounded-xl p-5">
                <h4 className="font-semibold text-purple-400 text-sm mb-3">Autopilot Active</h4>
                <ul className="text-xs text-gray-400 space-y-2.5">
                  <li className="flex gap-2"><span className="text-purple-500/50">1.</span> Scans your database for duplicate avoidance.</li>
                  <li className="flex gap-2"><span className="text-purple-500/50">2.</span> Generates a trending, high-intent SEO topic.</li>
                  <li className="flex gap-2"><span className="text-purple-500/50">3.</span> Conducts live deep web research for citations.</li>
                </ul>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">Topic / Title *</label>
                <input
                  type="text"
                  value={magicTopic}
                  onChange={e => setMagicTopic(e.target.value)}
                  placeholder="e.g. Signs your SSD is failing"
                  className="w-full px-4 py-3 border border-white/10 rounded-xl bg-white/[0.03] text-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm placeholder-gray-600"
                />
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Focus Keyword & Context Notes</label>
              <textarea
                value={magicNotes}
                onChange={e => setMagicNotes(e.target.value)}
                placeholder="Specific directions for the AI..."
                rows={3}
                className="w-full px-4 py-3 border border-white/10 rounded-xl bg-white/[0.03] text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none text-sm placeholder-gray-600"
              />
            </div>
            
            {/* Word Count */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-gray-500">Target Length</label>
                <span className="text-xs font-bold text-purple-400 tabular-nums">{magicWordCount} words</span>
              </div>
              <input
                type="range"
                min="500"
                max="2500"
                step="100"
                value={magicWordCount}
                onChange={(e) => setMagicWordCount(parseInt(e.target.value))}
                className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>
          </div>

          {/* Launch Button */}
          <div className="p-6 border-t border-white/5 bg-[#0d0d15]/50 sticky bottom-0">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-base font-bold hover:opacity-90 transition-all shadow-[0_4px_20px_0_rgba(168,85,247,0.3)] hover:shadow-[0_6px_30px_rgba(168,85,247,0.4)] hover:-translate-y-0.5 transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🚀 Launch Generation
            </button>
          </div>
        </div>

        {/* ──── RIGHT PANEL: Recent Generations ──── */}
        <div className="hidden lg:flex lg:col-span-3 flex-col border-l border-white/5 bg-[#0d0d15] overflow-y-auto">
          <div className="p-5 border-b border-white/5">
            <h3 className="text-sm font-bold text-white tracking-tight">Recent Generations</h3>
            <p className="text-[10px] text-gray-600 mt-0.5">{logs.length} total entries</p>
          </div>

          {logs.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <div className="text-3xl mb-3 opacity-30">📝</div>
              <p className="text-xs text-gray-600">No generations yet.<br/>Hit Launch to create your first!</p>
            </div>
          ) : (
            <div className="flex-1 divide-y divide-white/5">
              {logs.map((log: any) => (
                <div key={log._id} className="p-4 hover:bg-white/[0.02] transition-colors group">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-sm font-medium text-white leading-snug line-clamp-2 group-hover:text-purple-300 transition-colors">
                      {log.topic || 'Autopilot Generation'}
                    </p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 font-mono tabular-nums ${log.status === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                      ${log.calculatedCost ? log.calculatedCost.toFixed(3) : '0.000'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-[10px] text-gray-600">
                    <span>{new Date(log.timestamp).toLocaleDateString()} {new Date(log.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    <span className="text-gray-700">•</span>
                    <span className="uppercase font-mono border border-white/5 px-1.5 py-0.5 rounded text-gray-500">{log.model}</span>
                    {log.imageCount > 0 && (
                      <>
                        <span className="text-gray-700">•</span>
                        <span className="text-blue-500">{log.imageCount} img</span>
                      </>
                    )}
                  </div>

                  {log.error && (
                    <p className="mt-2 text-[10px] text-red-400/80 bg-red-500/5 p-2 rounded truncate border border-red-500/10">{log.error}</p>
                  )}

                  {log.status === 'success' && log.draftId && (
                    <button
                      onClick={() => window.open(`/admin/editor?id=${log.draftId}`, '_blank')}
                      className="mt-2 text-[10px] text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Open in Editor →
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
