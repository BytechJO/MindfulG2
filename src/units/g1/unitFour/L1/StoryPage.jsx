import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Subtitles, Maximize2, Minimize2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';
import ValidationAlert from '../../shared/ValidationAlert';

import video1 from "./assets/1.mp4";
import video2 from "./assets/2.mp4";
import video3 from "./assets/3.mp4";
import video4 from "./assets/4.mp4";
import video5 from "./assets/5.mp4";
import img from "./assets/img.png";


export const StoryPage = () => {
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
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const availableSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenContainerRef = useRef(null);

  const videos = [
    {
      url: video1,
      title: "Section 1",
      subtitles: [
        {
          // start: 0, end: 3.12,
          // words: [
          //   { text: "Kate's", start: 0.5, end: 1.2 },
          //   { text: "Big", start: 1.2, end: 1.7 },
          //   { text: "Feelings", start: 1.7, end: 2.5 },
          // ]
        },
      ]
    },
    {
      url: video2,
      title: "Section 2",
      subtitles: [
        {
          start: 0, end: 2.5,
          words: [
            { text: "Simon", start: 0.2, end: 0.6 },
            { text: "visits", start: 0.6, end: 1.0 },
            { text: "his", start: 1.0, end: 1.4 },
            { text: "friend", start: 1.4, end: 1.8 },
            { text: "Jad.", start: 1.8, end: 2.2 },

          ]
        },
        {
          start: 2.6, end: 7.5,
          words: [
            { text: "They", start: 2.7, end: 3.1 },
            { text: "decide", start: 3.1, end: 3.5 },
            { text: "to", start: 3.5, end: 3.9 },
            { text: "play", start: 3.9, end: 4.1 },
            { text: "with", start: 4.1, end: 4.3 },
            { text: "Jad’s", start: 4.3, end: 4.6 },
            { text: "toy", start: 4.6, end: 4.8 },
            { text: "dinosaurs", start: 4.8, end: 5 },
            { text: "in", start: 5, end: 5.2 },
            { text: "the", start: 5.2, end: 5.4 },
            { text: "garden.", start: 5.4, end: 5.6 }
          ]

        },
        {
          start: 7.5, end: 6.4,
          words: [
            { text: "Thank you,", start: 5.6, end: 6.0 },
            { text: "Amy,", start: 6.0, end: 6.3 }
          ]
        },
        {
          start: 6.4, end: 8.8,
          words: [
            { text: "‘We", start: 7.0, end: 7.4 },
            { text: "need", start: 7.4, end: 7.8 },
            { text: "more", start: 7.8, end: 8.2 },
            { text: "dinosaurs’,", start: 8.2, end: 8.6 },
          ]
        },
        {
          start: 10.0, end: 15.0,
          words: [
            { text: "‘I", start: 10.6, end: 11.0 },
            { text: "will", start: 11.0, end: 11.4 },
            { text: "get", start: 11.4, end: 11.8 },
            { text: "the", start: 11.8, end: 12.2 },
            { text: "toys", start: 12.2, end: 12.6 },
            { text: "from", start: 12.6, end: 12.8 },
            { text: "your", start: 12.8, end: 13 },
            { text: "room’,", start: 13, end: 13.8 },

          ]


        },
      ]
    },
    {
      url: video3,
      title: "Section 3",
      subtitles: [
        {
          start: 0, end: 2.5,
          words: [
            { text: "Simon", start: 0.2, end: 0.6 },
            { text: "collects", start: 0.6, end: 1.0 },
            { text: "the", start: 1.0, end: 1.4 },
            { text: "toy", start: 1.4, end: 1.8 },
            { text: "dinosaurs,", start: 1.8, end: 2.2 },
          ]
        },
        {
          start: 2.5, end: 5.3,
          words: [
            { text: "but", start: 2.2, end: 2.5 },
            { text: "as", start: 2.5, end: 2.8 },
            { text: "he", start: 2.8, end: 3.1 },
            { text: "reaches", start: 3.1, end: 3.4 },
            { text: "for", start: 3.4, end: 3.7 },
            { text: "the", start: 3.7, end: 4.0 },
            { text: "last", start: 4.0, end: 4.3 },
            { text: "one,", start: 4.3, end: 4.6 },
            { text: "it", start: 4.6, end: 4.9 },
            { text: "falls.", start: 4.9, end: 5.2 },
          ]
        },
        {
          start: 5.5, end: 11.0,
          words: [
            { text: "Uh", start: 5.8, end: 6.2 },
            { text: "oh!", start: 6.2, end: 6.6 }
          ]
        },
      ]
    },
    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 0, end: 2.1,
          words: [

            { text: "Simon", start: 0.2, end: 0.6 },
            { text: "is", start: 0.6, end: 0.8 },
            { text: "afraid", start: 0.8, end: 1.0 },
            { text: "Jad", start: 1.0, end: 1.2 },
            { text: "will", start: 1.2, end: 1.4 },
            { text: "be", start: 1.4, end: 1.6 },
            { text: "very", start: 1.6, end: 1.8 },
            { text: "upset.", start: 1.8, end: 2.0 },


          ]
        },
        {
          start: 2.2, end: 5.1,
          words: [
            { text: "He", start: 2.0, end: 2.4 },
            { text: "thinks", start: 2.4, end: 2.8 },
            { text: "about", start: 2.8, end: 3.2 },
            { text: "what", start: 3.2, end: 3.6 },
            { text: "he", start: 3.6, end: 4.0 },
            { text: "will", start: 4.0, end: 4.4 },
            { text: "tell", start: 4.4, end: 4.8 },
            { text: "Jad.", start: 4.8, end: 5.2 },

          ]


        },
        {
          start: 5.2, end: 8.7,
          words: [
            { text: "Maybe", start: 5.4, end: 5.6 },
            { text: "he", start: 5.8, end: 6.0 },
            { text: "can", start: 6.0, end: 6.4 },
            { text: "hide", start: 6.4, end: 6.8 },
            { text: "the", start: 6.8, end: 7.2 },
            { text: "toy", start: 7.2, end: 7.6 },
            { text: "without", start: 7.6, end: 8.0 },
            { text: "Jad", start: 8.0, end: 8.4 },
            { text: "knowing.", start: 8.4, end: 8.8 }
          ]
        },
      ]
    },
    {
      url: video5,
      title: "Section 5",
      subtitles: [
        {
          start: 0, end: 2.0,
          words: [
            { text: "Jad", start: 0.3, end: 0.6 },
            { text: "sees", start: 0.6, end: 0.9 },
            { text: "the", start: 0.9, end: 1.2 },
            { text: "broken", start: 1.2, end: 1.5 },
            { text: "toy.", start: 1.5, end: 1.8 },

          ]

        },
        {
          start: 2.1, end: 4.0,
          words: [

            { text: "‘Why", start: 2.2, end: 2.5 },
            { text: "did", start: 2.5, end: 2.8 },
            { text: "you", start: 2.8, end: 3.1 },
            { text: "break", start: 3.1, end: 3.4 },
            { text: "it?’", start: 3.4, end: 3.7 },

          ]

        },
        {
          start: 4.1, end: 7,
          words: [
            { text: "‘It", start: 4.4, end: 4.6 },
            { text: "wasn’t", start: 4.6, end: 4.8 },
            { text: "my", start: 4.8, end: 5.0 },
            { text: "fault,", start: 5.0, end: 5.4 },
            { text: "it", start: 5.4, end: 5.6 },
            { text: "fell", start: 5.6, end: 5.9 },
            { text: "by", start: 5.9, end: 6.2 },
            { text: "itself,’", start: 6.2, end: 6.8 },





          ]



        },

        {
          start: 7, end: 11.0,
          words: [
            { text: "Jad", start: 7.3, end: 7.6 },
            { text: "begins", start: 7.6, end: 7.9 },
            { text: "to", start: 7.9, end: 8.2 },
            { text: "cry", start: 8.2, end: 8.5 },
            { text: "and", start: 9.5, end: 9.8 },
            { text: "Simon", start: 9.8, end: 10.1 },
            { text: "feels", start: 10.1, end: 10.4 },
            { text: "bad.", start: 10.4, end: 10.7 }
          ]
        },
        {
          start: 11.0, end: 15.0,
          words: [
            { text: "‘I’m", start: 11.4, end: 11.6 },
            { text: "sorry", start: 11.6, end: 11.8 },
            { text: "I", start: 11.8, end: 12.0 },
            { text: "broke", start: 12.0, end: 12.2 },
            { text: "your", start: 12.2, end: 12.4 },
            { text: "toy.", start: 12.4, end: 12.8 },
            { text: "It", start: 13.5, end: 13.7 },
            { text: "was", start: 13.7, end: 13.9 },
            { text: "an", start: 13.9, end: 14.1 },
            { text: "accident,’", start: 14.1, end: 14.8 }
          ]





        },
        {
          start: 15.5, end: 17.3,
          words: [
            { text: "Jad", start: 16.0, end: 16.2 },
            { text: "wipes", start: 16.2, end: 16.4 },
            { text: "his", start: 16.4, end: 16.6 },
            { text: "tears.", start: 16.6, end: 17.1 }
          ]

        },
        {
          start: 17.5, end: 20.3,
          words: [
            { text: "‘That’s", start: 17.5, end: 17.7 },
            { text: "ok.", start: 17.7, end: 18.1 },
            { text: "Let’s", start: 18.1, end: 18.3 },
            { text: "try", start: 18.3, end: 18.7 },
            { text: "and", start: 18.7, end: 19.1 },
            { text: "fix", start: 19.1, end: 19.5 },
            { text: "it", start: 19.5, end: 19.9 },
            { text: "together.’", start: 19.9, end: 20.3 }
          ]







        },
        {
          start: 20.0, end: 25.0,
          words: [
            { text: "I’m sorry", start: 11.6, end: 11.8 },
            { text: "I", start: 11.8, end: 12.0 },
            { text: "broke", start: 12.0, end: 12.2 },
            { text: "your", start: 12.2, end: 12.4 },
            { text: "toy.", start: 12.4, end: 12.8 },
            { text: "It", start: 13.5, end: 13.7 },
            { text: "was", start: 13.7, end: 13.9 },
            { text: "an", start: 13.9, end: 14.1 },
            { text: "accident,’", start: 14.1, end: 14.8 }
          ]
        },
      ]
    },
    {
      url: img,
      title: "Section 6",
      subtitles: [
      ]
    },
  ];


  const cloudPositions = {

    0: [
      // { bottom: '35rem', left: '50%', transform: 'translateX(-50%)', isFlipped: true }
    ],

    1: [
      { top: '20%', left: '40%', isFlipped: true },
      { top: '15%', left: '30%', isFlipped: true },
      { top: '20%', left: '60%', isFlipped: true },
      { top: '10%', left: '0%' },
      { top: '10%', right: '30%', isFlipped: true },
    ],

    2: [
      { top: '10%', right: '10%', isFlipped: true },
      { top: '15%', left: '70%', isFlipped: true },
      { top: '10%', left: '15%' },
    ],

    3: [
      { bottom: '85%', left: '60%', isFlipped: true },
      { top: '20%', left: '5%' },
      { top: '10%', left: '55%', isFlipped: true },
    ],

    4: [
      { top: '15%', right: '25%', isFlipped: false },
      { top: '15%', left: '25%' },
      { top: '15%', left: '40%', isFlipped: true },
      { top: '15%', right: '25%', isFlipped: false },
      { top: '15%', left: '25%', isFlipped: true },
      { top: '15%', left: '25%', isFlipped: false },
      { top: '15%', left: '25%', isFlipped: false },
      { top: '15%', left: '25%', isFlipped: false },
    ],
  };

  const currentVideoData = videos[currentVideo];
  const activeSubtitleIndex = currentVideoData.subtitles.findIndex(
    sub => currentTime >= sub.start && currentTime < sub.end
  );


  const isImage = (url) => {
    return /\.(jpeg|jpg|gif|png)$/.test(url);
  };

  const activeSubtitle = activeSubtitleIndex !== -1
    ? currentVideoData.subtitles[activeSubtitleIndex]
    : null;

  const activeCloudPosition = activeSubtitleIndex !== -1
    ? cloudPositions[currentVideo]?.[activeSubtitleIndex]
    : null;
  const [isLoading, setIsLoading] = useState(false);
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
      console.log(`Current Time: ${currentTime}, Duration: ${duration}`);
      if (duration > 0 && currentTime >= duration - 0.3) {
        video.pause();
        // video.currentTime = 5.0;
        // setCurrentTime(5.0);
        setShowBanner(true);
      }
    }
  }, [currentTime, currentVideo, isPlaying, duration]);


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
    if (currentVideo === videos.length - 1) {
      ValidationAlert.storyEnd(() => {
        navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
      });
    } else if (currentVideo !== 4) {
      setShowBanner(false);
      setCurrentVideo(prev => prev + 1);
    }
  }, [currentVideo, videos.length, navigate, unitId, lessonId]);

  useEffect(() => {
    // تحقق إذا كانت الصورة آخر عنصر
    if (currentVideo === videos.length - 1 && !currentVideoData.url.endsWith(".mp4")) {
      const timer = setTimeout(() => {
        ValidationAlert.storyEnd(() => {
        navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
      });
      }, 500); // نصف ثانية لتأكد من ظهور الصورة

      return () => clearTimeout(timer);
    }
  }, [currentVideo, currentVideoData, navigate, unitId, lessonId]);


  useEffect(() => {
    // تحقق إذا كانت الصورة آخر عنصر
    if (currentVideo === videos.length - 1 && !currentVideoData.url.endsWith(".mp4")) {
      const timer = setTimeout(() => {
        ValidationAlert.storyEnd(() => {
        navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
      });
      }, 500); // نصف ثانية لتأكد من ظهور الصورة

      return () => clearTimeout(timer);
    }
  }, [currentVideo, currentVideoData, navigate, unitId, lessonId]);

  const toggleWordSelection = (wordText) => {
    const correctWords = ["I’m sorry"];
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
      <div className="w-full max-w-6xl">
        <div ref={fullscreenContainerRef} className="video-wrapper">
          {videos.map((vid, index) => (
            <video key={index} src={vid.url} preload="auto" style={{ display: 'none' }} />
          ))}
          {isImage(currentVideoData.url) ? (
            // إذا كان المحتوى صورة، اعرض عنصر <img>
            <img
              src={currentVideoData.url}
              alt={currentVideoData.title}
              className="w-full aspect-video object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              muted={isMuted}
              onEnded={handleEnded}
              autoPlay 
              playsInline 
              src={currentVideoData.url}
            >
              Your browser does not support the video tag.
            </video>
          )}

          {showFeedback && (
            <div className="feedback-popup">
              Good Job! 👍
            </div>
          )}

          {currentVideo === 4 && showBanner && (
            <div className="instruction-banner show">
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                Highlight the phrase that shows Simon
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                apologising to Jad.
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
                <button className="close" onClick={() => setShowBubble(false)}>×</button>
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
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default StoryPage;
