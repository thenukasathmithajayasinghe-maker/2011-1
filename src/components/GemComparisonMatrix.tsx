import React from 'react';
import { Gemstone } from '../data/gemsData';
import { Scale, X, Sparkles, Plus, AlertCircle, Check } from 'lucide-react';

interface GemComparisonMatrixProps {
  comparedGems: Gemstone[];
  onRemoveGem: (gemId: string) => void;
  onClearAll: () => void;
  onOpenSelector: () => void;
  onSelectGemModal: (gem: Gemstone) => void;
}

export const GemComparisonMatrix: React.FC<GemComparisonMatrixProps> = ({
  comparedGems,
  onRemoveGem,
  onClearAll,
  onOpenSelector,
  onSelectGemModal
}) => {
  if (comparedGems.length === 0) {
    return (
      <div className="w-full rounded-3xl glass-panel-elevated border border-[#D4AF37]/30 p-8 text-center space-y-4">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
          <Scale className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-heading font-bold text-white">Multi-Gem Scientific Comparison Matrix</h3>
        <p className="text-xs text-[#94A3B8] max-w-md mx-auto">
          Select between 2 and 4 gemstones from the encyclopedia to perform side-by-side scientific comparisons of Mohs hardness, refractive index, crystal lattice systems, and diagnostic inclusion benchmarks.
        </p>
        <button
          type="button"
          onClick={onOpenSelector}
          className="px-5 py-2.5 rounded-xl gold-gradient-btn text-xs font-bold inline-flex items-center gap-1.5 shadow-lg"
        >
          <Plus className="w-4 h-4" /> Add Gemstones to Compare
        </button>
      </div>
    );
  }

  return (
    <div className="w-full rounded-3xl glass-panel-elevated border border-[#D4AF37]/30 p-6 space-y-6 text-white shadow-2xl">
      <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-[#D4AF37]/20">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase flex items-center gap-1">
            <Scale className="w-3.5 h-3.5" /> Side-by-Side Crystallographic & Optical Analysis
          </span>
          <h2 className="text-2xl font-heading font-bold text-white tracking-wide">
            Gemstone Comparison Matrix ({comparedGems.length} / 4)
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {comparedGems.length < 4 && (
            <button
              type="button"
              onClick={onOpenSelector}
              className="px-3.5 py-1.5 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#F3E5AB] border border-[#D4AF37]/30 text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Another
            </button>
          )}
          <button
            type="button"
            onClick={onClearAll}
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#94A3B8] text-xs font-semibold"
          >
            Clear Matrix
          </button>
        </div>
      </div>

      {/* Comparison Table Grid */}
      <div className="overflow-x-auto pb-4">
        <table className="w-full text-left text-xs border-collapse min-w-[700px]">
          <thead>
            <tr>
              <th className="p-3 bg-[#0D1016] text-[#94A3B8] font-mono text-[11px] uppercase w-48 border-b border-[#D4AF37]/20">
                Scientific Metric
              </th>
              {comparedGems.map((gem) => (
                <th
                  key={gem.id}
                  className="p-3 bg-[#141824] border-b border-[#D4AF37]/20 min-w-[200px]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-[#D4AF37] font-mono block uppercase">
                        {gem.group}
                      </span>
                      <button
                        type="button"
                        onClick={() => onSelectGemModal(gem)}
                        className="text-sm font-heading font-bold text-white hover:text-[#D4AF37] text-left"
                      >
                        {gem.name}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveGem(gem.id)}
                      className="p-1 rounded-full text-[#94A3B8] hover:text-white hover:bg-white/10"
                      title="Remove"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {/* Visual Cut Thumbnail */}
            <tr>
              <td className="p-3 font-semibold text-[#CBD5E1]">Specimen Preview</td>
              {comparedGems.map((gem) => (
                <td key={gem.id} className="p-3">
                  <div 
                    onClick={() => onSelectGemModal(gem)}
                    className="w-20 h-20 rounded-xl overflow-hidden border border-[#D4AF37]/30 cursor-pointer hover:border-[#D4AF37] group relative"
                  >
                    <img src={gem.images.faceted} alt={gem.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                </td>
              ))}
            </tr>

            {/* Chemical Formula */}
            <tr>
              <td className="p-3 font-semibold text-[#CBD5E1]">Chemical Formula</td>
              {comparedGems.map((gem) => (
                <td key={gem.id} className="p-3 font-mono text-white text-[11px]">
                  {gem.chemicalFormula}
                </td>
              ))}
            </tr>

            {/* Crystal System */}
            <tr>
              <td className="p-3 font-semibold text-[#CBD5E1]">Crystal Lattice System</td>
              {comparedGems.map((gem) => (
                <td key={gem.id} className="p-3 text-[#F3E5AB] font-bold">
                  {gem.crystalSystem}
                </td>
              ))}
            </tr>

            {/* Mohs Hardness */}
            <tr>
              <td className="p-3 font-semibold text-[#CBD5E1]">Mohs Hardness</td>
              {comparedGems.map((gem) => (
                <td key={gem.id} className="p-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white text-sm">{gem.hardness}</span>
                    <div className="flex-1 max-w-[100px] bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] h-full"
                        style={{ width: `${(gem.hardness / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
              ))}
            </tr>

            {/* Refractive Index */}
            <tr>
              <td className="p-3 font-semibold text-[#CBD5E1]">Refractive Index (RI)</td>
              {comparedGems.map((gem) => (
                <td key={gem.id} className="p-3 font-mono text-white">
                  {gem.refractiveIndex.min.toFixed(3)} - {gem.refractiveIndex.max.toFixed(3)}
                  <span className="text-[10px] text-[#94A3B8] block">Δ {gem.birefringence.toFixed(3)}</span>
                </td>
              ))}
            </tr>

            {/* Specific Gravity */}
            <tr>
              <td className="p-3 font-semibold text-[#CBD5E1]">Specific Gravity (Density)</td>
              {comparedGems.map((gem) => (
                <td key={gem.id} className="p-3 font-mono text-white">
                  {gem.specificGravity.toFixed(2)} g/cm³
                </td>
              ))}
            </tr>

            {/* Optical Character */}
            <tr>
              <td className="p-3 font-semibold text-[#CBD5E1]">Optical Character</td>
              {comparedGems.map((gem) => (
                <td key={gem.id} className="p-3 text-[#CBD5E1]">
                  {gem.opticalCharacter}
                </td>
              ))}
            </tr>

            {/* Pleochroism */}
            <tr>
              <td className="p-3 font-semibold text-[#CBD5E1]">Pleochroic Axes</td>
              {comparedGems.map((gem) => (
                <td key={gem.id} className="p-3 text-[11px] text-[#CBD5E1]">
                  <span className="text-[#D4AF37] block font-medium">{gem.pleochroism.type}</span>
                  {gem.pleochroism.colors.join(' / ')}
                </td>
              ))}
            </tr>

            {/* Sri Lankan Provenance */}
            <tr>
              <td className="p-3 font-semibold text-[#CBD5E1]">Sri Lankan Provenance</td>
              {comparedGems.map((gem) => (
                <td key={gem.id} className="p-3">
                  {gem.originSriLankan ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#50C878]/20 text-[#50C878] border border-[#50C878]/40">
                      Yes ({gem.sriLankaRegions.join(', ')})
                    </span>
                  ) : (
                    <span className="text-[#94A3B8] text-[11px]">Global Exotic</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Value Tier */}
            <tr>
              <td className="p-3 font-semibold text-[#CBD5E1]">Rarity & Valuation Tier</td>
              {comparedGems.map((gem) => (
                <td key={gem.id} className="p-3">
                  <span className="font-bold text-[#F3E5AB] block">{gem.rarity}</span>
                  <span className="text-[#D4AF37] text-[11px] font-mono">{gem.priceEstimateTier} Tier</span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
