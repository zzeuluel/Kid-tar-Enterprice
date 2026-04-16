import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, BookOpen, Laugh, Image, Loader2, Download, Music } from "lucide-react";
import { base44 } from "@/api/base44Client";

const TABS = [
  { id: "story", label: "Story", icon: BookOpen },
  { id: "joke", label: "Jokes", icon: Laugh },
  { id: "image", label: "Image", icon: Image },
  { id: "music", label: "Music", icon: Music },
];

const DURATIONS = ["30 seconds", "1 minute", "2 minutes", "3 minutes", "4 minutes", "5 minutes", "6 minutes"];
const MALE_VOCALS = ["Kid$tar", "Leo Johnson"];
const FEMALE_VOCALS = ["Ella Brownstone", "Sophia Brownstone"];

const STORY_PROMPTS = ["A robot who learns to dance", "A dragon who is afraid of fire", "A kid who discovers a hidden door", "A space explorer who finds a candy planet"];
const JOKE_TOPICS = ["Animals", "School", "Space", "Food", "Superheroes"];

export default function Create() {
  const [tab, setTab] = useState("story");

  // Story
  const [storyPrompt, setStoryPrompt] = useState("");
  const [story, setStory] = useState("");
  const [loadingStory, setLoadingStory] = useState(false);

  // Joke
  const [jokeTopic, setJokeTopic] = useState("Animals");
  const [joke, setJoke] = useState("");
  const [loadingJoke, setLoadingJoke] = useState(false);

  // Image
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);

  // Music
  const [musicStyle, setMusicStyle] = useState("");
  const [musicDuration, setMusicDuration] = useState("1 minute");
  const [maleVocal, setMaleVocal] = useState(null);
  const [femaleVocal, setFemaleVocal] = useState(null);
  const [songLyrics, setSongLyrics] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [loadingMusic, setLoadingMusic] = useState(false);

  const generateStory = async () => {
    if (!storyPrompt.trim()) return;
    setLoadingStory(true);
    setStory("");
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `Write a fun, imaginative short story for kids (ages 6-12) about: "${storyPrompt}". Make it exciting, colorful and about 150 words. End with a happy ending.`,
    });
    setStory(res);
    setLoadingStory(false);
  };

  const generateJoke = async () => {
    setLoadingJoke(true);
    setJoke("");
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `Tell me 3 funny, kid-friendly jokes about ${jokeTopic}. Number them 1, 2, 3. Make them silly and appropriate for children ages 5-12.`,
    });
    setJoke(res);
    setLoadingJoke(false);
  };

  const generateSong = async () => {
    setLoadingMusic(true);
    setSongLyrics("");
    setSongTitle("");
    const vocalists = [maleVocal, femaleVocal].filter(Boolean).join(" and ") || "solo artist";
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `Create a full song for a ${musicDuration} track in the style of: "${musicStyle || "pop rock"}". 
Vocalists: ${vocalists}.
Include:
- A catchy song title on the first line as "Title: [name]"
- Verse 1, Pre-Chorus, Chorus, Verse 2, Bridge, Final Chorus with full lyrics
- Mark each section clearly
- Make the lyrics energetic, fun and appropriate for all ages
- Scale the length of lyrics to fill approximately ${musicDuration} of singing`,
    });
    const titleMatch = res.match(/Title:\s*(.+)/i);
    setSongTitle(titleMatch ? titleMatch[1].trim() : "My Song");
    setSongLyrics(res);
    setLoadingMusic(false);
  };

  const downloadLyrics = () => {
    const blob = new Blob([songLyrics], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${songTitle || "song"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateImage = async () => {
    if (!imagePrompt.trim()) return;
    setLoadingImage(true);
    setImageUrl("");
    const res = await base44.integrations.Core.GenerateImage({
      prompt: `Kid-friendly, colorful, cartoon-style illustration: ${imagePrompt}. Bright colors, fun and whimsical style.`,
    });
    setImageUrl(res.url);
    setLoadingImage(false);
  };

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-primary shadow-2xl shadow-accent/30 mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-black tracking-wider bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
            CREATIVE STUDIO
          </h1>
          <p className="mt-2 text-sm text-muted-foreground font-body">Generate stories, jokes & art with AI magic ✨</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-muted/40 rounded-2xl p-1.5">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-heading font-bold tracking-wide transition-all ${
                tab === id ? "bg-card text-primary shadow-lg" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Story Tab */}
        {tab === "story" && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="rounded-2xl border border-border/50 bg-card p-6">
              <p className="font-heading text-sm font-bold text-foreground mb-3">What's your story about?</p>
              <input
                value={storyPrompt}
                onChange={e => setStoryPrompt(e.target.value)}
                placeholder="E.g. A dragon who learns to cook..."
                className="w-full px-4 py-3 rounded-xl bg-muted/60 border border-border/50 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {STORY_PROMPTS.map(p => (
                  <button key={p} onClick={() => setStoryPrompt(p)}
                    className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-body text-primary hover:bg-primary/20 transition-colors">
                    {p}
                  </button>
                ))}
              </div>
              <button
                onClick={generateStory}
                disabled={loadingStory || !storyPrompt.trim()}
                className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-heading text-sm font-bold tracking-wider disabled:opacity-50 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                {loadingStory ? <><Loader2 className="w-4 h-4 animate-spin" /> Writing Story...</> : <><Sparkles className="w-4 h-4" /> Generate Story</>}
              </button>
            </div>
            {story && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-accent/30 bg-card/80 p-6">
                <p className="font-heading text-xs font-bold text-accent tracking-widest mb-3">YOUR STORY ✨</p>
                <p className="text-sm font-body text-foreground leading-relaxed whitespace-pre-wrap">{story}</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Joke Tab */}
        {tab === "joke" && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="rounded-2xl border border-border/50 bg-card p-6">
              <p className="font-heading text-sm font-bold text-foreground mb-3">Pick a topic</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {JOKE_TOPICS.map(t => (
                  <button key={t} onClick={() => setJokeTopic(t)}
                    className={`px-4 py-2 rounded-xl text-sm font-heading font-bold transition-all ${
                      jokeTopic === t ? "bg-primary text-white shadow-lg" : "bg-muted/60 text-muted-foreground hover:text-foreground"
                    }`}>
                    {t}
                  </button>
                ))}
              </div>
              <button
                onClick={generateJoke}
                disabled={loadingJoke}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-primary text-white font-heading text-sm font-bold tracking-wider disabled:opacity-50 hover:shadow-xl transition-all"
              >
                {loadingJoke ? <><Loader2 className="w-4 h-4 animate-spin" /> Loading Laughs...</> : <><Laugh className="w-4 h-4" /> Make Me Laugh!</>}
              </button>
            </div>
            {joke && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-secondary/30 bg-card/80 p-6">
                <p className="font-heading text-xs font-bold text-secondary tracking-widest mb-3">😂 JOKES FOR YOU</p>
                <p className="text-sm font-body text-foreground leading-relaxed whitespace-pre-wrap">{joke}</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Image Tab */}
        {tab === "image" && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="rounded-2xl border border-border/50 bg-card p-6">
              <p className="font-heading text-sm font-bold text-foreground mb-3">Describe your picture</p>
              <input
                value={imagePrompt}
                onChange={e => setImagePrompt(e.target.value)}
                placeholder="E.g. A cute rainbow dragon flying over a candy city..."
                className="w-full px-4 py-3 rounded-xl bg-muted/60 border border-border/50 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              />
              <button
                onClick={generateImage}
                disabled={loadingImage || !imagePrompt.trim()}
                className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-secondary to-primary text-white font-heading text-sm font-bold tracking-wider disabled:opacity-50 hover:shadow-xl transition-all"
              >
                {loadingImage ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating Art...</> : <><Image className="w-4 h-4" /> Generate Image</>}
              </button>
            </div>
            {imageUrl && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl overflow-hidden border border-secondary/30">
                <img src={imageUrl} alt="Generated art" className="w-full object-cover" />
                <div className="bg-card p-4 flex justify-between items-center">
                  <p className="text-xs font-body text-muted-foreground">Your AI masterpiece 🎨</p>
                  <a href={imageUrl} download target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-heading font-bold hover:bg-primary/20 transition-colors">
                    <Download className="w-3.5 h-3.5" /> Save
                  </a>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Music Tab */}
        {tab === "music" && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="rounded-2xl border border-border/50 bg-card p-6 space-y-5">
              {/* Style input */}
              <div>
                <p className="font-heading text-sm font-bold text-foreground mb-2">Music Style / Vibe</p>
                <input
                  value={musicStyle}
                  onChange={e => setMusicStyle(e.target.value)}
                  placeholder="E.g. Pop rock, hip hop, R&B, EDM, country..."
                  className="w-full px-4 py-3 rounded-xl bg-muted/60 border border-border/50 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                />
              </div>

              {/* Duration */}
              <div>
                <p className="font-heading text-sm font-bold text-foreground mb-2">Song Duration</p>
                <div className="flex flex-wrap gap-2">
                  {DURATIONS.map(d => (
                    <button key={d} onClick={() => setMusicDuration(d)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-heading font-bold transition-all ${
                        musicDuration === d ? "bg-primary text-white shadow-lg" : "bg-muted/60 text-muted-foreground hover:text-foreground"
                      }`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Male Vocals */}
              <div>
                <p className="font-heading text-sm font-bold text-foreground mb-2">🎤 Male Vocals</p>
                <div className="flex gap-2">
                  {MALE_VOCALS.map(v => (
                    <button key={v} onClick={() => setMaleVocal(maleVocal === v ? null : v)}
                      className={`px-4 py-2 rounded-xl text-sm font-heading font-bold transition-all border ${
                        maleVocal === v ? "bg-secondary text-white border-secondary shadow-lg" : "bg-muted/40 text-muted-foreground border-border/50 hover:text-foreground"
                      }`}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Female Vocals */}
              <div>
                <p className="font-heading text-sm font-bold text-foreground mb-2">🎤 Female Vocals</p>
                <div className="flex gap-2">
                  {FEMALE_VOCALS.map(v => (
                    <button key={v} onClick={() => setFemaleVocal(femaleVocal === v ? null : v)}
                      className={`px-4 py-2 rounded-xl text-sm font-heading font-bold transition-all border ${
                        femaleVocal === v ? "bg-accent text-white border-accent shadow-lg" : "bg-muted/40 text-muted-foreground border-border/50 hover:text-foreground"
                      }`}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateSong}
                disabled={loadingMusic}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-heading text-sm font-bold tracking-wider disabled:opacity-50 hover:shadow-xl transition-all"
              >
                {loadingMusic ? <><Loader2 className="w-4 h-4 animate-spin" /> Writing Song...</> : <><Music className="w-4 h-4" /> Generate Song</>}
              </button>
            </div>

            {songLyrics && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-primary/30 bg-card/80 p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="font-heading text-xs font-bold text-primary tracking-widest">🎵 YOUR SONG</p>
                    <p className="font-heading text-xl font-black text-foreground mt-1">{songTitle}</p>
                    <p className="text-xs text-muted-foreground font-body mt-0.5">
                      {[maleVocal, femaleVocal].filter(Boolean).join(" & ") || "Solo"} · {musicDuration}
                    </p>
                  </div>
                  <button onClick={downloadLyrics}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary/10 text-primary text-xs font-heading font-bold hover:bg-primary/20 transition-colors flex-shrink-0">
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                </div>
                <pre className="text-sm font-body text-foreground leading-relaxed whitespace-pre-wrap">{songLyrics}</pre>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
