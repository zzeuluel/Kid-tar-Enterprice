import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, Users, Zap } from "lucide-react";
import PullToRefresh from "../components/PullToRefresh";

const GAMES = [
  {
    id: "pacman",
    title: "PAC-MAN",
    description: "Navigate the maze, eat dots, dodge ghosts. Mobile D-pad included!",
    image: "https://media.base44.com/images/public/69cd2b2538ed1a36a259ef4a/9bf673b6c_generated_3b7e4cb9.png",
    tag: "CLASSIC",
    tagColor: "from-yellow-500 to-orange-500",
    players: "1P",
  },
  {
    id: "tetris",
    title: "TETRIS",
    description: "Stack falling blocks and clear rows at lightning speed!",
    image: "https://media.base44.com/images/public/69cd2b2538ed1a36a259ef4a/3ca2e73a2_generated_2eeef961.png",
    tag: "CLASSIC",
    tagColor: "from-cyan-500 to-blue-500",
    players: "1P",
  },
  {
    id: "blockbreaker",
    title: "BLOCK BREAKER",
    description: "Smash bricks with a bouncing ball. Don't let it drop!",
    image: "https://media.base44.com/images/public/69cd2b2538ed1a36a259ef4a/306d4a5a6_generated_image.png",
    tag: "NEW",
    tagColor: "from-pink-500 to-purple-600",
    players: "1P",
  },
  {
    id: "checkers",
    title: "CHECKERS",
    description: "Classic strategy board game with multi-jump support and kings!",
    image: "https://media.base44.com/images/public/69cd2b2538ed1a36a259ef4a/5bfcaa5b5_generated_image.png",
    tag: "NEW",
    tagColor: "from-red-500 to-pink-600",
    players: "2P",
  },
  {
    id: "chess",
    title: "CHESS",
    description: "Full chess with 1-player vs AI or 2-player local mode!",
    image: "https://media.base44.com/images/public/69cd2b2538ed1a36a259ef4a/e4c34fd50_generated_image.png",
    tag: "NEW",
    tagColor: "from-amber-500 to-yellow-600",
    players: "1P / 2P",
  },
  {
    id: "tictactoe",
    title: "TIC TAC TOE",
    description: "The timeless X vs O showdown. Fast, fun, and competitive!",
    image: "https://media.base44.com/images/public/69cd2b2538ed1a36a259ef4a/07ebf58f2_generated_image.png",
    tag: "NEW",
    tagColor: "from-green-500 to-teal-500",
    players: "2P",
  },
  {
    id: "spaceinvaders",
    title: "SPACE INVADERS",
    description: "Defend Earth from waves of alien invaders with your laser cannon!",
    image: "https://images.unsplash.com/photo-1636633762833-5d1658f1e29b?w=400&h=225&fit=crop",
    tag: "NEW",
    tagColor: "from-green-400 to-emerald-600",
    players: "1P",
  },
  {
    id: "firetennis",
    title: "FIRE TENNIS",
    description: "High-energy tennis with power-ups and blazing fire effects!",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=225&fit=crop",
    tag: "NEW",
    tagColor: "from-orange-500 to-red-600",
    players: "2P",
  },
  {
    id: "connect4",
    title: "CONNECT 4",
    description: "Drop discs and outsmart the AI — be first to connect four in a row!",
    image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=225&fit=crop",
    tag: "NEW",
    tagColor: "from-blue-500 to-indigo-600",
    players: "1P / 2P",
  },
  {
    id: "memorymatch",
    title: "MEMORY MATCH",
    description: "Flip cards and find matching pairs — train your memory!",
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=225&fit=crop",
    tag: "NEW",
    tagColor: "from-pink-500 to-rose-600",
    players: "1P",
  },
  {
    id: "minesweeper",
    title: "MINESWEEPER",
    description: "Reveal tiles and avoid the hidden mines in this classic puzzle!",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=225&fit=crop",
    tag: "NEW",
    tagColor: "from-gray-500 to-slate-700",
    players: "1P",
  },
  {
    id: "pong",
    title: "PONG",
    description: "Classic 1v1 paddle game — beat the AI in this timeless arcade hit!",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop",
    tag: "NEW",
    tagColor: "from-white/20 to-slate-600",
    players: "1P",
  },
  {
    id: "infiniterunner",
    title: "INFINITE RUNNER",
    description: "Run, jump and dodge obstacles — how far can you go?",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=225&fit=crop",
    tag: "NEW",
    tagColor: "from-emerald-500 to-green-700",
    players: "1P",
  },
  {
    id: "trace",
    title: "TRACE — SYSTEM PROTOCOL",
    description: "Navigate a neon cyber maze. Avoid walls and survive as long as possible!",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=225&fit=crop",
    tag: "NEW",
    tagColor: "from-cyan-400 to-blue-600",
    players: "1P",
  },
];

export default function Games() {
  return (
    <PullToRefresh onRefresh={() => window.location.reload()}>
    <div className="min-h-screen py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header — Twitch/YouTube style */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-2 h-8 rounded-full bg-gradient-to-b from-primary to-accent" />
            <h1 className="font-heading text-2xl sm:text-3xl font-black tracking-wider text-foreground">ARCADE ZONE</h1>
          </div>
          <p className="ml-5 text-sm text-muted-foreground font-body">Free browser games — no download needed</p>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GAMES.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
            >
              <Link to={`/games/${game.id}`} className="group block">
                <div className="relative rounded-xl overflow-hidden border border-border/50 bg-card hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/90 backdrop-blur-sm shadow-2xl">
                        <Play className="w-4 h-4 text-white fill-white" />
                        <span className="text-white font-heading text-xs font-bold tracking-wider">PLAY NOW</span>
                      </div>
                    </div>
                    {/* Tag badge */}
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-heading font-bold text-white bg-gradient-to-r ${game.tagColor}`}>
                        {game.tag}
                      </span>
                    </div>
                    {/* Players badge */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm">
                      <Users className="w-2.5 h-2.5 text-white/70" />
                      <span className="text-[10px] font-body text-white/70">{game.players}</span>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-heading text-sm font-bold tracking-wide text-foreground group-hover:text-primary transition-colors">{game.title}</h3>
                        <p className="mt-1 text-xs text-muted-foreground font-body line-clamp-2">{game.description}</p>
                      </div>
                      <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </PullToRefresh>
  );
}
