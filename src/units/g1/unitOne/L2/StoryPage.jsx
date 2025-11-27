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
import img from "./assets/nex.png";

import questionGif from './assets/question.gif';

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
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
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
      ]
    },

    {
      url: video5,
      title: "Section 5",
      subtitles: [
        {
          start: 0, end: 3.1,
          words: [
            { text: "Henry", start: 0.1, end: 0.5 },
            { text: "decides", start: 0.5, end: 0.9 },
            { text: "to", start: 0.9, end: 1.2 },
            { text: "get", start: 1.2, end: 1.5 },
            { text: "a good", start: 1.5, end: 1.8 },
            { text: "grade", start: 1.8, end: 2.1 },
            { text: "on", start: 2.1, end: 2.4 },
            { text: "his", start: 2.4, end: 2.7 },
            { text: "own.", start: 2.7, end: 3.0 },
          ]
        },
        {
          start: 4.0, end: 6.0,
          words: [
            { text: "He", start: 4.5, end: 4.8 },
            { text: "works", start: 4.8, end: 5.4 },
            { text: "hard", start: 5.4, end: 5.7 },
          ]
        },
        {
          start: 6.0, end: 7.9,
          words: [
            { text: "and", start: 6.0, end: 6.3 },
            { text: "finishes", start: 6.3, end: 6.6 },
            { text: "the", start: 6.6, end: 6.9 },
            { text: "test", start: 6.9, end: 7.2 },
            { text: "on", start: 7.2, end: 7.5 },
            { text: "time.", start: 7.5, end: 7.8 },
          ]
        },
        {
          start: 8.0, end: 12.0,
          words: [
            { text: "Henry", start: 9.0, end: 9.3 },
            { text: "is", start: 9.3, end: 9.5 },
            { text: "happy", start: 9.5, end: 9.9 },
            { text: "that", start: 9.9, end: 10.2 },
            { text: "he", start: 10.2, end: 10.4 },
            { text: "did", start: 10.4, end: 10.6 },
            { text: "the", start: 10.6, end: 10.8 },
            { text: "right", start: 10.8, end: 11.1 },
            { text: "thing.", start: 11.1, end: 11.4 },
          ]
        },
        {
          start: 12.0, end: 13.0,
          words: [
            { text: "Henry", start: 0.1, end: 0.5 },
            { text: "decides", start: 0.5, end: 0.9 },
            { text: "he", start: 0.9, end: 1.3 },
            { text: "wants", start: 1.3, end: 1.5 },
            { text: "to", start: 1.5, end: 1.9 },
            { text: "get", start: 2.2, end: 2.6 },
            { text: "a", start: 2.6, end: 2.9 },
            { text: "good grade", start: 2.9, end: 3.2 },
            { text: "on", start: 3.2, end: 3.6 },
            { text: "his", start: 3.6, end: 3.9 },
            { text: "own.", start: 3.9, end: 4.2 },
          ]
        },
      ]
    },

    {
      url: img,
      title: "img",
      subtitles: [
      ]
    },

  ];

  const cloudPositions = {
    0: [
    ],
    1: [
      { top: '20%', left: '40%' },
      { top: '15%', left: '15%' },
      { top: '0%', left: '10%' }
    ],
    2: [
      { top: '10%', right: '65%', left: 'auto' },
      { top: '20%', left: '55%', isFlipped: true }
    ],
    3: [
      { bottom: '80%', left: '40%', transform: 'translateX(-50%)' },
      { top: '20%', left: '20%' },
      { top: '10%', left: '25%' },
      { top: '10%', left: '45%', isFlipped: true },
      { top: '10%', left: '70%', isFlipped: true },
      { top: '10%', left: '25%' },
    ],
    4: [
      { top: '10%', left: '30%', isFlipped: true },
      { top: '20%', left: '20%' },
      { top: '10%', left: '28%', isFlipped: true },
      { bottom: '80%', left: '5%' },
      { bottom: '80%', left: '40%' }
    ]
  };

  const extraBubblesData = [
    {
      videoIndex: 1,
      start: 0,
      end: 2.5,
      words: [
        { text: "Henry", start: 0.0, end: 0.3 },
        { text: "takes", start: 0.3, end: 0.6 },
        { text: "a maths", start: 0.6, end: 0.9 },
        { text: "test", start: 0.9, end: 1.2 },
        { text: "in school.", start: 1.2, end: 1.5 },
      ]
    },
    {
      videoIndex: 1,
      start: 2.9,
      end: 6.5,
      words: [
        { text: "He", start: 3.0, end: 3.3 },
        { text: "is worried", start: 3.3, end: 3.6 },
        { text: "he", start: 3.6, end: 3.9 },
        { text: "will", start: 3.9, end: 4.2 },
        { text: "take", start: 4.2, end: 4.5 },
        { text: "too", start: 4.5, end: 4.8 },
        { text: "long", start: 4.8, end: 5.1 },
        { text: "to", start: 5.1, end: 5.4 },
        { text: "finish", start: 5.4, end: 5.7 },
        { text: "the", start: 5.7, end: 6.0 },
        { text: "test.", start: 6.0, end: 6.3 },
      ]
    },
    {
      videoIndex: 1,
      start: 6.5,
      end: 12.0,
      words: [
        { text: "If", start: 6.7, end: 7.0 },
        { text: "he", start: 7.0, end: 7.3 },
        { text: "takes", start: 7.3, end: 7.6 },
        { text: "too", start: 7.6, end: 7.9 },
        { text: "long,", start: 7.9, end: 8.2 },
        { text: "he", start: 8.2, end: 8.5 },
        { text: "will", start: 8.5, end: 8.8 },
        { text: "not", start: 8.8, end: 9.1 },
        { text: "be", start: 9.1, end: 9.4 },
        { text: "able", start: 9.4, end: 9.7 },
        { text: "to go,", start: 9.7, end: 10.0 },
        { text: "out", start: 10.0, end: 10.3 },
        { text: "and", start: 10.3, end: 10.6 },
        { text: "play", start: 10.6, end: 10.9 },
        { text: "during", start: 10.9, end: 11.2 },
        { text: "break.", start: 11.2, end: 11.5 },
      ]
    },

    {
      videoIndex: 2,
      start: 0, end: 3.5,
      words: [
        { text: "Henry", start: 0.0, end: 0.3 },
        { text: "thinks", start: 0.3, end: 0.6 },
        { text: "about", start: 0.6, end: 0.9 },
        { text: "how", start: 0.9, end: 1.2 },
        { text: "he", start: 1.2, end: 1.5 },
        { text: "can", start: 1.5, end: 1.8 },
        { text: "get", start: 1.8, end: 2.0 },
        { text: "his", start: 2.0, end: 2.3 },
        { text: "test", start: 2.3, end: 2.5 },
        { text: "finished", start: 2.5, end: 2.8 },
        { text: "on time.", start: 2.8, end: 3.3 },
      ]
    },
    {
      videoIndex: 2,
      start: 3.5, end: 9.0,
      words: [
        { text: "He looks", start: 3.6, end: 3.9 },
        { text: "around", start: 3.9, end: 4.2 },
        { text: "and", start: 4.2, end: 4.4 },
        { text: "sees", start: 4.4, end: 4.7 },
        { text: "that", start: 4.7, end: 5.0 },
        { text: "his", start: 5.0, end: 5.3 },
        { text: "friend", start: 5.3, end: 5.6 },
        { text: "is", start: 5.6, end: 5.9 },
        { text: "almost", start: 5.9, end: 6.2 },
        { text: "finished.", start: 6.2, end: 6.5 },
      ]
    },

    {
      videoIndex: 3,
      start: 0, end: 2.9,
      words: [
        { text: "Henry", start: 0.1, end: 0.6 },
        { text: "thinks", start: 0.6, end: 1.0 },
        { text: "that", start: 1.0, end: 1.2 },
        { text: "if", start: 1.2, end: 1.4 },
        { text: "he", start: 1.4, end: 1.6 },
        { text: "copies", start: 1.6, end: 1.9 },
        { text: "his", start: 1.9, end: 2.2 },
        { text: "friend’s", start: 2.2, end: 2.5 },
        { text: "answers,", start: 2.5, end: 2.8 },
      ]
    },
    {
      videoIndex: 3,
      start: 3.0, end: 4.9,
      words: [
        { text: "he", start: 3.0, end: 3.3 },
        { text: "can", start: 3.3, end: 3.6 },
        { text: "finish", start: 3.6, end: 3.9 },
        { text: "the", start: 3.9, end: 4.1 },
        { text: "test", start: 4.1, end: 4.4 },
        { text: "faster.", start: 4.4, end: 4.8 },
      ]
    },
    {
      videoIndex: 3,
      start: 5.0, end: 6.0,
      words: [
        { text: "Oh", start: 5.0, end: 5.3 },
        { text: "dear!", start: 5.3, end: 5.6 },
      ]
    },
    {
      videoIndex: 3,
      start: 6.0, end: 7.5,
      words: [
        { text: "What", start: 6.0, end: 6.3 },
        { text: "will", start: 6.3, end: 6.6 },
        { text: "Henry", start: 6.6, end: 6.9 },
        { text: "do?", start: 6.9, end: 7.2 },
      ]
    },
    {
      videoIndex: 3,
      start: 9.0, end: 12.5,
      words: [
        { text: "Henry", start: 9.0, end: 9.3 },
        { text: "remembers", start: 9.3, end: 9.6 },
        { text: "that", start: 9.6, end: 9.9 },
        { text: "if", start: 9.9, end: 10.2 },
        { text: "he", start: 10.2, end: 10.5 },
        { text: "copies,", start: 10.5, end: 10.8 },
        { text: "he", start: 10.8, end: 11.1 },
        { text: "will", start: 11.1, end: 11.4 },
        { text: "not", start: 11.4, end: 11.7 },
        { text: "be", start: 11.7, end: 12.0 },
        { text: "learning", start: 12.0, end: 12.3 },
      ]
    },
    {
      videoIndex: 3,
      start: 12.5, end: 17.0,
      words: [
        { text: "and", start: 13.3, end: 13.6 },
        { text: "the", start: 13.6, end: 13.9 },
        { text: "teacher", start: 13.9, end: 14.2 },
        { text: "will", start: 14.2, end: 14.5 },
        { text: "not", start: 14.5, end: 14.8 },
        { text: "know", start: 14.8, end: 15.1 },
        { text: "if", start: 15.1, end: 15.4 },
        { text: "he", start: 15.4, end: 15.7 },
        { text: "understands", start: 15.7, end: 16.0 },
        { text: "the", start: 16.0, end: 16.3 },
        { text: "work.", start: 16.3, end: 16.6 },
      ]
    },
    
  ];



  const currentVideoData = videos[currentVideo];
  const activeSubtitleIndex = currentVideoData.subtitles.findIndex(
    sub => currentTime >= sub.start && currentTime < sub.end
  );

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

  useEffect(() => {
    const bubbleToShow = extraBubblesData.find(bubble =>
      bubble.videoIndex === currentVideo &&
      currentTime >= bubble.start &&
      currentTime < bubble.end
    );

    setExtraBubble(bubbleToShow || null);

  }, [currentVideo, currentTime]);

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

    if (currentVideo === 4 && isPlaying) {
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

    setIsLoading(true);
    video.load();
    setCurrentTime(0);
    setShowBubble(true);

    const handleCanPlay = () => {
      setIsLoading(false);
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
    setShowBanner(false);
    setCurrentVideo(prev => (prev < videos.length - 1 ? prev + 1 : 0));
  };

  const handleEnded = useCallback(() => {
    const currentData = videos[currentVideo];

    const isImage = !currentData.url.endsWith('.mp4');

    if (isImage) {
      ValidationAlert.storyEnd(() => {
        navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
      });
    } else if (!isImage) {
      setShowBanner(false);
      setCurrentVideo(prev => prev + 1);
    }
  }, [currentVideo, videos, navigate, unitId, lessonId]);

  useEffect(() => {
    const currentData = videos[currentVideo];
    const isImage = !currentData.url.endsWith('.mp4');

    if (isImage) {
      const timer = setTimeout(() => {
        ValidationAlert.storyEnd(() => {
          navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentVideo, navigate]);


  const toggleWordSelection = (wordText) => {
    const correctWords = ["get", "good grade"];
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
        if (currentVideo === 4 && showBanner) {
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

  const toggleFullscreen = () => {
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
          {currentVideoData.url.endsWith('.mp4') ? (
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
          ) : (
            <img
              src={currentVideoData.url}
              alt={currentVideoData.title}
              className="w-full aspect-video object-cover"
            />
          )}

          {showFeedback && (
            <div className="feedback-popup">
              Good Job! 👍
            </div>
          )}

          {currentVideo === 4 && showBanner && (
            <div className="instruction-banner show">
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                Highlight what Henry decides to do instead
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                of copying.
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
                          if (currentVideo === 4) toggleWordSelection(word.text);
                        }}
                        className={`
                          word-span
                          ${isHighlighted ? 'active-word' : ''}
                          ${currentVideo === 4 && selectedWords.includes(word.text) ? 'selected-word' : ''}
                          ${currentVideo === 4 ? 'clickable-word' : ''}
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
                  <button onClick={() => setShowSubtitles(!showSubtitles)} className="control-btn" title="Subtitles">
                    <Subtitles className="w-6 h-6" />
                    <span className="control-label">Subtitle</span>
                  </button>
                  <button onClick={() => setShowCaption(!showCaption)} className="control-btn" title="Caption">
                    <MessageSquareText className="w-6 h-6" />
                    <span className="control-label">Caption</span>
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
