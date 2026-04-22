import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Music2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import TrackRow from "../components/TrackRow";

function TrackSkeleton() {
  return (
    <div className="flex items-center gap-4 px-4 py-3.5 animate-pulse">
      <div className="w-8 h-8 bg-muted rounded-full" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3 bg-muted rounded w-2/3" />
      </div>
      <div className="h-3 bg-muted rounded w-8" />
    </div>);

}

const ALBUM_COVER = "https://media.base44.com/images/public/69cd2b2538ed1a36a259ef4a/1e79e8d8d_generated_25eea51f.png";

const tracks = [
{ title: "Ignition", duration: "2:01", videoId: "_2g44uCuJTs" },
{ title: "Burning Up the Floor", duration: "2:50", videoId: "WdMrVSgwJuE" },
{ title: "No Chains on Me", duration: "2:11", videoId: "Ja8iiLSbQ3c" },
{ title: "Electric Shadows", duration: "3:17", videoId: "4a_Oi1CGoi0" },
{ title: "Face the Fire", duration: "2:49", videoId: "TJj8DC1h1Cs" },
{ title: "Heatwave", duration: "2:50", videoId: "sevxRF12aNo" },
{ title: "Step in the Light", duration: "2:50", videoId: "Lpj4kXzZZQc" },
{ title: "Heart on Fire", duration: "3:04", videoId: "LBJUVgFO6z8" },
{ title: "Fever Dream", duration: "3:12", videoId: "mvv0YOFAyFE" },
{ title: "Blaze of Glory", duration: "2:54", videoId: "uzt2C-k6MDA" }];


export default function Music() {
  const [loading] = useState(false);
  return (
    <div className="min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Album Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-8 mb-12">
          
          <div className="relative group">
            <img
              src={ALBUM_COVER}
              alt="Rhythm & Fire album cover"
              className="w-52 h-52 sm:w-60 sm:h-60 rounded-2xl object-cover shadow-2xl shadow-primary/20" />
            
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="text-center sm:text-left">
            <p className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-widest mb-2">
              Album • 2026
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl font-black tracking-wider bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              RHYTHM & FIRE
            </h1>
            <p className="mt-2 text-lg font-body text-foreground font-medium">
              Kid$tar
            </p>
            <p className="mt-1 text-sm font-body text-muted-foreground">
              10 songs • 27 minutes
            </p>

            <a
              href="https://music.youtube.com/playlist?list=OLAK5uy_l_KFkaEOqyBuUwTzTpLkQV2WT4iY4rUzA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-heading text-xs font-bold tracking-wider hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5">
              
              <Music2 className="w-4 h-4" />
              PLAY ON YOUTUBE MUSIC
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Track List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
          
          <div className="px-4 py-3 border-b border-border/50">
            <p className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-widest">
              Tracklist
            </p>
          </div>
          <div className="divide-y divide-border/30">
            {loading ?
            Array.from({ length: 10 }).map((_, i) => <TrackSkeleton key={i} />) :
            tracks.map((track, i) =>
            <TrackRow
              key={track.videoId}
              number={i + 1}
              title={track.title}
              duration={track.duration}
              videoId={track.videoId}
              delay={i * 0.05} />

            )}
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <p className="text-xs font-body text-muted-foreground/60">Tap any track to listen on YouTube Music and Chruch Music Section will be on next month

          </p>
        </div>

        {/* Mecha Brownstone Drift Snippet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 rounded-2xl border border-border/50 bg-card overflow-hidden">
          
          <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
            <div>
              <p className="font-heading text-sm font-bold tracking-wider text-foreground">MECHA BROWNSTONE DRIFT</p>
              <p className="text-xs text-muted-foreground font-body mt-0.5">Bedrock Directive</p>
            </div>
            <Link to="/mecha-brownstone-drift" className="text-xs font-heading font-bold text-primary hover:underline">View Band →</Link>
          </div>
          <div className="aspect-video">
            <iframe
              src="https://www.youtube.com/embed/KwHBWJP83Q0"
              title="Bedrock Directive - Mecha Brownstone Drift"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen />
            
          </div>
        </motion.div>

        {/* Rise from the Fire - New Album */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-10 rounded-3xl border border-secondary/40 bg-gradient-to-br from-card via-card to-secondary/5 overflow-hidden shadow-2xl shadow-secondary/10 p-6 sm:p-8">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 mb-4">
            <Sparkles className="w-3 h-3 text-secondary" />
            <span className="text-[10px] font-heading font-bold text-secondary tracking-widest uppercase">New Album • Coming Soon</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-black tracking-wider text-foreground">RISE FROM THE FIRE</h2>
          <p className="mt-1 text-sm font-body text-muted-foreground">Kid$tar</p>
          <p className="mt-3 text-sm font-body text-muted-foreground/80 leading-relaxed">
            The highly anticipated new album — coming soon to all major music streaming platforms. 🔥
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="https://music.youtube.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-heading text-xs font-bold tracking-wider hover:shadow-xl transition-all hover:-translate-y-0.5">
              <Music2 className="w-3.5 h-3.5" /> YouTube Music <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-500 text-white font-heading text-xs font-bold tracking-wider transition-all hover:-translate-y-0.5">
              🎵 Spotify <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://music.amazon.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-heading text-xs font-bold tracking-wider transition-all hover:-translate-y-0.5">
              🎶 Amazon Music <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>

        {/* NEW RULES ALBUM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48 }}
          className="mt-10 rounded-3xl border border-primary/40 bg-gradient-to-br from-card via-card to-primary/5 overflow-hidden shadow-2xl shadow-primary/20">
          <div className="flex flex-col sm:flex-row items-center gap-0">
            <div className="relative w-full sm:w-56 flex-shrink-0">
              <img
                src="https://media.base44.com/images/public/69cd2b2538ed1a36a259ef4a/56339fce6_Gemini_Generated_Image_xqsfjxqsfjxqsfjx.png"
                alt="New Rules album cover"
                className="w-full sm:w-56 h-56 object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card hidden sm:block" />
            </div>
            <div className="p-6 sm:p-8 flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 mb-3">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-[10px] font-heading font-bold text-primary tracking-widest uppercase">New Album • Coming Soon</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-black tracking-wider text-foreground">NEW RULES</h2>
              <p className="mt-1 text-sm font-body text-muted-foreground">Kid$tar · Time to Change the Game</p>
              <div className="mt-3 space-y-1">
                {["New Rules", "Shut it Down", "Rowboat", "Static", "Cool as Chrome", "Velvet Afterglow"].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-body text-muted-foreground">
                    <span className="w-4 text-right text-primary/60 font-heading font-bold">{i + 1}</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="https://drive.google.com/drive/folders/1O3TvKMzDiwkqbIgyI_HoMbk_i6X_GoIu?usp=sharing"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-heading text-xs font-bold tracking-wider hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
                  <Music2 className="w-3.5 h-3.5" /> Listen Now <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
          {/* Embedded Drive Folder Player */}
          <div className="border-t border-border/30">
            <iframe
              src="https://drive.google.com/embeddedfolderview?id=1O3TvKMzDiwkqbIgyI_HoMbk_i6X_GoIu#list"
              className="w-full"
              style={{ height: "260px", border: "none" }}
              title="New Rules - Track Player"
            />
          </div>
        </motion.div>

        {/* Rowboat Single */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 overflow-hidden shadow-2xl shadow-primary/10">
          
          <div className="flex flex-col sm:flex-row items-center gap-0">
            <div className="relative w-full sm:w-56 flex-shrink-0">
              <img
                src="https://media.base44.com/images/public/69cd2b2538ed1a36a259ef4a/41364b7a1_Gemini_Generated_Image_ibyg6bibyg6bibyg.png"
                alt="Rowboat single cover"
                className="w-full sm:w-56 h-56 object-cover object-top" />
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card hidden sm:block" />
            </div>
            <div className="p-6 sm:p-8 flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 mb-3">
                <Sparkles className="w-3 h-3 text-accent" />
                <span className="text-[10px] font-heading font-bold text-accent tracking-widest uppercase">New Single • Coming Soon</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-black tracking-wider text-foreground">ROWBOAT</h2>
              <p className="mt-1 text-sm font-body text-muted-foreground">Kid$tar · feat. Michael Jackson &amp; Sophia Brownstone</p>
              <p className="mt-3 text-sm font-body text-muted-foreground/80 leading-relaxed">
                The highly anticipated new single — coming soon to YouTube Music &amp; Spotify. 🚀
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="https://music.youtube.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-heading text-xs font-bold tracking-wider hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
                  <Music2 className="w-3.5 h-3.5" /> YouTube Music <ExternalLink className="w-3 h-3" />
                </a>
                <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-heading text-xs font-bold tracking-wider transition-all hover:-translate-y-0.5">
                  🎵 Spotify <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>);

}
