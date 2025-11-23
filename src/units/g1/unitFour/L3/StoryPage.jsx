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
import img from "./assets/img.png";

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
  const isImage = (url) => {
    return /\.(jpeg|jpg|gif|png)$/.test(url);
  };
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
          start: 0, end: 3.8,
          words: [
            { text: "Jade", start: 0.2, end: 0.5 },
            { text: "and", start: 0.5, end: 0.8 },
            { text: "Ella", start: 0.8, end: 1.1 },
            { text: "are", start: 1.1, end: 1.4 },
            { text: "in", start: 1.4, end: 1.7 },
            { text: "the", start: 1.7, end: 2.0 },
            { text: "cafeteria", start: 2.0, end: 2.3 },
            { text: "at", start: 2.3, end: 2.6 },
            { text: "lunchtime.", start: 2.6, end: 3.4 },


          ]
        }, {
          start: 3.8, end: 4.8,
          words: [
            { text: "‘Wait!", start: 4.4, end: 4.7 },




          ]
        }, {
          start: 4.8, end: 7.8,
          words: [

            { text: "Where", start: 4.8, end: 5.2 },
            { text: "is", start: 5.2, end: 5.7 },
            { text: "your", start: 5.7, end: 6.2 },
            { text: "lunchbox,", start: 6.2, end: 6.7 },
            { text: "Ella?’", start: 6.7, end: 7.5 },





          ]
        }, {
          start: 7.8, end: 10,
          words: [



            { text: "‘I", start: 8, end: 8.4 },
            { text: "forgot", start: 8.4, end: 8.6 },
            { text: "it", start: 8.6, end: 9 },
            { text: "at", start: 9, end: 9.4 },
            { text: "home,’", start: 9.4, end: 9.6 },





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
            { text: "Jade’s", start: 0.2, end: 0.5 },
            { text: "lunch", start: 0.5, end: 0.8 },
            { text: "has", start: 0.8, end: 1.1 },
            { text: "everything", start: 1.1, end: 1.4 },
            { text: "she", start: 1.4, end: 1.7 },
            { text: "likes.", start: 1.7, end: 2.0 },


          ]
        },

        {
          start: 2.5, end: 5.6,
          words: [
            { text: "Jade", start: 3.2, end: 3.5 },
            { text: "starts", start: 3.5, end: 3.8 },
            { text: "to", start: 3.8, end: 4.1 },
            { text: "eat", start: 4.1, end: 4.4 },
            { text: "her", start: 4.4, end: 4.7 },
            { text: "lunch.", start: 4.7, end: 5.5 },


          ]
        }, {
          start: 5.6, end: 7.2,
          words: [

            { text: "Ella", start: 5.9, end: 6.2 },
            { text: "looks", start: 6.2, end: 6.5 },
            { text: "sad.", start: 6.5, end: 6.8 }

          ]
        },
      ]
    },
    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 0, end: 6.4,
          words: [
            { text: "Jade", start: 0.2, end: 0.5 },
            { text: "doesn’t", start: 0.5, end: 0.8 },
            { text: "want", start: 0.8, end: 1.1 },
            { text: "to", start: 1.1, end: 1.4 },
            { text: "give", start: 1.4, end: 1.7 },
            { text: "up", start: 1.7, end: 2.0 },
            { text: "any", start: 2.0, end: 2.3 },
            { text: "of", start: 2.3, end: 2.6 },
            { text: "her", start: 2.6, end: 2.9 },
            { text: "yummy", start: 2.9, end: 3.2 },
            { text: "lunch,", start: 3.2, end: 3.5 },
            { text: "but", start: 3.5, end: 3.8 },
            { text: "she", start: 3.8, end: 4.1 },
            { text: "knows", start: 4.1, end: 4.4 },
            { text: "that", start: 4.4, end: 4.7 },
            { text: "Ella", start: 4.7, end: 5.0 },
            { text: "must", start: 5.0, end: 5.3 },
            { text: "be", start: 5.3, end: 5.6 },
            { text: "hungry.", start: 5.6, end: 6.2 },


          ]
        },
        {
          start: 6.4, end: 8,
          words: [
            { text: "Oh", start: 7.1, end: 7.5 },
            { text: "dear!", start: 7.5, end: 7.9 },


          ]
        },
        {
          start: 8, end: 10,
          words: [

            { text: "Jade", start: 7.9, end: 8.3 },
            { text: "thinks", start: 8.3, end: 8.7 },
            { text: "and", start: 8.7, end: 9.1 },
            { text: "thinks.", start: 9.1, end: 9.5 }

          ]
        },
      ]
    },
    {
      url: video5,
      title: "Section 5",
      subtitles: [
        {
          start: 0, end: 5,
          words: [
            { text: "Jade", start: 1.3, end: 1.6 },
            { text: "decides", start: 1.6, end: 1.9 },
            { text: "to", start: 1.9, end: 2.2 },
            { text: "care", start: 2.2, end: 2.5 },
            { text: "for", start: 2.5, end: 2.8 },
            { text: "her", start: 2.8, end: 3.1 },
            { text: "friend", start: 3.1, end: 3.4 },
            { text: "by", start: 3.4, end: 3.7 },
            { text: "sharing", start: 3.7, end: 4.0 },
            { text: "her", start: 4.0, end: 4.3 },
            { text: "food.", start: 4.3, end: 5.0 },



          ]
        },
        {
          start: 4.8, end: 9.2,
          words: [
            { text: "Jade", start: 6.1, end: 6.4 },
            { text: "gives", start: 6.4, end: 6.7 },
            { text: "Ella", start: 6.7, end: 7.0 },
            { text: "her", start: 7.0, end: 7.3 },
            { text: "juice", start: 7.3, end: 7.6 },
            { text: "and", start: 7.6, end: 7.9 },
            { text: "half", start: 7.9, end: 8.2 },
            { text: "of", start: 8.2, end: 8.5 },
            { text: "her", start: 8.5, end: 8.8 },
            { text: "sandwich.", start: 8.8, end: 9.1 },


          ]
        },
        {
          start: 9.2, end: 11.0,
          words: [
            { text: "Ella", start: 9.3, end: 9.5 },
            { text: "thanks", start: 9.5, end: 9.7 },
            { text: "Jade.", start: 9.7, end: 10.0 }

          ]
        },
        {
          start: 11.0, end: 14.0,
          words: [
            { text: "Jade", start: 1.3, end: 1.6 },
            { text: "decides", start: 1.6, end: 1.9 },
            { text: "to", start: 1.9, end: 2.2 },
            { text: "care", start: 2.2, end: 2.5 },
            { text: "for", start: 2.5, end: 2.8 },
            { text: "her", start: 2.8, end: 3.1 },
            { text: "friend", start: 3.1, end: 3.4 },
            { text: "by", start: 3.4, end: 3.7 },
            { text: "sharing her food", start: 3.7, end: 4.0 },
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
      { top: '15%', left: '70%', isFlipped: true },
      { top: '15%', left: '15%' },
      { top: '10%', left: '40%', isFlipped: true },
      { top: '20%', left: '25%', isFlipped: true },
    ],

    2: [
      { top: '10%', right: '10%', isFlipped: true },
      { top: '15%', left: '70%', isFlipped: true },
      { top: '10%', left: '25%', isFlipped: true },

    ],

    3: [
      { bottom: '70%', left: '60%', isFlipped: true },
      { top: '10%', left: '30%' },
      { top: '10%', left: '55%', isFlipped: true },
      { top: '10%', left: '55%', isFlipped: true },
    ],

    4: [
      { bottom: '30%', left: '60%', isFlipped: true },
      { bottom: '30%', left: '60%' },
      { bottom: '30%', left: '60%' },
      { bottom: '30%', left: '60%' }
    ],
    // 5: [
    //   { bottom: '80%', left: '48%', },
    //   { top: '20%', left: '25%' },
    //   { top: '10%', left: '50%', isFlipped: true },
    //   { top: '70%', left: '50%', isFlipped: true }
    // ],
    // 6: [
    //   { bottom: '80%', left: '48%', transform: 'translateX(-50%)' },
    //   { top: '10%', left: '10%' },
    //   { top: '10%', left: '50%', isFlipped: true },
    // ],
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
    } else if (currentVideo !== 4) {
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
    const correctWords = ["sharing her food"];
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
                Highlight how Jade decided to care for her
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                friend Ella.
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
