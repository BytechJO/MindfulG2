import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Subtitles, Maximize2, Minimize2, MessageSquareText } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';
import ValidationAlert from '../../shared/ValidationAlert';

import video1 from "./assets/1.mp4";
import video2 from "./assets/2.mp4";
import video3 from "./assets/3.mp4";
import video4 from "./assets/4.mp4";
import img1 from "./assets/nex.png";

export const StoryPage = () => {
  const [showCaption, setShowCaption] = useState(true);
  const [extraBubble, setExtraBubble] = useState(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(0.75);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const fullscreenContainerRef = useRef(null);

  const mediaItems = [
    {
      type: 'video',
      url: video1,
      title: "Section 1",
      subtitles: [
      ]
    },

    {
      type: 'video',
      url: video2,
      title: "Section 2",
      subtitles: [

        {
          start: 13.0, end: 17.0,
          words: [
            { text: "Don’t", start: 14.0, end: 14.3 },
            { text: "forget", start: 14.3, end: 14.6 },
            { text: "to", start: 14.6, end: 14.9 },
            { text: "put", start: 14.9, end: 15.2 },
            { text: "your", start: 15.2, end: 15.5 },
            { text: "rubbish", start: 15.5, end: 15.8 },
            { text: "in", start: 15.8, end: 16.1 },
            { text: "the", start: 16.1, end: 16.4 },
            { text: "bin,", start: 16.4, end: 16.8 }
          ]
        },

        {
          start: 17.5, end: 19.2,
          words: [
            { text: "That’s", start: 18.0, end: 18.4 },
            { text: "his", start: 18.4, end: 18.7 },
            { text: "job,", start: 18.7, end: 19.0 }
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
          start: 0.0, end: 2.0,
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
          start: 2.3, end: 4.6,
          words: [
            { text: "he", start: 2.5, end: 2.7 },
            { text: "heard", start: 2.7, end: 3.0 },
            { text: "you", start: 3.0, end: 3.2 },
            { text: "say", start: 3.2, end: 3.4 },
            { text: "that", start: 3.4, end: 3.6 },
            { text: "it", start: 3.6, end: 3.8 },
            { text: "was", start: 3.8, end: 3.9 },
            { text: "rude!’", start: 3.9, end: 4.0 }
          ]
        },

        {
          start: 9.2, end: 12.5,
          words: [
            { text: "I’m", start: 9.5, end: 9.8 },
            { text: "sorry,", start: 9.8, end: 10.2 },
            { text: "I", start: 10.7, end: 10.9 },
            { text: "was", start: 10.9, end: 11.1 },
            { text: "not", start: 11.1, end: 11.4 },
            { text: "following", start: 11.4, end: 11.7 },
            { text: "the", start: 11.7, end: 11.9 },
            { text: "rules", start: 11.9, end: 12.3 }
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
          start: 1.8, end: 5.0,
          words: [
            { text: "Thank", start: 2.0, end: 2.2 },
            { text: "you", start: 2.2, end: 2.5 },
            { text: "for", start: 2.5, end: 2.7 },
            { text: "telling", start: 2.7, end: 3.0 },
            { text: "your", start: 3.0, end: 3.3 },
            { text: "friend", start: 3.3, end: 3.6 },
            { text: "throw", start: 3.6, end: 3.9 },
            { text: "his", start: 3.9, end: 4.1 },
            { text: "rubbish", start: 4.1, end: 4.4 },
            { text: "away.", start: 4.4, end: 4.8 }
          ]
        },
      ]
    },
  ];
  const extraBubblesData = [
    {
      videoIndex: 1,
      start: 0,
      end: 2.7,
      words: [
        { text: "Cole", start: 0.1, end: 0.6 },
        { text: "and", start: 0.6, end: 0.9 },
        { text: "Max", start: 0.9, end: 1.2 },
        { text: "were", start: 1.2, end: 1.6 },
        { text: "ice", start: 1.6, end: 2.1 },
        { text: "skating.", start: 2.1, end: 2.5 }
      ]
    },
    {
      videoIndex: 1,
      start: 2.9,
      end: 5.6,
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
      videoIndex: 1,
      start: 5.6,
      end: 10.0,
      words: [
        { text: "When", start: 5.6, end: 5.9 },
        { text: "they", start: 6.2, end: 6.5 },
        { text: "finish,", start: 6.8, end: 7.1 },
        { text: "Cole", start: 7.4, end: 7.7 },
        { text: "puts", start: 8.0, end: 8.3 },
        { text: "his", start: 8.3, end: 8.6 },
        { text: "rubbish", start: 8.6, end: 8.9 },
        { text: "in", start: 8.9, end: 9.2 },
        { text: "the", start: 9.2, end: 9.5 },
        { text: "bin,", start: 9.5, end: 9.8 }
      ]
    },
    {
      videoIndex: 1,
      start: 10.0,
      end: 12.5,
      words: [
        { text: "but", start: 10.3, end: 10.5 },
        { text: "Max", start: 10.5, end: 10.6 },
        { text: "leaves", start: 10.6, end: 10.8 },
        { text: "his", start: 10.8, end: 11.0 },
        { text: "rubbish", start: 11.0, end: 11.2 },
        { text: "on", start: 11.2, end: 11.4 },
        { text: "the", start: 11.4, end: 11.6 },
        { text: "table.", start: 11.6, end: 11.8 },
      ]
    },
    {
      videoIndex: 1,
      start: 19.4,
      end: 22.5,
      words: [
        { text: "Cole", start: 19.5, end: 19.8 },
        { text: "is", start: 19.8, end: 20.0 },
        { text: "upset,", start: 20.0, end: 20.4 },

        { text: "Max", start: 20.5, end: 20.8 },
        { text: "is", start: 20.8, end: 21.1 },
        { text: "not", start: 21.1, end: 21.4 },
        { text: "following", start: 21.4, end: 21.7 },
        { text: "the", start: 21.7, end: 21.9 },
        { text: "rules.", start: 21.9, end: 22.2 }
      ]
    },
    {
      videoIndex: 1,
      start: 22.8,
      end: 24.0,
      words: [
        { text: "Oh", start: 23.0, end: 23.3 },
        { text: "dear", start: 23.3, end: 23.8 },
      ]
    },
    {
      videoIndex: 1,
      start: 24.0,
      end: 26.0,
      words: [
        { text: "what", start: 24.2, end: 24.5 },
        { text: "should", start: 24.5, end: 24.8 },
        { text: "Cole", start: 24.8, end: 25.2 },
        { text: "do?", start: 25.2, end: 25.5 },
      ]
    },

    {
      videoIndex: 2,
      start: 5.0, end: 6.5,
      words: [
        { text: "Max", start: 5.1, end: 5.4 },
        { text: "feels", start: 5.4, end: 5.7 },
        { text: "bad", start: 5.7, end: 6.0 },
      ]
    },
    {
      videoIndex: 2,
      start: 6.5, end: 9.0,
      words: [
        { text: "he", start: 7.0, end: 7.2 },
        { text: "knows", start: 7.2, end: 7.5 },
        { text: "Cole", start: 7.5, end: 7.8 },
        { text: "is", start: 7.8, end: 8.1 },
        { text: "right.", start: 8.1, end: 8.5 }
      ]
    },

    {
      videoIndex: 3,
      start: 0, end: 1.5,
      words: [
        { text: "The", start: 0.1, end: 0.4 },
        { text: "cleaner", start: 0.4, end: 0.7 },
        { text: "looks", start: 0.7, end: 1.0 },
        { text: "at Cole,", start: 1.0, end: 1.3 },
      ]
    },
    {
      videoIndex: 3,
      start: 5.2, end: 8.5,
      words: [
        { text: "Max", start: 5.5, end: 5.8 },
        { text: "puts", start: 5.8, end: 6.1 },
        { text: "his", start: 6.1, end: 6.4 },
        { text: "rubbish", start: 6.5, end: 6.8 },
        { text: "in", start: 6.8, end: 7.1 },
        { text: "the", start: 7.1, end: 7.4 },
        { text: "bin.", start: 7.7, end: 8.0 }
      ]
    },
    {
      videoIndex: 3,
      start: 9.0, end: 12.5,
      words: [
        { text: "Max", start: 9.5, end: 9.7 },
        { text: "is", start: 9.7, end: 10.0 },
        { text: "happy", start: 10.0, end: 10.3 },
        { text: "that", start: 10.3, end: 10.6 },
        { text: "he", start: 10.6, end: 11.0 },
        { text: "follows", start: 11.0, end: 11.3 },
        { text: "the", start: 11.3, end: 11.6 },
        { text: "rules.", start: 11.6, end: 12.0 }
      ]
    },
  ];

  const currentItem = mediaItems[currentItemIndex];
  const availableSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const cloudPositions = {
    0: [
      // { bottom: '35rem', left: '50%', transform: 'translateX(-50%)', isFlipped: true }
    ],
    1: [
      { top: '15%', left: '40%', isFlipped: true },
      { top: '10%', left: '35%' },
    ],
    2: [
      { top: '10%', right: '30%' },
      { top: '1%', left: '45%', isFlipped: true },
      { top: '5%', left: '45%', isFlipped: true },
    ],
    3: [
      { bottom: '65%', left: '60%', isFlipped: true },
    ],
    5: [
    ]
  };




  useEffect(() => {
    const bubbleToShow = extraBubblesData.find(bubble =>
      bubble.videoIndex === currentItemIndex &&
      currentTime >= bubble.start &&
      currentTime < bubble.end
    );

    setExtraBubble(bubbleToShow || null);

  }, [currentItemIndex, currentTime]);
  const activeSubtitleIndex = currentItem.type === 'video' ? currentItem.subtitles.findIndex(sub => currentTime >= sub.start && currentTime < sub.end) : 0;
  const activeSubtitle = activeSubtitleIndex !== -1 ? currentItem.subtitles[activeSubtitleIndex] : null;
  const activeCloudPosition = activeSubtitleIndex !== -1 ? cloudPositions[currentItemIndex]?.[activeSubtitleIndex] : null;

  // --- دوال التحكم بالوسائط ---
  const handleNext = useCallback(() => {
  if (currentItemIndex === mediaItems.length - 1) {
    navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
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

          {showCaption && extraBubble && extraBubble.words && (
            <div
              className="subtitle-container"
              style={{ bottom: '0%', left: '50%', transform: 'translateX(-50%)', zIndex: 101 }}
            >
              <div className="extra-cloud animate__animated animate__fadeIn">
                <p>
                  {extraBubble.words.map((word, index) => {
                    const isHighlighted = currentTime >= word.start && currentTime < word.end;
                    return <span key={index} className={`word-span ${isHighlighted ? 'active-word' : ''}`}>{word.text}{' '}</span>;
                  })}
                </p>
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

                  <button
                    onClick={() => setShowCaption(!showCaption)}
                    className={`control-btn ${!showCaption ? "disabled-btn" : ""}`}
                    title="Caption"
                  >
                    <Subtitles className="w-6 h-6" />
                    <span className="control-label">Narration</span>
                  </button>

                  <button
                    onClick={() => setShowSubtitles(!showSubtitles)}
                    className={`control-btn ${!showSubtitles ? "disabled-btn" : ""}`}
                    title="Subtitles"
                  >
                    <MessageSquareText className="w-6 h-6" />
                    <span className="control-label">Caption</span>
                  </button>

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
