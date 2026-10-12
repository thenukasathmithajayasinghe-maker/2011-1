import React, { useState } from 'react';
import { Briefcase, FileText, CheckCircle2, Copy, Check, Sparkles, Download, ArrowRight, UserCheck } from 'lucide-react';

export const RecruitmentSandbox: React.FC = () => {
  const [roleTitle, setRoleTitle] = useState('Senior Gemologist & Ceylon Corundum Appraiser');
  const [seniority, setSeniority] = useState('Senior');
  const [rawNotes, setRawNotes] = useState(
`Need a senior gemologist based in Ratnapura / Colombo for THENUKA SATHMITHA GEMS.
Must have GIA GG, FGA, or equivalent.
Minimum 6+ years evaluating unheated sapphires, rubies, and chrysoberyls.
Deep expertise with refractometers, Raman spectroscopy, immersion microscopes to detect Be-diffusion and melted rutile silk.
Must be comfortable negotiating with artisanal miners in Ratnapura and Pelmadulla.
Need someone fluent in English and Sinhala.
Soft skills: Extreme ethical integrity, dispute resolution when miners disagree on grade, high-pressure luxury client presentations.
Package: $85k-$120k + performance bonus, housing stipend in Ratnapura, comprehensive health & international trade travel allowance.`
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'both' | 'jd' | 'interview'>('both');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const presets = [
    {
      title: 'Senior Gemologist & Ceylon Corundum Appraiser',
      seniority: 'Senior',
      notes: `Need a senior gemologist based in Ratnapura / Colombo for THENUKA SATHMITHA GEMS.
Must have GIA GG, FGA, or equivalent.
Minimum 6+ years evaluating unheated sapphires, rubies, and chrysoberyls.
Deep expertise with refractometers, Raman spectroscopy, immersion microscopes to detect Be-diffusion and melted rutile silk.
Must be comfortable negotiating with artisanal miners in Ratnapura and Pelmadulla.
Need someone fluent in English and Sinhala.
Soft skills: Extreme ethical integrity, dispute resolution when miners disagree on grade, high-pressure luxury client presentations.
Package: $85k-$120k + performance bonus, housing stipend in Ratnapura, comprehensive health & international trade travel allowance.`
    },
    {
      title: 'Master Lapidary & Faceting Artisan',
      seniority: 'Lead',
      notes: `Hiring a master gemstone cutter/faceter for our high-jewelry atelier.
10+ years precision concave & custom Portuguese/brilliant faceting on high-value rough (10ct+ sapphires).
Knowledge of optical axes to preserve color orientation in dichroic corundum (table alignment to c-axis).
Patience, attention to micron tolerance, zero-error tolerance with $50k+ raw stones.
Mentoring apprentice cutters and collaborating with CAD jewelry designers.`
    },
    {
      title: 'Luxury Client Advisor & Private Curator',
      seniority: 'Executive',
      notes: `Private client sales director for ultra-high-net-worth collectors in Geneva, Dubai, and Singapore.
Proven track record closing $100k-$1M+ certified colored gemstone acquisitions.
Fluent in gemological storytelling (Ceylon historical provenance, unheated scarcity, auction trends).
Discreet, impeccable presentation, active black-book of gemstone investors.`
    }
  ];

  const handleGenerate = async () => {
    if (!rawNotes.trim()) return;
    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/gemini/recruitment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawNotes,
          roleTitle,
          seniority
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate recruitment sandbox outputs.');
      }

      setGeneratedOutput(data.output);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error communicating with recruitment generation engine.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  // Split generated output into JD and Interview Guide if available
  const splitSections = () => {
    if (!generatedOutput) return { jd: '', interview: '' };
    const parts = generatedOutput.split(/#+\s*SECTION\s*2/i);
    const jd = parts[0] || '';
    const interview = parts[1] ? `# SECTION 2${parts[1]}` : '';
    return { jd, interview };
  };

  const { jd, interview } = splitSections();

  return (
    <div className="w-full rounded-3xl glass-panel-elevated border border-[#D4AF37]/30 shadow-2xl p-6 sm:p-8 text-white space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D4AF37]/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-1">
            <Briefcase className="w-4 h-4" /> Autonomous Talent Acquisition Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-wide">
            Recruitment Sandbox
          </h2>
          <p className="text-xs text-[#CBD5E1] mt-1 max-w-2xl leading-relaxed">
            Convert unstructured rough hiring notes into a pristine, high-conversion <strong className="text-[#D4AF37]">LinkedIn Job Description</strong> and an exhaustive <strong className="text-[#D4AF37]">10-Question Behavioral Interview Guide</strong> targeting exact soft and hard skill proficiencies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#D4AF37]/15 text-[#F3E5AB] border border-[#D4AF37]/30 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> AI Recruitment Engine
          </span>
        </div>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Config Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quick Preset Buttons */}
          <div>
            <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-2">
              Select Role Template / Benchmark
            </label>
            <div className="space-y-1.5">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setRoleTitle(p.title);
                    setSeniority(p.seniority);
                    setRawNotes(p.notes);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-all border ${
                    roleTitle === p.title
                      ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-md'
                      : 'bg-[#141824] border-white/5 text-[#94A3B8] hover:text-white hover:border-[#D4AF37]/30'
                  }`}
                >
                  <span className="font-bold block text-[#F3E5AB]">{p.title}</span>
                  <span className="text-[10px] text-[#94A3B8]">{p.seniority} Level Profile</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[11px] text-[#94A3B8] block mb-1">Target Role Title</label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-[#D4AF37]/30 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#94A3B8] block mb-1">Seniority Tier</label>
              <select
                value={seniority}
                onChange={(e) => setSeniority(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-[#D4AF37]/30 text-[#F3E5AB] text-xs focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Associate">Associate / Junior</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior">Senior Specialist</option>
                <option value="Lead">Lead / Master Artisan</option>
                <option value="Executive">Executive / Director</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Raw Notes Input Area (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-3">
          <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block">
            Raw Role Notes & Requirements (Paste unformatted thoughts)
          </label>
          <textarea
            rows={10}
            value={rawNotes}
            onChange={(e) => setRawNotes(e.target.value)}
            placeholder="Enter raw notes about required certifications, years of experience, laboratory equipment, languages, daily responsibilities, compensation, and soft skills..."
            className="w-full flex-1 p-4 rounded-2xl bg-[#0D1016] border border-[#D4AF37]/30 text-white text-xs leading-relaxed focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] placeholder-[#64748B] resize-y font-mono"
          />

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-[#94A3B8]">
              Generates: 1) LinkedIn JD + 2) 10-Question Behavioral Guide
            </span>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || !rawNotes.trim()}
              className="px-6 py-2.5 rounded-xl gold-gradient-btn text-xs font-bold flex items-center gap-2 shadow-lg disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing Recruitment Package...</span>
                </>
              ) : (
                <>
                  <span>Generate Complete Recruitment Package</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs">
          {errorMessage}
        </div>
      )}

      {/* Generated Outputs Display */}
      {generatedOutput && (
        <div className="mt-8 pt-8 border-t border-[#D4AF37]/20 space-y-4 animate-fade-in">
          {/* Action Header & Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#141824] border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('both')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === 'both' ? 'bg-[#D4AF37] text-black' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Full Package
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('jd')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === 'jd' ? 'bg-[#D4AF37] text-black' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                1) LinkedIn JD
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('interview')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === 'interview' ? 'bg-[#D4AF37] text-black' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                2) Interview Guide (10 Questions)
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleCopy(generatedOutput, 'all')}
                className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#CBD5E1] flex items-center gap-1.5"
              >
                {copiedType === 'all' ? <Check className="w-3.5 h-3.5 text-[#50C878]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'all' ? 'Copied Full Output!' : 'Copy All'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const blob = new Blob([generatedOutput], { type: 'text/markdown' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${roleTitle.replace(/\s+/g, '_')}_Recruitment_Package.md`;
                  a.click();
                }}
                className="px-3.5 py-1.5 rounded-xl gold-gradient-btn text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Markdown</span>
              </button>
            </div>
          </div>

          {/* Render Content Boxes */}
          <div className="grid grid-cols-1 gap-6">
            {(activeTab === 'both' || activeTab === 'jd') && (
              <div className="rounded-2xl glass-panel p-6 border border-[#D4AF37]/30 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                    <FileText className="w-4 h-4" /> 1) Polished LinkedIn Job Description
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(jd || generatedOutput, 'jd')}
                    className="text-xs text-[#94A3B8] hover:text-[#F3E5AB] flex items-center gap-1"
                  >
                    {copiedType === 'jd' ? <Check className="w-3.5 h-3.5 text-[#50C878]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy JD Only</span>
                  </button>
                </div>
                <div className="prose prose-invert max-w-none text-xs leading-relaxed whitespace-pre-wrap font-sans text-[#CBD5E1]">
                  {jd || generatedOutput}
                </div>
              </div>
            )}

            {(activeTab === 'both' || activeTab === 'interview') && (
              <div className="rounded-2xl glass-panel p-6 border border-[#D4AF37]/30 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4" /> 2) Interview Guide: 10 Behavioral & Technical Competency Questions
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(interview || generatedOutput, 'interview')}
                    className="text-xs text-[#94A3B8] hover:text-[#F3E5AB] flex items-center gap-1"
                  >
                    {copiedType === 'interview' ? <Check className="w-3.5 h-3.5 text-[#50C878]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy Guide Only</span>
                  </button>
                </div>
                <div className="prose prose-invert max-w-none text-xs leading-relaxed whitespace-pre-wrap font-sans text-[#CBD5E1]">
                  {interview || generatedOutput}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
