import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Subtitles,
  Maximize2,
  Minimize2,
  MessageSquareText,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import "../../shared/StoryPage.css";
import ValidationAlert from "../../shared/ValidationAlert";

import video1 from "./assets/1.mp4";
import video2 from "./assets/2.mp4";
import video3 from "./assets/3.mp4";
import video4 from "./assets/4.mp4";
import video5 from "./assets/5.mp4";
import img from "./assets/img.png";

export const StoryPage = () => {
  const [extraBubble, setExtraBubble] = useState(null);
  const [showCaption, setShowCaption] = useState(true);
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
        },
      ],
    },
    {
      url: video2,
      title: "Section 2",
      subtitles: [
        {
     
        },
        {
      
        },
        {

        },
      ],
    },
    {
      url: video3,
      title: "Section 3",
      subtitles: [
        {
       
        },
        {
        
        },
        {
      
        },
        {
       
        },
        {
          start: 15.0,
          end: 17.2,
          words: [
            { text: "How", start: 15.0, end: 15.4 },
            { text: "can", start: 15.4, end: 15.8 },
            { text: "I", start: 15.8, end: 16.2 },
            { text: "help", start: 16.2, end: 16.6 },
            { text: "Sonia?", start: 16.6, end: 17.0 },
          ],
        },
      ],
    },
    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
    
        },
        {
          start: 4.0,
          end: 10.0,
          words: [
            { text: "‘Why", start: 4.8, end: 5.1 },
            { text: "don’t", start: 5.1, end: 5.4 },
            { text: "we", start: 5.4, end: 5.7 },
            { text: "make", start: 5.7, end: 6.0 },
            { text: "extra", start: 6.0, end: 6.3 },
            { text: "cookies", start: 6.3, end: 6.6 },
            { text: "for", start: 6.6, end: 6.9 },
            { text: "you", start: 6.9, end: 7.2 },
            { text: "to", start: 7.2, end: 7.5 },
            { text: "share", start: 7.5, end: 7.8 },
            { text: "with", start: 7.8, end: 8.1 },
            { text: "Sonia", start: 8.1, end: 8.4 },
            { text: "at", start: 8.4, end: 8.7 },
            { text: "school", start: 8.7, end: 9.0 },
            { text: "tomorrow?’", start: 9.0, end: 9.3 },
          ],
        },
      ],
    },
    {
      url: video5,
      title: "Section 5",
      subtitles: [
        {
   
        },
      ],
    },
  ];

  const cloudPositions = {
    0: [
      // { bottom: '35rem', left: '50%', transform: 'translateX(-50%)', isFlipped: true }
    ],

    1: [
      { top: "15%", left: "70%", isFlipped: true },
      { top: "15%", left: "15%" },
      { top: "10%", left: "40%", isFlipped: true },
      { top: "10%", left: "40%" },
      { top: "10%", left: "40%" },
    ],

    2: [
      { top: "10%", right: "50%", isFlipped: false },
      { top: "15%", right: "60%", isFlipped: false },
      { top: "10%", left: "15%" },
      { top: "10%", right: "15%" },
      { bottom: "30%", left: "20%" },
    ],

    3: [
      { top: "10%", right: "10%", isFlipped: true },
      { top: "10%", right: "50%", isFlipped: false },
      { top: "10%", left: "15%" },
      { top: "10%", left: "15%" },
      { top: "10%", left: "15%" },
    ],

    4: [{ top: "15%", left: "75%", isFlipped: true }],
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
    const extraBubblesData = [
    {
      videoIndex: 1,
       start: 0,
          end: 2.8,
          words: [
            { text: "Claire", start: 0.2, end: 0.4 },
            { text: "and", start: 0.4, end: 0.6 },
            { text: "her", start: 0.6, end: 0.8 },
            { text: "mum", start: 0.8, end: 1.0 },
            { text: "are", start: 1.0, end: 1.2 },
            { text: "at", start: 1.2, end: 1.4 },
            { text: "the", start: 1.4, end: 1.6 },
            { text: "grocery", start: 1.6, end: 1.8 },
            { text: "store.", start: 1.8, end: 2.4 },
          ],
    },
    {
      videoIndex: 1,
        start: 2.8,
          end: 5,
          words: [
            { text: "They", start: 2.8, end: 3.2 },
            { text: "look", start: 3.2, end: 3.6 },
            { text: "for", start: 3.6, end: 4 },
            { text: "chocolate", start: 4, end: 4.4 },
            { text: "chips.", start: 4.4, end: 3.8 },
          ],
    },
    {
      videoIndex: 1,
                start: 5,
          end: 10,
          words: [
            { text: "Mum", start: 6.0, end: 6.2 },
            { text: "tells", start: 6.2, end: 6.4 },
            { text: "Claire", start: 6.4, end: 6.6 },
            { text: "that", start: 6.6, end: 6.8 },
            { text: "she", start: 6.8, end: 7.0 },
            { text: "wants", start: 7.0, end: 7.2 },
            { text: "to", start: 7.2, end: 7.4 },
            { text: "make", start: 7.4, end: 7.6 },
            { text: "cookies", start: 7.6, end: 7.8 },
            { text: "for", start: 7.8, end: 8.0 },
            { text: "her", start: 8.0, end: 8.2 },
            { text: "friend", start: 8.2, end: 8.4 },
            { text: "who", start: 8.4, end: 8.6 },
            { text: "is", start: 8.6, end: 8.8 },
            { text: "not", start: 8.8, end: 9.0 },
            { text: "feeling", start: 9.0, end: 9.2 },
            { text: "well.", start: 9.2, end: 9.8 },
          ],
    },
    {
      videoIndex: 2,
       start: 0,
          end: 3.2,
          words: [
            { text: "Claire", start: 0.6, end: 1 },
            { text: "starts", start: 1, end: 1.4 },
            { text: "thinking", start: 1.4, end: 1.6 },
            { text: "about", start: 1.6, end: 2 },
            { text: "her", start: 2, end: 2.4 },
            { text: "own", start: 2.4, end: 2.6 },
            { text: "friends", start: 2.6, end: 3 },
          ],
    },

    {
      videoIndex: 2,
      start: 3.2,
          end: 7.0,
          words: [
            { text: "and", start: 2.9, end: 3.3 },
            { text: "remembers", start: 3.3, end: 3.7 },
            { text: "that", start: 3.7, end: 4.1 },
            { text: "Sonia", start: 4.1, end: 4.5 },
            { text: "was", start: 4.5, end: 4.9 },
            { text: "absent", start: 4.9, end: 5.3 },
            { text: "from", start: 5.3, end: 5.7 },
            { text: "school", start: 5.7, end: 6.1 },
            { text: "today.", start: 6.1, end: 6.7 },
          ],
    },
    {
      videoIndex: 2,
     start: 7,
          end: 10.5,
          words: [
            { text: "She", start: 6.7, end: 7.1 },
            { text: "wonders", start: 7.1, end: 7.5 },
            { text: "if", start: 7.5, end: 7.9 },
            { text: "Sonia", start: 7.9, end: 8.3 },
            { text: "is", start: 8.3, end: 8.7 },
            { text: "not", start: 8.7, end: 9.1 },
            { text: "feeling", start: 9.1, end: 9.5 },
            { text: "well.", start: 9.5, end: 10.2 },
          ],
    },
    {
      videoIndex: 2,
       start: 10.5,
          end: 14.5,
          words: [
            { text: "She", start: 10.2, end: 10.6 },
            { text: "wants", start: 10.6, end: 11.0 },
            { text: "to", start: 11.0, end: 11.4 },
            { text: "show", start: 11.4, end: 11.8 },
            { text: "Sonia", start: 11.8, end: 12.2 },
            { text: "she", start: 12.2, end: 12.6 },
            { text: "is", start: 12.6, end: 13.0 },
            { text: "thinking", start: 13.0, end: 13.4 },
            { text: "of", start: 13.4, end: 13.8 },
            { text: "her.", start: 13.8, end: 14.5 },
          ],
    },
    {
      videoIndex: 3,
         start: 0,
          end: 4.0,
          words: [
            { text: "Mum", start: 0.2, end: 0.4 },
            { text: "and", start: 0.4, end: 0.8 },
            { text: "Claire", start: 0.8, end: 1 },
            { text: "find", start: 1, end: 1.2 },
            { text: "the", start: 1.2, end: 1.4 },
            { text: "chocolate", start: 1.4, end: 1.6 },
            { text: "chips", start: 1.6, end: 1.8 },
            { text: "and", start: 1.8, end: 2.0 },
            { text: "put", start: 2.0, end: 2.2 },
            { text: "them", start: 2.2, end: 2.4 },
            { text: "in", start: 2.4, end: 2.6 },
            { text: "the", start: 2.6, end: 2.8 },
            { text: "cart.", start: 2.8, end: 3.8 },
          ],
    },
    {
      videoIndex: 4,
         start: 0,
          end: 8.0,
          words: [
            { text: "When", start: 0.2, end: 0.5 },
            { text: "Mum", start: 0.5, end: 0.8 },
            { text: "and", start: 0.8, end: 1.1 },
            { text: "Claire", start: 1.1, end: 1.4 },
            { text: "get", start: 1.4, end: 1.7 },
            { text: "home,", start: 1.7, end: 2.0 },
            { text: "they", start: 2.0, end: 2.3 },
            { text: "start", start: 2.3, end: 2.6 },
            { text: "to", start: 2.6, end: 2.9 },
            { text: "make", start: 2.9, end: 3.2 },
            { text: "the", start: 3.2, end: 3.5 },
            { text: "cookies.", start: 3.5, end: 3.8 },
            { text: "They", start: 3.8, end: 4.1 },
            { text: "feel happy", start: 4.1, end: 4.7 },
            { text: "when", start: 4.7, end: 5.0 },
            { text: "they", start: 5.0, end: 5.3 },
            { text: "care", start: 5.3, end: 5.6 },
            { text: "for", start: 5.6, end: 5.9 },
            { text: "their", start: 5.9, end: 6.2 },
            { text: "friends.", start: 6.2, end: 6.5 },
          ],
    },
   
  ];
    useEffect(() => {
      const bubbleToShow = extraBubblesData.find(
        (bubble) =>
          bubble.videoIndex === currentVideo &&
          currentTime >= bubble.start &&
          currentTime < bubble.end
      );
  
      setExtraBubble(bubbleToShow || null);
    }, [currentVideo, currentTime]);

  const currentVideoData = videos[currentVideo];
  const activeSubtitleIndex = currentVideoData.subtitles.findIndex(
    (sub) => currentTime >= sub.start && currentTime < sub.end
  );

  const isImage = (url) => {
    return /\.(jpeg|jpg|gif|png)$/.test(url);
  };

  const activeSubtitle =
    activeSubtitleIndex !== -1
      ? currentVideoData.subtitles[activeSubtitleIndex]
      : null;

  const activeCloudPosition =
    activeSubtitleIndex !== -1
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
      if (!showBanner) video.play().catch(() => {});
    };
    video.addEventListener("canplay", handleCanPlay);
    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [currentVideo]);

  // Preload next video
  useEffect(() => {
    const nextVideoIndex = currentVideo + 1;
    if (nextVideoIndex < videos.length) {
      const nextVideoUrl = videos[nextVideoIndex].url;
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
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

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("loadeddata", handleLoadedData);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("loadeddata", handleLoadedData);
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
          playPromise.catch(() => {});
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
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [currentVideo, isPlaying, playbackSpeed]);

  const handlePrevious = () => {
    setShowBanner(false);
    setCurrentVideo((prev) => (prev > 0 ? prev - 1 : videos.length - 1));
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
    } else if (currentVideo !== 4) {
      setShowBanner(false);
      setCurrentVideo((prev) => prev + 1);
    }
  }, [currentVideo, videos.length, navigate, unitId, lessonId]);

  useEffect(() => {
    // تحقق إذا كانت الصورة آخر عنصر
    if (
      currentVideo === videos.length - 1 &&
      !currentVideoData.url.endsWith(".mp4")
    ) {
      const timer = setTimeout(() => {
        ValidationAlert.storyEnd(() => {
          navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentVideo, currentVideoData, navigate, unitId, lessonId]);

  const toggleWordSelection = (wordText) => {
    const correctWords = ["feel happy"];
    const cleanedWord = wordText.replace(".", "");

    if (correctWords.includes(cleanedWord)) {
      setSelectedWords((prev) =>
        prev.includes(wordText)
          ? prev.filter((w) => w !== wordText)
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

  const toggleMute = () => setIsMuted((prev) => !prev);

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
      container.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
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
            <video
              key={index}
              src={vid.url}
              preload="auto"
              style={{ display: "none" }}
            />
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

          {showFeedback && <div className="feedback-popup">Good Job! 👍</div>}

          {currentVideo === 4 && showBanner && (
            <div className="instruction-banner show">
              <p style={{ fontSize: "1.8em", textAlign: "left" }}>
                Highlight how Claire and her mum felt when
              </p>
              <p style={{ fontSize: "1.8em", textAlign: "left" }}>
                they caed for their friends.
              </p>
            </div>
          )}

          {activeSubtitle &&
            activeCloudPosition &&
            showBubble &&
            showSubtitles && (
              <div className="subtitle-container" style={activeCloudPosition}>
                <div
                  className={`bubble-cloud animate__animated animate__fadeIn ${
                    activeCloudPosition.isFlipped ? "flipped" : ""
                  }`}
                >
                  <p>
                    {activeSubtitle.words.map((word, index) => {
                      const isHighlighted =
                        currentTime >= word.start && currentTime < word.end;
                      return (
                        <span
                          key={index}
                          onClick={() => {
                            if (currentVideo === 4)
                              toggleWordSelection(word.text);
                          }}
                          className={`
                word-span
                ${isHighlighted ? "active-word" : ""}
                ${
                  currentVideo === 4 && selectedWords.includes(word.text)
                    ? "selected-word"
                    : ""
                }
                ${currentVideo === 4 ? "clickable-word" : ""}
              `}
                        >
                          {word.text}{" "}
                        </span>
                      );
                    })}
                  </p>
                  <button
                    className="close"
                    onClick={() => setShowBubble(false)}
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
    {showCaption && extraBubble && extraBubble.words && (
            <div
              className="subtitle-container"
              style={{
                bottom: "0%",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 101,
              }}
            >
              <div className="extra-cloud animate__animated animate__fadeIn">
                <p>
                  {extraBubble.words.map((word, index) => {
                    const isHighlighted =
                      currentTime >= word.start && currentTime < word.end;
                    return (
                      <span
                        key={index}
                        className={`word-span ${
                          isHighlighted ? "active-word" : ""
                        }`}
                      >
                        {word.text}{" "}
                      </span>
                    );
                  })}
                </p>
              </div>
            </div>
          )}
          <div className="video-overlay" />
          <div className="controls-container">
            <div className="controlbbtn">
              <button
                onClick={handlePrevious}
                className="control-btn left-nav-btn"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={handleNext}
                className="control-btn right-nav-btn"
              >
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
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-6 h-6" />
                      ) : (
                        <Volume2 className="w-6 h-6" />
                      )}
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
                      onClick={() => setShowSpeedMenu((prev) => !prev)}
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
                            className={
                              playbackSpeed === speed ? "active-speed" : ""
                            }
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
                    {isPlaying ? (
                      <Pause className="w-12 h-12" fill="white" />
                    ) : (
                      <Play className="w-12 h-12" fill="white" />
                    )}
                  </button>
                </div>

                <div className="controls-group-right">
                  <button onClick={toggleFullscreen} className="control-btn">
                    {isFullscreen ? (
                      <Minimize2 className="w-6 h-6" />
                    ) : (
                      <Maximize2 className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="progress-indicator-container">
            {videos.map((_, index) => (
              <div
                key={index}
                className={`progress-dot ${
                  index === currentVideo ? "active" : ""
                }`}
              />
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
