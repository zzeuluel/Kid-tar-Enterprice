import { motion } from "framer-motion";
import { Gamepad2, Zap, Trophy, Target, Star, Play } from "lucide-react";
import { Link } from "react-router-dom";

const FEATURED = [
  { id: "pacman", title: "PAC-MAN", emoji: "👾", tag: "HOT", tagColor: "from-yellow-500 to-orange-500", desc: "Eat dots, dodge ghosts!", pts: "+50 pts/40min" },
  { id: "chess", title: "CHESS", emoji: "♟️", tag: "STRATEGY", tagColor: "from-blue-500 to-indigo-600", desc: "Outsmart the AI champion", pts: "+50 pts/40min" },
  { id: "tetris", title: "TETRIS", emoji: "🟦", tag: "CLASSIC", tagColor: "from-cyan-500 to-blue-500", desc: "Stack and clear lines!", pts: "+50 pts/40min" },
  { id: "infiniterunner", title: "INFINITE RUNNER", emoji: "🏃", tag: "ENDLESS", tagColor: "from-green-500 to-emerald-600", desc: "How far can you go?", pts: "+50 pts/40min" },
];

const ALL_GAMES = [
  { id: "pacman", emoji: "👾", title: "PAC-MAN" },
  { id: "tetris", emoji: "🟦", title: "TETRIS" },
  { id: "blockbreaker", emoji: "🧱", title: "BLOCK BREAKER" },
  { id: "checkers", emoji: "🔴", title: "CHECKERS" },
  { id: "chess", emoji: "♟️", title: "CHESS" },
  { id: "tictactoe", emoji: "❌", title: "TIC TAC TOE" },
  { id: "spaceinvaders", emoji: "👽", title: "SPACE INVADERS" },
  { id: "firetennis", emoji: "🎾", title: "FIRE TENNIS" },
  { id: "connect4", emoji: "🔵", title: "CONNECT 4" },
  { id: "memorymatch", emoji: "🃏", title: "MEMORY MATCH" },
  { id: "minesweeper", emoji: "💣", title: "MINESWEEPER" },
  { id: "pong", emoji: "🏓", title: "PONG" },
  { id: "infiniterunner", emoji: "🏃", title: "INFINITE RUNNER" },
];

export default function ArcadeCenter() {
  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary via-accent to-secondary shadow-2xl shadow-primary/40 mb-4 relative">
            <Gamepad2 className="w-10 h-10 text-white" />
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-bold">⚡</div>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-black tracking-wider bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            KIDSTAR ARCADE
          </h1>
          <p className="mt-2 text-sm text-muted-foreground font-body">The ultimate gaming zone — earn Star Points playing!</p>
        </motion.div>

        {/* Earn Points Banner */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 to-primary/10 p-5 mb-8 flex items-center gap-4">
          <div className="text-4xl">⚡</div>
          <div>
            <p className="font-heading text-base font-bold text-foreground">Play 40 minutes = +50 Star Points!</p>
            <p className="text-xs font-body text-muted-foreground mt-0.5">Points can be spent in the Store & Restaurant 🛒</p>
          </div>
          <Link to="/leaderboard" className="ml-auto flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-heading font-bold hover:bg-yellow-500/30 transition-colors">
            <Trophy className="w-3.5 h-3.5" /> Leaderboard
          </Link>
        </motion.div>

        {/* Featured Games */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-lg font-bold tracking-wider text-foreground">FEATURED GAMES</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURED.map((game, i) => (
              <motion.div key={game.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Link to={`/games/${game.id}`}
                  className="group block rounded-2xl border border-border/50 bg-card p-5 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{game.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-heading font-bold text-white bg-gradient-to-r ${game.tagColor}`}>{game.tag}</span>
                      </div>
                      <p className="font-heading text-sm font-bold text-foreground group-hover:text-primary transition-colors">{game.title}</p>
                      <p className="text-xs text-muted-foreground font-body">{game.desc}</p>
                      <p className="text-[10px] text-yellow-400 font-heading mt-1">{game.pts}</p>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-3.5 h-3.5 fill-primary" />
                      <span className="text-xs font-heading font-bold">PLAY</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* All Games Grid */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Gamepad2 className="w-5 h-5 text-accent" />
            <h2 className="font-heading text-lg font-bold tracking-wider text-foreground">ALL GAMES ({ALL_GAMES.length})</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ALL_GAMES.map((game, i) => (
              <motion.div key={game.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Link to={`/games/${game.id}`}
                  className="group flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-card hover:border-primary/40 hover:bg-primary/5 transition-all">
                  <span className="text-2xl">{game.emoji}</span>
                  <p className="font-heading text-xs font-bold text-foreground group-hover:text-primary transition-colors leading-tight">{game.title}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Daily Quest CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="mt-8 rounded-2xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-red-500/10 p-5 flex items-center gap-4">
          <div className="text-4xl">🎯</div>
          <div className="flex-1">
            <p className="font-heading text-base font-bold text-foreground">Don't forget your Daily Quest!</p>
            <p className="text-xs font-body text-muted-foreground mt-0.5">Build a streak for bonus rewards & secret unlocks 🔥</p>
          </div>
          <Link to="/daily-quest"
            className="flex-shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-heading text-xs font-bold hover:shadow-lg transition-all">
            Quest →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
