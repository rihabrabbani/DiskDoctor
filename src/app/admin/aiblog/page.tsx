'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
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
                    // Refresh stats immediately after successful generation
                    fetchAIStats();
                    // Open the standard editor in a new tab for the user to review
                    window.open(`/admin/editor?id=${data.draftId}`, '_blank');
                    return; 
                  }
               } catch (e: any) {
                 if (e.message && e.message.includes('Unexpected end of JSON')) {
                     // partial JSON, skip
                 } else {
                     throw e; // Throw to the outer catch block to halt UI
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
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* Top Banner */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-purple-900 to-indigo-900 border-b border-purple-500/30 px-4 sm:px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
            <span className="text-2xl">🪄</span>
            <h1 className="text-xl font-bold text-white">AI Administrator Portal</h1>
        </div>
        <div className="flex items-center gap-4">
            <button 
                onClick={() => {
                    localStorage.removeItem('aiAdminToken');
                    router.push('/admin/aiblog/login');
                }}
                className="text-sm text-purple-200 hover:text-white transition-colors"
                >
                Sign Out
            </button>
            <button
                onClick={() => window.open('/admin/dashboard', '_blank')}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors border border-white/20"
            >
                View Standard Dashboard
            </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Generation */}
        <div className="lg:col-span-8 space-y-8">
            <div className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl shadow-xl overflow-hidden relative">
                
                {isGenerating && (
                    <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-8">
                        <h3 className="text-2xl font-bold text-white mb-2">Generating AI Blog Post</h3>
                        <p className="text-purple-400 font-medium mb-8 text-center">{generationStep}</p>
                        
                        <div className="w-full max-w-sm space-y-4">
                        {generationStepsList.map((step) => {
                            const isActive = currentStepIndex === step.id;
                            const isPast = currentStepIndex > step.id;
                            
                            return (
                            <div key={step.id} className={`flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 ${isActive ? 'bg-purple-500/20 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : isPast ? 'bg-green-500/10 border-green-500/20' : 'bg-white/5 border-transparent opacity-50'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${isActive ? 'bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.8)]' : isPast ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-500'}`}>
                                {isPast ? '✓' : step.id}
                                </div>
                                <div className="flex-1">
                                <h4 className={`font-semibold ${isActive ? 'text-purple-400' : isPast ? 'text-green-400' : 'text-gray-500'}`}>{step.title}</h4>
                                </div>
                                {isActive && (
                                <div className="w-5 h-5 rounded-full border-2 border-purple-500 border-t-transparent animate-spin"></div>
                                )}
                            </div>
                            )
                        })}
                        </div>
                        <p className="text-xs text-gray-400 mt-8">Please wait. Do not close this tab until complete.</p>
                    </div>
                )}

                <div className="p-6 border-b border-[var(--color-border)] bg-gradient-to-r from-purple-500/10 to-indigo-500/10">
                    <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Start Engine</h2>
                    <p className="text-[var(--color-text-secondary)] text-sm mt-1">Configure and launch your next high-ranking AI post.</p>
                </div>
                
                <div className="p-8 space-y-6">
                    <div className="flex border border-[var(--color-border)] rounded-lg overflow-hidden bg-[var(--color-background)]">
                        <button
                            className={`flex-1 py-4 text-sm font-medium transition-colors ${magicMode === 'magic' ? 'bg-purple-500/10 text-purple-500 border-b-2 border-purple-500' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
                            onClick={() => setMagicMode('magic')}
                        >
                            ✨ Auto (MagicAI)
                        </button>
                        <button
                            className={`flex-1 py-4 text-sm font-medium transition-colors ${magicMode === 'guided' ? 'bg-indigo-500/10 text-indigo-500 border-b-2 border-indigo-500' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
                            onClick={() => setMagicMode('guided')}
                        >
                            ✍️ Guided
                        </button>
                    </div>

                    {magicMode === 'magic' ? (
                        <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-6">
                            <h4 className="font-semibold text-purple-400 flex items-center gap-2 mb-3">
                                MagicAI Autopilot is Active
                            </h4>
                            <ul className="text-sm text-[var(--color-text-secondary)] space-y-3">
                                <li className="flex gap-2"><span>1.</span> It scans your database to ensure no duplicate content.</li>
                                <li className="flex gap-2"><span>2.</span> It generates a high-intent, trending SEO topic.</li>
                                <li className="flex gap-2"><span>3.</span> It conducts live deep web research for factual backing.</li>
                            </ul>
                        </div>
                    ) : (
                        <div>
                        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Specific Topic / Title *</label>
                        <input
                            type="text"
                            value={magicTopic}
                            onChange={e => setMagicTopic(e.target.value)}
                            placeholder="e.g. Signs your SSD is failing"
                            className="w-full px-4 py-3 border border-[var(--color-border)] rounded-xl bg-[var(--color-background)] text-[var(--color-text-primary)] focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Focus Keyword & Context Notes</label>
                        <textarea
                            value={magicNotes}
                            onChange={e => setMagicNotes(e.target.value)}
                            placeholder="Specific directions for the AI to follow..."
                            rows={4}
                            className="w-full px-4 py-3 border border-[var(--color-border)] rounded-xl bg-[var(--color-background)] text-[var(--color-text-primary)] focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                        />
                    </div>
                    
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Target Length</label>
                            <span className="text-sm font-bold text-purple-400">{magicWordCount} words</span>
                        </div>
                        <input
                            type="range"
                            min="500"
                            max="2500"
                            step="100"
                            value={magicWordCount}
                            onChange={(e) => setMagicWordCount(parseInt(e.target.value))}
                            className="w-full h-2 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-purple-500"
                        />
                    </div>
                </div>

                <div className="p-6 border-t border-[var(--color-border)] bg-[var(--color-surface-50)]">
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-lg font-bold hover:opacity-90 transition-opacity shadow-[0_4px_14px_0_rgba(168,85,247,0.39)] hover:shadow-[0_6px_20px_rgba(168,85,247,0.23)] hover:-translate-y-0.5 transform duration-200"
                    >
                        🚀 Launch Generation Sequence
                    </button>
                </div>
            </div>
        </div>

        {/* Right Column: Settings & Key Manager */}
        <div className="lg:col-span-4 space-y-8">
            <div className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-[var(--color-border)] flex items-center gap-2">
                    <span className="text-xl">⚙️</span>
                    <h2 className="text-lg font-bold text-[var(--color-text-primary)]">API Configuration</h2>
                </div>
                
                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">OpenAI Key</label>
                        <input
                            type="password"
                            value={aiApiKey}
                            onChange={e => setAiApiKey(e.target.value)}
                            placeholder="sk-..."
                            className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none text-sm font-mono"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">Text Engine</label>
                        <select
                            value={aiModel}
                            onChange={e => setAiModel(e.target.value)}
                            className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none text-sm"
                        >
                            <option value="gpt-4o">GPT-4o (Premium)</option>
                            <option value="gpt-4o-mini">GPT-4o Mini (Efficient)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">Image Engine</label>
                        <select
                            value={aiImageModel}
                            onChange={e => setAiImageModel(e.target.value)}
                            className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none text-sm"
                        >
                            <option value="gpt-image-1-mini">GPT Image Mini — $0.015/img (Best Value)</option>
                            <option value="gpt-image-1">GPT Image 1 — $0.04/img (Balanced)</option>
                            <option value="dall-e-3">DALL-E 3 — $0.08/img (Legacy HD)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">Tavily Web Search Key</label>
                        <input
                            type="password"
                            value={aiTavilyKey}
                            onChange={e => setAiTavilyKey(e.target.value)}
                            placeholder="tvly-..."
                            className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none text-sm font-mono"
                        />
                    </div>
                </div>

                <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface-50)]">
                    <button
                        onClick={handleSaveSettings}
                        disabled={isSavingSettings}
                        className="w-full py-2.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white rounded-lg text-sm font-medium transition-colors border border-white/10"
                    >
                        {isTestingKey ? 'Verifying...' : 'Save & Verify Keys'}
                    </button>
                </div>
            </div>

            {/* Phase 3 Metric Cards: Telemetry */}
            <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10">
                     <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">📊</span>
                            <h3 className="text-white font-bold text-lg">Live Telemetry</h3>
                        </div>
                        <button onClick={fetchAIStats} className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors text-indigo-200">
                            Refresh
                        </button>
                     </div>

                     {isLoadingStats ? (
                         <div className="flex justify-center py-8">
                             <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                         </div>
                     ) : stats ? (
                         <div className="space-y-4">
                             <div className="grid grid-cols-2 gap-3">
                                <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                                    <p className="text-[10px] uppercase tracking-wider text-indigo-300 mb-1">Total API Cost</p>
                                    <p className="text-2xl font-bold text-emerald-400">${stats.totalCost.toFixed(2)}</p>
                                </div>
                                <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                                    <p className="text-[10px] uppercase tracking-wider text-indigo-300 mb-1">Generated</p>
                                    <p className="text-2xl font-bold text-white">{stats.totalGenerations}</p>
                                </div>
                             </div>

                             <div className="grid grid-cols-3 gap-2">
                                <div className="bg-black/20 rounded-lg p-3 text-center border border-white/5">
                                    <p className="text-[10px] text-gray-400">Success</p>
                                    <p className="text-sm font-bold text-green-400">{stats.successCount}</p>
                                </div>
                                <div className="bg-black/20 rounded-lg p-3 text-center border border-white/5">
                                    <p className="text-[10px] text-gray-400">Failed</p>
                                    <p className="text-sm font-bold text-red-500">{stats.failCount}</p>
                                </div>
                                <div className="bg-black/20 rounded-lg p-3 text-center border border-white/5">
                                    <p className="text-[10px] text-gray-400">Images</p>
                                    <p className="text-sm font-bold text-blue-400">{stats.totalImages}</p>
                                </div>
                             </div>

                             <div className="bg-black/20 rounded-xl p-4 border border-white/5 mt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-[10px] uppercase tracking-wider text-indigo-300">Tokens Processed</p>
                                    <p className="text-sm font-bold text-indigo-200">{(stats.totalPromptTokens + stats.totalCompletionTokens).toLocaleString()}</p>
                                </div>
                                <div className="w-full bg-black/50 rounded-full h-1.5 flex overflow-hidden">
                                     <div className="bg-indigo-500 h-1.5" style={{ width: `${(stats.totalPromptTokens / (stats.totalPromptTokens + stats.totalCompletionTokens)) * 100}%` }}></div>
                                     <div className="bg-purple-500 h-1.5" style={{ width: `${(stats.totalCompletionTokens / (stats.totalPromptTokens + stats.totalCompletionTokens)) * 100}%` }}></div>
                                </div>
                                <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
                                    <span>Prompt: {stats.totalPromptTokens.toLocaleString()}</span>
                                    <span>Completion: {stats.totalCompletionTokens.toLocaleString()}</span>
                                </div>
                             </div>
                         </div>
                     ) : (
                         <p className="text-sm text-center text-gray-400 py-8">No telemetry data available.</p>
                     )}
                </div>
            </div>

            {/* Recent Generations Log */}
            {logs.length > 0 && (
                <div className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-surface-50)]">
                        <h3 className="text-sm font-bold text-[var(--color-text-primary)]">Recent Generations</h3>
                    </div>
                    <div className="divide-y divide-[var(--color-border)] max-h-[300px] overflow-y-auto">
                        {logs.slice(0, 5).map((log: any) => (
                            <div key={log._id} className="p-4 hover:bg-[var(--color-surface-200)] transition-colors text-sm">
                                <div className="flex justify-between items-start mb-1">
                                    <p className="font-semibold text-[var(--color-text-primary)] truncate max-w-[200px]" title={log.topic || log.draftId}>
                                        {log.topic || 'Autopilot Generation'}
                                    </p>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${log.status === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                        ${log.calculatedCost ? log.calculatedCost.toFixed(3) : '0.000'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-xs text-[var(--color-text-tertiary)] mt-2">
                                    <span>{new Date(log.timestamp).toLocaleDateString()} {new Date(log.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                    <span className="uppercase text-[9px] border border-[var(--color-border)] px-1.5 rounded">{log.model}</span>
                                </div>
                                {log.error && (
                                    <p className="mt-2 text-xs text-red-400 bg-red-500/5 p-2 rounded truncate">{log.error}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

      </main>
    </div>
  );
}
