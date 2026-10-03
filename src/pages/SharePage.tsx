import React, { useState } from 'react';
import {
  Volume2,
  Download,
  Share2,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  Twitter,
  Sparkles,
  Camera
} from 'lucide-react';
import { store } from '../services/store';
import { downloadShareCard } from '../services/shareImage';

interface SharePageProps {
  onNavigate: (path: string) => void;
}

export const SharePage: React.FC<SharePageProps> = ({ onNavigate }) => {
  const phrase = store.getTodayPhrase();
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isGeneratingSquare, setIsGeneratingSquare] = useState(false);
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Play French pronunciation using browser Web Speech API
  const handlePlayAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase.french);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.85; // Slightly slower for clear teaching pronunciation
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const shareText = `Join me in supporting Nigerian polyglot Favour Chisimdi Ugegbe as she attempts the Guinness World Record for the longest language lesson (48-hour French marathon)! 30 Oct – 1 Nov 2026 at Landmark, Lagos. Entry is FREE: https://ugegbegwr.com`;

  const handleCopyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleDownloadSquare = async () => {
    setIsGeneratingSquare(true);
    try {
      await downloadShareCard({ format: 'square', phrase: phrase.french, english: phrase.english }, 'ugegbe-gwr-square-1080x1080.png');
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingSquare(false);
    }
  };

  const handleDownloadStory = async () => {
    setIsGeneratingStory(true);
    try {
      await downloadShareCard({ format: 'story', phrase: phrase.french, english: phrase.english }, 'ugegbe-gwr-story-1080x1920.png');
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingStory(false);
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `Witness history! Nigerian polyglot Favour Chisimdi Ugegbe goes for 48 hours of continuous French teaching in a @GuinnessWorldRecord attempt at Landmark, Lagos.`
  )}&hashtags=UgegbeGWR,FavourUgegbe,FrenchLanguageMarathon&url=${encodeURIComponent('https://ugegbegwr.com')}`;

  return (
    <div className="w-full bg-[#FAF8F5] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold">
            SPREAD THE WORD · #UGEGBEGWR
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-emerald-950 uppercase tracking-tight">
            SHARE THE MARATHON
          </h1>
          <p className="text-base sm:text-xl text-slate-700 leading-relaxed font-normal">
            Share the countdown, learn the daily French phrase, tag someone who should be there, and use <strong>#UgegbeGWR</strong>. The bigger the conversation, the further the message travels.
          </p>
        </div>

        {/* 1. DAILY FRENCH PHRASE (with Audio Pronunciation Slot) */}
        <div className="bg-[#022C22] text-white p-6 sm:p-10 rounded-2xl border-2 border-emerald-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-800/80 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              TODAY'S MARATHON PHRASE · MOT DU JOUR
            </span>
            <span className="text-xs font-mono text-emerald-300">
              {phrase.dateStr}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl sm:text-4xl font-display font-black text-white italic tracking-tight">
                “{phrase.french}”
              </h2>
              {/* Audio Pronunciation Button */}
              <button
                onClick={handlePlayAudio}
                className={`p-3 rounded-full border transition-all cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-amber-400 text-emerald-950 border-amber-400 scale-105'
                    : 'bg-emerald-900/80 hover:bg-emerald-800 text-amber-400 border-emerald-700'
                }`}
                title="Listen to French audio pronunciation"
                aria-label="Listen to French audio pronunciation"
              >
                <Volume2 className={`w-5 h-5 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
              </button>
            </div>

            <div className="p-4 bg-emerald-950/70 rounded-xl border border-emerald-800/80 space-y-2">
              <div className="text-sm sm:text-base font-semibold text-emerald-200">
                Translation: <span className="text-white font-normal">{phrase.english}</span>
              </div>
              <div className="text-xs font-mono text-amber-300">
                Phonetic guide: <span className="italic">{phrase.phonetic}</span>
              </div>
              <div className="text-xs text-emerald-300/80 pt-1">
                Context: {phrase.context}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => handleCopyText(`"${phrase.french}" — ${phrase.english} #UgegbeGWR`, 'phrase')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-900 hover:bg-emerald-800 border border-emerald-700 text-white font-mono text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              {copiedType === 'phrase' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
              <span>{copiedType === 'phrase' ? 'Copied Phrase' : 'Copy Phrase'}</span>
            </button>
          </div>
        </div>

        {/* 2. DOWNLOADABLE SHARE CARDS (1080x1080 and 1080x1920 next/og style generated cards) */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold">
              OFFICIAL VISUAL GRAPHICS
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-emerald-950 uppercase tracking-tight">
              DOWNLOAD SOCIAL SHARE CARDS
            </h2>
            <p className="text-sm text-slate-600">
              High-resolution PNG graphics formatted precisely for WhatsApp Status, Instagram Stories, and X/LinkedIn feeds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Square Card (1080x1080) */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-xs">
              <div className="aspect-square w-full rounded-xl bg-gradient-to-br from-[#064E3B] to-[#022C22] p-5 text-white flex flex-col justify-between border-2 border-amber-500/40 relative overflow-hidden">
                <div className="text-[10px] font-mono tracking-widest uppercase text-amber-400">
                  GUINNESS WORLD RECORDS™ ATTEMPT
                </div>
                <div className="text-center space-y-2 my-auto">
                  <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-white leading-tight">
                    FAVOUR UGEGBE'S 48-HOUR
                  </h3>
                  <div className="text-lg font-display font-black text-amber-400 uppercase">
                    FRENCH LANGUAGE MARATHON
                  </div>
                  <div className="pt-2 text-xs font-mono text-emerald-200">
                    26h Current · <span className="font-bold text-white">48h New Target</span>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-center text-emerald-300 border-t border-emerald-800/80 pt-2">
                  30 OCT – 1 NOV 2026 · LANDMARK LAGOS · FREE ENTRY
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-slate-900">SQUARE FORMAT</span>
                  <span className="text-slate-500">1080 × 1080 px</span>
                </div>
                <button
                  onClick={handleDownloadSquare}
                  disabled={isGeneratingSquare}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-900 hover:bg-emerald-800 text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-60"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>{isGeneratingSquare ? 'Generating PNG...' : 'Download Square Card (PNG)'}</span>
                </button>
              </div>
            </div>

            {/* Story Card (1080x1920) */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-xs">
              <div className="aspect-[9/16] max-h-72 w-full mx-auto rounded-xl bg-gradient-to-br from-[#064E3B] to-[#011F18] p-4 text-white flex flex-col justify-between border-2 border-amber-500/40 relative overflow-hidden">
                <div className="text-[9px] font-mono tracking-widest uppercase text-amber-400">
                  GUINNESS WORLD RECORDS™ ATTEMPT
                </div>
                <div className="text-center space-y-2 my-auto">
                  <h3 className="text-sm font-display font-black uppercase text-white leading-tight">
                    FAVOUR UGEGBE'S 48-HOUR
                  </h3>
                  <div className="text-xs font-display font-black text-amber-400 uppercase">
                    FRENCH MARATHON
                  </div>
                  <div className="text-[10px] italic text-emerald-100">
                    “{phrase.french}”
                  </div>
                </div>
                <div className="text-[9px] font-mono text-center text-emerald-300 border-t border-emerald-800/80 pt-1.5">
                  30 OCT – 1 NOV 2026 · LANDMARK LAGOS
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-slate-900">STORY / STATUS FORMAT</span>
                  <span className="text-slate-500">1080 × 1920 px</span>
                </div>
                <button
                  onClick={handleDownloadStory}
                  disabled={isGeneratingStory}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-900 hover:bg-emerald-800 text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-60"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>{isGeneratingStory ? 'Generating PNG...' : 'Download Story Card (PNG)'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. PRE-WRITTEN SHARE BUTTONS & HASHTAGS */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-display font-black text-emerald-950 uppercase tracking-tight">
            INSTANT ONE-CLICK SHARING
          </h2>

          <div className="flex flex-wrap gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-mono text-xs uppercase tracking-wider font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share to WhatsApp</span>
            </a>

            <a
              href={twitterUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-black hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Twitter className="w-4 h-4" />
              <span>Post to X (Twitter)</span>
            </a>

            <button
              onClick={() => handleCopyText(shareText, 'link')}
              className="inline-flex items-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs uppercase tracking-wider font-bold rounded-lg transition-colors cursor-pointer"
            >
              {copiedType === 'link' ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4 text-slate-600" />}
              <span>{copiedType === 'link' ? 'Copied Invitation Link!' : 'Copy Invitation Text'}</span>
            </button>
          </div>

          {/* Official Hashtags Display */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
              OFFICIAL EVENT HASHTAGS
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded font-mono text-xs font-bold">
                #UgegbeGWR
              </span>
              <span className="px-3 py-1.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded font-mono text-xs font-bold">
                #FavourUgegbe
              </span>
              <span className="px-3 py-1.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded font-mono text-xs font-bold">
                #FrenchLanguageMarathon
              </span>

              <button
                onClick={() => handleCopyText('#UgegbeGWR #FavourUgegbe #FrenchLanguageMarathon', 'hashtags')}
                className="text-xs font-mono text-emerald-800 hover:text-amber-600 underline font-semibold ml-2 cursor-pointer"
              >
                {copiedType === 'hashtags' ? 'Copied all!' : 'Copy all tags'}
              </button>
            </div>
          </div>
        </div>

        {/* 4. SOCIAL FEED EMBED AREA (Community posts) */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold">
              COMMUNITY CONVERSATION
            </span>
            <h2 className="text-2xl font-display font-black text-emerald-950 uppercase tracking-tight">
              VOICES FROM ACROSS NIGERIA & BEYOND
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3 text-xs leading-relaxed">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-900 text-amber-400 font-bold flex items-center justify-center font-mono">
                  AO
                </div>
                <div>
                  <strong className="block text-slate-900 font-medium">Alliance Française Lagos</strong>
                  <span className="text-slate-400 font-mono text-[10px]">@AFLagos</span>
                </div>
              </div>
              <p className="text-slate-700">
                “Proud to see Favour taking Nigerian multilingualism to the world stage! 48 hours of French in Victoria Island is truly historic. We will be there live! 🇳🇬🇫🇷 #UgegbeGWR”
              </p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3 text-xs leading-relaxed">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center font-mono">
                  CU
                </div>
                <div>
                  <strong className="block text-slate-900 font-medium">Chidiogo Uche</strong>
                  <span className="text-slate-400 font-mono text-[10px]">@chidi_uche</span>
                </div>
              </div>
              <p className="text-slate-700">
                “Just registered my free pass for the Landmark session on Saturday evening when the 26h record drops! Bring your notebooks Lagos! #FrenchLanguageMarathon”
              </p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3 text-xs leading-relaxed">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center font-mono">
                  TD
                </div>
                <div>
                  <strong className="block text-slate-900 font-medium">Tunde Davies</strong>
                  <span className="text-slate-400 font-mono text-[10px]">@tunde_d</span>
                </div>
              </div>
              <p className="text-slate-700">
                “Our Francophone neighbours (Benin, Niger, Chad, Cameroon) speak French every day. Favour is breaking down borders with this marathon. #FavourUgegbe #UgegbeGWR”
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
