import React, { useState, useEffect } from 'react';
import { GEMS_DATABASE, Gemstone, SRI_LANKA_MINING_REGIONS, SriLankanMineRegion } from './data/gemsData';
import { CrystalViewer3D } from './components/CrystalViewer3D';
import { SriLankaMiningMap } from './components/SriLankaMiningMap';
import { GemDetailModal } from './components/GemDetailModal';
import { AiGemConsultant } from './components/AiGemConsultant';
import { RecruitmentSandbox } from './components/RecruitmentSandbox';
import { GemComparisonMatrix } from './components/GemComparisonMatrix';
import { GemologyQuiz } from './components/GemologyQuiz';
import { GemCatalog } from './components/GemCatalog';
import { AmbientGoldCanvas } from './components/AmbientGoldCanvas';
import { 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Search, 
  User, 
  ShoppingBag, 
  ChevronRight, 
  ArrowRight,
  Brain, 
  Briefcase, 
  Scale, 
  BookOpen, 
  Layers, 
  Phone, 
  Mail, 
  Globe, 
  Check, 
  CheckCircle2, 
  X,
  Menu
} from 'lucide-react';

export default function App() {
  const [activeNav, setActiveNav] = useState<'home' | 'collection' | 'mines' | 'certifications' | '3d' | 'ai' | 'recruitment' | 'compare' | 'quiz' | 'about' | 'contact'>('home');
  const [selectedGem, setSelectedGem] = useState<Gemstone | null>(null);
  const [comparedGems, setComparedGems] = useState<Gemstone[]>([
    GEMS_DATABASE[0], // Ceylon Blue Sapphire
    GEMS_DATABASE[2]  // Padparadscha Sapphire
  ]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [certificationModalOpen, setCertificationModalOpen] = useState(false);

  // Toggle compare item
  const handleToggleCompare = (gem: Gemstone) => {
    setComparedGems((prev) => {
      const exists = prev.some((g) => g.id === gem.id);
      if (exists) {
        return prev.filter((g) => g.id !== gem.id);
      } else {
        if (prev.length >= 4) {
          alert('Comparison matrix supports a maximum of 4 gemstones simultaneously.');
          return prev;
        }
        return [...prev, gem];
      }
    });
  };

  const handleRemoveCompare = (gemId: string) => {
    setComparedGems((prev) => prev.filter((g) => g.id !== gemId));
  };

  // Featured 3 Sri Lankan Gems for the screenshot match
  const featuredSriLankanGems = GEMS_DATABASE.filter(g => 
    g.id === 'ceylon-blue-sapphire' || g.id === 'ceylon-ruby' || g.id === 'padparadscha-sapphire'
  );

  return (
    <div className="min-h-screen bg-[#050608] text-white flex flex-col relative selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
      {/* 60fps Ambient Gold Canvas Particles */}
      <AmbientGoldCanvas />

      {/* TOP NAVIGATION HEADER (Matching Screenshot) */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-[#D4AF37]/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <div 
            onClick={() => setActiveNav('home')} 
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            {/* Geometric Diamond Wireframe Icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#0D1016] border border-[#D4AF37]/50 flex items-center justify-center shadow-lg shadow-[#D4AF37]/10 group-hover:border-[#D4AF37] transition-all">
              <svg viewBox="0 0 40 40" className="w-6 h-6 text-[#D4AF37]">
                <polygon points="20,4 34,14 20,36 6,14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <line x1="6" y1="14" x2="34" y2="14" stroke="currentColor" strokeWidth="1.5" />
                <line x1="20" y1="4" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" />
                <line x1="20" y1="4" x2="26" y2="14" stroke="currentColor" strokeWidth="1.5" />
                <line x1="14" y1="14" x2="20" y2="36" stroke="currentColor" strokeWidth="1.5" />
                <line x1="26" y1="14" x2="20" y2="36" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <span className="font-heading font-extrabold tracking-[0.18em] text-sm sm:text-base text-white block group-hover:text-[#F3E5AB] transition-colors">
                THENUKA
              </span>
              <span className="font-heading tracking-[0.25em] text-[11px] sm:text-xs text-[#D4AF37] font-semibold block">
                SATHMITHA GEMS
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Matching Screenshot) */}
          <nav className="hidden xl:flex items-center gap-6 text-[12px] font-medium tracking-wider">
            <button
              type="button"
              onClick={() => setActiveNav('home')}
              className={`transition-colors uppercase pb-1 border-b-2 ${
                activeNav === 'home'
                  ? 'text-[#F3E5AB] border-[#D4AF37]'
                  : 'text-[#94A3B8] border-transparent hover:text-white'
              }`}
            >
              HOME
            </button>

            <button
              type="button"
              onClick={() => setActiveNav('collection')}
              className={`transition-colors uppercase pb-1 border-b-2 ${
                activeNav === 'collection'
                  ? 'text-[#F3E5AB] border-[#D4AF37]'
                  : 'text-[#94A3B8] border-transparent hover:text-white'
              }`}
            >
              COLLECTION
            </button>

            <button
              type="button"
              onClick={() => setActiveNav('mines')}
              className={`transition-colors uppercase pb-1 border-b-2 ${
                activeNav === 'mines'
                  ? 'text-[#F3E5AB] border-[#D4AF37]'
                  : 'text-[#94A3B8] border-transparent hover:text-white'
              }`}
            >
              MINES
            </button>

            <button
              type="button"
              onClick={() => setCertificationModalOpen(true)}
              className="text-[#94A3B8] border-b-2 border-transparent hover:text-white transition-colors uppercase pb-1"
            >
              CERTIFICATIONS
            </button>

            <button
              type="button"
              onClick={() => setActiveNav('3d')}
              className={`transition-colors uppercase pb-1 border-b-2 flex items-center gap-1 ${
                activeNav === '3d'
                  ? 'text-[#F3E5AB] border-[#D4AF37]'
                  : 'text-[#94A3B8] border-transparent hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3 text-[#D4AF37]" /> 3D CRYSTALS
            </button>

            <button
              type="button"
              onClick={() => setActiveNav('ai')}
              className={`transition-colors uppercase pb-1 border-b-2 flex items-center gap-1 ${
                activeNav === 'ai'
                  ? 'text-[#F3E5AB] border-[#D4AF37]'
                  : 'text-[#94A3B8] border-transparent hover:text-white'
              }`}
            >
              <Brain className="w-3 h-3 text-[#D4AF37]" /> AI CONSULTANT
            </button>

            <button
              type="button"
              onClick={() => setActiveNav('recruitment')}
              className={`transition-colors uppercase pb-1 border-b-2 flex items-center gap-1 ${
                activeNav === 'recruitment'
                  ? 'text-[#F3E5AB] border-[#D4AF37]'
                  : 'text-[#94A3B8] border-transparent hover:text-white'
              }`}
            >
              <Briefcase className="w-3 h-3 text-[#D4AF37]" /> RECRUITMENT
            </button>

            <button
              type="button"
              onClick={() => setActiveNav('compare')}
              className={`transition-colors uppercase pb-1 border-b-2 flex items-center gap-1 ${
                activeNav === 'compare'
                  ? 'text-[#F3E5AB] border-[#D4AF37]'
                  : 'text-[#94A3B8] border-transparent hover:text-white'
              }`}
            >
              <Scale className="w-3 h-3 text-[#D4AF37]" /> COMPARE ({comparedGems.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveNav('quiz')}
              className={`transition-colors uppercase pb-1 border-b-2 flex items-center gap-1 ${
                activeNav === 'quiz'
                  ? 'text-[#F3E5AB] border-[#D4AF37]'
                  : 'text-[#94A3B8] border-transparent hover:text-white'
              }`}
            >
              <BookOpen className="w-3 h-3 text-[#D4AF37]" /> QUIZ
            </button>
          </nav>

          {/* Right Header Action Icons (Matching Screenshot) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveNav('collection')}
              className="p-2 rounded-full text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
              title="Search Collection"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                alert('Thenuka Sathmitha Gems VIP Client Portal. Connect with our bespoke gem concierge.');
              }}
              className="p-2 rounded-full text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
              title="Client Profile"
            >
              <User className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setActiveNav('compare')}
              className="relative p-2 rounded-full text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
              title="Comparison Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {comparedGems.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-black text-[9.5px] font-bold flex items-center justify-center">
                  {comparedGems.length}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/5"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-[#D4AF37]/20 bg-[#0D1016]/98 p-4 space-y-2 text-xs">
            {(['home', 'collection', 'mines', '3d', 'ai', 'recruitment', 'compare', 'quiz'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveNav(tab);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left p-2.5 rounded-lg uppercase font-semibold ${
                  activeNav === tab ? 'bg-[#D4AF37]/20 text-[#F3E5AB]' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {tab === 'home' && 'Home'}
                {tab === 'collection' && 'Collection & Filter Engine'}
                {tab === 'mines' && 'Sri Lankan Mines & Geology'}
                {tab === '3d' && '3D Crystal Lattice Viewer'}
                {tab === 'ai' && 'AI Gem Consultant'}
                {tab === 'recruitment' && 'Recruitment Sandbox'}
                {tab === 'compare' && `Comparison Matrix (${comparedGems.length})`}
                {tab === 'quiz' && 'Gemology Quiz & Glossary'}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* MAIN VIEW CONTENT CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 relative z-10">
        
        {/* VIEW 1: HOME VIEW (Matches Screenshot Flawlessly!) */}
        {activeNav === 'home' && (
          <>
            {/* HERO SECTION */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[500px]">
              {/* Left Column: Hero Text, CTA Buttons, Stat Cards */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-wide text-white leading-tight">
                    LUXURY GEMOLOGICAL PORTAL
                  </h1>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#D4AF37] tracking-widest mt-1">
                    THENUKA SATHMITHA GEMS
                  </h2>
                  <div className="flex items-center gap-2 mt-2 text-xs text-[#CBD5E1] tracking-wider uppercase font-mono">
                    <span>Ethically Sourced</span>
                    <span>•</span>
                    <span>Certified</span>
                    <span>•</span>
                    <span className="text-[#D4AF37]">Sri Lanka Since 1998</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-xl">
                  Discover traceable, certified gemstones sourced from Sri Lanka's historic mining regions. Each gemstone is verified, GIA certified, and showcased with full provenance for collectors and luxury clients.
                </p>

                {/* Primary CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveNav('collection')}
                    className="px-6 py-3 rounded-xl gold-gradient-btn text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xl"
                  >
                    <span>Explore Collection</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setCertificationModalOpen(true)}
                    className="px-6 py-3 rounded-xl glass-panel hover:bg-white/10 border border-[#D4AF37]/40 text-xs sm:text-sm font-semibold text-white transition-all shadow-md"
                  >
                    View Certifications
                  </button>
                </div>

                {/* 3 Metric Stat Cards (Matching Screenshot) */}
                <div className="grid grid-cols-3 gap-3 pt-4 max-w-lg">
                  <div className="p-3.5 rounded-2xl glass-panel-elevated border border-[#D4AF37]/30 text-center">
                    <span className="text-xl sm:text-2xl font-heading font-extrabold text-[#F3E5AB] block font-mono">
                      25+
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#94A3B8] block mt-0.5">
                      Years of Expertise
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl glass-panel-elevated border border-[#D4AF37]/30 text-center">
                    <span className="text-xl sm:text-2xl font-heading font-extrabold text-[#F3E5AB] block font-mono">
                      500+
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#94A3B8] block mt-0.5">
                      Certified Gemstones
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl glass-panel-elevated border border-[#D4AF37]/30 text-center">
                    <span className="text-xl sm:text-2xl font-heading font-extrabold text-[#F3E5AB] block font-mono">
                      100%
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#94A3B8] block mt-0.5">
                      Traceability & Provenance
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: 3D Faceted Glowing Crystal Lattice (Matching Screenshot) */}
              <div className="lg:col-span-5 h-[360px] sm:h-[420px] lg:h-[480px] rounded-3xl glass-panel-elevated border border-[#D4AF37]/30 relative p-4 flex items-center justify-center shadow-2xl overflow-hidden">
                <CrystalViewer3D initialSystem="Brilliant" accentColor="#D4AF37" />
              </div>
            </section>

            {/* SECTION 2: FEATURED GEMS & INTERACTIVE SRI LANKA MAP (Matching Screenshot) */}
            <section className="space-y-6 pt-6">
              <div>
                <h3 className="text-2xl font-heading font-bold text-white tracking-wide">
                  FEATURED GEMS
                </h3>
                <p className="text-xs text-[#D4AF37] font-medium tracking-wider">
                  Handpicked Sri Lankan Gemstones
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left 3 Gem Cards (Ratnapura Blue Sapphire, Pelmadulla Ruby, Balangoda Padparadscha) */}
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {featuredSriLankanGems.map((gem) => (
                    <div
                      key={gem.id}
                      onClick={() => setSelectedGem(gem)}
                      className="group cursor-pointer rounded-2xl glass-panel-elevated border border-[#D4AF37]/25 hover:border-[#D4AF37]/70 p-3.5 transition-all duration-300 shadow-xl flex flex-col justify-between hover:-translate-y-1.5"
                    >
                      <div>
                        {/* Region Pin Header */}
                        <div className="flex items-center gap-1 text-[11px] text-[#CBD5E1] mb-2 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{gem.sriLankaRegions[0]}</span>
                        </div>

                        {/* Cut Specimen Image */}
                        <div className="w-full aspect-square rounded-xl overflow-hidden bg-black/60 relative mb-3 border border-white/5">
                          <img
                            src={gem.images.faceted}
                            alt={gem.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        {/* Title */}
                        <h4 className="font-heading font-bold text-white text-sm group-hover:text-[#F3E5AB] transition-colors leading-snug">
                          {gem.variety}
                        </h4>

                        {/* Specs from Screenshot */}
                        <p className="text-[10px] text-[#94A3B8] mt-1 leading-snug">
                          Origin: {gem.sriLankaRegions[0]} • {gem.caratDefault}ct • GIA Certified • {gem.treatmentStatus}
                        </p>
                      </div>

                      {/* Stock / Rarity Badge from Screenshot */}
                      <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/30">
                          {gem.badge || 'Certified'}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: Interactive Sri Lanka Mining Regional Map (Matching Screenshot) */}
                <div className="lg:col-span-6">
                  <SriLankaMiningMap onSelectRegion={() => setActiveNav('mines')} />
                </div>
              </div>
            </section>

            {/* QUICK FEATURE TILES FOR OTHER MODULES */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div 
                onClick={() => setActiveNav('ai')}
                className="p-6 rounded-2xl glass-panel-elevated border border-[#D4AF37]/30 hover:border-[#D4AF37] cursor-pointer group transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] mb-3 group-hover:scale-110 transition-transform">
                  <Brain className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-white text-base group-hover:text-[#F3E5AB]">
                  THENUKA AI GEM CONSULTANT
                </h4>
                <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                  Natural language identification, unheated silk verification, and high thinking spectroscopic analysis.
                </p>
                <span className="text-[11px] font-semibold text-[#D4AF37] flex items-center gap-1 mt-3">
                  Launch Assistant <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div 
                onClick={() => setActiveNav('recruitment')}
                className="p-6 rounded-2xl glass-panel-elevated border border-[#D4AF37]/30 hover:border-[#D4AF37] cursor-pointer group transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] mb-3 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-white text-base group-hover:text-[#F3E5AB]">
                  Recruitment Sandbox
                </h4>
                <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                  Generate LinkedIn Job Descriptions and 10 targeted behavioral interview questions from raw notes.
                </p>
                <span className="text-[11px] font-semibold text-[#D4AF37] flex items-center gap-1 mt-3">
                  Open Sandbox <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div 
                onClick={() => setActiveNav('quiz')}
                className="p-6 rounded-2xl glass-panel-elevated border border-[#D4AF37]/30 hover:border-[#D4AF37] cursor-pointer group transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] mb-3 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-white text-base group-hover:text-[#F3E5AB]">
                  Gemology Quiz & Glossary
                </h4>
                <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                  Interactive multi-question gemological examination with instant scoring and complete A-Z terminology.
                </p>
                <span className="text-[11px] font-semibold text-[#D4AF37] flex items-center gap-1 mt-3">
                  Test Knowledge <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </section>
          </>
        )}

        {/* VIEW 2: COLLECTION CATALOG & MULTI-FILTER SEARCH ENGINE */}
        {activeNav === 'collection' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-[#D4AF37]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase">
                  Scientific Database & Research Catalog
                </span>
                <h2 className="text-3xl font-heading font-bold text-white tracking-wide">
                  Complete Gemstone Encyclopedia
                </h2>
              </div>
              <div className="text-xs text-[#94A3B8]">
                Cataloging <strong className="text-white font-mono">{GEMS_DATABASE.length}</strong> authenticated species & varieties
              </div>
            </div>

            <GemCatalog
              onSelectGem={(gem) => setSelectedGem(gem)}
              onToggleCompare={handleToggleCompare}
              comparedIds={comparedGems.map(g => g.id)}
            />
          </div>
        )}

        {/* VIEW 3: SRI LANKAN MINES & GEOLOGY HUB */}
        {activeNav === 'mines' && (
          <div className="space-y-8">
            <div className="pb-4 border-b border-[#D4AF37]/20">
              <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase">
                Metamorphic Wealth & Illam Gravel Horizons
              </span>
              <h2 className="text-3xl font-heading font-bold text-white tracking-wide">
                Dedicated Sri Lankan Gemology Research Hub
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 rounded-2xl glass-panel space-y-3">
                  <h3 className="text-lg font-heading font-bold text-[#F3E5AB]">
                    1. The Metamorphic Wealth of Sri Lanka (Highland Complex)
                  </h3>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    Over 90% of Sri Lanka’s landmass is underlain by Precambrian high-grade metamorphic granulite and amphibolite facies rocks aged between 550 and 2,000 million years. During the Pan-African orogenic collision, extreme temperatures (750-850°C) and pressures (5-9 kilobars) crystalized corundum, chrysoberyl, and spinels within aluminum-rich pelitic gneisses and calc-silicate skarns.
                  </p>
                </div>

                <div className="p-6 rounded-2xl glass-panel space-y-3">
                  <h3 className="text-lg font-heading font-bold text-[#F3E5AB]">
                    2. The Ancient Illam Gravel Layer & Pit Extraction (Pathal)
                  </h3>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    Centuries of tropical monsoon weathering eroded crystalline highland host rocks, washing heavy, durable corundum crystals down river channels into ancient floodplains. Here, they concentrated in dense gravel beds known locally as <strong>“Illam”</strong>, buried beneath 3 to 25 meters of alluvial clay and paddy mud. Miners sink vertical timbered shafts (Pathal) and horizontal galleries (Dona) before hand-washing the Illam using conical woven rattan baskets (Kulla).
                  </p>
                </div>

                <div className="p-6 rounded-2xl glass-panel space-y-3">
                  <h3 className="text-lg font-heading font-bold text-[#F3E5AB]">
                    3. Ceylon Royal Blue Sapphire & The Geuda Innovation
                  </h3>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    Unlike iron-rich Australian or Thai sapphires which exhibit dark inky extinction, Ceylon sapphires possess exceptionally low iron and balanced titanium, resulting in an open, glowing cornflower and royal blue brilliance. Sri Lankan lapidaries historically developed the <em>Geuda</em> heat-treatment technique using traditional charcoal blowpipes (Lakmini), transforming milky, rutile-dense corundum into transparent, intensely saturated royal blue gems.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5">
                <SriLankaMiningMap />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: 3D CRYSTAL LATTICE INTERACTIVE LAB */}
        {activeNav === '3d' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-[#D4AF37]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase">
                  WebGL 60FPS Crystallography Engine
                </span>
                <h2 className="text-3xl font-heading font-bold text-white tracking-wide">
                  3D Interactive Crystal Lattice Laboratory
                </h2>
              </div>
              <p className="text-xs text-[#94A3B8] max-w-sm">
                Interactive real-time 3D simulation with dynamic refraction, gold wireframe overlays, and vertex lattice nodes.
              </p>
            </div>

            <div className="w-full h-[580px] rounded-3xl glass-panel-elevated border border-[#D4AF37]/40 p-6 flex items-center justify-center relative shadow-2xl overflow-hidden">
              <CrystalViewer3D initialSystem="Brilliant" accentColor="#D4AF37" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#CBD5E1]">
              <div className="p-4 rounded-xl glass-panel border border-white/5">
                <strong className="text-[#D4AF37] block mb-1">Trigonal / Hexagonal System</strong>
                <span>Corundum (Sapphire & Ruby), Beryl (Emerald & Aquamarine), and Quartz grow in 3-fold or 6-fold axial symmetry.</span>
              </div>
              <div className="p-4 rounded-xl glass-panel border border-white/5">
                <strong className="text-[#D4AF37] block mb-1">Orthorhombic System</strong>
                <span>Chrysoberyl (Alexandrite & Cat’s Eye), Topaz, and Tanzanite exhibit three mutually perpendicular axes of unequal lengths.</span>
              </div>
              <div className="p-4 rounded-xl glass-panel border border-white/5">
                <strong className="text-[#D4AF37] block mb-1">Isometric (Cubic) System</strong>
                <span>Spinel, Garnet, and Diamond crystallize with 3 equal axes at 90°, displaying single refraction (isotropic optical character).</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: AI GEM CONSULTANT CHAT */}
        {activeNav === 'ai' && (
          <div className="space-y-6">
            <AiGemConsultant />
          </div>
        )}

        {/* VIEW 6: RECRUITMENT SANDBOX */}
        {activeNav === 'recruitment' && (
          <div className="space-y-6">
            <RecruitmentSandbox />
          </div>
        )}

        {/* VIEW 7: COMPARISON MATRIX */}
        {activeNav === 'compare' && (
          <div className="space-y-6">
            <GemComparisonMatrix
              comparedGems={comparedGems}
              onRemoveGem={handleRemoveCompare}
              onClearAll={() => setComparedGems([])}
              onOpenSelector={() => setActiveNav('collection')}
              onSelectGemModal={(gem) => setSelectedGem(gem)}
            />
          </div>
        )}

        {/* VIEW 8: GEMOLOGY QUIZ & GLOSSARY */}
        {activeNav === 'quiz' && (
          <div className="space-y-6">
            <GemologyQuiz />
          </div>
        )}
      </main>

      {/* DETAIL MODAL FOR DEEP SCIENTIFIC PROFILES */}
      <GemDetailModal
        gem={selectedGem}
        onClose={() => setSelectedGem(null)}
        onAddToComparison={handleToggleCompare}
        isCompared={selectedGem ? comparedGems.some(g => g.id === selectedGem.id) : false}
      />

      {/* CERTIFICATION POPUP MODAL */}
      {certificationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl glass-panel-elevated border border-[#D4AF37]/50 p-6 text-white shadow-2xl">
            <button
              type="button"
              onClick={() => setCertificationModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-[#94A3B8] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] mb-1">
              <ShieldCheck className="w-4 h-4" /> INDEPENDENT SCIENTIFIC CERTIFICATION
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">
              Gemological Credentials & Ethics
            </h3>
            <p className="text-xs text-[#CBD5E1] leading-relaxed mb-4">
              Every specimen in the THENUKA SATHMITHA GEMS catalog is accompanied by independent laboratory certificates from the world's most prestigious testing authorities:
            </p>
            <ul className="space-y-2 text-xs text-[#CBD5E1] mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#50C878]" />
                <strong>GIA (Gemological Institute of America):</strong> Origin & Thermal Treatment reports.
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#50C878]" />
                <strong>Gübelin & SSEF (Switzerland):</strong> Alpine laboratory spectroscopy & origin determination.
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#50C878]" />
                <strong>GCIA & NGJA (Sri Lanka):</strong> National Gem & Jewellery Authority export certification.
              </li>
            </ul>
            <button
              type="button"
              onClick={() => setCertificationModalOpen(false)}
              className="w-full py-2.5 rounded-xl gold-gradient-btn text-xs font-bold"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* MANDATORY FOOTER (Across all views) */}
      <footer className="mt-auto border-t border-[#D4AF37]/20 bg-[#0A0D14] z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs text-[#94A3B8]">
            {/* Col 1: Brand Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="font-heading font-bold text-white text-sm tracking-wider">
                  THENUKA SATHMITHA GEMS
                </span>
              </div>
              <p className="text-[11px] leading-relaxed">
                The apex luxury gemological portal and scientific AI research encyclopedia for Ceylon sapphire, ruby, padparadscha, and chrysoberyl.
              </p>
            </div>

            {/* Col 2: Navigation Quicklinks */}
            <div className="space-y-2">
              <span className="font-semibold text-white uppercase tracking-wider block text-[11px]">
                Research Corridors
              </span>
              <ul className="space-y-1.5 text-[11px]">
                <li><button type="button" onClick={() => setActiveNav('collection')} className="hover:text-[#F3E5AB]">Encyclopedia Database</button></li>
                <li><button type="button" onClick={() => setActiveNav('mines')} className="hover:text-[#F3E5AB]">Sri Lankan Alluvial Mining Hubs</button></li>
                <li><button type="button" onClick={() => setActiveNav('3d')} className="hover:text-[#F3E5AB]">3D Crystal Lattice Visualizer</button></li>
                <li><button type="button" onClick={() => setActiveNav('quiz')} className="hover:text-[#F3E5AB]">Gemology Examination & Glossary</button></li>
              </ul>
            </div>

            {/* Col 3: AI & Career Engine */}
            <div className="space-y-2">
              <span className="font-semibold text-white uppercase tracking-wider block text-[11px]">
                Intelligent Systems
              </span>
              <ul className="space-y-1.5 text-[11px]">
                <li><button type="button" onClick={() => setActiveNav('ai')} className="hover:text-[#F3E5AB]">THENUKA AI Gem Consultant (Gemini 3.1 Pro)</button></li>
                <li><button type="button" onClick={() => setActiveNav('recruitment')} className="hover:text-[#F3E5AB]">Recruitment Sandbox (LinkedIn JD Engine)</button></li>
                <li><button type="button" onClick={() => setActiveNav('compare')} className="hover:text-[#F3E5AB]">Multi-Gem Comparison Matrix</button></li>
                <li><button type="button" onClick={() => setCertificationModalOpen(true)} className="hover:text-[#F3E5AB]">Laboratory Verification Standards</button></li>
              </ul>
            </div>

            {/* Col 4: Ethical Heritage */}
            <div className="space-y-2">
              <span className="font-semibold text-white uppercase tracking-wider block text-[11px]">
                Ethical Provenance
              </span>
              <p className="text-[11px] leading-relaxed">
                Ratnapura • Pelmadulla • Balangoda • Elahera • Meetiyagoda. 100% compliant with National Gem and Jewellery Authority of Sri Lanka ethical extraction guidelines.
              </p>
            </div>
          </div>

          {/* STRICT MANDATORY CREDITS & OWNER LINE */}
          <div className="pt-6 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="text-xs sm:text-sm font-heading font-semibold text-[#D4AF37] tracking-wider">
              Designed, Created & Owned by THENUKA SATHMITHA JAYASINGHE
            </div>

            <div className="text-[11px] text-[#94A3B8] font-mono">
              © {new Date().getFullYear()} THENUKA SATHMITHA GEMS. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
