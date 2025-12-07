import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Subtitles, Maximize2, Minimize2, MessageSquareText } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';
import ValidationAlert from '../../shared/ValidationAlert';

import video1 from "./assets/1.mp4";
import video2 from "./assets/2.mp4";
import video3 from "./assets/3.mp4";
import video4 from "./assets/4.mp4";
import video5 from "./assets/5.mp4";


export const StoryPage = () => {
  // 1
  const [extraBubble, setExtraBubble] = useState(null);
  // e
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const [selectedWords, setSelectedWords] = useState([]);
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const [showFeedback, setShowFeedback] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(0.75);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [showCaption, setShowCaption] = useState(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const availableSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenContainerRef = useRef(null);

  const videos = [
    {
      url: video1,
      title: "Section 1",
      subtitles: [
      ]
    },

    {
      url: video2,
      title: "Section 2",
      subtitles: [
      ]
    },

    {
      url: video3,
      title: "Section 3",
      subtitles: [
      ]
    },

    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 2.9, end: 5.9,
          words: [
            { text: "I", start: 3.0, end: 3.3 },
            { text: "don’t", start: 3.3, end: 3.6 },
            { text: "know", start: 3.6, end: 3.9 },
            { text: "how", start: 3.9, end: 4.2 },
            { text: "to", start: 4.2, end: 4.5 },
            { text: "spell", start: 4.5, end: 5.0 },
            { text: "‘apple’", start: 5.0, end: 5.5 },
          ]
        },
        {
          start: 6.0, end: 8.0,
          words: [
            { text: "I", start: 6.1, end: 6.4 },
            { text: "don’t", start: 6.4, end: 6.7 },
            { text: "want", start: 6.7, end: 7.0 },
            { text: "to", start: 7.0, end: 7.3 },
            { text: "make", start: 7.3, end: 7.6 },
            { text: "a mistake", start: 7.6, end: 7.9 },
          ]
        },
        {
          start: 11.0, end: 17.0,
          words: [
            { text: "It", start: 11.1, end: 11.4 },
            { text: "is", start: 11.4, end: 11.7 },
            { text: "okay", start: 11.7, end: 12.0 },
            { text: "make", start: 12.0, end: 12.3 },
            { text: "mistakes,", start: 12.3, end: 12.8 },
            { text: "but", start: 13.2, end: 13.5 },
            { text: "it", start: 13.5, end: 13.8 },
            { text: "is", start: 13.8, end: 14.1 },
            { text: "important", start: 14.1, end: 14.6 },
            { text: "to", start: 14.6, end: 14.8 },
            { text: "keep trying.", start: 14.8, end: 16.5 },
          ]
        },
      ]
    },

    {
      url: video5,
      title: "Section 5",
      subtitles: [

      ]
    },
  ];

  const cloudPositions = {
    0: [

    ],
    1: [
    ],
    2: [
    ],
    3: [
      { bottom: '80%', left: '48%', transform: 'translateX(-50%)' },
      { top: '10%', left: '30%' },
      { top: '10%', left: '50%', isFlipped: true },
    ],
    4: [
    ]
  };

  const extraBubblesData = [
    {
      videoIndex: 1,
      start: 0,
      end: 1.5,
      words: [
        { text: "Sue", start: 0.0, end: 0.7 },
        { text: "is", start: 0.7, end: 1.0 },
        { text: "in school.", start: 1.0, end: 1.4 },
      ]
    },
    {
      videoIndex: 1,
      start: 1.7,
      end: 4.8,
      words: [
        { text: "The", start: 1.7, end: 2.0 },
        { text: "teacher", start: 2.0, end: 2.3 },
        { text: "asks", start: 2.3, end: 2.6 },
        { text: "Sue", start: 2.6, end: 2.9 },
        { text: "to", start: 2.9, end: 3.2 },
        { text: "spell", start: 3.2, end: 3.5 },
        { text: "‘apple’", start: 3.5, end: 3.8 },
        { text: "for", start: 3.8, end: 4.1 },
        { text: "the", start: 4.1, end: 4.4 },
        { text: "class.", start: 4.4, end: 4.7 },
      ]
    },
    {
      videoIndex: 1,
      start: 5.0, end: 7.5,
      words: [
        { text: "Sue", start: 5.0, end: 5.3 },
        { text: "doesn’t", start: 5.3, end: 5.6 },
        { text: "know", start: 5.6, end: 5.9 },
        { text: "how", start: 5.9, end: 6.2 },
        { text: "to", start: 6.2, end: 6.5 },
        { text: "spell", start: 6.5, end: 6.8 },
        { text: "‘apple’.", start: 6.8, end: 7.1 },
      ]
    },
    {
      videoIndex: 1,
      start: 7.6, end: 9.0,
      words: [
        { text: "She", start: 7.6, end: 7.9 },
        { text: "feels", start: 7.9, end: 8.4 },
        { text: "worried.", start: 8.4, end: 8.9 },
      ]
    },

    {
      videoIndex: 2,
      start: 0.0, end: 3.5,
      words: [
        { text: "The", start: 0.0, end: 0.3 },
        { text: "teacher", start: 0.3, end: 0.6 },
        { text: "asks", start: 0.6, end: 0.9 },
        { text: "all", start: 0.9, end: 1.2 },
        { text: "the", start: 1.2, end: 1.5 },
        { text: "students", start: 1.5, end: 1.8 },
        { text: "to", start: 1.8, end: 2.1 },
        { text: "try", start: 2.1, end: 2.4 },
        { text: "to spell", start: 2.4, end: 2.7 },
        { text: "the word", start: 2.7, end: 3.0 },
        { text: "‘apple’.", start: 3.0, end: 3.3 },
      ]
    },
    {
      videoIndex: 2,
      start: 4.3, end: 6.4,
      words: [
        { text: "Sue", start: 4.5, end: 4.8 },
        { text: "doesn’t", start: 4.8, end: 5.1 },
        { text: "know", start: 5.1, end: 5.4 },
        { text: "what", start: 5.4, end: 5.7 },
        { text: "to", start: 5.7, end: 6.0 },
        { text: "write.", start: 6.0, end: 6.3 },
      ]
    },
    {
      videoIndex: 2,
      start: 7.2, end: 8.5,
      words: [
        { text: "She", start: 7.2, end: 7.5 },
        { text: "doesn’t", start: 7.5, end: 7.8 },
        { text: "want", start: 7.8, end: 8.1 },
        { text: "to try.", start: 8.1, end: 8.4 },
      ]
    },

    {
      videoIndex: 3,
      start: 0.0, end: 2.7,
      words: [
        { text: "The", start: 0.2, end: 0.5 },
        { text: "teacher", start: 0.5, end: 0.8 },
        { text: "asks", start: 0.8, end: 1.1 },
        { text: "Sue", start: 1.1, end: 1.4 },
        { text: "if", start: 1.4, end: 1.7 },
        { text: "there", start: 1.7, end: 2.0 },
        { text: "is a", start: 2.0, end: 2.3 },
        { text: "problem.", start: 2.3, end: 2.6 },
      ]
    },

    {
      videoIndex: 4,
      start: 0, end: 5.8,
      words: [
        { text: "Sue", start: 0.1, end: 0.5 },
        { text: "decides", start: 0.5, end: 0.9 },
        { text: "to try.", start: 0.9, end: 1.3 },
        { text: "The", start: 3.0, end: 3.3 },
        { text: "teacher", start: 3.3, end: 3.6 },
        { text: "reminds", start: 3.6, end: 4.0 },
        { text: "her", start: 4.0, end: 4.2 },
        { text: "to", start: 4.2, end: 4.5 },
        { text: "sound", start: 4.5, end: 4.8 },
        { text: "out", start: 4.8, end: 5.1 },
        { text: "the", start: 5.1, end: 5.4 },
        { text: "letters.", start: 5.4, end: 5.7 },
      ]
    },
    {
      videoIndex: 4,
      start: 6.9, end: 9.5,
      words: [
        { text: "Sue", start: 7.0, end: 7.3 },
        { text: "starts", start: 7.3, end: 7.6 },
        { text: "to", start: 7.6, end: 7.9 },
        { text: "write", start: 7.9, end: 8.2 },
        { text: "each", start: 8.2, end: 8.5 },
        { text: "letter.", start: 8.5, end: 8.8 },
      ]
    },
    {
      videoIndex: 4,
      start: 10.5, end: 13.0,
      words: [
        { text: "Sue", start: 10.6, end: 10.9 },
        { text: "and", start: 10.9, end: 11.2 },
        { text: "the teacher", start: 11.2, end: 11.5 },
        { text: "are", start: 11.5, end: 11.8 },
        { text: "happy", start: 11.8, end: 12.1 },
        { text: "she tried.", start: 12.1, end: 12.4 },
      ]
    },
  ];

  const currentVideoData = videos[currentVideo];
  const activeSubtitleIndex = currentVideoData.subtitles.findIndex(
    sub => currentTime >= sub.start && currentTime < sub.end
  );

  useEffect(() => {
    const bubbleToShow = extraBubblesData.find(bubble =>
      bubble.videoIndex === currentVideo &&
      currentTime >= bubble.start &&
      currentTime < bubble.end
    );

    setExtraBubble(bubbleToShow || null);

  }, [currentVideo, currentTime]);

  const activeSubtitle = activeSubtitleIndex !== -1
    ? currentVideoData.subtitles[activeSubtitleIndex]
    : null;

  const activeCloudPosition = activeSubtitleIndex !== -1
    ? cloudPositions[currentVideo]?.[activeSubtitleIndex]
    : null;

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Preload next video
  useEffect(() => {
    const nextVideoIndex = currentVideo + 1;
    if (nextVideoIndex < videos.length) {
      const nextVideoUrl = videos[nextVideoIndex].url;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = nextVideoUrl;
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [currentVideo, videos]);

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

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
  }, []);

  // Auto-play or pause based on video/banner change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      setCurrentTime(0);
      setShowBubble(true);

      if (showBanner) {
        videoRef.current.pause();
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => { });
        }
      }
    }
  }, [currentVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (currentVideo === 3 && isPlaying) {
      if (duration > 0 && currentTime >= duration - 0.3) {
        video.pause();
        // video.currentTime = 5.0;
        // setCurrentTime(5.0);
        setShowBanner(true);
      }
    }
  }, [currentTime, currentVideo, isPlaying, duration]);


  const [isLoading, setIsLoading] = useState(false);

  // Loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsLoading(true); // بدء التحميل
    video.load(); // تحميل الفيديو الجديد
    setCurrentTime(0);
    setShowBubble(true);

    const handleCanPlay = () => {
      setIsLoading(false); // انتهى التحميل
      if (!showBanner) video.play().catch(() => { });
    };

    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [currentVideo]);


  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [currentVideo, isPlaying, playbackSpeed]);

  const handlePrevious = () => {
    setShowBanner(false);
    setCurrentVideo(prev => (prev > 0 ? prev - 1 : videos.length - 1));
  };

  const handleNext = () => {
    if (currentVideo === videos.length - 1) {
      navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
    } else {
      setCurrentVideo(prev => prev + 1);
    }
  };

  const handleEnded = useCallback(() => {
    if (currentVideo === videos.length - 1) {
      ValidationAlert.storyEnd(() => {
        navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
      });
    } else if (currentVideo !== 3) {
      setShowBanner(false);
      setCurrentVideo(prev => prev + 1);
    }
  }, [currentVideo, videos.length, navigate, unitId, lessonId]);

  const toggleWordSelection = (wordText) => {
    const correctWords = ["keep trying"];
    const cleanedWord = wordText.replace('.', '');

    if (correctWords.includes(cleanedWord)) {
      setSelectedWords(prev =>
        prev.includes(wordText)
          ? prev.filter(w => w !== wordText)
          : [...prev, wordText]
      );
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 2000);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        if (currentVideo === 3 && showBanner) {
          setShowBanner(false);
          videoRef.current.play();
        } else {
          videoRef.current.play();
        }
      }
    }
  };

  const toggleMute = () => setIsMuted(prev => !prev);

  const selectPlaybackSpeed = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  // --- START: التعديلات المطلوبة ---
  // 2. تعديل الدالة لتستهدف الحاوية الصحيحة
  const toggleFullscreen = () => {
    // تم تغيير containerRef إلى fullscreenContainerRef ليكون الاسم أوضح
    const container = fullscreenContainerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="story-page-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <div className="w-full max-w-6xl">
        <div ref={fullscreenContainerRef} className="video-wrapper">

          {videos.map((vid, index) => (
            <video key={index} src={vid.url} preload="auto" style={{ display: 'none' }} />
          ))}
          <video
            ref={videoRef}
            className="w-full aspect-video object-cover"
            muted={isMuted}
            onEnded={handleEnded}
            preload="auto"
            src={currentVideoData.url}
          >
            Your browser does not support the video tag.
          </video>

          {showFeedback && (
            <div className="feedback-popup">
              Good Job! 👍
            </div>
          )}

          {currentVideo === 3 && showBanner && (
            <div className="instruction-banner show">
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                Highlight the phrase the teacher says to
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                help Sue feel better and try.
              </p>
            </div>
          )}

          {activeSubtitle && activeCloudPosition && showBubble && showSubtitles && (
            <div
              className="subtitle-container"
              style={activeCloudPosition}
            >
              <div className={`bubble-cloud animate__animated animate__fadeIn ${activeCloudPosition.isFlipped ? 'flipped' : ''}`}>
                <p>
                  {activeSubtitle.words.map((word, index) => {
                    const isHighlighted = currentTime >= word.start && currentTime < word.end;
                    return (
                      <span
                        key={index}
                        onClick={() => {
                          if (currentVideo === 3) toggleWordSelection(word.text);
                        }}
                        className={`
                          word-span
                          ${isHighlighted ? 'active-word' : ''}
                          ${currentVideo === 3 && selectedWords.includes(word.text) ? 'selected-word' : ''}
                          ${currentVideo === 3 ? 'clickable-word' : ''}
                        `}
                      >
                        {word.text}{' '}
                      </span>
                    );
                  })}
                </p>
                {/* <button className="close" onClick={() => setShowBubble(false)}>×</button> */}
              </div>
            </div>
          )}

          {/* 4 */}
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

          <div className="video-overlay" />
          <div className="controls-container">
            <div className="controlbbtn">
              <button onClick={handlePrevious} className="control-btn left-nav-btn">
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button onClick={handleNext} className="control-btn right-nav-btn">
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            <div className="controls-wrapper-new">
              <div className="controls-row">
                <div className="controls-group-left">

                  <button
                    onClick={() => setShowCaption(!showCaption)}
                    className={`control-btn ${!showCaption ? "disabled-btn" : ""}`}
                    title="Caption"
                  >
                    <MessageSquareText className="w-6 h-6" />
                    <span className="control-label">Caption</span>
                  </button>

                  <button
                    onClick={() => setShowSubtitles(!showSubtitles)}
                    className={`control-btn ${!showSubtitles ? "disabled-btn" : ""}`}
                    title="Subtitles"
                  >
                    <Subtitles className="w-6 h-6" />
                    <span className="control-label">Subtitle</span>
                  </button>

                  <div
                    className="volume-control"
                    onMouseEnter={() => setShowVolumeSlider(true)}
                    onMouseLeave={() => setShowVolumeSlider(false)}
                  >
                    <button onClick={toggleMute} className="control-btn">
                      {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                    </button>
                    {showVolumeSlider && (
                      <div className="volume-slider-container">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="volume-slider"
                          orient="vertical"
                        />
                      </div>
                    )}
                  </div>
                  <div className="speed-control-container">
                    <button
                      onClick={() => setShowSpeedMenu(prev => !prev)}
                      className="control-btn speed-btn"
                      title="Playback Speed"
                    >
                      <span className="speed-label">{playbackSpeed}x</span>
                    </button>
                    {showSpeedMenu && (
                      <ul className="speed-dropdown-list">
                        {availableSpeeds.map((speed) => (
                          <li
                            key={speed}
                            onClick={() => selectPlaybackSpeed(speed)}
                            className={playbackSpeed === speed ? 'active-speed' : ''}
                          >
                            {speed}x
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="controls-group-center">
                  <button onClick={togglePlay} className="control-btn play-btn">
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

          <div className="progress-indicator-container">
            {videos.map((_, index) => (
              <div key={index} className={`progress-dot ${index === currentVideo ? 'active' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
