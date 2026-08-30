import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Play, Database, BarChart3, Bot, BookOpen, History, Cpu } from 'lucide-react';

export default function Navbar({ activeSection, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle sticky navbar background and shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Cpu },
    { id: 'pipeline', label: 'Pipeline', icon: Play },
    { id: 'upload', label: 'Dataset', icon: Database },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'compare-models', label: 'Model AI', icon: Bot },
    { id: 'research', label: 'Research', icon: BookOpen },
    { id: 'history', label: 'History', icon: History },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3'
          : 'bg-[#FAF9F5]/90 backdrop-blur-sm border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand Logo (Minimal & Professional) */}
        <div 
          onClick={() => handleNavClick('overview')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-yellow-400 flex items-center justify-center font-black shadow-sm group-hover:scale-105 transition-transform border border-slate-800">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-heading font-black text-lg tracking-tight text-slate-900 block leading-tight">
              AI Dataset Optimizer
            </span>
            <span className="text-[10px] font-mono text-slate-500 block -mt-0.5">
              Data Reduction Engine
            </span>
          </div>
        </div>

        {/* Desktop Scroll-Spy Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-200/50 p-1 rounded-xl border border-slate-300/40">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold font-heading transition-all ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-purple-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Primary Action Button (Neo-Brutalist Button Style Preserved) */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('upload')}
            className="neo-btn neo-btn-purple neo-btn-sm text-xs font-black px-4 py-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>START OPTIMIZATION</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-slate-900 bg-slate-100 rounded-lg border border-slate-200"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-lg px-4 py-4 space-y-2 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold font-heading transition-colors ${
                    isActive
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-purple-600" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => handleNavClick('upload')}
              className="neo-btn neo-btn-purple neo-btn-sm w-full text-xs font-black py-2.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>START OPTIMIZATION</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
