import React, { useState } from 'react';
import { GEMOLOGY_QUIZ_QUESTIONS, GemQuizQuestion } from '../data/gemsData';
import { Award, CheckCircle2, XCircle, RotateCcw, BookOpen, ChevronRight, HelpCircle, Sparkles } from 'lucide-react';

export const GemologyQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [activeTab, setActiveTab] = useState<'quiz' | 'glossary'>('quiz');

  const currentQ = GEMOLOGY_QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (index: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(index);
    setHasAnswered(true);
    if (index === currentQ.correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < GEMOLOGY_QUIZ_QUESTIONS.length) {
      setCurrentIdx(i => i + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  const glossaryTerms = [
    {
      term: 'Adularescence',
      def: 'A billowy, floating blue or silvery optical phenomenon caused by light scattering (Tyndall effect) through microscopic alternating layers of orthoclase and albite feldspar, exemplified by Meetiyagoda moonstones.'
    },
    {
      term: 'Asterism',
      def: 'The six- or twelve-rayed star optical effect produced by light reflection off densely packed, intersecting needle-like inclusions of rutile (TiO₂) aligned precisely with hexagonal crystal axes in corundum.'
    },
    {
      term: 'Birefringence',
      def: 'The numerical difference between the maximum and minimum refractive indices of an anisotropic (doubly refracting) gemstone, causing double imaging of facet junctions (e.g. 0.059 in Zircon).'
    },
    {
      term: 'Chatoyancy',
      def: 'The cat’s eye effect produced by light reflecting perpendicular to dense parallel fibers or hollow growth tubes, most famously exhibited by chrysoberyl cat’s eye (cymophane).'
    },
    {
      term: 'Illam',
      def: 'The indigenous Sinhala geological term for the ancient, gem-bearing alluvial gravel layer buried 3 to 25 meters beneath rice paddies and river valleys across Sri Lanka.'
    },
    {
      term: 'Padparadscha',
      def: 'A rare corundum variety named after the Sinhalese word for "lotus blossom" (padma raga), defined by a natural, delicate balance of pink and orange hues without excessive brown.'
    },
    {
      term: 'Pleochroism',
      def: 'The optical property wherein an anisotropic crystal shows different colors when viewed along different crystallographic directions under polarized light (dichroic or trichroic).'
    },
    {
      term: 'Geuda',
      def: 'Semi-translucent or milky Sri Lankan corundum rich in rutile silk that, when subjected to high-temperature thermal reduction, transforms into transparent, vivid royal blue sapphires.'
    }
  ];

  return (
    <div className="w-full rounded-3xl glass-panel-elevated border border-[#D4AF37]/30 p-6 sm:p-8 space-y-6 text-white shadow-2xl">
      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D4AF37]/20">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> Gemological Academy & Certification
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-wide">
            Knowledge Hub & Examination
          </h2>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#141824] border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'quiz' ? 'bg-[#D4AF37] text-black font-bold' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Interactive Quiz ({GEMOLOGY_QUIZ_QUESTIONS.length} Questions)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('glossary')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'glossary' ? 'bg-[#D4AF37] text-black font-bold' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            A-Z Scientific Glossary
          </button>
        </div>
      </div>

      {activeTab === 'quiz' ? (
        <div className="space-y-6">
          {!isFinished ? (
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                <span>Question {currentIdx + 1} of {GEMOLOGY_QUIZ_QUESTIONS.length}</span>
                <span className="text-[#D4AF37] font-semibold">{currentQ.category} Gemology</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] h-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / GEMOLOGY_QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <div className="p-5 rounded-2xl bg-[#0D1016] border border-[#D4AF37]/20">
                <h3 className="text-base sm:text-lg font-medium text-white leading-relaxed">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, i) => {
                  let btnStyle = 'bg-[#141824] border-white/10 text-[#CBD5E1] hover:border-[#D4AF37]/50';
                  if (hasAnswered) {
                    if (i === currentQ.correctIndex) {
                      btnStyle = 'bg-[#50C878]/20 border-[#50C878] text-white font-bold';
                    } else if (i === selectedAnswer) {
                      btnStyle = 'bg-[#E0115F]/20 border-[#E0115F] text-white';
                    } else {
                      btnStyle = 'bg-[#141824]/50 border-white/5 text-[#64748B] opacity-60';
                    }
                  }

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelectOption(i)}
                      disabled={hasAnswered}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {hasAnswered && i === currentQ.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-[#50C878] shrink-0" />
                      )}
                      {hasAnswered && i === selectedAnswer && i !== currentQ.correctIndex && (
                        <XCircle className="w-4 h-4 text-[#E0115F] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              {hasAnswered && (
                <div className="p-4 rounded-xl bg-[#0D1016] border border-[#D4AF37]/30 space-y-3 animate-fade-in">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
                    <Sparkles className="w-4 h-4" /> Gemological Explanation
                  </div>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    {currentQ.explanation}
                  </p>
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-5 py-2 rounded-xl gold-gradient-btn text-xs font-bold flex items-center gap-1.5"
                    >
                      <span>{currentIdx + 1 === GEMOLOGY_QUIZ_QUESTIONS.length ? 'See Final Score' : 'Next Question'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Finished Results Screen */
            <div className="text-center py-8 space-y-4 animate-fade-in">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-[#D4AF37] to-[#8A6B0A] flex items-center justify-center text-[#050608] shadow-2xl">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white">Examination Concluded</h3>
              <p className="text-sm text-[#CBD5E1]">
                You scored <strong className="text-[#D4AF37] text-lg font-mono">{score}</strong> out of <strong className="text-white text-lg font-mono">{GEMOLOGY_QUIZ_QUESTIONS.length}</strong>
              </p>
              <p className="text-xs text-[#94A3B8] max-w-md mx-auto">
                {score === GEMOLOGY_QUIZ_QUESTIONS.length
                  ? 'Master Gemologist Tier! You demonstrate flawless mastery of Ceylon provenance, rutile inclusions, and crystal systems.'
                  : score >= 3
                  ? 'Commendable! You hold solid gemological foundations in gem testing and mineral physics.'
                  : 'Continue exploring the THENUKA SATHMITHA GEMS research encyclopedia to hone your appraisal mastery.'}
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl gold-gradient-btn text-xs font-bold inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Retake Examination
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* A-Z Glossary */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {glossaryTerms.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl glass-panel border border-[#D4AF37]/20 space-y-1.5">
              <h4 className="text-sm font-heading font-bold text-[#F3E5AB]">
                {item.term}
              </h4>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                {item.def}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
