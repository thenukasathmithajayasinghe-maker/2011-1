import React, { useState } from 'react';
import { Gemstone } from '../data/gemsData';
import { X, Sparkles, Shield, Microscope, Compass, Award, ExternalLink, Check, Scale, Eye, Activity, MapPin } from 'lucide-react';

interface GemDetailModalProps {
  gem: Gemstone | null;
  onClose: () => void;
  onAddToComparison?: (gem: Gemstone) => void;
  isCompared?: boolean;
}

export const GemDetailModal: React.FC<GemDetailModalProps> = ({
  gem,
  onClose,
  onAddToComparison,
  isCompared = false
}) => {
  const [activePhotoTab, setActivePhotoTab] = useState<'faceted' | 'rough' | 'microscopic' | 'spectrum'>('faceted');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!gem) return null;

  const photoLabels = {
    faceted: { label: 'Cut & Polished', desc: 'Precision Lapidary Faceting' },
    rough: { label: 'Rough Matrix', desc: 'Natural Uncut Crystal State' },
    microscopic: { label: 'Microscopic Detail', desc: 'Diagnostic Mineral Inclusions' },
    spectrum: { label: 'Lab Spectrogram', desc: 'UV Luminescence & Spectroscopy' }
  };

  const currentImageUrl = gem.images[activePhotoTab] || gem.images.faceted;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl my-auto rounded-3xl glass-panel-elevated border border-[#D4AF37]/40 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D4AF37]/20 bg-[#0D1016]/90 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase">
                  {gem.group} • {gem.variety}
                </span>
                {gem.badge && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/40">
                    {gem.badge}
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-wide">
                {gem.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onAddToComparison && (
              <button
                type="button"
                onClick={() => onAddToComparison(gem)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isCompared
                    ? 'bg-[#50C878]/20 text-[#50C878] border border-[#50C878]/40'
                    : 'bg-[#D4AF37]/15 text-[#F3E5AB] hover:bg-[#D4AF37]/25 border border-[#D4AF37]/30'
                }`}
              >
                {isCompared ? <Check className="w-3.5 h-3.5" /> : <Scale className="w-3.5 h-3.5" />}
                {isCompared ? 'In Compare' : 'Compare'}
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Section: Multi-Photo 4-View CDN + Fast Identification Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Multi-Photo CDN Gallery (7 cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-3">
              {/* Main Photo Display with Lightbox Trigger */}
              <div 
                className="relative w-full h-72 sm:h-84 rounded-2xl overflow-hidden border border-[#D4AF37]/30 bg-[#050608] group cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src={currentImageUrl}
                  alt={gem.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/90 via-transparent to-black/20 pointer-events-none" />

                {/* Photo Tag Overlay */}
                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg glass-panel text-xs text-white">
                  <span className="font-semibold text-[#D4AF37] block">
                    {photoLabels[activePhotoTab].label}
                  </span>
                  <span className="text-[10px] text-[#CBD5E1]">
                    {photoLabels[activePhotoTab].desc}
                  </span>
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md glass-panel text-[10px] text-[#F3E5AB] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3 h-3" /> Click to Expand
                </div>
              </div>

              {/* 4-View Selector Tabs */}
              <div className="grid grid-cols-4 gap-2">
                {(['faceted', 'rough', 'microscopic', 'spectrum'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActivePhotoTab(tab)}
                    className={`p-2 rounded-xl text-left border transition-all ${
                      activePhotoTab === tab
                        ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-md'
                        : 'bg-[#0D1016]/80 border-[#D4AF37]/15 text-[#94A3B8] hover:text-white hover:border-[#D4AF37]/30'
                    }`}
                  >
                    <span className="block text-[11px] font-bold truncate">
                      {photoLabels[tab].label}
                    </span>
                    <span className="block text-[9px] text-[#94A3B8] truncate hidden sm:block">
                      View 0{['faceted', 'rough', 'microscopic', 'spectrum'].indexOf(tab) + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Identification Key Matrix (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4 rounded-2xl glass-panel p-5 border border-[#D4AF37]/20">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] mb-3 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> Gemological Identity Parameters
                </h3>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[#94A3B8] block text-[10px]">Chemical Formula</span>
                    <span className="font-semibold text-white font-mono text-[11px] break-words">
                      {gem.chemicalFormula}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[#94A3B8] block text-[10px]">Crystal System</span>
                    <span className="font-semibold text-[#F3E5AB] font-mono text-[11px]">
                      {gem.crystalSystem}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[#94A3B8] block text-[10px]">Treatment Status</span>
                    <span className={`font-semibold text-[11px] ${
                      gem.treatmentStatus === 'Natural Unheated' ? 'text-[#50C878]' : 'text-[#F3E5AB]'
                    }`}>
                      {gem.treatmentStatus}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[#94A3B8] block text-[10px]">Optical Character</span>
                    <span className="font-semibold text-white text-[11px]">
                      {gem.opticalCharacter}
                    </span>
                  </div>
                </div>

                {/* Trade Names / Synonyms */}
                <div className="mt-3">
                  <span className="text-[10px] text-[#94A3B8] block mb-1">Recognized Trade & Historic Names</span>
                  <div className="flex flex-wrap gap-1">
                    {gem.tradeNames.map((name, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-[#D4AF37]/10 text-[#F3E5AB]">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Certification & Provenance Badge */}
              <div className="p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-semibold text-[#F3E5AB]">Laboratory Verification</span>
                </div>
                <p className="text-[11px] text-[#CBD5E1]">
                  {gem.certifiedBy}
                </p>
                {gem.originSriLankan && (
                  <div className="mt-2 flex items-center gap-1.5 text-[10px] text-[#D4AF37]">
                    <MapPin className="w-3 h-3" /> Sri Lankan Mining Hubs: {gem.sriLankaRegions.join(', ')}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 2: Deep Scientific Diagnostic Grid */}
          <div className="rounded-2xl glass-panel p-5 border border-[#D4AF37]/20 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" /> Interactive Scientific Diagnostic Grid
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
              {/* Mohs Hardness with Visual 1-10 Meter */}
              <div className="p-3 rounded-xl bg-[#0D1016] border border-[#D4AF37]/15">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[#94A3B8] text-[11px]">Mohs Hardness</span>
                  <span className="font-bold text-[#F3E5AB] font-mono text-sm">{gem.hardness} / 10</span>
                </div>
                {/* Meter Bar */}
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-1.5">
                  <div
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] rounded-full transition-all duration-1000"
                    style={{ width: `${(gem.hardness / 10) * 100}%` }}
                  />
                </div>
                <span className="text-[9.5px] text-[#94A3B8] block mt-1">
                  {gem.hardness >= 9 ? 'Diamond/Corundum tier scratch resistance' : gem.hardness >= 8 ? 'Exceptional daily wear durability' : 'Moderate hardness; set with care'}
                </span>
              </div>

              {/* Specific Gravity (Density) */}
              <div className="p-3 rounded-xl bg-[#0D1016] border border-[#D4AF37]/15">
                <span className="text-[#94A3B8] text-[11px] block">Specific Gravity</span>
                <span className="font-bold text-[#F3E5AB] font-mono text-sm block my-0.5">
                  {gem.specificGravity.toFixed(2)} g/cm³
                </span>
                <span className="text-[9.5px] text-[#94A3B8]">
                  Hydrostatic balance immersion verification
                </span>
              </div>

              {/* Refractive Index */}
              <div className="p-3 rounded-xl bg-[#0D1016] border border-[#D4AF37]/15">
                <span className="text-[#94A3B8] text-[11px] block">Refractive Index (RI)</span>
                <span className="font-bold text-[#F3E5AB] font-mono text-sm block my-0.5">
                  {gem.refractiveIndex.min.toFixed(3)} - {gem.refractiveIndex.max.toFixed(3)}
                </span>
                <span className="text-[9.5px] text-[#94A3B8]">
                  Birefringence: Δ {gem.birefringence.toFixed(3)}
                </span>
              </div>

              {/* Dispersion & Luster */}
              <div className="p-3 rounded-xl bg-[#0D1016] border border-[#D4AF37]/15">
                <span className="text-[#94A3B8] text-[11px] block">Luster & Dispersion</span>
                <span className="font-bold text-white text-xs block my-0.5 truncate">
                  {gem.luster}
                </span>
                <span className="text-[9.5px] text-[#94A3B8]">
                  Dispersion (Fire): {gem.dispersion.toFixed(3)}
                </span>
              </div>
            </div>

            {/* Pleochroism & Cleavage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#0D1016] border border-[#D4AF37]/15">
                <span className="text-[#D4AF37] font-semibold text-[11px] block mb-1">
                  Pleochroism & Optical Axes ({gem.pleochroism.type})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {gem.pleochroism.colors.map((c, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white/5 text-[#CBD5E1] text-[10px] border border-white/5">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0D1016] border border-[#D4AF37]/15">
                <span className="text-[#D4AF37] font-semibold text-[11px] block mb-1">
                  Cleavage & Fracture
                </span>
                <p className="text-[11px] text-[#CBD5E1]">
                  <strong>Cleavage:</strong> {gem.cleavage} | <strong>Fracture:</strong> {gem.fracture}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 3: Microscopic Inclusions & Treatment Detection Guide */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Microscopic Inclusions */}
            <div className="rounded-2xl glass-panel p-5 border border-[#D4AF37]/20 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                <Microscope className="w-3.5 h-3.5" /> Diagnostic Microscopic Inclusions
              </h3>
              <ul className="space-y-2 text-xs text-[#CBD5E1]">
                {gem.diagnosticInclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
              <div className="p-2.5 rounded-xl bg-white/5 text-[11px] text-[#F3E5AB] border border-[#D4AF37]/20">
                <strong>Microscopic Clue:</strong> {gem.microscopicClues}
              </div>
            </div>

            {/* Treatments & Enhancement Guide */}
            <div className="rounded-2xl glass-panel p-5 border border-[#D4AF37]/20 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> Treatments & Detectability Guide
              </h3>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                {gem.treatmentsGuide}
              </p>
              <div className="pt-2 border-t border-white/10">
                <span className="text-[10px] text-[#94A3B8] block mb-1">Global Producing Localities</span>
                <p className="text-xs text-white font-medium">
                  {gem.globalOrigins.join(' • ')}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 4: 4Cs Value Factors Breakdown */}
          <div className="rounded-2xl glass-panel p-5 border border-[#D4AF37]/20 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Appraisal & 4Cs Valuation Factors
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#0D1016] border border-white/5">
                <span className="text-[#D4AF37] font-semibold block text-[11px]">Color (Hue/Tone/Saturation)</span>
                <p className="text-[11px] text-[#CBD5E1] mt-1">{gem.valueFactors.color}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#0D1016] border border-white/5">
                <span className="text-[#D4AF37] font-semibold block text-[11px]">Clarity Grade</span>
                <p className="text-[11px] text-[#CBD5E1] mt-1">{gem.valueFactors.clarity}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#0D1016] border border-white/5">
                <span className="text-[#D4AF37] font-semibold block text-[11px]">Cut & Scintillation</span>
                <p className="text-[11px] text-[#CBD5E1] mt-1">{gem.valueFactors.cut}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#0D1016] border border-white/5">
                <span className="text-[#D4AF37] font-semibold block text-[11px]">Origin Premium</span>
                <p className="text-[11px] text-[#CBD5E1] mt-1">{gem.valueFactors.originPremium}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-[#D4AF37]/20 bg-[#0D1016]/95 flex items-center justify-between shrink-0">
          <div className="text-xs text-[#94A3B8]">
            Reference ID: <span className="font-mono text-white">{gem.id}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#CBD5E1] hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                alert(`Inquiry initiated for ${gem.name} (${gem.caratDefault}ct). A GIA certified gemologist from THENUKA SATHMITHA GEMS will assist you.`);
              }}
              className="px-5 py-2 rounded-xl gold-gradient-btn text-xs font-bold"
            >
              Request Acquisition Dossier
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightboxOpen(false)}
        >
          <img
            src={currentImageUrl}
            alt={gem.name}
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl border border-[#D4AF37]/50"
          />
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
