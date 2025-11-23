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
          // start: 0, end: 3.12,
          // words: [
          //   { text: "Kate's", start: 0.5, end: 1.2 },
          //   { text: "Big", start: 1.2, end: 1.7 },
          //   { text: "Feelings", start: 1.7, end: 2.5 },
          // ]
        },
      ],
    },
    {
      url: video2,
      title: "Section 2",
      subtitles: [
        {
          start: 0,
          end: 2,
          words: [
            { text: "Sam", start: 0.0, end: 0.1 },
            { text: "looks", start: 0.1, end: 0.3 },
            { text: "out", start: 0.3, end: 0.6 },
            { text: "of", start: 0.6, end: 1 },
            { text: "the", start: 1, end: 1.3 },
            { text: "window.", start: 1.3, end: 1.9 },
          ],
        },
        {
          start: 2,
          end: 5.2,
          words: [
            { text: "He", start: 0.7, end: 1.1 },
            { text: "can", start: 1.1, end: 1.5 },
            { text: "see", start: 1.5, end: 1.9 },
            { text: "the", start: 1.9, end: 2.3 },
            { text: "new", start: 2.3, end: 2.7 },
            { text: "neighbours", start: 2.7, end: 3.1 },
            { text: "who", start: 3.1, end: 3.5 },
            { text: "moved", start: 3.5, end: 3.9 },
            { text: "in", start: 3.9, end: 4.3 },
            { text: "next", start: 4.3, end: 4.7 },
            { text: "door.", start: 4.7, end: 5.1 },
          ],
        },
        {
          start: 5.3,
          end: 10.5,
          words: [
            { text: "There", start: 5, end: 5.3 },
            { text: "is", start: 5.3, end: 5.7 },
            { text: "a", start: 5.7, end: 6 },
            { text: "little", start: 6, end: 6.3 },
            { text: "boy", start: 6.3, end: 6.6 },
            { text: "who", start: 6.6, end: 7 },
            { text: "looks", start: 7, end: 7.5 },
            { text: "the", start: 7.5, end: 8 },
            { text: "the", start: 8.0, end: 8.2 },
            { text: "same", start: 8.2, end: 8.4 },
            { text: "age", start: 8.4, end: 8.6 },
            { text: "as", start: 8.6, end: 8.8 },
            { text: "Sam.", start: 9, end: 10.0 },
          ],
        },
      ],
    },
    {
      url: video3,
      title: "Section 3",
      subtitles: [
        {
          start: 0,
          end: 4.1,
          words: [
            { text: "Let’s", start: 0.1, end: 0.3 },
            { text: "take", start: 0.3, end: 0.4 },
            { text: "a", start: 0.4, end: 0.5 },
            { text: "cake", start: 0.5, end: 0.7 },
            { text: "to", start: 0.7, end: 1 },
            { text: "our", start: 1, end: 1.2 },
            { text: "new", start: 1.2, end: 1.5 },
            { text: "neighbours", start: 1.5, end: 1.9 },
            { text: "and", start: 1.9, end: 2.1 },
            { text: "say", start: 2.1, end: 2.3 },
            { text: "hello.", start: 2.3, end: 2.6 },
          ],
        },
        {
          start: 4.1,
          end: 7.6,
          words: [
            { text: "I", start: 2.6, end: 3.4 },
            { text: "don’t", start: 3.4, end: 4 },
            { text: "know,", start: 4, end: 4.6 },
            { text: "Mum.", start: 4.6, end: 4.8 },
            { text: "They", start: 4.8, end: 5.4 },
            { text: "look", start: 5.4, end: 6.2 },
            { text: "different", start: 6.2, end: 7.3 },
          ],
        },
        {
          start: 7.5,
          end: 13.0,
          words: [
            { text: "Everyone", start: 8, end: 8.4 },
            { text: "is", start: 8.4, end: 8.8 },
            { text: "different,’", start: 8.8, end: 9.2 },

            { text: "Being", start: 10.2, end: 10.6 },
            { text: "different", start: 10.6, end: 11.0 },
            { text: "isn't", start: 11.0, end: 11.4 },
            { text: "a", start: 11.4, end: 11.8 },
            { text: "bad", start: 11.8, end: 12.2 },
            { text: "thing.", start: 12.2, end: 12.6 },
          ],
        },
      ],
    },
    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 0,
          end: 3,
          words: [
           { text: "Sam", start: 0.2, end: 0.4 },
  { text: "and", start: 0.4, end: 0.6 },
  { text: "his", start: 0.6, end: 0.8 },
  { text: "mum", start: 0.8, end: 1 },
  { text: "take", start: 1, end: 1.3 },
  { text: "the", start: 1.3, end: 1.6 },
  { text: "cake", start: 1.6, end: 1.8 },
  { text: "to", start: 1.8, end: 1.9 },
  { text: "their", start: 1.9, end: 2 },
  { text: "new", start: 2, end: 2.1 },
  { text: "neighbours.", start: 2.1, end: 2.5 },
          ],
        },
        {
          start: 3.0,
          end: 7,
          words: [
          { text: "Sam", start: 4, end: 4.3 },
  { text: "feels", start: 4.3, end: 4.6 },
  { text: "shy", start: 4.6, end: 4.9 },
  { text: "and", start: 5.1, end: 5.4},
  { text: "stays", start: 5.4, end: 5.7},
  { text: "close", start: 5.7, end: 6 },
  { text: "to", start: 6, end: 6.2 },
  { text: "his", start: 6.2, end: 6.4 },
  { text: "mum.", start: 6.4, end: 6.7 },
          ],
        },
        {
          start: 7,
          end: 10.7,
          words: [
            { text: "Mmm,", start: 7, end: 7.3 },
  { text: "thank", start: 7.3, end: 7.5 },
  { text: "you", start: 7.5, end: 7.9 },
  { text: "Mrs", start: 7.9, end: 8.3 },
  { text: "Roberts,", start: 8.3, end: 8.7 },
  { text: "I", start: 8.7, end: 9.1 },
  { text: "love", start: 9.1, end: 9.5 },
  { text: "honey", start: 9.5, end: 9.9 },
  { text: "cake,", start: 9.9, end: 10.3 }
          ],
        }, {
          start:10.7 ,
          end: 18.0,
          words: [
  { text: "You’re", start: 12.7, end: 13.1 },
  { text: "welcome!", start: 13.1, end: 13.5 },
  { text: "What", start: 13.5, end: 13.9 },
  { text: "a", start: 13.9, end: 14.3 },
  { text: "polite", start: 14.3, end: 14.7 },
  { text: "young", start: 14.7, end: 15.1 },
  { text: "man", start: 15.1, end: 15.5 },
  { text: "you", start: 15.5, end: 15.9 },
  { text: "are,", start: 15.9, end: 16.3 }
]

,
        },
      ],
    },
    {
      url: video5,
      title: "Section 5",
      subtitles: [
        {
          start: 0,
          end: 3,
          words:[
  { text: "Sam", start: 0.2, end: 0.4 },
  { text: "sees", start: 0.4, end: 0.6},
  { text: "that", start: 0.6, end: 0.8 },
  { text: "the", start: 0.8, end: 1 },
  { text: "boy", start: 1, end: 1.2 },
  { text: "seems", start: 1.2, end: 1.4 },
  { text: "nice", start: 1.4, end: 1.8 },
  { text: "and", start: 2, end: 2.2 },
  { text: "goes", start:2.2, end: 2.4 },
  { text: "to", start: 2.4, end: 2.6 },
  { text: "introduce", start: 2.6, end: 2.8 },
  { text: "himself.", start: 2.8, end: 3 },

  

]
,
        },
        {
          start: 3,
          end: 8.5,
          words: [
  { text: "‘I’m", start: 4.2, end: 4.6 },
  { text: "Sam,", start: 4.6, end: 5.0 },
  { text: "do", start: 5.8, end: 6 },
  { text: "you", start: 6, end: 6.2 },
  { text: "want", start: 6.2, end: 6.4 },
  { text: "to", start: 6.4, end: 6.6 },
  { text: "go", start: 6.6, end: 7.0 },
  { text: "outside", start: 7.0, end: 7.4 },
  { text: "and", start: 7.4, end: 7.8 },
  { text: "play?’", start: 7.8, end: 8.2 },

]

,
        },
        {
          start: 8.5,
          end: 12.6,
          words:[
  { text: "‘My", start: 7.7, end: 8.1 },
  { text: "name", start: 8.1, end: 8.5 },
  { text: "is", start: 8.5, end: 8.9 },
  { text: "Lee,", start: 8.9, end: 9.3 },
  { text: "I", start: 9.3, end: 9.7 },
  { text: "would", start: 9.7, end: 10.1 },
  { text: "really", start: 10.1, end: 10.5 },
  { text: "like", start: 10.5, end: 10.9 },
  { text: "that.", start: 10.9, end: 11.3 },
  { text: "Let’s", start: 11.5, end: 11.9 },
  { text: "go!’", start: 11.9, end: 12.3 },
 
]






,
        },
        {
          start: 12.7,
          end: 14,
          words: [
  { text: "They", start: 12.3, end: 12.7 },
  { text: "play", start: 12.7, end: 13.1 },
  { text: "happily", start: 13.1, end: 13.5 },
  { text: "together.", start: 13.5, end: 13.9 }
]
,
        },
        {
          start: 10.2,
          end: 14,
          words: [
            { text: "Thank you,", start: 10.4, end: 11.7 },
            { text: "Jane.", start: 11.7, end: 12.3 },
            { text: "That’s", start: 12.3, end: 12.6 },
            { text: "a good", start: 12.6, end: 12.9 },
            { text: "idea!", start: 12.9, end: 13.8 },
          ],
        },
      ],
    },
  ];

  const cloudPositions = {
    0: [
      // { bottom: '35rem', left: '50%', transform: 'translateX(-50%)', isFlipped: true }
    ],

    1: [
      { top: "10%", left: "5%" },
      { top: "10%", left: "15%" },
      { top: "10%", left: "5%" }
    ],

    2: [
      { top: "10%", right: "20%", isFlipped: true },
      { top: "5%", left: "30%" },
      { top: "5%", left: "40%", isFlipped: true },
    ],

    3: [
      { bottom: "85%", left: "60%", isFlipped: true },
      { top: "30%", left: "23%", isFlipped: true },
      { top: "15%", left: "55%" },
      { top: "5%", left: "35%", isFlipped: true },
    ],

    4: [
      { top: "7%", left: "38%", isFlipped: true },
      { top: "5%", left: "35%", isFlipped: true },
      { top: "5%", left: "20%" },
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

  // useEffect(() => {
  //   const video = videoRef.current;
  //   if (!video) return;

  //   if (currentVideo === 3 && isPlaying) {
  //     console.log(`Current Time: ${currentTime}, Duration: ${duration}`);
  //     if (duration > 0 && currentTime >= duration - 0.3) {
  //       video.pause();
  //       // video.currentTime = 5.0;
  //       // setCurrentTime(5.0);
  //       setShowBanner(true);
  //     }
  //   }
  // }, [currentTime, currentVideo, isPlaying, duration]);


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
  // إذا لم يكن الفيديو الحالي هو الأخير، انتقل إلى الفيديو التالي
  if (currentVideo < videos.length - 1) {
    setCurrentVideo(prev => prev + 1);
  } 
  else {
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
  }
}, [currentVideo, videos.length, navigate]);



  const toggleWordSelection = (wordText) => {
    const correctWords = ["uncomfortable"];
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

          {/* {currentVideo === 3 && showBanner && (
            <div className="instruction-banner show">
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                Highlight the word that shows how someone
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                feels when their personal space is crossed.
              </p>
            </div>
          )} */}

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
