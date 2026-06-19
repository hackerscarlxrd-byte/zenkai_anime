import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Minimize, 
  FastForward, SkipForward, Settings, Loader2
} from 'lucide-react';
import PropTypes from 'prop-types';

const INTRO_SHOW_AT = 5;
const INTRO_HIDE_AT = 90;
const FALLBACK_ENDING_SHOW_AT = 1260; // Typical 21:00 min

const formatTime = (timeInSeconds) => {

  if (Number.isNaN(timeInSeconds)) return "00:00";
  const m = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
  const s = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

export default function CustomVideoPlayer({ 
  src, 
  title, 
  poster, 
  onNextEpisode, 
  hasNextEpisode,
  onAutoNext,
  initialTime = 0,
  onTimeUpdateCallback
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isWaiting, setIsWaiting] = useState(true);
  
  const controlsTimeoutRef = useRef(null);
  const autoNextTriggeredRef = useRef(false);

  useEffect(() => {
    autoNextTriggeredRef.current = false;
  }, [src]);

  // Auto-hide controls
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  const handleMouseLeave = () => {
    if (isPlaying) setShowControls(false);
  };

  // Playback
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    setCurrentTime(current);
    setProgress((current / dur) * 100);
    
    // Notify parent
    if (onTimeUpdateCallback) onTimeUpdateCallback(current);
    
    // Auto Next when 10 seconds remaining
    if (dur > 0 && current >= dur - 10 && hasNextEpisode && !autoNextTriggeredRef.current) {
      autoNextTriggeredRef.current = true;
      onAutoNext && onAutoNext();
    }
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const seekTo = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTo;
    setProgress(e.target.value);
  };

  const handleVolumeChange = (e) => {
    if (!videoRef.current) return;
    const vol = Number.parseFloat(e.target.value);
    videoRef.current.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    if (newMuted) setVolume(0);
    else {
      videoRef.current.volume = 1;
      setVolume(1);
    }
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else {
      containerRef.current.requestFullscreen().catch(err => console.log(err));
      setIsFullscreen(true);
    }
  };

  const handleSkipIntro = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(videoRef.current.currentTime, INTRO_HIDE_AT);
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        toggleMute();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        if (videoRef.current) videoRef.current.currentTime += 10;
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        if (videoRef.current) videoRef.current.currentTime -= 10;
      }
    };
    globalThis.addEventListener('keydown', handleKeyDown);
    return () => globalThis.removeEventListener('keydown', handleKeyDown);
  }, [isMuted, isFullscreen]);

  // Visibility states for overlay buttons
  const dynamicEndingShowAt = duration > 0 ? duration - 90 : FALLBACK_ENDING_SHOW_AT;
  const showSkipIntro = currentTime >= INTRO_SHOW_AT && currentTime < INTRO_HIDE_AT;
  const showSkipEnding = currentTime >= dynamicEndingShowAt && hasNextEpisode && currentTime < (duration > 0 ? duration - 10 : FALLBACK_ENDING_SHOW_AT + 80);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden group shadow-2xl shadow-black/60 border border-white/5"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onPointerDown={() => { if(!showControls) setShowControls(true) }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain cursor-pointer"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={(e) => {
          setDuration(e.target.duration);
          if (initialTime > 0) {
            e.target.currentTime = initialTime;
          }
          setIsWaiting(false);
        }}
        onWaiting={() => setIsWaiting(true)}
        onPlaying={() => setIsWaiting(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          if (hasNextEpisode && !autoNextTriggeredRef.current) {
            autoNextTriggeredRef.current = true;
            onAutoNext && onAutoNext();
          }
        }}
        autoPlay
      >
        <track kind="captions" />
      </video>

      {/* Loading Spinner */}
      {isWaiting && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/40 backdrop-blur-sm z-10">
          <Loader2 size={48} className="text-primary animate-spin" />
        </div>
      )}

      {/* Skip Intro Button */}
      <AnimatePresence>
        {showSkipIntro && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={(e) => { e.stopPropagation(); handleSkipIntro(); }}
            className="absolute bottom-24 right-6 z-30 flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/20 text-white font-black text-xs px-5 py-3 rounded-xl hover:bg-white hover:text-black transition-colors uppercase tracking-widest"
          >
            <FastForward size={16} /> Saltar Opening
          </motion.button>
        )}
      </AnimatePresence>

      {/* Skip Ending Button */}
      <AnimatePresence>
        {showSkipEnding && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={(e) => { e.stopPropagation(); onNextEpisode && onNextEpisode(); }}
            className="absolute bottom-24 right-6 z-30 flex items-center gap-2 bg-primary/90 backdrop-blur-md border border-primary/50 text-white font-black text-xs px-5 py-3 rounded-xl hover:bg-primary transition-colors uppercase tracking-widest shadow-lg shadow-primary/30"
          >
            <SkipForward size={16} /> Siguiente Episodio
          </motion.button>
        )}
      </AnimatePresence>

      {/* Controls Overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 transition-opacity duration-300 z-20 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-full max-w-5xl mx-auto space-y-4">
          
          {/* Top of controls: Title (Only visible when paused) */}
          {!isPlaying && title && (
            <div className="absolute top-6 left-6 right-6">
              <h2 className="text-white font-display font-black text-2xl italic tracking-tight drop-shadow-lg">{title}</h2>
            </div>
          )}

          {/* Progress Bar */}
          <div className="flex items-center gap-4 group/progress cursor-pointer">
            <span className="text-white font-bold text-xs tracking-wider">{formatTime(currentTime)}</span>
            <div className="relative flex-1 h-1.5 bg-white/20 rounded-full overflow-visible flex items-center transition-all group-hover/progress:h-2.5">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div 
                className="absolute h-full bg-primary rounded-full pointer-events-none transition-all"
                style={{ width: `${progress}%` }}
              />
              <div 
                className="absolute h-3 w-3 bg-white rounded-full pointer-events-none opacity-0 group-hover/progress:opacity-100 shadow-lg"
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            </div>
            <span className="text-white/60 font-bold text-xs tracking-wider">{formatTime(duration)}</span>
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={togglePlay} className="text-white hover:text-primary transition-colors">
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
              </button>
              
              <button onClick={handleSkipIntro} className="text-white hover:text-primary transition-colors flex items-center gap-1 group/btn" title="Adelantar 10s">
                <FastForward size={20} />
                <span className="text-[9px] font-black opacity-0 group-hover/btn:opacity-100 transition-opacity uppercase tracking-widest absolute -top-8 bg-black/80 px-2 py-1 rounded">10s</span>
              </button>

              <div className="flex items-center gap-2 group/vol">
                <button onClick={toggleMute} className="text-white hover:text-primary transition-colors">
                  {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-0 opacity-0 group-hover/vol:w-20 group-hover/vol:opacity-100 transition-all duration-300 h-1.5 bg-white/20 rounded-full cursor-pointer appearance-none"
                  style={{
                    background: `linear-gradient(to right, #7c3aed ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {hasNextEpisode && (
                <button onClick={onNextEpisode} className="text-white hover:text-primary transition-colors" title="Siguiente Episodio">
                  <SkipForward size={20} />
                </button>
              )}
              <button className="text-white hover:text-primary transition-colors">
                <Settings size={20} />
              </button>
              <button onClick={toggleFullscreen} className="text-white hover:text-primary transition-colors">
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CustomVideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  poster: PropTypes.string,
  onNextEpisode: PropTypes.func,
  hasNextEpisode: PropTypes.bool,
  onAutoNext: PropTypes.func,
  initialTime: PropTypes.number,
  onTimeUpdateCallback: PropTypes.func
};
