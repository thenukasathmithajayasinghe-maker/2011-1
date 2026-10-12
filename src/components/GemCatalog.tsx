import React, { useState, useMemo } from 'react';
import { GEMS_DATABASE, Gemstone } from '../data/gemsData';
import { Search, SlidersHorizontal, RotateCcw, MapPin, Sparkles, Scale, Check, ChevronRight, ShieldCheck, Eye } from 'lucide-react';

interface GemCatalogProps {
  onSelectGem: (gem: Gemstone) => void;
  onToggleCompare: (gem: Gemstone) => void;
  comparedIds: string[];
}

export const GemCatalog: React.FC<GemCatalogProps> = ({
  onSelectGem,
  onToggleCompare,
  comparedIds
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('All');
  const [selectedTreatment, setSelectedTreatment] = useState<string>('All');
  const [minHardness, setMinHardness] = useState<number>(1.0);
  const [maxHardness, setMaxHardness] = useState<number>(10.0);
  const [minRI, setMinRI] = useState<number>(1.30);
  const [maxRI, setMaxRI] = useState<number>(2.80);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  // Groups list for dropdown
  const allGroups = useMemo(() => {
    const set = new Set(GEMS_DATABASE.map(g => g.group));
    return ['All', ...Array.from(set)];
  }, []);

  // Filter logic
  const filteredGems = useMemo(() => {
    return GEMS_DATABASE.filter(gem => {
      // Search query (name, species, variety, regions, trade names)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = gem.name.toLowerCase().includes(q);
        const matchesSpecies = gem.species.toLowerCase().includes(q);
        const matchesVariety = gem.variety.toLowerCase().includes(q);
        const matchesTrade = gem.tradeNames.some(t => t.toLowerCase().includes(q));
        const matchesRegions = gem.sriLankaRegions.some(r => r.toLowerCase().includes(q));
        if (!matchesName && !matchesSpecies && !matchesVariety && !matchesTrade && !matchesRegions) {
          return false;
        }
      }

      // Group filter
      if (selectedGroup !== 'All' && gem.group !== selectedGroup) {
        return false;
      }

      // Origin filter
      if (selectedOrigin === 'Sri Lanka' && !gem.originSriLankan) {
        return false;
      }
      if (selectedOrigin === 'Global' && gem.originSriLankan) {
        return false;
      }

      // Treatment filter
      if (selectedTreatment !== 'All' && gem.treatmentStatus !== selectedTreatment) {
        return false;
      }

      // Hardness Range
      if (gem.hardness < minHardness || gem.hardness > maxHardness) {
        return false;
      }

      // Refractive Index Range
      if (gem.refractiveIndex.max < minRI || gem.refractiveIndex.min > maxRI) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedGroup, selectedOrigin, selectedTreatment, minHardness, maxHardness, minRI, maxRI]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGroup('All');
    setSelectedOrigin('All');
    setSelectedTreatment('All');
    setMinHardness(1.0);
    setMaxHardness(10.0);
    setMinRI(1.30);
    setMaxRI(2.80);
  };

  const isFiltered = searchQuery || selectedGroup !== 'All' || selectedOrigin !== 'All' || selectedTreatment !== 'All' || minHardness > 1.0 || maxHardness < 10.0 || minRI > 1.30 || maxRI < 2.80;

  return (
    <div className="w-full space-y-6">
      {/* Search & Quick Filter Controls Bar */}
      <div className="p-4 sm:p-5 rounded-2xl glass-panel-elevated border border-[#D4AF37]/30 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Real-time search box */}
          <div className="relative w-full md:flex-1">
            <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by gemstone name, variety, region (e.g. Ratnapura, Padparadscha, Alexandrite)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0D1016] border border-[#D4AF37]/25 text-white placeholder-[#64748B] text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
            />
          </div>

          {/* Buttons: Toggle Range Sliders & Reset */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              type="button"
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                showFiltersPanel
                  ? 'bg-[#D4AF37] text-black border-[#FFF6D6]'
                  : 'bg-white/5 text-[#CBD5E1] border-white/10 hover:text-white hover:border-[#D4AF37]/40'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Scientific Filters</span>
              {isFiltered && <span className="w-2 h-2 rounded-full bg-[#E0115F]" />}
            </button>

            {isFiltered && (
              <button
                type="button"
                onClick={resetFilters}
                className="px-3 py-2.5 rounded-xl bg-white/5 text-[#94A3B8] hover:text-white text-xs flex items-center gap-1"
                title="Reset Filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Dropdown Select Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs pt-1">
          <div>
            <label className="text-[10px] text-[#94A3B8] uppercase block mb-1">Mineral Group</label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full px-2.5 py-2 rounded-xl bg-[#0D1016] border border-[#D4AF37]/20 text-[#F3E5AB] focus:outline-none focus:border-[#D4AF37]"
            >
              {allGroups.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] text-[#94A3B8] uppercase block mb-1">Provenance Filter</label>
            <select
              value={selectedOrigin}
              onChange={(e) => setSelectedOrigin(e.target.value)}
              className="w-full px-2.5 py-2 rounded-xl bg-[#0D1016] border border-[#D4AF37]/20 text-[#F3E5AB] focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="All">All Provenances</option>
              <option value="Sri Lanka">Sri Lankan (Ceylon Only)</option>
              <option value="Global">Global Localities</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] text-[#94A3B8] uppercase block mb-1">Treatment Classification</label>
            <select
              value={selectedTreatment}
              onChange={(e) => setSelectedTreatment(e.target.value)}
              className="w-full px-2.5 py-2 rounded-xl bg-[#0D1016] border border-[#D4AF37]/20 text-[#F3E5AB] focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="All">All Statuses</option>
              <option value="Natural Unheated">Natural Unheated Only</option>
              <option value="Heated">Heated</option>
              <option value="Untreated">Untreated (Natural)</option>
              <option value="Synthetic">Synthetic Reference</option>
            </select>
          </div>

          <div className="flex items-end">
            <div className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-[#D4AF37]/15 text-[11px] text-[#94A3B8] flex items-center justify-between">
              <span>Matching Records:</span>
              <span className="font-mono font-bold text-[#F3E5AB]">{filteredGems.length}</span>
            </div>
          </div>
        </div>

        {/* Collapsible Scientific Range Sliders Panel */}
        {showFiltersPanel && (
          <div className="p-4 rounded-xl bg-[#0D1016] border border-[#D4AF37]/25 space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {/* Mohs Hardness Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[#94A3B8] font-semibold">
                    Mohs Hardness Range:
                  </span>
                  <span className="font-mono text-[#F3E5AB]">
                    {minHardness.toFixed(1)} — {maxHardness.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1.0"
                    max="10.0"
                    step="0.5"
                    value={minHardness}
                    onChange={(e) => setMinHardness(Math.min(parseFloat(e.target.value), maxHardness - 0.5))}
                    className="w-full accent-[#D4AF37]"
                  />
                  <input
                    type="range"
                    min="1.0"
                    max="10.0"
                    step="0.5"
                    value={maxHardness}
                    onChange={(e) => setMaxHardness(Math.max(parseFloat(e.target.value), minHardness + 0.5))}
                    className="w-full accent-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Refractive Index Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[#94A3B8] font-semibold">
                    Refractive Index (RI) Range:
                  </span>
                  <span className="font-mono text-[#F3E5AB]">
                    {minRI.toFixed(2)} — {maxRI.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1.30"
                    max="2.80"
                    step="0.05"
                    value={minRI}
                    onChange={(e) => setMinRI(Math.min(parseFloat(e.target.value), maxRI - 0.05))}
                    className="w-full accent-[#D4AF37]"
                  />
                  <input
                    type="range"
                    min="1.30"
                    max="2.80"
                    step="0.05"
                    value={maxRI}
                    onChange={(e) => setMaxRI(Math.max(parseFloat(e.target.value), minRI + 0.05))}
                    className="w-full accent-[#D4AF37]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Gemstone Grid */}
      {filteredGems.length === 0 ? (
        <div className="p-12 text-center rounded-2xl glass-panel border border-[#D4AF37]/20 text-white space-y-3">
          <p className="text-base text-[#CBD5E1]">No gemstones found matching the current scientific criteria.</p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl gold-gradient-btn text-xs font-bold"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGems.map((gem) => {
            const isCompared = comparedIds.includes(gem.id);
            return (
              <div
                key={gem.id}
                className="group rounded-2xl glass-panel-elevated border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-[0_10px_35px_-5px_rgba(212,175,55,0.15)] transform hover:-translate-y-1"
              >
                <div>
                  {/* Photo with Overlay Badges */}
                  <div className="relative w-full h-52 bg-[#050608] overflow-hidden">
                    <img
                      src={gem.images.faceted}
                      alt={gem.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1016] via-transparent to-black/30 pointer-events-none" />

                    {/* Top Region or Origin Tag */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg glass-panel text-[11px] text-[#F3E5AB]">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" />
                      <span>{gem.originSriLankan ? gem.sriLankaRegions[0] || 'Sri Lanka' : gem.globalOrigins[0]}</span>
                    </div>

                    {/* Badge */}
                    {gem.badge && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/40 backdrop-blur-md">
                        {gem.badge}
                      </div>
                    )}

                    {/* Quick Carat & Certified Tag */}
                    <div className="absolute bottom-2.5 left-3 text-xs text-white">
                      <span className="font-mono text-[#F3E5AB] font-bold">{gem.caratDefault}ct</span>
                      <span className="text-[#94A3B8] text-[10px] ml-1.5">GIA / GCIA Calibrated</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block">
                        {gem.group} • {gem.variety}
                      </span>
                      <h3 className="text-lg font-heading font-bold text-white group-hover:text-[#F3E5AB] transition-colors leading-snug">
                        {gem.name}
                      </h3>
                    </div>

                    {/* Scientific Fast Stats Strip */}
                    <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/5 text-[11px]">
                      <div>
                        <span className="text-[#94A3B8] text-[9.5px] block">Hardness</span>
                        <span className="font-mono font-bold text-white">{gem.hardness}</span>
                      </div>
                      <div>
                        <span className="text-[#94A3B8] text-[9.5px] block">Refractive Index</span>
                        <span className="font-mono font-bold text-white">{gem.refractiveIndex.min.toFixed(3)}</span>
                      </div>
                      <div>
                        <span className="text-[#94A3B8] text-[9.5px] block">System</span>
                        <span className="font-bold text-[#F3E5AB] truncate block">{gem.crystalSystem}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-[#94A3B8] line-clamp-2 leading-relaxed">
                      {gem.valueFactors.color}
                    </p>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-5 pt-0 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectGem(gem)}
                    className="flex-1 py-2 px-3 rounded-xl gold-gradient-btn text-xs font-bold flex items-center justify-center gap-1 shadow-md"
                  >
                    <span>Examine Dossier</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleCompare(gem)}
                    title={isCompared ? 'Remove from compare' : 'Add to comparison matrix'}
                    className={`p-2 rounded-xl border transition-colors ${
                      isCompared
                        ? 'bg-[#50C878]/20 border-[#50C878] text-[#50C878]'
                        : 'bg-[#141824] border-white/10 text-[#94A3B8] hover:text-white hover:border-[#D4AF37]/40'
                    }`}
                  >
                    {isCompared ? <Check className="w-4 h-4" /> : <Scale className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
