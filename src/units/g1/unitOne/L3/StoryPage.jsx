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
import img from "./assets/nex.png";

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
          start: 0, end: 3.5,
          words: [
            { text: "Beth", start: 0.0, end: 0.5 },
            { text: "and", start: 0.5, end: 0.8 },
            { text: "Liz", start: 0.8, end: 1.2 },
            { text: "learn", start: 1.2, end: 1.7 },
            { text: "about", start: 1.7, end: 2.1 },
            { text: "traffic", start: 2.1, end: 2.4 },
            { text: "rules", start: 2.4, end: 2.6 },
            { text: "at school.", start: 2.6, end: 3.0 },
          ]
        },

        {
          start: 4.5, end: 7.9,
          words: [
            { text: "The", start: 4.5, end: 4.8 },
            { text: "teacher", start: 4.8, end: 5.1 },
            { text: "shows", start: 5.1, end: 5.4 },
            { text: "Beth", start: 5.4, end: 5.7 },
            { text: "and", start: 5.7, end: 6.0 },
            { text: "Liz", start: 6.0, end: 6.3 },
            { text: "a", start: 6.3, end: 6.5 },
            { text: "picture", start: 6.5, end: 6.8 },
            { text: "of", start: 6.8, end: 7.0 },
            { text: "a", start: 7.0, end: 7.1 },
            { text: "traffic", start: 7.1, end: 7.4 },
            { text: "light.", start: 7.4, end: 7.7 },
          ]
        },

        {
          start: 8.5, end: 11.0,
          words: [
            { text: "There", start: 9.0, end: 9.2 },
            { text: "are", start: 9.2, end: 9.4 },
            { text: "three", start: 9.4, end: 9.6 },
            { text: "colours", start: 9.6, end: 9.9 },
            { text: "on", start: 9.9, end: 10.1 },
            { text: "a", start: 10.1, end: 10.2 },
            { text: "traffic", start: 10.2, end: 10.4 },
            { text: "light.", start: 10.4, end: 10.6 },
          ]
        },

        {
          start: 12.0, end: 14.0,
          words: [
            { text: "Each", start: 12.5, end: 12.7 },
            { text: "colour", start: 12.7, end: 13.0 },
            { text: "has", start: 13.0, end: 13.2 },
            { text: "a", start: 13.2, end: 13.3 },
            { text: "rule,", start: 13.3, end: 13.6 },
          ]
        },

        {
          start: 15.0, end: 17.0,
          words: [
            { text: "she", start: 15.5, end: 16.0 },
            { text: "explains.", start: 16.0, end: 16.5 },
          ]
        },
      ]
    },

    {
      url: video3,
      title: "Section 3",
      subtitles: [
        {
          start: 0, end: 1.9,
          words: [
            { text: "Red", start: 0.1, end: 0.6 },
            { text: "means", start: 0.6, end: 1.2 },
            { text: "stop", start: 1.2, end: 1.7 },
          ]
        },
        {
          start: 2.0, end: 4.0,
          words: [
            { text: "yellow", start: 2.5, end: 2.8 },
            { text: "means", start: 2.8, end: 3.1 },
            { text: "slow", start: 3.1, end: 3.4 },
            { text: "down", start: 3.4, end: 3.9 },
          ]
        },
        {
          start: 4.1, end: 5.9,
          words: [
            { text: "and", start: 4.2, end: 4.5 },
            { text: "green", start: 4.5, end: 5.0 },
            { text: "means", start: 5.0, end: 5.5 },
            { text: "go.", start: 5.5, end: 5.8 },
          ]
        },
        {
          start: 2.5, end: 7.0,
          words: [
            { text: "A good", start: 3.0, end: 3.3 },
            { text: "citizen", start: 3.3, end: 3.6 },
            { text: "always", start: 3.6, end: 3.9 },
            { text: "follows", start: 3.9, end: 4.2 },
            { text: "traffic", start: 3.6, end: 3.9 },
            { text: "rules", start: 3.9, end: 4.2 },
          ]
        },
      ]
    },

    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 0, end: 2,
          words: [
            { text: "What", start: 0, end: 0.2 },
            { text: "are", start: 0.2, end: 0.4 },
            { text: "these", start: 0.4, end: 0.6 },
            { text: "lights", start: 0.6, end: 0.8 },
            { text: "for?", start: 0.8, end: 1.0 },
          ]
        },
        {
          start: 3, end: 8.7,
          words: [
            { text: "Those", start: 3.0, end: 3.2 },
            { text: "are", start: 3.2, end: 3.5 },
            { text: "for", start: 3.5, end: 3.8 },
            { text: "pedestrians.", start: 3.8, end: 4.1 },
          ]
        },
        {
          start: 3, end: 8.7,
          words: [
            { text: "Pedestrians", start: 3.0, end: 3.2 },
            { text: "are", start: 3.2, end: 3.5 },
            { text: "people", start: 3.5, end: 3.8 },
            { text: "walking", start: 3.8, end: 4.1 },
            { text: "or", start: 3.0, end: 3.2 },
            { text: "not", start: 3.2, end: 3.5 },
            { text: "in a", start: 3.5, end: 3.8 },
            { text: "vehicle", start: 3.8, end: 4.1 },
          ]
        },
        {
          start: 3, end: 8.7,
          words: [
            { text: "The", start: 3.0, end: 3.2 },
            { text: "red", start: 3.2, end: 3.5 },
            { text: "man", start: 3.5, end: 3.8 },
            { text: "means", start: 3.8, end: 4.1 },
            { text: "stop", start: 3.0, end: 3.2 },
            { text: "and", start: 3.2, end: 3.5 },
            { text: "wait,", start: 3.5, end: 3.8 },
          ]
        },
        {
          start: 3, end: 8.7,
          words: [
            { text: "and", start: 3.0, end: 3.2 },
            { text: "the", start: 3.2, end: 3.5 },
            { text: "green", start: 3.5, end: 3.8 },
            { text: "man", start: 3.8, end: 4.1 },
            { text: "means", start: 3.0, end: 3.2 },
            { text: "cross", start: 3.2, end: 3.5 },
            { text: "the road", start: 3.5, end: 3.8 },
          ]
        },
        {
          start: 3, end: 8.7,
          words: [
            { text: "That’s", start: 3.0, end: 3.2 },
            { text: "right,", start: 3.2, end: 3.5 },
            { text: "Beth,", start: 3.5, end: 3.8 },
          ]
        },
        {
          start: 3, end: 8.7,
          words: [
            { text: "But", start: 3.0, end: 3.2 },
            { text: "we", start: 3.2, end: 3.5 },
            { text: "must", start: 3.5, end: 3.8 },
            { text: "always", start: 3.8, end: 4.1 },
            { text: "stop,", start: 3.0, end: 3.2 },
            { text: "wait,", start: 3.2, end: 3.5 },
            { text: "look,", start: 3.5, end: 3.8 },
            { text: "and", start: 3.0, end: 3.2 },
            { text: "listen", start: 3.2, end: 3.5 },
            { text: "before", start: 3.5, end: 3.8 },
            { text: "we", start: 3.8, end: 4.1 },
            { text: "cross", start: 3.0, end: 3.2 },
            { text: "the", start: 3.2, end: 3.5 },
            { text: "road", start: 3.5, end: 3.8 },
          ]
        },
      ]
    },

    {
      url: video5,
      title: "Section 5",
      subtitles: [
        {
          start: 2.6, end: 5.0,
          words: [
            { text: "The", start: 2.6, end: 2.8 },
            { text: "next", start: 2.8, end: 3.0 },
            { text: "day,", start: 3.0, end: 3.3 },
            { text: "Beth", start: 3.3, end: 3.6 },
            { text: "and", start: 3.6, end: 3.9 },
            { text: "Liz", start: 3.9, end: 4.2 },
            { text: "want", start: 4.2, end: 4.5 },
            { text: "to", start: 4.5, end: 4.7 },
            { text: "cross", start: 4.7, end: 4.9 },
            { text: "the", start: 4.9, end: 5.0 },
            { text: "road.", start: 5.0, end: 5.2 },
          ]
        },

        {
          start: 9.6, end: 13.5,
          words: [
            { text: "They", start: 9.6, end: 9.9 },
            { text: "remember", start: 9.9, end: 10.3 },
            { text: "the", start: 10.3, end: 10.5 },
            { text: "traffic", start: 10.5, end: 10.9 },
            { text: "rules", start: 10.9, end: 11.2 },
            { text: "and", start: 11.2, end: 11.5 },
            { text: "stop", start: 11.5, end: 11.8 },
            { text: "at", start: 11.8, end: 12.0 },
            { text: "the", start: 12.0, end: 12.2 },
            { text: "pedestrian", start: 12.2, end: 12.8 },
            { text: "crossing.", start: 12.8, end: 13.5 },
          ]
        },

        {
          start: 13.6, end: 18.0,
          words: [
            { text: "Then,", start: 13.6, end: 13.9 },
            { text: "they", start: 13.9, end: 14.2 },
            { text: "wait", start: 14.2, end: 14.5 },
            { text: "to", start: 14.5, end: 14.7 },
            { text: "see", start: 14.7, end: 15.0 },
            { text: "the", start: 15.0, end: 15.2 },
            { text: "green", start: 15.2, end: 15.5 },
            { text: "man", start: 15.5, end: 15.8 },
            { text: "light", start: 15.8, end: 16.1 },
            { text: "up.", start: 16.1, end: 16.4 },
            { text: "Next,", start: 16.4, end: 16.7 },
            { text: "they", start: 16.7, end: 17.0 },
            { text: "look", start: 17.0, end: 17.3 },
            { text: "and", start: 17.3, end: 17.5 },
            { text: "listen.", start: 17.5, end: 18.0 },
          ]
        },

        {
          start: 18.1, end: 22.5,
          words: [
            { text: "Finally,", start: 18.1, end: 18.5 },
            { text: "they", start: 18.5, end: 18.8 },
            { text: "cross", start: 18.8, end: 19.2 },
            { text: "the road", start: 19.4, end: 19.7 },
            { text: "when", start: 19.7, end: 20.0 },
            { text: "it", start: 20.0, end: 20.2 },
            { text: "is safe.", start: 20.4, end: 20.7 },
            { text: "Well", start: 20.7, end: 21.0 },
            { text: "done,", start: 21.0, end: 21.3 },
            { text: "girls!", start: 21.3, end: 21.6 },
            { text: "You", start: 21.6, end: 21.8 },
            { text: "followed", start: 21.8, end: 22.1 },
            { text: "the", start: 22.1, end: 22.3 },
            { text: "traffic", start: 22.3, end: 22.5 },
            { text: "rules.", start: 22.5, end: 22.8 },
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

    0: [{ bottom: '35rem', left: '50%', transform: 'translateX(-50%)', isFlipped: true }],

    1: [
      { top: '15%', left: '10%' },
      { top: '15%', left: '15%' },
      { top: '15%', left: '15%' },
      { top: '15%', left: '15%' }
    ],

    2: [
      { top: '10%', right: '5%', isFlipped: true },
      { top: '1%', left: '45%', isFlipped: true },
      { top: '1%', left: '45%', isFlipped: true },
      { top: '1%', left: '45%', isFlipped: true }
    ],

    3: [
      { bottom: '80%', left: '28%', isFlipped: true },
      { top: '10%', left: '45%' },
    ],

    4: [
      { top: '10%', left: '30%', isFlipped: true },
      { top: '5%', left: '35%' },
    ],
    5: [
      { bottom: '80%', left: '48%', },
      { top: '20%', left: '25%' },
      { top: '10%', left: '50%', isFlipped: true },
      { top: '70%', left: '50%', isFlipped: true }
    ],
    6: [
      { bottom: '80%', left: '48%', transform: 'translateX(-50%)' },
      { top: '10%', left: '10%' },
      { top: '10%', left: '50%', isFlipped: true },
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
  const handleEnded = useCallback(() => {
    const isLast = currentVideo === videos.length - 1;
    const currentItem = videos[currentVideo];

    // إذا آخر عنصر أو العنصر صورة
    if (isLast || !currentItem.url.endsWith(".mp4")) {
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
    } else {
      // إذا ليس آخر عنصر فيديو
      setShowBanner(false);
      setCurrentVideo(prev => prev + 1);
    }
  }, [currentVideo, videos, navigate]);
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
      // videoRef.current.load();
      // setCurrentTime(0);
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
        video.currentTime = 5.0;
        setCurrentTime(5.0);
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


  useEffect(() => {
    const currentItem = videos[currentVideo];
    if (!currentItem.url.endsWith(".mp4")) {
      handleEnded();
    }
  }, [currentVideo, handleEnded]);



  const handlePrevious = () => {
    setShowBanner(false);
    setCurrentVideo(prev => (prev > 0 ? prev - 1 : videos.length - 1));
  };

  const handleNext = () => {
    setShowBanner(false);
    setCurrentVideo(prev => (prev < videos.length - 1 ? prev + 1 : 0));
  };






  const toggleWordSelection = (wordText) => {
    const correctWords = ["cross", "the road", "is safe"];
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
            <link key={index} rel="preload" as="video" href={vid.url} />
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
                Highlight what Beth and Liz do befor
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                crossing the road.
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
    </div>
  );
};

export default StoryPage;
