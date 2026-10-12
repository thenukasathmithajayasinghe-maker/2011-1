import React, { useState } from 'react';
import { SRI_LANKA_MINING_REGIONS, SriLankanMineRegion } from '../data/gemsData';
import { MapPin, ShieldCheck, CheckCircle2, Sparkles, ChevronRight, X, Info } from 'lucide-react';

interface SriLankaMiningMapProps {
  onSelectRegion?: (region: SriLankanMineRegion) => void;
  selectedRegionId?: string;
}

export const SriLankaMiningMap: React.FC<SriLankaMiningMapProps> = ({
  onSelectRegion,
  selectedRegionId
}) => {
  const [activeRegion, setActiveRegion] = useState<SriLankanMineRegion | null>(
    SRI_LANKA_MINING_REGIONS.find(r => r.id === selectedRegionId) || SRI_LANKA_MINING_REGIONS[0]
  );
  const [modalOpen, setModalOpen] = useState(false);

  const handlePinClick = (region: SriLankanMineRegion) => {
    setActiveRegion(region);
    setModalOpen(true);
    if (onSelectRegion) {
      onSelectRegion(region);
    }
  };

  return (
    <div className="relative w-full rounded-2xl glass-panel-elevated p-6 border border-[#D4AF37]/30 shadow-2xl overflow-hidden flex flex-col justify-between min-h-[460px]">
      {/* Background ambient map glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.12),transparent_70%)] pointer-events-none" />

      {/* Header bar within map */}
      <div className="flex items-center justify-between mb-4 z-10">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Ceylon Provenance & Geology
          </span>
          <h3 className="text-xl font-heading font-semibold text-white tracking-wide">
            Sri Lankan Mining Corridors
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
          <span>Interactive Map</span>
        </div>
      </div>

      {/* SVG Map Area */}
      <div className="relative flex-1 w-full min-h-[280px] flex items-center justify-center py-2">
        <svg
          viewBox="0 0 500 600"
          className="w-full max-w-[380px] h-auto drop-shadow-[0_0_25px_rgba(212,175,55,0.15)] filter"
        >
          <defs>
            <linearGradient id="sriLankaBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F3E5AB" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8A6B0A" stopOpacity="0.4" />
            </linearGradient>
            <radialGradient id="islandFillGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#141824" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0A0D14" stopOpacity="0.95" />
            </radialGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Detailed stylized Geographic Contour of Sri Lanka (Pear Shape) */}
          <path
            d="M 230 40 
               C 245 45, 260 55, 275 75 
               C 290 95, 305 130, 315 165 
               C 325 200, 335 240, 335 280 
               C 335 320, 340 360, 325 405 
               C 310 450, 290 495, 265 525 
               C 240 555, 215 565, 195 555 
               C 175 545, 160 520, 150 480 
               C 140 440, 145 395, 155 350 
               C 165 305, 160 260, 165 220 
               C 170 180, 185 140, 200 100 
               C 210 70, 220 40, 230 40 Z"
            fill="url(#islandFillGrad)"
            stroke="url(#sriLankaBorderGrad)"
            strokeWidth="2.5"
            strokeDasharray="none"
          />

          {/* Internal Metamorphic Belt Accent Lines (Highland Complex) */}
          <path
            d="M 205 150 Q 240 280 235 440"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1"
            strokeOpacity="0.3"
            strokeDasharray="4 4"
          />
          <path
            d="M 245 180 Q 275 320 260 460"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1"
            strokeOpacity="0.25"
            strokeDasharray="4 4"
          />

          {/* Map Region Pins */}
          {SRI_LANKA_MINING_REGIONS.map((region) => {
            // Map percentage coordinates (0..100) to SVG viewbox (500x600)
            const cx = (region.coordinates.x / 100) * 500;
            const cy = (region.coordinates.y / 100) * 600;
            const isSelected = activeRegion?.id === region.id;

            return (
              <g
                key={region.id}
                className="cursor-pointer group transition-transform"
                onClick={() => handlePinClick(region)}
              >
                {/* Ping animation ripple */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 16 : 10}
                  fill="#D4AF37"
                  fillOpacity={isSelected ? 0.35 : 0.2}
                  className={isSelected ? 'animate-pulse' : 'group-hover:scale-125 transition-all'}
                />

                {/* Inner Pin Dot */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 6 : 4.5}
                  fill={isSelected ? '#F3E5AB' : '#D4AF37'}
                  stroke="#050608"
                  strokeWidth="1.5"
                  filter="url(#glow)"
                />

                {/* Label Line & Text */}
                <text
                  x={cx > 260 ? cx + 16 : cx - 16}
                  y={cy + 4}
                  textAnchor={cx > 260 ? 'start' : 'end'}
                  fill={isSelected ? '#F3E5AB' : '#FFFFFF'}
                  fontSize={isSelected ? '14' : '12'}
                  fontWeight={isSelected ? '700' : '500'}
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  className="transition-all select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                >
                  {region.name.split(' ')[0]}
                </text>

                {/* Secondary Gem Subtext */}
                <text
                  x={cx > 260 ? cx + 16 : cx - 16}
                  y={cy + 18}
                  textAnchor={cx > 260 ? 'start' : 'end'}
                  fill="#D4AF37"
                  fontSize="9.5"
                  fontWeight="400"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  className="opacity-90 select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                >
                  • {region.primaryGems.slice(0, 2).join(', ')}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Region Quick Float Card */}
        {activeRegion && (
          <div className="absolute top-2 right-2 max-w-[210px] p-3 rounded-xl glass-panel-gold border border-[#D4AF37]/40 shadow-xl backdrop-blur-md hidden sm:block animate-fade-in">
            <div className="flex items-center justify-between text-[#D4AF37] text-xs font-semibold mb-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {activeRegion.name}
              </span>
              <span className="text-[10px] text-[#94A3B8] font-mono">{activeRegion.sinhalaName}</span>
            </div>
            <p className="text-[11px] text-[#CBD5E1] line-clamp-2 mb-2">
              {activeRegion.geologyType}
            </p>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="text-[10px] text-[#D4AF37] hover:text-[#FFF6D6] font-semibold flex items-center gap-1 group"
            >
              Examine Mine Dossier <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        )}
      </div>

      {/* Bottom Heritage & Verification Notice - Matching Screenshot */}
      <div className="mt-4 pt-4 border-t border-[#D4AF37]/20 z-10">
        <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">
          Known as the <strong className="text-white">“Gem Island” (Ratna-Dweepa)</strong>, Sri Lanka has been the world’s cradle of fine sapphires, rubies, and alexandrites for over 2,500 years. <strong className="text-[#D4AF37]">THENUKA SATHMITHA GEMS</strong> works directly with licensed artisanal miners across these historic corridors, guaranteeing ethical extraction and 100% mine-to-market provenance.
        </p>

        {/* Badges from Screenshot */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-[#F3E5AB] bg-[#D4AF37]/10 border border-[#D4AF37]/30">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> Ethical Mining
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-[#F3E5AB] bg-[#D4AF37]/10 border border-[#D4AF37]/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> GCIA Verified
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-[#F3E5AB] bg-[#D4AF37]/10 border border-[#D4AF37]/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Export Certified
          </span>
        </div>
      </div>

      {/* Detailed Region Dossier Modal */}
      {modalOpen && activeRegion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl glass-panel-elevated border border-[#D4AF37]/50 p-6 text-white shadow-2xl">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] mb-1">
              <MapPin className="w-4 h-4" /> SRI LANKAN MINING LOCALITY DOSSIER
            </div>
            <h2 className="text-2xl font-heading font-bold text-white mb-1">
              {activeRegion.name} <span className="text-[#D4AF37] font-normal text-lg">({activeRegion.sinhalaName})</span>
            </h2>
            <div className="h-0.5 w-16 bg-gradient-to-r from-[#D4AF37] to-transparent mb-4" />

            <div className="space-y-4 text-xs">
              <div>
                <span className="font-semibold text-[#D4AF37] block uppercase tracking-wider text-[10px] mb-1">
                  Primary Gemstone Species Yielded
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeRegion.primaryGems.map((gem, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-[#D4AF37]/15 text-[#F3E5AB] border border-[#D4AF37]/30">
                      {gem}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-semibold text-[#D4AF37] block uppercase tracking-wider text-[10px] mb-1">
                  Alluvial Stratigraphy & Geological Formation
                </span>
                <p className="text-[#CBD5E1] leading-relaxed">
                  {activeRegion.geologyType}
                </p>
              </div>

              <div>
                <span className="font-semibold text-[#D4AF37] block uppercase tracking-wider text-[10px] mb-1">
                  Artisanal Extraction Methodology
                </span>
                <p className="text-[#CBD5E1] leading-relaxed">
                  {activeRegion.traditionalMethods}
                </p>
              </div>

              <div>
                <span className="font-semibold text-[#D4AF37] block uppercase tracking-wider text-[10px] mb-1">
                  Historical Significance
                </span>
                <p className="text-[#94A3B8] leading-relaxed">
                  {activeRegion.historySummary}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#F3E5AB] font-semibold block text-[11px]">Provenance Chain of Custody</span>
                  <span className="text-[#CBD5E1] text-[11px]">{activeRegion.traceabilityStatus}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-lg gold-gradient-btn text-xs font-bold"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
