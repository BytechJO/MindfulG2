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
          
        },

        {
          start: 9.0,
          end: 12.5,
          words: [
            { text: "I", start: 9.5, end: 9.8 },
            { text: "want", start: 9.8, end: 10.2 },
            { text: "to play", start: 10.2, end: 10.6 },
            { text: "I", start: 10.6, end: 10.9 },
            { text: "don’t", start: 10.9, end: 11.3 },
            { text: "want", start: 11.3, end: 11.7 },
            { text: "to help", start: 11.7, end: 12.1 },
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
          end: 2.5,
          words: [
            { text: "Everyone", start: 0.1, end: 0.4 },
            { text: "has", start: 0.4, end: 0.7 },
            { text: "responsibilities", start: 0.7, end: 1.3 },
            { text: "at", start: 1.3, end: 1.7 },
            { text: "home.", start: 1.7, end: 2.0 },
          ],
        },

        {
          start: 3.0,
          end: 6.5,
          words: [
            { text: "Helping", start: 3.5, end: 3.9 },
            { text: "your", start: 3.9, end: 4.2 },
            { text: "parents", start: 4.2, end: 4.5 },
            { text: "is", start: 4.5, end: 4.9 },
            { text: "a", start: 4.9, end: 5.1 },
            { text: "responsibility", start: 5.1, end: 5.5 },
            { text: "too", start: 5.5, end: 6.5 },
          ],
        },

        {
          start: 6.5,
          end: 10,
          words: [
            { text: "‘Families", start: 6.5, end: 6.9 },
            { text: "work", start: 6.9, end: 7.2 },
            { text: "together", start: 7.2, end: 7.6 },
            { text: "and", start: 8.0, end: 8.3 },
            { text: "help", start: 8.3, end: 8.6 },
            { text: "each", start: 8.6, end: 8.9 },
            { text: "other.’", start: 8.9, end: 9.3 },
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
    
        },
      ],
    },

    {
      url: video5,
      title: "Section 5",
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
      url: img,
      title: "Section 6",
      subtitles: [],
    },
  ];

  const cloudPositions = {
    0: [
      // { bottom: '35rem', left: '50%', transform: 'translateX(-50%)', isFlipped: true }
    ],

    1: [
      { top: "15%", left: "70%", isFlipped: true },
      { top: "10%", left: "55%", isFlipped: true },
    ],

    2: [
      { top: "20%", right: "0%", isFlipped: true },
      { top: "1%", left: "50%", isFlipped: true },
      { top: "1%", left: "45%", isFlipped: true },
    ],

    3: [
      { bottom: "75%", left: "40%" },
      { top: "20%", left: "35%" },
    ],

    4: [
      { top: "5%", left: "23%" },
      { top: "5%", left: "25%", isFlipped: true },
      { top: "5%", left: "35%", isFlipped: true },
    ],
  };
 const extraBubblesData = [
    {
      videoIndex: 1,
     start: 0,
          end: 7.6,
          words: [
            { text: "Emma", start: 0.1, end: 0.4 },
            { text: "is", start: 0.4, end: 0.7 },
            { text: "at", start: 0.7, end: 0.9 },
            { text: "home", start: 0.9, end: 1.2 },
            { text: "with", start: 1.2, end: 1.3 },
            { text: "her", start: 1.3, end: 1.5 },
            { text: "parents.", start: 1.5, end: 2.4 },

            { text: "Mum", start: 2.4, end: 2.8 },
            { text: "dusts", start: 2.8, end: 3.1 },
            { text: "and", start: 3.2, end: 3.6 },
            { text: "Dad", start: 3.6, end: 3.9 },
            { text: "vacuums.", start: 3.9, end: 4.7 },

            { text: "Mum", start: 5.5, end: 5.7 },
            { text: "asks", start: 5.7, end: 6 },
            { text: "Emma", start: 6, end: 6.4 },
            { text: "to", start: 6.4, end: 6.9 },
            { text: "help.", start: 6.9, end: 7.5 },
          ],
    },
    {
      videoIndex: 3,
       start: 0,
          end: 2.2,
          words: [
            { text: "Emma", start: 0.1, end: 0.4 },
            { text: "thinks", start: 0.4, end: 0.7 },
            { text: "about", start: 0.7, end: 1.0 },
            { text: "what", start: 1.0, end: 1.3 },
            { text: "her", start: 1.3, end: 1.6 },
            { text: "parents", start: 1.6, end: 1.9 },
            { text: "said.", start: 1.9, end: 2.2 },
          ],
    },
    {
      videoIndex: 3,
          start: 2.3,
          end: 4.9,
          words: [
            { text: "She", start: 2.4, end: 2.7 },
            { text: "decides", start: 2.7, end: 3.2 },
            { text: "to", start: 3.2, end: 3.3 },
            { text: "help", start: 3.3, end: 3.8 },
            { text: "Mum", start: 3.8, end: 4.1 },
            { text: "and", start: 4.1, end: 4.4 },
            { text: "Dad.", start: 4.4, end: 4.8 },
          ],
    },

    {
      videoIndex: 4,
    start: 0,
          end: 3.1,
          words: [
            { text: "Emma", start: 0.1, end: 0.4 },
            { text: "and", start: 0.4, end: 0.6 },
            { text: "her", start: 0.6, end: 0.9 },
            { text: "parents", start: 0.9, end: 1.3 },
            { text: "finish", start: 1.3, end: 1.6 },
            { text: "cleaning", start: 1.6, end: 1.9 },
            { text: "the", start: 1.9, end: 2.2 },
            { text: "living", start: 2.2, end: 2.5 },
            { text: "room.", start: 2.5, end: 3.0 },
          ],
    },
    {
      videoIndex: 4,
      start: 3.1,
          end: 5.5,
          words: [
            { text: "It", start: 3.2, end: 3.5 },
            { text: "is", start: 3.5, end: 3.7 },
            { text: "nice", start: 3.7, end: 4 },
            { text: "and", start: 4, end: 4.3 },
            { text: "clean", start: 4.3, end: 4.7 },
            { text: "now.", start: 4.7, end: 5.2 },
          ],
    },
    {
      videoIndex: 4,
      start: 6.0,
          end: 12,
          words: [
            { text: "Emma", start: 6.5, end: 6.7 },
            { text: "is", start: 6.7, end: 6.9 },
            { text: "happy", start: 6.9, end: 7.2 },
            { text: "that", start: 7.2, end: 7.5 },
            { text: "she", start: 7.5, end: 7.8 },
            { text: "helped", start: 7.8, end: 8.1 },
            { text: "her", start: 8.1, end: 8.4 },
            { text: "parents", start: 8.4, end: 8.7 },
            { text: "at", start: 8.7, end: 9.0 },
            { text: "home.", start: 9.0, end: 9.3 },
          ],
    },
    {
      videoIndex: 3,
      start: 3.0,
      end: 4.9,
      words: [
        { text: "he", start: 3.0, end: 3.3 },
        { text: "can", start: 3.3, end: 3.6 },
        { text: "finish", start: 3.6, end: 3.9 },
        { text: "the", start: 3.9, end: 4.1 },
        { text: "test", start: 4.1, end: 4.4 },
        { text: "faster.", start: 4.4, end: 4.8 },
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
    setShowBanner(false);
    setCurrentVideo((prev) => (prev < videos.length - 1 ? prev + 1 : 0));
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
  }, [currentVideo, videos.length, navigate]);

  useEffect(() => {
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
    const correctWords = ["happy"];
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
          {videos.map(
            (vid, index) =>
              !isImage(vid.url) && (
                <video
                  key={index}
                  src={vid.url}
                  preload="auto"
                  style={{ display: "none" }}
                />
              )
          )}

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
              preload="auto"
              src={currentVideoData.url}
            >
              Your browser does not support the video tag.
            </video>
          )}

          {showFeedback && <div className="feedback-popup">Good Job! 👍</div>}

          {currentVideo === 4 && showBanner && (
            <div className="instruction-banner show">
              <p style={{ fontSize: "1.8em", textAlign: "left" }}>
                Highlight how Emma felt after helping
              </p>
              <p style={{ fontSize: "1.8em", textAlign: "left" }}>
                her parents.
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
                    onClick={() => setShowSubtitles(!showSubtitles)}
                    className="control-btn"
                    title="Subtitles"
                  >
                    <Subtitles className="w-6 h-6" />
                    <span className="control-label">Subtitle</span>
                  </button>
                 
                 
                                   <button
                                     onClick={() => setShowCaption(!showCaption)}
                                     className="control-btn"
                                     title="Caption"
                                   >
                                     <MessageSquareText className="w-6 h-6" />
                                     <span className="control-label">Caption</span>
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
