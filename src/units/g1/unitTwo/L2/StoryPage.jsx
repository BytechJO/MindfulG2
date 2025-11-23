import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Subtitles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './StoryPage.css';
import { Maximize2, Minimize2 } from "lucide-react";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';

import video1 from "./assets/1.mp4";
import video2 from "./assets/2.mp4";
import video3 from "./assets/3.mp4";
import video4 from "./assets/4.mp4";
import video5 from "./assets/5.mp4";
import img1 from "./assets/nex.png";
// import video6 from "./assets/6.mp4";
// import video7 from "./assets/5.mp4";

import questionGif from './assets/question.gif';

export const StoryPage = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const [selectedWords, setSelectedWords] = useState([]);
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
          // start: 0, end: 3.5, 
          // words: [
          //   { text: "A", start: 0.2, end: 0.7 },
          //   { text: "Clean", start: 0.7, end: 1.3 },
          //   { text: "Place", start: 1.3, end: 2.0 },
          //   { text: "is", start: 2.1, end: 2.3 },
          //   { text: "a", start: 2.3, end: 2.5 },
          //   { text: "Safe", start: 2.5, end: 2.9 }, // تعديل طفيف
          //   { text: "Place.", start: 2.9, end: 3.3 }, // تعديل طفيف
          // ]
        },
      ]
    },
    {
      url: video2,
      title: "Section 2",
      subtitles: [
        {
          start: 0, end: 2.3,
          words: [
            { text: "Leo", start: 0.1, end: 0.4 },
            { text: "is", start: 0.4, end: 0.6 },
            { text: "at", start: 0.6, end: 0.8 },
            { text: "his", start: 0.8, end: 1.0 },
            { text: "friend", start: 1.0, end: 1.3 },
            { text: "Zack’s", start: 1.3, end: 1.5 },
            { text: "house.", start: 1.5, end: 1.8 },

          ]
        },
        {
          start: 2.3, end: 4.5,
          words: [
            { text: "Leo", start: 2.4, end: 2.6 },
            { text: "shows", start: 2.6, end: 2.9 },
            { text: "his", start: 2.9, end: 3.1 },
            { text: "new", start: 3.1, end: 3.3 },
            { text: "bike", start: 3.3, end: 3.5 },
            { text: "to", start: 3.5, end: 3.7 },
            { text: "Zack.", start: 3.7, end: 4.0 },

          ]
        },
        {
          start: 6.0, end: 11.0,
          words: [
            { text: "Your", start: 6.0, end: 6.3 },
            { text: "bike", start: 6.3, end: 6.6 },
            { text: "is", start: 6.6, end: 6.8 },
            { text: "so", start: 6.8, end: 7.0 },
            { text: "cool!", start: 7.0, end: 7.3 },
          ]
        },
      ]
    },
    {
      url: video3,
      title: "Section 3",
      subtitles: [
        {
          start: 0, end: 2.6,
          words: [
            { text: "Do", start: 0.0, end: 0.2 },
            { text: "you", start: 0.1, end: 0.4 },
            { text: "want", start: 0.4, end: 0.7 },
            { text: "to", start: 0.7, end: 0.9 },
            { text: "ride", start: 0.9, end: 1.2 },
            { text: "my", start: 1.2, end: 1.5 },
            { text: "new", start: 1.5, end: 1.7 },
            { text: "bike?", start: 1.7, end: 2.1 },
          ]
        },
        {
          start: 2.6, end: 6.0,
          words: [
            { text: "Sure!", start: 2.7, end: 3.1 },
            { text: "Let’s", start: 3.1, end: 3.3 },
            { text: "have", start: 3.3, end: 3.4 },
            { text: "a race!", start: 3.4, end: 3.9 },
          ]
        },
      ]
    },
    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 0.0, end: 2.5,
          words: [
            { text: "Zack", start: 0.0, end: 0.3 },
            { text: "and", start: 0.3, end: 0.6 },
            { text: "Leo", start: 0.6, end: 0.9 },
            { text: "race", start: 0.9, end: 1.2 },
            { text: "on", start: 1.2, end: 1.5 },
            { text: "the", start: 1.5, end: 1.8 },
            { text: "bike", start: 1.8, end: 2.1 },
            { text: "path.", start: 2.1, end: 2.4 },
          ]
        },
        {
          start: 3.5, end: 4.9,
          words: [
            { text: "The", start: 3.5, end: 3.8 },
            { text: "boys", start: 3.8, end: 4.1 },
            { text: "ride", start: 4.1, end: 4.4 },
            { text: "fast,", start: 4.4, end: 4.7 },
          ]
        },

        {
          start: 5.0, end: 7.5,
          words: [
            { text: "but", start: 5.1, end: 5.4 },
            { text: "Zack", start: 5.4, end: 5.7 },
            { text: "is", start: 5.7, end: 6.0 },
            { text: "faster", start: 6.0, end: 6.3 },
            { text: "on", start: 6.3, end: 6.6 },
            { text: "the", start: 6.6, end: 6.9 },
            { text: "new", start: 6.9, end: 7.2 },
            { text: "bike.", start: 7.2, end: 7.5 },
          ]
        },

        {
          start: 8.0, end: 9.0,
          words: [
            { text: "Be", start: 8.0, end: 8.3 },
            { text: "careful,", start: 8.3, end: 8.6 },
            { text: "Zack!", start: 8.6, end: 8.9 },
          ]
        },
      ]
    },
    {
      url: video5,
      title: "Section 5",
      subtitles: [
        {
          start: 0.0, end: 3.5,
          words: [
            { text: "Suddenly,", start: 0.1, end: 0.6 },
            { text: "Zack", start: 0.6, end: 1.1 },
            { text: "hits", start: 1.1, end: 1.5 },
            { text: "a", start: 1.5, end: 1.7 },
            { text: "rock", start: 1.7, end: 2.2 },
            { text: "and", start: 2.2, end: 2.5 },
            { text: "crashes", start: 2.5, end: 2.8 },
            { text: "to", start: 2.8, end: 2.9 },
            { text: "the", start: 2.9, end: 3.0 },
            { text: "ground.", start: 3.0, end: 3.3 },
          ]
        },

        {
          start: 3.5, end: 5.5,
          words: [
            { text: "Leo", start: 3.6, end: 3.9 },
            { text: "rushes", start: 3.9, end: 4.3 },
            { text: "to", start: 4.3, end: 4.5 },
            { text: "help", start: 4.5, end: 4.8 },
            { text: "him.", start: 4.8, end: 5.0 },
          ]
        },

        {
          start: 5.9, end: 8.0,
          words: [
            { text: "I", start: 6.0, end: 6.2 },
            { text: "am", start: 6.2, end: 6.4 },
            { text: "sorry", start: 6.4, end: 6.6 },
            { text: "I", start: 6.6, end: 6.8 },
            { text: "crashed", start: 6.8, end: 7.0 },
            { text: "your", start: 7.0, end: 7.2 },
            { text: "new", start: 7.2, end: 7.4 },
            { text: "bike,", start: 7.4, end: 7.6 },
            { text: "Leo,", start: 7.6, end: 7.8 },

          ]
        },

        {
          start: 8.1, end: 9.8,
          words: [
            { text: "it's", start: 8.2, end: 8.5 },
            { text: "ok", start: 8.5, end: 8.8 },
            { text: "zack", start: 8.8, end: 9.1 },
          ]
        },

        {
          start: 9.9, end: 11.2,
          words: [
            { text: "I'm", start: 9.9, end: 10.1 },
            { text: "glad", start: 10.1, end: 10.3 },
            { text: "you", start: 10.3, end: 10.5 },
            { text: "didn't", start: 10.5, end: 10.7 },
            { text: "get", start: 10.7, end: 10.9 },
            { text: "hurt,", start: 10.9, end: 11.1 },
          ]
        },

        {
          start: 11.5, end: 16.5,
          words: [
            { text: "Leo", start: 11.4, end: 11.7 },
            { text: "is", start: 11.7, end: 12.0 },
            { text: "upset", start: 12.0, end: 12.3 },
            { text: "about", start: 12.3, end: 12.6 },
            { text: "his", start: 12.6, end: 12.9 },
            { text: "new", start: 12.9, end: 13.2 },
            { text: "bike,", start: 13.2, end: 13.5 },
            { text: "but", start: 14.3, end: 14.6 },
            { text: "he", start: 14.6, end: 14.9 },
            { text: "decides", start: 14.9, end: 15.2 },
            { text: "to", start: 15.2, end: 15.5 },
            { text: "forgive", start: 15.5, end: 15.8 },
            { text: "Zack.", start: 15.8, end: 16.1 },
          ]
        },

        {
          start: 16.6, end: 19.6,
          words: [
            { text: "Good", start: 16.6, end: 16.9 },
            { text: "job,", start: 16.9, end: 17.2 },
            { text: "Leo!", start: 17.2, end: 17.5 },
            { text: "You", start: 18.5, end: 18.8 },
            { text: "forgave", start: 18.8, end: 19.1 },
            { text: "your", start: 19.1, end: 19.3 },
            { text: "friend.", start: 19.3, end: 19.6 },
          ]
        },

        {
          start: 19.6, end: 21.0,
          words: [
            { text: "I’m glad you didn’t get hurt", start: 9.9, end: 10.1 },
          ]
        },


      ]
    },
    { url: img1, title: "Section 2 (Image)", subtitles: [] },
    // {
    //   url: video6,
    //   title: "Section 6",
    //   subtitles: [
    //     {
    //       start: 0, end: 0.5,
    //       words: [
    //         { text: "Sorry", start: 0, end: 0.3 },
    //       ]
    //     },
    //     {
    //       start: 0.5, end: 2.0,
    //       words: [
    //         { text: "Sorry", start: 0.6, end: 0.9 },
    //       ]
    //     },
    //   ]
    // },
    // {
    //   url: video7,
    //   title: "Section 7",
    //   subtitles: [
    //     {
    //       start: 0, end: 0.5,

    //     },
    //     {
    //       start: 0.5, end: 2.0,

    //     },
    //   ]
    // },


  ];


  // const cloudPositions = [
  //   { bottom: '34.375rem', left: '32%', transform: 'translateX(-50%)' },
  //   { top: '1%', left: '45%', transform: 'translateY(0)' },
  //   { top: '10%', right: '65%', transform: 'translateX(0)', left: 'auto' },
  //   { bottom: '85%', left: '30%', transform: 'translateX(-50%)' },
  //   { top: '10%', left: '50%', transform: 'translateX(0)', isFlipped: true },
  // ];


  const cloudPositions = {
    0: [],

    1: [
      { top: '15%', left: '10%' },
      { top: '15%', left: '60%', isFlipped: true },
      { top: '20%', left: '40%', isFlipped: true  },
    ],

    2: [
      { top: '10%', right: '40%' },
      { top: '15%', left: '30%', isFlipped: true  }
    ],

    3: [
      { bottom: '80%', left: '73%', isFlipped: true },
      { top: '30%', left: '5%' },
      { top: '10%', left: '80%', isFlipped: true },
      { top: '10%', left: '15%' }
    ],

    4: [
      { top: '30%', left: '7%' },
      { top: '10%', left: '15%' },
      { top: '25%', left: '8%' },
      { top: '10%', left: '70%', isFlipped: true },
      { top: '10%', left: '60%', isFlipped: true },
      { top: '10%', left: '10%' },
      { top: '10%', left: '10%' },
      { top: '35%', left: '50%', isFlipped: true },
    ],
    5: [
      // { bottom: '80%', left: '48%', isFlipped: true },
      // { top: '35%', left: '40%' },                    
    ],
  };

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
      Swal.fire({
        title: "Good Job!",
        html: "You finished the story. Go to the quiz?",
        imageUrl: questionGif,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Question GIF",
        background: "#dfeaf6",
        confirmButtonText: '<i class="fa-solid fa-right-long"></i>',
        allowOutsideClick: false,
        allowEscapeKey: false,
        buttonsStyling: false,
        customClass: {
          popup: "my-popup",
          image: "my-image",
          title: "my-title",
          content: "my-content",
          confirmButton: "my-button",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/quiz');
        }
      });
    } else if (currentVideo !== 5) {
      setShowBanner(false);
      setCurrentVideo(prev => prev + 1);
    }
  }, [currentVideo, videos.length, navigate]);
  useEffect(() => {
    // تحقق إذا كانت الصورة آخر عنصر
    if (currentVideo === videos.length - 1 && !currentVideoData.url.endsWith(".mp4")) {
      // تأخير صغير حتى تظهر الصورة قبل الـ Swal
      const timer = setTimeout(() => {
        Swal.fire({
          title: "Good Job!",
          html: "You finished the story. Go to the quiz?",
          imageUrl: questionGif,
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: "Question GIF",
          background: "#dfeaf6",
          confirmButtonText: '<i class="fa-solid fa-right-long"></i>',
          allowOutsideClick: false,
          allowEscapeKey: false,
          buttonsStyling: false,
          customClass: {
            popup: "my-popup",
            image: "my-image",
            title: "my-title",
            content: "my-content",
            confirmButton: "my-button",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/quiz');
          }
        });
      }, 500); // نصف ثانية لتأكد من ظهور الصورة

      return () => clearTimeout(timer);
    }
  }, [currentVideo, currentVideoData, navigate]);


  const toggleWordSelection = (wordText) => {
    const correctWords = ["I’m glad you didn’t get hurt"];
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
          {currentVideoData.url.endsWith(".mp4") ? (
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
              alt={currentVideoData.title || "Image"}
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
                Highlight what Leo said to forgive
              </p>
              {/* <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                to fix the problem.
              </p> */}
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
    </div>
  );
};

export default StoryPage;
