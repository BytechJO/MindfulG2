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
import video2 from "./assets/02.mp4";
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
      ],
    },

    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 0,
          end: 0,
          words: [
            // { text: "Sid", start: 0.2, end: 0.6 },
            // { text: "feels", start: 0.6, end: 1.0 },
            // { text: "like", start: 1.0, end: 1.4 },
            // { text: "saying", start: 1.4, end: 1.8 },
            // { text: "mean", start: 1.8, end: 2.2 },
            // { text: "things", start: 2.2, end: 2.6 },
            // { text: "to", start: 2.6, end: 3.0 },
            // { text: "Bob.", start: 3.0, end: 3.4 },

            // { text: "Then,", start: 3.6, end: 4.0 },
            // { text: "he", start: 4.0, end: 4.4 },
            // { text: "remembers", start: 4.4, end: 4.8 },
            // { text: "what", start: 4.8, end: 5.2 },
            // { text: "his", start: 5.2, end: 5.6 },
            // { text: "brother", start: 5.6, end: 6.0 },
            // { text: "said:", start: 6.0, end: 6.4 },
            {
              start: 6.0,
              end: 9.4,
              words: [
                { text: "‘We", start: 6.6, end: 9.1 },
                { text: "shouldn’t", start: 7.0, end: 7.4 },
                { text: "use", start: 7.4, end: 7.8 },
                { text: "words", start: 7.8, end: 8.2 },
                { text: "to", start: 8.2, end: 8.6 },
                { text: "hurt", start: 8.6, end: 9.0 },
                { text: "others.", start: 9.0, end: 9.4 },
              ],
            },
          ],
        },
        // {
        //   start: 2.2,
        //   end: 6.0,
        //   words: [
        //     { text: "You", start: 2.2, end: 2.6 },
        //     { text: "should", start: 2.6, end: 3.0 },
        //     { text: "always", start: 3.0, end: 3.4 },
        //     { text: "use", start: 3.4, end: 3.8 },
        //     { text: "good", start: 3.8, end: 4.2 },
        //     { text: "language", start: 4.2, end: 4.6 },
        //     { text: "to", start: 4.6, end: 5.0 },
        //     { text: "solve", start: 5.0, end: 5.4 },
        //     { text: "a problem.", start: 5.4, end: 5.8 },
        //   ],
        // },

        {
          start: 6.5,
          end: 10.0,
          words: [
            { text: "‘We", start: 6.6, end: 7.0 },
            { text: "shouldn’t", start: 7.0, end: 7.4 },
            { text: "use", start: 7.4, end: 7.8 },
            { text: "words", start: 7.8, end: 8.2 },
            { text: "to", start: 8.2, end: 8.6 },
            { text: "hurt", start: 8.6, end: 9.0 },
            { text: "others.", start: 9.0, end: 9.4 },
          ],
        },
        {
          start: 10.0,
          end: 18.0,
          words: [
            { text: "We", start: 10.0, end: 10.4 },
            { text: "should", start: 10.4, end: 10.8 },
            { text: "encourage", start: 10.8, end: 11.2 },
            { text: "others", start: 11.2, end: 11.6 },
            { text: "with", start: 11.6, end: 12.0 },
            { text: "our", start: 12.0, end: 12.4 },
            { text: "words.’", start: 12.4, end: 12.8 },

            { text: "Say", start: 12.8, end: 13.2 },
            { text: "things", start: 13.2, end: 13.6 },
            { text: "that", start: 13.6, end: 14.0 },
            { text: "help", start: 14.0, end: 14.4 },
            { text: "others", start: 14.4, end: 14.8 },
            { text: "like", start: 14.8, end: 15.2 },
            { text: "‘Good", start: 15.2, end: 15.6 },
            { text: "job’,", start: 15.6, end: 16.0 },
            { text: "‘It’s", start: 16.0, end: 16.4 },
            { text: "okay’,", start: 16.4, end: 16.8 },
            { text: "and", start: 16.8, end: 17.2 },
            { text: "‘Try", start: 17.2, end: 17.6 },
            { text: "again’", start: 17.6, end: 18.0 },
          ],
        },
      ],
    },

    {
      url: video5,
      title: "Section 5",
      subtitles: [
        {
          start: 0,
          end: 2.4,
          words: [
            { text: "‘It’s", start: 0.2, end: 0.6 },
            { text: "okay,", start: 0.6, end: 1.0 },
            { text: "Bob.", start: 1.0, end: 1.4 },
            { text: "You", start: 1.4, end: 1.8 },
            { text: "tried’", start: 1.8, end: 2.2 },
          ],
        },
        {

        },
        {
          start: 5.1,
          end: 8.0,
          words: [
            { text: "It’s", start: 0.2, end: 0.6 },
            { text: "okay,", start: 0.6, end: 1.0 },
            { text: "Bob.", start: 1.0, end: 1.4 },
            { text: "You tried", start: 1.4, end: 1.8 },
          ],
        },
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
  const cloudPositions = {
    0: [
      // { bottom: '35rem', left: '50%', transform: 'translateX(-50%)', isFlipped: true }
    ],

    1: [
      { top: "65%", left: "40%" },
      { top: "10%", left: "15%" },
      { top: "10%", left: "5%" },
      { top: "20%", left: "85%", isFlipped: true },
      { top: "10%", left: "5%" },
    ],

    2: [
      { top: "60%", right: "35%", isFlipped: true },
      { top: "5%", left: "50%", isFlipped: true },
      { top: "1%", left: "45%", isFlipped: true },
    ],

    3: [
      { bottom: "75%", left: "60%", isFlipped: true },
      { top: "8%", left: "28%", isFlipped: true },
      { top: "10%", left: "40%" },
      { top: "10%", left: "35%" },
    ],

    4: [
      { top: "15%", left: "23%", isFlipped: true },
      { top: "5%", left: "25%", isFlipped: true },
      { top: "10%", left: "10%" },
      { top: "10%", left: "10%" },
      { top: "5%", left: "4%" },
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
  const extraBubblesData = [
    {
      videoIndex: 1,
      start: 0,
      end: 2.5,
      words: [
        { text: "Sid", start: 0.7, end: 0.9 },
        { text: "plays", start: 0.9, end: 1.3 },
        { text: "basketball", start: 1.3, end: 1.7 },
        { text: "with", start: 1.7, end: 2.1 },
        { text: "his", start: 2.1, end: 2.3 },
        { text: "neighbours.", start: 2.3, end: 2.9 },
      ],
    },
    {
      videoIndex: 1,
      start: 2.5,
      end: 5.1,
      words: [
        { text: "There", start: 3.1, end: 3.4 },
        { text: "are", start: 3.4, end: 3.7 },
        { text: "two", start: 3.7, end: 4 },
        { text: "teams.", start: 4, end: 4.3 },
      ],
    },
    {
      videoIndex: 1,
      start: 5.1,
      end: 10.6,
      words: [
        { text: "Sid", start: 4.7, end: 5 },
        { text: "is", start: 5, end: 5.2 },
        { text: "on", start: 5.2, end: 5.4 },
        { text: "the", start: 5.4, end: 5.6 },
        { text: "red", start: 5.6, end: 5.8 },
        { text: "team", start: 5.8, end: 6 },
        { text: "with", start: 6, end: 6.3 },
        { text: "his", start: 6.3, end: 6.6 },
        { text: "friend", start: 6.6, end: 6.9 },
        { text: "Bob.", start: 6.9, end: 7.6 },
        { text: "The", start: 7.6, end: 7.9 },
        { text: "boys", start: 7.9, end: 8.2 },
        { text: "need", start: 8.2, end: 8.4 },
        { text: "two", start: 8.4, end: 8.7 },
        { text: "more", start: 8.7, end: 9.1 },
        { text: "points", start: 9.1, end: 9.4 },
        { text: "to", start: 9.4, end: 9.6 },
        { text: "win.", start: 9.6, end: 10.3 },
      ],
    },

    {
      videoIndex: 2,
      start: 0,
      end: 2.5,
      words: [
        { text: "Sid", start: 0.1, end: 0.2 },
        { text: "passes", start: 0.2, end: 0.5 },
        { text: "the", start: 0.5, end: 0.7 },
        { text: "ball", start: 0.7, end: 1 },
        { text: "to", start: 1, end: 1.3 },
        { text: "Bob.", start: 1.3, end: 2.2 },
      ],
    },
    {
      videoIndex: 2,
      start: 2.5,
      end: 6.5,
      words: [
        { text: "Bob", start: 2.2, end: 2.6 },
        { text: "dribbles", start: 2.8, end: 3.1 },
        { text: "the", start: 3.1, end: 3.3 },
        { text: "ball", start: 3.3, end: 3.5 },
        { text: "to", start: 3.5, end: 3.7 },
        { text: "the", start: 3.7, end: 4 },
        { text: "net", start: 4, end: 4.2 },
        { text: "and", start: 4.2, end: 4.5 },
        { text: "takes", start: 4.5, end: 4.7 },
        { text: "a", start: 4.7, end: 4.9 },
        { text: "shot.", start: 4.9, end: 5.3 },
      ],
    },
    {
      videoIndex: 2,
      start: 6,
      end: 10.5,
      words: [
        { text: "He", start: 5.3, end: 5.5 },
        { text: "misses.", start: 5.5, end: 6.3 },
        { text: "Oh", start: 6.5, end: 6.8 },
        { text: "dear!", start: 6.8, end: 7.2 },

        { text: "Sid", start: 7.7, end: 7.9 },
        { text: "feels", start: 8, end: 8.4 },
        { text: "angry", start: 8.4, end: 8.6 },
        { text: "with", start: 8.6, end: 8.9 },
        { text: "Bob", start: 8.9, end: 10 },
      ],
    },
    {
      videoIndex: 3,
      start: 0,
      end: 7,
      words: [
        { text: "Sid", start: 0.2, end: 0.6 },
        { text: "feels", start: 0.6, end: 1.0 },
        { text: "like", start: 1.0, end: 1.4 },
        { text: "saying", start: 1.4, end: 1.8 },
        { text: "mean", start: 1.8, end: 2.2 },
        { text: "things", start: 2.2, end: 2.6 },
        { text: "to", start: 2.6, end: 3.0 },
        { text: "Bob.", start: 3.0, end: 3.4 },

        { text: "Then,", start: 3.6, end: 4.0 },
        { text: "he", start: 4.0, end: 4.4 },
        { text: "remembers", start: 4.4, end: 4.8 },
        { text: "what", start: 4.8, end: 5.2 },
        { text: "his", start: 5.2, end: 5.6 },
        { text: "brother", start: 5.6, end: 6.0 },
        { text: "said:", start: 6.0, end: 6.4 },
      ],
    },
    {
      videoIndex: 4,
      start: 2.7,
      end: 5.1,
      words: [
        { text: "The", start: 2.4, end: 2.8 },
        { text: "boys", start: 2.8, end: 3.2 },
        { text: "smile", start: 3.2, end: 3.6 },
        { text: "and", start: 3.6, end: 4.0 },
        { text: "play", start: 4.0, end: 4.4 },
        { text: "another", start: 4.4, end: 4.8 },
        { text: "game", start: 4.8, end: 5.2 },
        { text: "of", start: 5.2, end: 5.6 },
        { text: "basketball", start: 5.6, end: 6.0 },
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
      if (!showBanner) video.play().catch(() => { });
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
  }, [currentVideo, videos.length, navigate]);

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
      }, 500); // نصف ثانية لتأكد من ظهور الصورة

      return () => clearTimeout(timer);
    }
  }, [currentVideo, currentVideoData, navigate, unitId, lessonId]);

  const toggleWordSelection = (wordText) => {
    const correctWords = ["You tried"];
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
                Highlight how Sid encouraged Bob.
              </p>
              {/* <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                he cares about Joe’s feelings.
              </p> */}
            </div>
          )}

          {activeSubtitle &&
            activeCloudPosition &&
            showBubble &&
            showSubtitles && (
              <div className="subtitle-container" style={activeCloudPosition}>
                <div
                  className={`bubble-cloud animate__animated animate__fadeIn ${activeCloudPosition.isFlipped ? "flipped" : ""
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
                ${currentVideo === 4 && selectedWords.includes(word.text)
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
                        className={`word-span ${isHighlighted ? "active-word" : ""
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
                className={`progress-dot ${index === currentVideo ? "active" : ""
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
