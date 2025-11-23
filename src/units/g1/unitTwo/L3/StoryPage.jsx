import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Subtitles, Maximize2, Minimize2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';
import ValidationAlert from '../../shared/ValidationAlert';

import video1 from "./assets/1.mp4";
import video2 from "./assets/2.mp4";
import video3 from "./assets/3.mp4";
import video4 from "./assets/4.mp4";
import img1 from "./assets/nex.png";

export const StoryPage = () => {
  // --- تعريف الحالات (States) ---
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const fullscreenContainerRef = useRef(null);

  // --- 1. مصفوفة الوسائط المحدثة ---
  const mediaItems = [
    {
      type: 'video',
      url: video1,
      title: "Section 1",
      subtitles: [
        // {
        //   start: 0, end: 3.5,
        //   words: [
        //     { text: "A", start: 0.2, end: 0.7 },
        //     { text: "Clean", start: 0.7, end: 1.3 },
        //     { text: "Place", start: 1.3, end: 2.0 },
        //     { text: "is", start: 2.1, end: 2.3 },
        //     { text: "a", start: 2.3, end: 2.5 },
        //     { text: "Safe", start: 2.5, end: 2.9 },
        //     { text: "Place.", start: 2.9, end: 3.3 },
        //   ]
        // },
      ]
    },
    {
      type: 'video',
      url: video2,
      title: "Section 2",
      subtitles: [

        {
          start: 0.1, end: 3.2,
          words: [
            { text: "Cole", start: 0.1, end: 0.6 },
            { text: "and", start: 0.6, end: 0.9 },
            { text: "Max", start: 0.9, end: 1.2 },
            { text: "were", start: 1.2, end: 1.6 },
            { text: "ice", start: 1.6, end: 2.1 },
            { text: "skating.", start: 2.1, end: 3.2 }
          ]
        },

        {
          start: 3.3, end: 5.6,
          words: [
            { text: "They", start: 3.3, end: 3.6 },
            { text: "get", start: 3.6, end: 3.9 },
            { text: "a", start: 3.9, end: 4.1 },
            { text: "drink", start: 4.1, end: 4.3 },
            { text: "and", start: 4.3, end: 4.5 },
            { text: "snack", start: 4.5, end: 4.8 },
            { text: "from", start: 4.8, end: 5.0 },
            { text: "the", start: 5.0, end: 5.2 },
            { text: "cafeteria.", start: 5.2, end: 5.5 }
          ]
        },

        {
          start: 5.6, end: 11.4,
          words: [
            { text: "When", start: 5.6, end: 5.9 },
            { text: "they", start: 6.2, end: 6.5 },
            { text: "finish,", start: 6.8, end: 7.1 },
            { text: "Cole", start: 7.4, end: 7.7 },
            { text: "puts", start: 8.0, end: 8.3 },
            { text: "his", start: 8.6, end: 8.9 },
            { text: "rubbish", start: 9.2, end: 9.5 },
            { text: "in", start: 9.8, end: 10.1 },
            { text: "the", start: 10.4, end: 10.7 },
            { text: "bin,", start: 11.0, end: 11.3 }
          ]
        },

        {
          start: 7.7, end: 9.2,
          words: [
            { text: "but", start: 7.7, end: 7.9 },
            { text: "Max", start: 7.9, end: 8.0 },
            { text: "leaves", start: 8.0, end: 8.2 },
            { text: "his", start: 8.2, end: 8.4 },
            { text: "rubbish", start: 8.4, end: 8.6 },
            { text: "on", start: 8.6, end: 8.8 },
            { text: "the", start: 8.8, end: 9.0 },
            { text: "table.", start: 9.0, end: 9.2 }
          ]
        },
      ]
    },
    {
      type: 'video',
      url: video3,
      title: "Section 3",
      subtitles: [
        {
          start: 0, end: 3.0,
          words: [
            { text: "Don’t", start: 0.1, end: 0.4 },
            { text: "forget", start: 0.4, end: 0.7 },
            { text: "to", start: 0.7, end: 1.0 },
            { text: "put", start: 1.0, end: 1.3 },
            { text: "your", start: 1.3, end: 1.6 },
            { text: "rubbish", start: 1.6, end: 1.9 },
            { text: "in", start: 1.9, end: 2.2 },
            { text: "the", start: 2.2, end: 2.5 },
            { text: "bin,", start: 2.5, end: 2.9 }
          ]
        },

        {
          start: 2.5, end: 9.3,
          words: [
            { text: "That’s", start: 3.0, end: 3.3 },
            { text: "his", start: 3.3, end: 3.8 },
            { text: "job,", start: 3.8, end: 4.1 }
          ]
        },

        {
          start: 9, end: 11.5,
          words: [
            { text: "pointing", start: 9.2, end: 9.5 },
            { text: "to the", start: 9.5, end: 9.8 },
            { text: "cleaner.", start: 10.3, end: 10.6 },
          ]
        },

        {
          start: 9, end: 11.5,
          words: [
            { text: "Cole", start: 9.2, end: 9.5 },
            { text: "is", start: 9.5, end: 9.8 },
            { text: "upset – Max", start: 10.3, end: 10.6 },
            { text: "is", start: 9.2, end: 9.5 },
            { text: "not", start: 9.5, end: 9.8 },
            { text: "following", start: 9.2, end: 9.5 },
            { text: "the", start: 9.5, end: 9.8 },
            { text: "rules.", start: 9.2, end: 9.5 },
          ]
        },

        {
          start: 9, end: 11.5,
          words: [
            { text: "Oh", start: 9.2, end: 9.5 },
            { text: "dear", start: 9.5, end: 9.8 },
          ]
        },

        {
          start: 9, end: 11.5,
          words: [
            { text: "what", start: 9.2, end: 9.5 },
            { text: "should", start: 9.5, end: 9.8 },
            { text: "Cole", start: 9.2, end: 9.5 },
            { text: "do?", start: 9.5, end: 9.8 },
          ]
        },
      ]
    },
    {
      type: 'video',
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 0.0, end: 2.5,
          words: [
            { text: "You", start: 0.1, end: 0.4 },
            { text: "are", start: 0.4, end: 0.7 },
            { text: "not", start: 0.7, end: 1.0 },
            { text: "following", start: 1.0, end: 1.3 },
            { text: "the", start: 1.3, end: 1.6 },
            { text: "rules", start: 1.6, end: 1.9 },
          ]
        },

        {
          start: 2.9, end: 4.6,
          words: [
            { text: "he", start: 3.0, end: 3.2 },
            { text: "heard", start: 3.2, end: 3.5 },
            { text: "you", start: 3.5, end: 3.7 },
            { text: "say", start: 3.7, end: 3.9 },
            { text: "that", start: 3.9, end: 4.1 },
            { text: "–", start: 4.1, end: 4.15 },
            { text: "it", start: 4.15, end: 4.3 },
            { text: "was", start: 4.3, end: 4.4 },
            { text: "rude!’", start: 4.4, end: 4.5 }
          ]
        },

        {
          start: 5.0, end: 6.5,
          words: [
            { text: "Max", start: 5.1, end: 5.4 },
            { text: "feels", start: 5.4, end: 5.7 },
            { text: "bad", start: 5.7, end: 6.0 },
          ]
        },

        {
          start: 5.0, end: 6.5,
          words: [
            { text: "he", start: 5.0, end: 5.2 },
            { text: "knows", start: 5.2, end: 5.5 },
            { text: "Cole", start: 5.5, end: 5.8 },
            { text: "is", start: 5.8, end: 6.1 },
            { text: "right.", start: 6.1, end: 6.5 }
          ]
        },

        {
          start: 5.0, end: 6.5,
          words: [
            { text: "I’m", start: 6.6, end: 6.9 },
            { text: "sorry,", start: 6.9, end: 7.2 },
            { text: "I", start: 7.2, end: 7.4 },
            { text: "was", start: 7.4, end: 7.6 },
            { text: "not", start: 7.6, end: 7.9 },
            { text: "following", start: 7.9, end: 8.2 },
            { text: "the", start: 8.2, end: 8.4 },
            { text: "rules", start: 8.4, end: 8.5 }
          ]
        },
      ]
    },

    {
      type: 'image',
      url: img1,
      title: "The End",
      subtitles: [

      ]
    }
  ];


  const currentItem = mediaItems[currentItemIndex];
  const availableSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const cloudPositions = {
    0: [
      // { bottom: '35rem', left: '50%', transform: 'translateX(-50%)', isFlipped: true }
    ],
    1: [
      { top: '15%', left: '10%' },
      { top: '10%', left: '45%', isFlipped: true },
      { top: '15%', left: '15%' },
      { top: '15%', left: '15%' }
    ],
    2: [
      { top: '10%', right: '5%', isFlipped: true },
      { top: '1%', left: '45%', isFlipped: true },
      { top: '1%', left: '25%', isFlipped: true },
      { top: '10%', right: '5%', isFlipped: true },
      { top: '1%', left: '45%', isFlipped: true },
      { top: '1%', left: '25%', isFlipped: true }
    ],
    3: [
      { bottom: '80%', left: '28%' },
      { top: '30%', left: '35%', isFlipped: true },
      { bottom: '80%', left: '28%' },
      { top: '30%', left: '35%', isFlipped: true },
      { top: '30%', left: '35%', isFlipped: true }
    ],
    5: [
      // { top: '20%', left: '50%', transform: 'translateX(-50%)' }
    ]
  };

  const activeSubtitleIndex = currentItem.type === 'video' ? currentItem.subtitles.findIndex(sub => currentTime >= sub.start && currentTime < sub.end) : 0;
  const activeSubtitle = activeSubtitleIndex !== -1 ? currentItem.subtitles[activeSubtitleIndex] : null;
  const activeCloudPosition = activeSubtitleIndex !== -1 ? cloudPositions[currentItemIndex]?.[activeSubtitleIndex] : null;

  // --- دوال التحكم بالوسائط ---
  const handleNext = useCallback(() => {
    if (currentItemIndex === mediaItems.length - 1) {
      ValidationAlert.storyEnd(() => {
        navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
      });
    } else {
      setCurrentItemIndex(prev => prev + 1);
    }
  }, [currentItemIndex, mediaItems.length, navigate, unitId, lessonId]);

  const handlePrevious = () => {
    setCurrentItemIndex(prev => (prev > 0 ? prev - 1 : mediaItems.length - 1));
  };

  const togglePlay = () => {
    if (currentItem.type !== 'video' || !videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  // --- التأثيرات الجانبية (useEffect) ---

  // 2. useEffect للتحكم بالصور والفيديوهات عند تغيير الشريحة
  useEffect(() => {
    setShowBubble(true);

    if (currentItem.type === 'image') {
      setIsPlaying(false);
      const timer = setTimeout(handleNext, 1000); // الانتقال بعد 5 ثوانٍ
      return () => clearTimeout(timer);
    }

    if (currentItem.type === 'video' && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => setIsPlaying(false));
      setCurrentTime(0);
    }
  }, [currentItemIndex, currentItem.type, handleNext]);

  // useEffect لربط مستمعات الأحداث للفيديو فقط
  useEffect(() => {
    const video = videoRef.current;
    if (currentItem.type !== 'video' || !video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleLoadedData = () => setDuration(video.duration);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [currentItem.type, currentItemIndex]); // يعتمد على نوع العنصر وفهرسه

  // useEffect للتحكم بملء الشاشة
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // --- دوال أخرى ---
  const toggleMute = () => setIsMuted(!isMuted);
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };
  const selectPlaybackSpeed = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) videoRef.current.playbackRate = speed;
    setShowSpeedMenu(false);
  };
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      fullscreenContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="story-page-container">
      <div className="w-full max-w-6xl">
        <div ref={fullscreenContainerRef} className="video-wrapper">

          {currentItem.type === 'video' ? (
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              src={currentItem.url}
              muted={isMuted}
              onEnded={handleNext}
              preload="auto"
              style={{ display: 'block' }}
            />
          ) : (
            <img
              src={currentItem.url}
              alt={currentItem.title}
              className="w-full aspect-video object-cover"
            />
          )}

          {/* --- عرض الفقاعات (Subtitles) --- */}
          {activeSubtitle && activeCloudPosition && showBubble && showSubtitles && (
            <div className="subtitle-container" style={activeCloudPosition}>
              <div className={`bubble-cloud animate__animated animate__fadeIn ${activeCloudPosition.isFlipped ? 'flipped' : ''}`}>
                <p>
                  {activeSubtitle.words.map((word, index) => {
                    const isHighlighted = currentItem.type === 'video' && currentTime >= word.start && currentTime < word.end;
                    return (
                      <span key={index} className={`word-span ${isHighlighted ? 'active-word' : ''}`}>
                        {word.text}{' '}
                      </span>
                    );
                  })}
                </p>
                <button className="close" onClick={() => setShowBubble(false)}>×</button>
              </div>
            </div>
          )}

          {/* --- أزرار التحكم --- */}
          <div className="video-overlay" />
          <div className="controls-container">
            <div className="controlbbtn">
              <button onClick={handlePrevious} className="control-btn left-nav-btn"><ChevronLeft className="w-8 h-8" /></button>
              <button onClick={handleNext} className="control-btn right-nav-btn"><ChevronRight className="w-8 h-8" /></button>
            </div>

            <div className="controls-wrapper-new">
              <div className="controls-row">
                <div className="controls-group-left">
                  {/* --- 5. تعطيل الأزرار عند عرض الصورة --- */}
                  <button onClick={() => setShowSubtitles(!showSubtitles)} className="control-btn" title="Subtitles"><Subtitles className="w-6 h-6" /></button>
                  <div className="volume-control" onMouseEnter={() => setShowVolumeSlider(true)} onMouseLeave={() => setShowVolumeSlider(false)}>
                    <button onClick={toggleMute} className="control-btn" disabled={currentItem.type === 'image'}>
                      {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                    </button>
                    {showVolumeSlider && currentItem.type === 'video' && (
                      <div className="volume-slider-container">
                        <input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange} className="volume-slider" orient="vertical" />
                      </div>
                    )}
                  </div>
                  <div className="speed-control-container">
                    <button onClick={() => setShowSpeedMenu(!showSpeedMenu)} className="control-btn speed-btn" title="Playback Speed" disabled={currentItem.type === 'image'}>
                      <span className="speed-label">{playbackSpeed}x</span>
                    </button>
                    {showSpeedMenu && currentItem.type === 'video' && (
                      <ul className="speed-dropdown-list">
                        {availableSpeeds.map(speed => (
                          <li key={speed} onClick={() => selectPlaybackSpeed(speed)} className={playbackSpeed === speed ? 'active-speed' : ''}>{speed}x</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="controls-group-center">
                  <button onClick={togglePlay} className="control-btn play-btn" disabled={currentItem.type === 'image'}>
                    {isPlaying ? <Pause className="w-12 h-12" fill="white" /> : <Play className="w-12 h-12" fill="white" />}
                  </button>
                </div>

                <div className="controls-group-right">
                  <button onClick={toggleFullscreen} className="control-btn">
                    {isFullscreen ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* --- مؤشر التقدم --- */}
          <div className="progress-indicator-container">
            {mediaItems.map((_, index) => (
              <div key={index} className={`progress-dot ${index === currentItemIndex ? 'active' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
