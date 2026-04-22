import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Youtube, ExternalLink, Star, Music, ChevronRight, Search } from "lucide-react";
import PullToRefresh from "../components/PullToRefresh";
import FloatingReaction from "../components/FloatingReaction";

const REACTIONS = ["🔥", "⭐", "⚡", "💜", "🎵", "🚀", "👑", "💎"];

const BAND_MEMBERS = [
  { name: "Kid$tar", role: "Vocalist / Producer", emoji: "🎤" },
  { name: "Leo Johnson", role: "Lead Guitar", emoji: "🎸" },
  { name: "Sophia Brownstone", role: "Bass / Backing Vocals", emoji: "🎼" },
  { name: "Ella Brownstone", role: "Keys / Synth", emoji: "🎹" },
];

const videos = [
  { id: "gDKcpV1vGEM", title: "Electric Soul (Teaser 1)", duration: "0:17", hiddenStar: false },
  { id: "vQkv6whTLBc", title: "Electric Soul (Teaser 2)", duration: "0:25", hiddenStar: false },
  { id: "ta0gGFHna1s", title: "Static (Official Music Video)", duration: "2:53", hiddenStar: true, starCode: "ST4R-5T4T1C" },
  { id: "NP_sJUewpXQ", title: "Rowboat (feat. Michael Jackson & Sophia Brownstone)", duration: "5:19", hiddenStar: false },
  { id: "s0RVmu5l5NQ", title: "Heatwave", duration: "2:51", hiddenStar: true, starCode: "H34T-W4VE" },
  { id: "e06-RVVMgHo", title: "Burning Up the Floor", duration: "2:51", hiddenStar: false },
];

const shorts = [
  { id: "gDKcpV1vGEM", title: "Studio Session Clip", label: "Behind The Beat" },
  { id: "vQkv6whTLBc", title: "Electric Soul Process", label: "AI Track Making" },
  { id: "ta0gGFHna1s", title: "Rehearsal Footage", label: "Dance Rehearsal" },
];

export default function Videos() {
  const [active, setActive] = useState(null);
  const [theaterMode, setTheaterMode] = useState(false);
  const [reactions, setReactions] = useState([]);
  const [codeInput, setCodeInput] = useState("");
  const [codeResult, setCodeResult] = useState(null);
  const [foundStars, setFoundStars] = useState([]);
  const [activeShort, setActiveShort] = useState(null);
  const [activeMember, setActiveMember] = useState(null);
  const reactionIdRef = useRef(0);

  const openTheater = (video) => {
    setActive(video);
    setTheaterMode(true);
    setReactions([]);
  };

  const closeTheater = () => {
    setActive(null);
    setTheaterMode(false);
    setReactions([]);
  };

  const sendReaction = (emoji) => {
    const id = reactionIdRef.current++;
    const x = 10 + Math.random() * 80;
    setReactions((prev) => [...prev, { id, emoji, x }]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== id));
    }, 3000);
  };

  const redeemCode = () => {
    const allCodes = videos.filter(v => v.starCode).map(v => v.starCode);
    if (allCodes.includes(codeInput.trim().toUpperCase())) {
      if (!foundStars.includes(codeInput.trim().toUpperCase())) {
        setFoundStars(prev => [...prev, codeInput.trim().toUpperCase()]);
        setCodeResult({ success: true, msg: "🌟 Hidden Star found! +25 Star Points unlocked!" });
      } else {
        setCodeResult({ success: false, msg: "You already found this star!" });
      }
    } else {
      setCodeResult({ success: false, msg: "Invalid code. Keep watching for hidden stars! ⭐" });
    }
    setCodeInput("");
    setTimeout(() => setCodeResult(null), 3000);
  };

  return (
    <PullToRefresh onRefresh={() => window.location.reload()}>
      <div className="min-h-screen py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-2 h-8 rounded-full bg-gradient-to-b from-primary to-accent" />
              <h1 className="font-heading text-2xl sm:text-3xl font-black tracking-wider text-foreground">MUSIC VIDEO THEATER</h1>
            </div>
            <p className="ml-5 text-sm text-muted-foreground font-body">Click any video to enter Theater Mode with live reactions 🎭</p>
          </motion.div>

          {/* New Rules Album Cover */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="mb-10 rounded-2xl overflow-hidden border border-primary/30 shadow-2xl shadow-primary/20 flex flex-col sm:flex-row items-center bg-gradient-to-br from-card via-card to-primary/5">
            <img
              src="https://media.base44.com/images/public/69cd2b2538ed1a36a259ef4a/56339fce6_Gemini_Generated_Image_xqsfjxqsfjxqsfjx.png"
              alt="New Rules album cover"
              className="w-full sm:w-64 h-64 object-cover flex-shrink-0"
            />
            <div className="p-6 flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 mb-3">
                <Star className="w-3 h-3 text-primary" />
                <span className="text-[10px] font-heading font-bold text-primary tracking-widest uppercase">New Album • Coming Soon</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-black tracking-wider text-foreground">NEW RULES</h2>
              <p className="mt-1 text-sm font-body text-muted-foreground">Kid$tar — Time to Change the Game</p>
              <p className="mt-3 text-sm font-body text-muted-foreground/80 leading-relaxed">
                6 tracks of pure heat. Rowboat, Static, Velvet Afterglow & more. 🚀
              </p>
            </div>
          </motion.div>

          {/* YouTube CTA — deep link */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-3 mb-10">
            <a
              href="vnd.youtube://www.youtube.com/@kidstar-L1M"
              onClick={() => {
                setTimeout(() => { window.location.href = "https://www.youtube.com/@kidstar-L1M"; }, 1200);
              }}
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-body font-semibold text-sm shadow-2xl shadow-red-500/30 transition-all duration-300 hover:scale-105"
            >
              <Youtube className="w-5 h-5" />
              Subscribe on YouTube
              <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
            </a>
            <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-muted/50 border border-border/50 text-xs font-body text-muted-foreground">
              <Star className="w-3.5 h-3.5 text-yellow-400" />
              Find hidden stars in videos to earn bonus points!
            </div>
          </motion.div>

          {/* Full Playlist Embed */}
          <div className="mb-12 rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/10">
            <div className="aspect-video">
              <iframe
                width="100%" height="100%"
                src="https://www.youtube.com/embed/videoseries?list=PLifzpKiTwpKehsulTYqKyGnddax1kMBXW"
                title="Kid$tar Music Videos Playlist"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen className="w-full h-full"
              />
            </div>
          </div>

          {/* Video Quest */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mb-10 rounded-2xl border border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 to-orange-500/5 p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <Search className="w-4 h-4 text-yellow-400" />
              </div>
              <div>
                <p className="font-heading text-sm font-bold text-yellow-400 tracking-wider">VIDEO QUEST — HIDDEN STARS</p>
                <p className="text-xs text-muted-foreground font-body">Watch videos carefully for hidden ⭐ stars. Find the code & redeem below!</p>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                value={codeInput}
                onChange={e => setCodeInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && redeemCode()}
                placeholder="Enter star code (e.g. ST4R-XXXX)"
                className="flex-1 px-4 py-2.5 rounded-xl bg-muted/60 border border-border/50 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-yellow-500/50"
              />
              <button onClick={redeemCode}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-heading text-xs font-bold tracking-wider hover:shadow-xl transition-all">
                REDEEM
              </button>
            </div>
            {codeResult && (
              <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                className={`mt-2 text-xs font-body ${codeResult.success ? "text-green-400" : "text-red-400"}`}>
                {codeResult.msg}
              </motion.p>
            )}
            {foundStars.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {foundStars.map(code => (
                  <span key={code} className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-xs font-heading text-yellow-400">
                    ⭐ {code}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Theater Grid */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1.5 h-7 rounded-full bg-gradient-to-b from-primary to-accent" />
            <h2 className="font-heading text-xl font-bold tracking-wider text-foreground">ALL VIDEOS</h2>
            <span className="text-xs font-body text-muted-foreground ml-1">— Click to enter Theater Mode</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {videos.map((video, i) => (
              <motion.div key={video.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group relative rounded-2xl overflow-hidden border border-border/50 bg-card cursor-pointer hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
                onClick={() => openTheater(video)}
              >
                <div className="relative aspect-video">
                  <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl shadow-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                  {video.hiddenStar && (
                    <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-lg bg-yellow-500/20 border border-yellow-500/40 backdrop-blur-sm">
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span className="text-[10px] font-heading font-bold text-yellow-400">HIDDEN STAR</span>
                    </div>
                  )}
                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-white text-xs font-body tabular-nums">{video.duration}</span>
                </div>
                <div className="p-4">
                  <p className="font-body text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">{video.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-muted-foreground font-body">Kid$tar</p>
                    <span className="text-xs text-primary/60 font-body">• 🎭 Theater Mode</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Behind the Beat — Shorts */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1.5 h-7 rounded-full bg-gradient-to-b from-accent to-secondary" />
            <h2 className="font-heading text-xl font-bold tracking-wider text-foreground">BEHIND THE BEAT</h2>
            <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-[10px] font-heading font-bold ml-1">EXCLUSIVE</span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 mb-14 snap-x snap-mandatory">
            {shorts.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-shrink-0 snap-start w-44 sm:w-52 rounded-2xl overflow-hidden border border-accent/30 bg-card cursor-pointer hover:border-accent/60 transition-all group"
                onClick={() => setActiveShort(s)}
              >
                <div className="relative" style={{ aspectRatio: "9/16" }}>
                  <img src={`https://i.ytimg.com/vi/${s.id}/hqdefault.jpg`} alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-accent/80 text-white text-[10px] font-heading font-bold">{s.label}</div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-xs font-body font-semibold text-white line-clamp-2">{s.title}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center">
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive Credits — Band Members */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1.5 h-7 rounded-full bg-gradient-to-b from-secondary to-primary" />
            <h2 className="font-heading text-xl font-bold tracking-wider text-foreground">BAND MEMBERS</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
            {BAND_MEMBERS.map((member, i) => (
              <motion.button key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setActiveMember(activeMember?.name === member.name ? null : member)}
                className={`rounded-2xl p-4 border text-left transition-all ${activeMember?.name === member.name ? "border-primary/60 bg-primary/10 shadow-lg shadow-primary/20" : "border-border/50 bg-card hover:border-primary/30"}`}
              >
                <div className="text-3xl mb-2">{member.emoji}</div>
                <p className="font-heading text-sm font-bold text-foreground">{member.name}</p>
                <p className="text-xs text-muted-foreground font-body mt-0.5">{member.role}</p>
                <div className="flex items-center gap-1 mt-2 text-primary">
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-[10px] font-heading">View contributions</span>
                </div>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {activeMember && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                className="mb-12 rounded-2xl border border-primary/30 bg-card/80 p-5 overflow-hidden">
                <p className="font-heading text-sm font-bold text-primary tracking-wider mb-3">
                  {activeMember.emoji} {activeMember.name} — {activeMember.role}
                </p>
                <p className="text-xs font-body text-muted-foreground mb-4">
                  Contributions appear across the full Kid$tar discography. Tap a video above to watch their work in Theater Mode.
                </p>
                <div className="flex flex-wrap gap-2">
                  {videos.slice(0, 3).map(v => (
                    <button key={v.id} onClick={() => openTheater(v)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/60 border border-border/50 text-xs font-body text-foreground hover:border-primary/30 transition-colors">
                      <Music className="w-3 h-3 text-primary" /> {v.title}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mecha Brownstone Drift */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-7 rounded-full bg-gradient-to-b from-accent to-primary" />
            <h2 className="font-heading text-xl font-bold tracking-wider text-foreground">MECHA BROWNSTONE DRIFT</h2>
          </div>
          <div className="rounded-2xl border border-border/50 overflow-hidden shadow-2xl mb-6">
            <div className="aspect-video">
              <iframe src="https://www.youtube.com/embed/KwHBWJP83Q0" title="Bedrock Directive - Mecha Brownstone Drift"
                className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
            <div className="bg-card px-5 py-3">
              <p className="font-heading text-sm font-bold text-foreground">Bedrock Directive</p>
              <p className="text-xs text-muted-foreground font-body">Mecha Brownstone Drift</p>
            </div>
          </div>

        </div>
      </div>

      {/* THEATER MODE MODAL */}
      <AnimatePresence>
        {theaterMode && active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col">
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-black/80 border-b border-white/10 backdrop-blur-sm flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-heading font-bold text-white/60 tracking-widest">LIVE THEATER</span>
              </div>
              <p className="font-heading text-sm font-bold text-white tracking-wide truncate max-w-[200px]">{active.title}</p>
              <button onClick={closeTheater} className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative flex-1 overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${active.id}?autoplay=1`}
                title={active.title}
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <AnimatePresence>
                  {reactions.map(r => (
                    <FloatingReaction key={r.id} emoji={r.emoji} x={r.x} />
                  ))}
                </AnimatePresence>
              </div>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)" }} />
            </div>

            <div className="bg-black/90 border-t border-white/10 px-4 py-3 flex-shrink-0">
              <div className="flex items-center justify-between gap-3 max-w-2xl mx-auto">
                <p className="text-[10px] font-heading text-white/40 tracking-widest hidden sm:block">LIVE REACTIONS</p>
                <div className="flex gap-2 flex-wrap justify-center">
                  {REACTIONS.map(emoji => (
                    <button key={emoji} onClick={() => sendReaction(emoji)}
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-xl flex items-center justify-center transition-all hover:scale-125 active:scale-95">
                      {emoji}
                    </button>
                  ))}
                </div>
                {active.hiddenStar && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-yellow-500/20 border border-yellow-500/40">
                    <Star className="w-3 h-3 text-yellow-400" />
                    <span className="text-[10px] font-heading text-yellow-400 font-bold">STAR HIDDEN</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Short Video Modal */}
      <AnimatePresence>
        {activeShort && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
            onClick={() => setActiveShort(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="relative w-full max-w-xs rounded-2xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: "9/16" }} onClick={e => e.stopPropagation()}>
              <iframe src={`https://www.youtube.com/embed/${activeShort.id}?autoplay=1`}
                title={activeShort.title} className="w-full h-full border-0"
                allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
              <button onClick={() => setActiveShort(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PullToRefresh>
  );
