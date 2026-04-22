import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Crown, Zap, Star } from "lucide-react";
import { base44 } from "@/api/base44Client";

const EMOJI_REACTIONS = [
  { emoji: "🚀", label: "Fast" },
  { emoji: "👑", label: "Best" },
  { emoji: "🔥", label: "On Fire" },
  { emoji: "⚡", label: "Electric" },
  { emoji: "💎", label: "Diamond" },
  { emoji: "🌟", label: "Star" },
];

const RANKS = [
  { name: "Rookie", min: 0, max: 99, icon: "⭐" },
  { name: "Rising Star", min: 100, max: 299, icon: "🌟" },
  { name: "Pro", min: 300, max: 699, icon: "💎" },
  { name: "Legend", min: 700, max: Infinity, icon: "👑" },
];

function getRank(points) {
  return RANKS.find(r => points >= r.min && points <= r.max) || RANKS[0];
}

function PlayerCard({ player, rank, myEmail, onReact }) {
  const [showEmojis, setShowEmojis] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const isMe = player.user_email === myEmail;
  const rankInfo = getRank(player.star_points || 0);
  const isTop3 = rank <= 3;

  const podiumColors = ["from-yellow-400 to-amber-500", "from-slate-300 to-slate-400", "from-amber-600 to-orange-700"];
  const podiumBorders = ["border-yellow-500/50", "border-slate-400/50", "border-orange-500/50"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.07 }}
      className={`relative rounded-2xl border bg-card p-5 ${isTop3 ? podiumBorders[rank - 1] : "border-border/50"} ${isMe ? "ring-2 ring-primary/50" : ""}`}
    >
      {isTop3 && (
        <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${podiumColors[rank - 1]}`} />
      )}

      <div className="flex items-center gap-4">
        {/* Rank */}
        <div className="w-10 text-center flex-shrink-0">
          {rank <= 3 ? (
            <span className="text-2xl">{["🥇", "🥈", "🥉"][rank - 1]}</span>
          ) : (
            <span className="font-heading text-lg font-bold text-muted-foreground">#{rank}</span>
          )}
        </div>

        {/* Avatar */}
        <div className="relative flex-shrink-0">
          {player.pet_image_url ? (
            <img src={player.pet_image_url} alt="Pet" className="w-14 h-14 rounded-full object-cover border-2 border-primary/40" />
          ) : (
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold border-2 ${isTop3 ? "border-white/20 bg-gradient-to-br " + podiumColors[rank - 1] : "border-border bg-muted"}`}>
              {(player.display_name || player.user_email || "?")[0].toUpperCase()}
            </div>
          )}
          {isTop3 && (
            <div className="absolute -top-2 -right-2">
              <Crown className="w-5 h-5 text-yellow-400" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className={`font-heading text-sm font-bold truncate ${isMe ? "text-primary" : "text-foreground"}`}>
            {player.display_name || player.user_email?.split("@")[0]}
            {isMe && <span className="ml-1 text-[10px] text-primary">(You)</span>}
          </p>
          <p className="text-[11px] text-muted-foreground font-body">{rankInfo.icon} {rankInfo.name}</p>
          {/* Reactions display */}
          {player.reactions && Object.keys(player.reactions).length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {Object.entries(player.reactions).map(([emoji, count]) => count > 0 && (
                <span key={emoji} className="text-xs bg-muted/60 rounded-full px-1.5 py-0.5">{emoji} {count}</span>
              ))}
            </div>
          )}
        </div>

        {/* Points */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="font-heading text-base font-black text-foreground">{player.star_points || 0}</span>
          </div>
          {!isMe && (
            <div className="relative">
              <button
                onClick={() => setShowEmojis(!showEmojis)}
                className="text-lg hover:scale-125 transition-transform"
                title="React"
              >
                {selectedEmoji || "😊"}
              </button>
              <AnimatePresence>
                {showEmojis && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 8 }}
                    className="absolute right-0 bottom-8 z-10 flex gap-1 p-2 rounded-xl bg-card border border-border shadow-2xl"
                  >
                    {EMOJI_REACTIONS.map(r => (
                      <button
                        key={r.emoji}
                        onClick={() => { setSelectedEmoji(r.emoji); onReact(player.id, r.emoji); setShowEmojis(false); }}
                        className="text-xl hover:scale-125 transition-transform"
                        title={r.label}
                      >
                        {r.emoji}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function HallOfFame() {
  const [players, setPlayers] = useState([]);
  const [myEmail, setMyEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const me = await base44.auth.me();
      setMyEmail(me.email);
      const all = await base44.entities.UserProfile.list("-star_points", 20);
      setPlayers(all);
      setLoading(false);
    }
    load();
  }, []);

  const handleReact = async (playerId, emoji) => {
    const player = players.find(p => p.id === playerId);
    if (!player) return;
    const reactions = { ...(player.reactions || {}), [emoji]: ((player.reactions || {})[emoji] || 0) + 1 };
    await base44.entities.UserProfile.update(playerId, { reactions });
    setPlayers(prev => prev.map(p => p.id === playerId ? { ...p, reactions } : p));
  };

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-2xl shadow-yellow-500/30 mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-black tracking-wider bg-gradient-to-r from-yellow-400 via-orange-400 to-primary bg-clip-text text-transparent">
            HALL OF FAME
          </h1>
          <p className="mt-2 text-sm text-muted-foreground font-body">The greatest players on the Kid$tar stage 🌍 React with emojis!</p>
        </motion.div>

        {/* Top 3 Podium */}
        {!loading && players.length >= 3 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-end justify-center gap-3 h-40">
              {/* 2nd */}
              <div className="flex flex-col items-center gap-2">
                {players[1]?.pet_image_url
                  ? <img src={players[1].pet_image_url} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-slate-400/50" />
                  : <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-2xl font-bold border-2 border-slate-400/50">{(players[1]?.display_name || "?")[0]}</div>
                }
                <div className="w-20 h-20 bg-gradient-to-t from-slate-500/40 to-slate-400/20 rounded-t-xl border border-slate-400/30 flex flex-col items-center justify-center">
                  <span className="text-xl">🥈</span>
                  <span className="text-xs font-heading font-bold text-muted-foreground truncate w-16 text-center">{players[1]?.display_name?.split(" ")[0] || players[1]?.user_email?.split("@")[0]}</span>
                </div>
              </div>
              {/* 1st */}
              <div className="flex flex-col items-center gap-2">
                {players[0]?.pet_image_url
                  ? <img src={players[0].pet_image_url} alt="" className="w-20 h-20 rounded-full object-cover border-2 border-yellow-500/50 shadow-lg shadow-yellow-500/30" />
                  : <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-3xl font-bold border-2 border-yellow-500/50">{(players[0]?.display_name || "?")[0]}</div>
                }
                <div className="w-24 h-28 bg-gradient-to-t from-yellow-500/40 to-yellow-400/20 rounded-t-xl border border-yellow-500/30 flex flex-col items-center justify-center">
                  <Crown className="w-5 h-5 text-yellow-400 mb-1" />
                  <span className="text-2xl">🥇</span>
                  <span className="text-xs font-heading font-bold text-yellow-400 truncate w-20 text-center">{players[0]?.display_name?.split(" ")[0] || players[0]?.user_email?.split("@")[0]}</span>
                </div>
              </div>
              {/* 3rd */}
              <div className="flex flex-col items-center gap-2">
                {players[2]?.pet_image_url
                  ? <img src={players[2].pet_image_url} alt="" className="w-14 h-14 rounded-full object-cover border-2 border-orange-600/50" />
                  : <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center text-xl font-bold border-2 border-orange-600/50">{(players[2]?.display_name || "?")[0]}</div>
                }
                <div className="w-18 h-14 bg-gradient-to-t from-orange-600/40 to-orange-500/20 rounded-t-xl border border-orange-600/30 flex flex-col items-center justify-center px-3">
                  <span className="text-lg">🥉</span>
                  <span className="text-xs font-heading font-bold text-muted-foreground truncate w-14 text-center">{players[2]?.display_name?.split(" ")[0] || players[2]?.user_email?.split("@")[0]}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-20 rounded-2xl bg-muted animate-pulse" />)}
          </div>
        ) : players.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🏆</p>
            <p className="font-body text-muted-foreground">No players yet — be the first!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {players.map((player, i) => (
              <PlayerCard key={player.id} player={player} rank={i + 1} myEmail={myEmail} onReact={handleReact} />
            ))}
          </div>
        )}

        <p className="mt-6 text-center text-xs text-muted-foreground font-body">
          React with emojis to celebrate other players! 🎉
        </p>
      </div>
    </div>
  );
}
