import { useNavigate } from "react-router-dom";
import { ArrowLeft, Maximize2, Minimize2, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";

const GAMES = {
  pacman: {
    title: "PAC-MAN",
    src: "https://media.base44.com/files/public/69cd2b2538ed1a36a259ef4a/23b917ba1_pacman_game2.html",
  },
  tetris: {
    title: "TETRIS",
    src: "https://media.base44.com/files/public/69cd2b2538ed1a36a259ef4a/50c1f848c_tetris_game1.html",
  },
  blockbreaker: {
    title: "BLOCK BREAKER",
    src: "https://media.base44.com/files/public/69cd2b2538ed1a36a259ef4a/3345caa5a_block_breaker.html",
  },
  checkers: {
    title: "CHECKERS",
    src: "https://media.base44.com/files/public/69cd2b2538ed1a36a259ef4a/09ece7afd_multi_jump_checkers.html",
  },
  chess: {
    title: "CHESS",
    src: "https://media.base44.com/files/public/69cd2b2538ed1a36a259ef4a/51a3f01bf_chess_1p_2p.html",
  },
  tictactoe: {
    title: "TIC TAC TOE",
    src: "https://media.base44.com/files/public/69cd2b2538ed1a36a259ef4a/16cf264e2_neon_ttt.html",
  },
  spaceinvaders: {
    title: "SPACE INVADERS",
    src: "https://media.base44.com/files/public/69cd2b2538ed1a36a259ef4a/a92ed0c9f_space_invaders.html",
  },
  firetennis: {
    title: "FIRE TENNIS",
    src: "https://media.base44.com/files/public/69cd2b2538ed1a36a259ef4a/78b07fe39_fire_tennis.html",
  },
  connect4: {
    title: "CONNECT 4",
    src: "https://media.base44.com/files/public/69cd2b2538ed1a36a259ef4a/7c10005bf_connect4_ai.html",
  },
  memorymatch: {
    title: "MEMORY MATCH",
    src: "https://media.base44.com/files/public/69cd2b2538ed1a36a259ef4a/b1a31c060_memory_match.html",
  },
  minesweeper: {
    title: "MINESWEEPER",
    src: "https://media.base44.com/files/public/69cd2b2538ed1a36a259ef4a/c1d691c3c_minesweeper1.html",
  },
  pong: {
    title: "PONG",
    src: "https://media.base44.com/files/public/69cd2b2538ed1a36a259ef4a/fe171d8d6_pong_game.html",
  },
  infiniterunner: {
    title: "INFINITE RUNNER",
    src: "https://media.base44.com/files/public/69cd2b2538ed1a36a259ef4a/1d7053a81_infinite_runner.html",
  },
  trace: {
    title: "TRACE — SYSTEM PROTOCOL",
    src: "https://media.base44.com/files/public/69cd2b2538ed1a36a259ef4a/08e6c8085_trace_game.html",
  },
};

export default function GamePlayer() {
  const urlParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const path = window.location.pathname;
  const gameId = path.split("/").pop();
  const game = GAMES[gameId];
  const [fullscreen, setFullscreen] = useState(false);
  const [srcdoc, setSrcdoc] = useState("");
  const [playSeconds, setPlaySeconds] = useState(0);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setPlaySeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (playSeconds >= 40 * 60 && !rewardClaimed) {
      setRewardClaimed(true);
      setShowReward(true);
      claimReward();
    }
  }, [playSeconds, rewardClaimed]);

  const claimReward = async () => {
    const me = await base44.auth.me();
    const profiles = await base44.entities.UserProfile.filter({ user_email: me.email });
    if (profiles.length > 0) {
      await base44.entities.UserProfile.update(profiles[0].id, {
        star_points: (profiles[0].star_points || 0) + 50,
        last_login_reward: new Date().toISOString().split('T')[0],
      });
    }
  };

  useEffect(() => {
    if (!game) return;
    fetch(game.src)
      .then((r) => r.text())
      .then((html) => setSrcdoc(html))
      .catch(() => setSrcdoc(`<html><body style='background:black;color:white;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;'><p>Failed to load game.</p></body></html>`));
  }, [game?.src]);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-body">Game not found</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${fullscreen ? "fixed inset-0 z-[100] bg-background" : ""}`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border/50 bg-background/90 backdrop-blur-sm ${fullscreen ? "" : ""}`}>
        <button
          onClick={() => navigate("/games")}
          className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Games
        </button>

        <h1 className="font-heading text-lg font-bold tracking-wider bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {game.title}
        </h1>

        <button
          onClick={() => setFullscreen(!fullscreen)}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Game iframe */}
      <div className={`flex items-center justify-center ${fullscreen ? "h-[calc(100vh-57px)]" : "h-[calc(100vh-120px)]"} bg-black/50`}>
        {srcdoc ? (
          <iframe
            srcDoc={srcdoc}
            title={game.title}
            className="w-full h-full max-w-[700px] border-0"
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Controls hint */}
      {!fullscreen && (
        <div className="text-center py-3 bg-muted/30 border-t border-border/50">
          <p className="text-xs font-body text-muted-foreground">
            Use <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[10px] font-mono">↑</kbd>{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[10px] font-mono">↓</kbd>{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[10px] font-mono">←</kbd>{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[10px] font-mono">→</kbd>{" "}
            arrow keys to play
          </p>
          <p className="text-[10px] text-muted-foreground/60 font-body mt-1">
            ⏱️ {Math.floor(playSeconds / 60)}m {playSeconds % 60}s played
            {!rewardClaimed && ` • Play 40 min to earn ⚡50 Star Points`}
          </p>
        </div>
      )}

      {/* Reward popup */}
      {showReward && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-primary/40 rounded-3xl p-8 text-center shadow-2xl shadow-primary/20 max-w-xs mx-4">
            <div className="text-5xl mb-3">⚡</div>
            <h2 className="font-heading text-2xl font-black tracking-wider text-primary">+50 STAR POINTS!</h2>
            <p className="mt-2 text-sm font-body text-muted-foreground">You played for 40 minutes. Daily reward claimed! 🎉</p>
            <button
              onClick={() => setShowReward(false)}
              className="mt-5 w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-heading text-sm font-bold tracking-wider hover:shadow-xl transition-all"
            >
              AWESOME!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
