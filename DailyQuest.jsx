import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Target, Flame, Lock, CheckCircle, Zap, Trophy, Gamepad2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";

const QUESTS = [
  { day: 0, title: "🚀 Launch Day!", description: "Play any game for 5 minutes", reward: 10, game: null },
  { day: 1, title: "🎮 Arcade Rookie", description: "Play PAC-MAN and survive 3 levels", reward: 15, game: "pacman" },
  { day: 2, title: "🧠 Brain Blitz", description: "Complete a game of Memory Match", reward: 20, game: "memorymatch" },
  { day: 3, title: "♟️ Strategy Star", description: "Play Chess against the AI", reward: 25, game: "chess" },
  { day: 4, title: "🔥 The Floor is Lava!", description: "Play any 3 games — all platforms are LAVA!", reward: 30, game: null },
  { day: 5, title: "⚡ Speed Runner", description: "Play Infinite Runner for 5 minutes straight", reward: 35, game: "infiniterunner" },
  { day: 6, title: "👑 LEGENDARY STREAK", description: "You made it 7 days! You're a STAR MEMBER!", reward: 100, game: null, secret: true },
];

function getTodayIndex() {
  const today = new Date().toISOString().split("T")[0];
  const start = new Date("2025-01-01").getTime();
  const days = Math.floor((new Date(today).getTime() - start) / 86400000);
  return days % 7;
}

export default function DailyQuest() {
  const [profile, setProfile] = useState(null);
  const [streak, setStreak] = useState(0);
  const [claimedToday, setClaimedToday] = useState(false);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const todayIdx = getTodayIndex();
  const todayQuest = QUESTS[todayIdx];

  useEffect(() => {
    async function load() {
      const me = await base44.auth.me();
      const profiles = await base44.entities.UserProfile.filter({ user_email: me.email });
      if (profiles.length > 0) {
        const p = profiles[0];
        setProfile(p);
        setStreak(p.quest_streak || 0);
        const today = new Date().toISOString().split("T")[0];
        setClaimedToday(p.quest_last_claimed === today);
      }
      setLoading(false);
    }
    load();
  }, []);

  const claimQuest = async () => {
    if (!profile || claimedToday) return;
    setClaiming(true);
    const today = new Date().toISOString().split("T")[0];
    const newStreak = (profile.quest_streak || 0) + 1;
    const pts = todayQuest.reward;
    await base44.entities.UserProfile.update(profile.id, {
      star_points: (profile.star_points || 0) + pts,
      quest_streak: newStreak,
      quest_last_claimed: today,
    });
    setStreak(newStreak);
    setEarnedPoints(pts);
    setClaimedToday(true);
    setShowReward(true);
    setClaiming(false);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 shadow-2xl shadow-orange-500/30 mb-4">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-black tracking-wider bg-gradient-to-r from-orange-400 via-red-400 to-primary bg-clip-text text-transparent">
            QUEST OF THE DAY
          </h1>
          <p className="mt-2 text-sm text-muted-foreground font-body">Complete daily quests to build your streak & earn Star Points!</p>
        </motion.div>

        {/* Streak Banner */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-red-500/10 p-5 mb-6 flex items-center gap-4">
          <div className="text-4xl">🔥</div>
          <div>
            <p className="font-heading text-2xl font-black text-foreground">{streak}-Day Streak!</p>
            <p className="text-xs font-body text-muted-foreground">
              {streak >= 7 ? "🌟 STAR MEMBER unlocked! Access secret games!" : `${7 - streak} more days to unlock SECRET game & STAR MEMBER status!`}
            </p>
          </div>
          {streak >= 7 && (
            <div className="ml-auto">
              <span className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 text-xs font-heading font-bold">STAR MEMBER ⭐</span>
            </div>
          )}
        </motion.div>

        {/* Today's Quest */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-3xl border border-primary/40 bg-gradient-to-br from-card via-card to-primary/5 p-6 mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary" />
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-heading font-bold tracking-widest mb-2">TODAY'S QUEST</span>
              <h2 className="font-heading text-xl font-black text-foreground">{todayQuest.title}</h2>
              <p className="mt-1 text-sm font-body text-muted-foreground">{todayQuest.description}</p>
              <div className="mt-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="font-heading text-base font-black text-yellow-400">+{todayQuest.reward} Star Points</span>
              </div>
            </div>
            {todayQuest.secret && streak < 7 && (
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-muted/60 flex items-center justify-center border border-border">
                <Lock className="w-6 h-6 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="mt-4 flex gap-3">
            {todayQuest.game && (
              <Link to={`/games/${todayQuest.game}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/60 border border-border/50 text-sm font-heading font-bold text-foreground hover:border-primary/40 transition-colors">
                <Gamepad2 className="w-4 h-4 text-primary" /> Play Now
              </Link>
            )}
            <button
              onClick={claimQuest}
              disabled={claimedToday || claiming}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-heading text-sm font-bold tracking-wider transition-all ${
                claimedToday
                  ? "bg-green-500/20 border border-green-500/40 text-green-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-primary to-accent text-white hover:shadow-xl hover:shadow-primary/30"
              }`}
            >
              {claimedToday ? <><CheckCircle className="w-4 h-4" /> Claimed!</> : claiming ? "Claiming..." : <><Zap className="w-4 h-4" /> Claim Reward</>}
            </button>
          </div>
        </motion.div>

        {/* 7-Day Progress */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border/50 bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-orange-400" />
            <p className="font-heading text-sm font-bold text-foreground">7-DAY STREAK PROGRESS</p>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {QUESTS.map((q, i) => {
              const done = i < streak;
              const isToday = i === (streak % 7);
              return (
                <div key={i} className={`aspect-square rounded-xl flex flex-col items-center justify-center border transition-all ${
                  done ? "bg-gradient-to-br from-primary/30 to-accent/30 border-primary/40" :
                  isToday ? "bg-muted/60 border-primary/60 ring-2 ring-primary/40" :
                  "bg-muted/20 border-border/30"
                }`}>
                  <span className="text-lg">{q.secret ? (streak >= 7 ? "🌟" : "🔒") : done ? "✅" : isToday ? "🎯" : "⭕"}</span>
                  <span className="text-[9px] font-heading text-muted-foreground mt-0.5">D{i + 1}</span>
                </div>
              );
            })}
          </div>
          {streak >= 7 && (
            <div className="mt-4 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-center">
              <p className="font-heading text-sm font-bold text-yellow-400">🎉 SECRET GAME UNLOCKED!</p>
              <Link to="/games/chess" className="text-xs text-muted-foreground font-body hover:text-primary transition-colors">Play Star Members exclusive → Chess Ultimate Mode</Link>
            </div>
          )}
        </motion.div>
      </div>

      {/* Reward popup */}
      {showReward && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-card border border-primary/40 rounded-3xl p-8 text-center shadow-2xl shadow-primary/20 max-w-xs mx-4">
            <div className="text-5xl mb-3">🎯</div>
            <h2 className="font-heading text-2xl font-black text-primary">+{earnedPoints} STAR POINTS!</h2>
            <p className="mt-2 text-sm font-body text-muted-foreground">Quest completed! Streak: {streak} days 🔥</p>
            <button onClick={() => setShowReward(false)}
              className="mt-5 w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-heading text-sm font-bold tracking-wider hover:shadow-xl transition-all">
              AWESOME!
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
