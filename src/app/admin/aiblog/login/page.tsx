'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AILoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Specific auth credentials for AI portal
        if (username === 'admin' && password === 'ai') {
            localStorage.setItem('aiAdminToken', 'authenticated');
            router.push('/admin/aiblog');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-[var(--color-surface-100)] rounded-2xl p-8 shadow-sm border border-[var(--color-border)]">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">AI Portal Login</h1>
                    <p className="text-[var(--color-text-secondary)] text-sm">Sign in to manage AI blog generation</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded-lg">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[var(--color-primary)] text-white py-3 rounded-xl hover:bg-[var(--color-primary-hover)] transition-colors font-medium text-lg"
                    >
                        Sign In
                    </button>
                    
                    <div className="text-center mt-4">
                        <button 
                            type="button" 
                            onClick={() => router.push('/admin/login')} 
                            className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
                        >
                            Return to Standard Admin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
