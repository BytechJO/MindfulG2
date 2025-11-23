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
import img from "./assets/nex.png";

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
          start: 0, end: 3.4,
          words: [
            { text: "Beth", start: 0.0, end: 0.5 },
            { text: "worked", start: 0.5, end: 0.8 },
            { text: "hard", start: 0.8, end: 1.2 },
            { text: "on", start: 1.2, end: 1.7 },
            { text: "her", start: 1.7, end: 2.1 },
            { text: "maths", start: 2.1, end: 2.4 },
            { text: "homework", start: 2.4, end: 2.8 },
            { text: "today.", start: 2.8, end: 3.2 },
          ]
        },

        {
          start: 3.5, end: 6.0,
          words: [
            { text: "It", start: 3.8, end: 4.0 },
            { text: "took", start: 4.0, end: 4.3 },
            { text: "her", start: 4.3, end: 4.5 },
            { text: "a long", start: 4.5, end: 4.8 },
            { text: "time", start: 4.8, end: 5.1 },
            { text: "to", start: 5.1, end: 5.3 },
            { text: "finish.", start: 5.3, end: 5.5 },
          ]
        },

        {
          start: 6.0, end: 8.7,
          words: [
            { text: "She", start: 6.5, end: 6.8 },
            { text: "is", start: 6.8, end: 7.1 },
            { text: "proud", start: 7.1, end: 7.4 },
            { text: "of", start: 7.4, end: 7.7 },
            { text: "her", start: 7.7, end: 8.0 },
            { text: "hard", start: 8.0, end: 8.3 },
            { text: "work.", start: 8.3, end: 8.6 },
          ]
        },

        {
          start: 8.9, end: 13.0,
          words: [
            { text: "She", start: 9.0, end: 9.3 },
            { text: "leaves", start: 9.3, end: 9.7 },
            { text: "it", start: 9.7, end: 9.9 },
            { text: "on", start: 9.9, end: 10.2 },
            { text: "the,", start: 10.2, end: 10.4 },
            { text: "table", start: 10.4, end: 10.8 },
            { text: "and", start: 11.5, end: 11.8 },
            { text: "goes", start: 11.8, end: 12.1 },
            { text: "outside", start: 12.1, end: 12.4 },
            { text: "to play.", start: 12.4, end: 12.7 },
          ]
        },

      ]
    },

    {
      url: video3,
      title: "Section 3",
      subtitles: [
        {
          start: 0, end: 1.0,
          words: [
            { text: "After", start: 0.1, end: 0.4 },
            { text: "a", start: 0.4, end: 0.7 },
            { text: "while,", start: 0.7, end: 1.0 },
          ]
        },

        {
          start: 1.3, end: 3.0,
          words: [
            { text: "she", start: 1.3, end: 1.6 },
            { text: "comes", start: 1.6, end: 1.9 },
            { text: "in", start: 1.9, end: 2.1 },
            { text: "for", start: 2.1, end: 2.3 },
            { text: "a drink.", start: 2.3, end: 2.5 },
          ]
        },

        {
          start: 3.3, end: 4.5,
          words: [
            { text: "Oh", start: 3.3, end: 3.8 },
            { text: "no!", start: 3.8, end: 4.3 },
          ]
        },

        {
          start: 4.6, end: 8.0,
          words: [
            { text: "There", start: 5.0, end: 5.3 },
            { text: "are", start: 5.3, end: 5.6 },
            { text: "huge", start: 5.6, end: 5.9 },
            { text: "black", start: 5.9, end: 6.2 },
            { text: "marks", start: 6.2, end: 6.5 },
            { text: "all", start: 6.5, end: 6.8 },
            { text: "over", start: 6.8, end: 7.1 },
            { text: "her", start: 7.1, end: 7.4 },
            { text: "homework,", start: 7.4, end: 7.7 },
          ]
        },

        {
          start: 8.0, end: 13.0,
          words: [
            { text: "and", start: 8.5, end: 8.8 },
            { text: "Beth", start: 8.8, end: 9.1 },
            { text: "knows", start: 9.1, end: 9.4 },
            { text: "exactly", start: 9.4, end: 9.7 },
            { text: "who", start: 9.7, end: 10.0 },
            { text: "did", start: 10.0, end: 10.3 },
            { text: "it!", start: 10.3, end: 10.6 },
            { text: "Beth", start: 12.0, end: 12.3 },
            { text: "feels,", start: 12.3, end: 12.6 },
            { text: "angry.", start: 12.6, end: 12.9 },
          ]
        },

        {
          start: 13.1, end: 16.5,
          words: [
            { text: "She", start: 13.5, end: 13.8 },
            { text: "will", start: 13.8, end: 14.1 },
            { text: "have", start: 14.1, end: 14.4 },
            { text: "to do", start: 14.4, end: 14.7 },
            { text: "all", start: 14.7, end: 15.0 },
            { text: "her", start: 15.0, end: 15.3 },
            { text: "hard", start: 15.3, end: 15.6 },
            { text: "work", start: 15.6, end: 15.9 },
            { text: "again.", start: 15.9, end: 16.4 },
          ]
        },

        {
          start: 16.6, end: 20.1,
          words: [
            { text: "Her", start: 16.8, end: 17.1 },
            { text: "face", start: 17.1, end: 17.4 },
            { text: "grows", start: 17.4, end: 17.7 },
            { text: "red,", start: 17.7, end: 18.0 },
            { text: "and", start: 18.5, end: 18.8 },
            { text: "she", start: 18.8, end: 19.1 },
            { text: "feels", start: 19.1, end: 19.4 },
            { text: "like", start: 19.4, end: 19.7 },
            { text: "crying.", start: 19.7, end: 20.0 },
          ]
        },

        {
          start: 20.2, end: 26.0,
          words: [
            { text: "She", start: 20.5, end: 20.8 },
            { text: "knows", start: 20.8, end: 21.1 },
            { text: "her", start: 21.1, end: 21.4 },
            { text: "four-", start: 21.4, end: 21.7 },
            { text: "year", start: 21.7, end: 22.0 },
            { text: "-old", start: 22.0, end: 22.3 },
            { text: "sister", start: 22.3, end: 22.6 },
            { text: "drew", start: 22.6, end: 22.9 },
            { text: "on her", start: 22.9, end: 23.1 },
            { text: "work.", start: 23.1, end: 23.7 },
          ]
        },
      ]
    },


    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 0, end: 3.0,
          words: [
            { text: "Sofia,", start: 0, end: 0.8 },
            { text: "Beth’s", start: 0.8, end: 1.2 },
            { text: "sister", start: 1.2, end: 1.5 },
            { text: "walks", start: 1.5, end: 1.8 },
            { text: "into", start: 1.8, end: 2.1 },
            { text: "the", start: 2.1, end: 2.4 },
            { text: "room.", start: 2.4, end: 2.8 },
          ]
        },

        {
          start: 3.0, end: 5.0,
          words: [
            { text: "Sofia", start: 3.1, end: 3.5 },
            { text: "is", start: 3.5, end: 3.7 },
            { text: "holding", start: 3.7, end: 4.0 },
            { text: "a black", start: 4.0, end: 4.3 },
            { text: "crayon.", start: 4.3, end: 4.9 },
          ]
        },

        {
          start: 5.0, end: 7.6,
          words: [
            { text: "Sofia", start: 5.8, end: 6.1 },
            { text: "do", start: 6.1, end: 6.4 },
            { text: "work", start: 6.4, end: 6.9 },
            { text: "too.", start: 7.1, end: 7.5 },
          ]
        },

        {
          start: 7.7, end: 10.9,
          words: [
            { text: "Beth", start: 7.7, end: 8.0 },
            { text: "knows", start: 8.0, end: 8.4 },
            { text: "that", start: 8.4, end: 8.6 },
            { text: "she", start: 8.6, end: 8.9 },
            { text: "needs", start: 8.9, end: 9.2 },
            { text: "to", start: 9.2, end: 9.5 },
            { text: "calm", start: 9.5, end: 9.8 },
            { text: "down", start: 9.8, end: 10.1 },
            { text: "before", start: 10.1, end: 10.4 },
            { text: "speaking,", start: 10.4, end: 10.7 },
          ]
        },

        {
          start: 12.0, end: 14.5,
          words: [
            { text: "so", start: 12.0, end: 12.3 },
            { text: "she", start: 12.3, end: 12.6 },
            { text: "walks", start: 12.6, end: 12.9 },
            { text: "up", start: 12.9, end: 13.2 },
            { text: "to", start: 13.2, end: 13.5 },
            { text: "her", start: 13.5, end: 13.8 },
            { text: "bedroom.", start: 13.8, end: 14.1 },
          ]
        },

        {
          start: 14.6, end: 22.0,
          words: [
            { text: "She", start: 15.2, end: 15.7 },
            { text: "closes", start: 15.7, end: 16.1 },
            { text: "her", start: 16.1, end: 16.4 },
            { text: "eyes", start: 16.4, end: 16.9 },
            { text: "and", start: 17.5, end: 17.8 },
            { text: "takes", start: 17.8, end: 18.1 },
            { text: "some", start: 18.1, end: 18.4 },
            { text: "deep", start: 18.4, end: 18.7 },
            { text: "breaths", start: 18.7, end: 19.0 },
            { text: "and", start: 19.5, end: 19.8 },
            { text: "counts", start: 19.8, end: 20.1 },
            { text: "to", start: 20.1, end: 20.4 },
            { text: "ten", start: 20.4, end: 20.7 },
            { text: "to", start: 20.7, end: 21.0 },
            { text: "calm", start: 21.0, end: 21.3 },
            { text: "down.", start: 21.3, end: 21.6 },
          ]
        },

        {
          start: 23.0, end: 24.2,
          words: [
            { text: "That", start: 23.0, end: 23.3 },
            { text: "feels", start: 23.3, end: 23.7 },
            { text: "better,", start: 23.7, end: 24.0 },
          ]
        },

        {
          start: 24.3, end: 28.5,
          words: [
            { text: "She", start: 24.4, end: 24.7 },
            { text: "wants", start: 24.7, end: 25.0 },
            { text: "to", start: 25.0, end: 25.3 },
            { text: "speak", start: 25.3, end: 25.6 },
            { text: "to", start: 25.6, end: 25.9 },
            { text: "her", start: 25.9, end: 26.2 },
            { text: "sister", start: 26.2, end: 26.5 },
            { text: "now", start: 26.5, end: 26.8 },
            { text: "that", start: 26.8, end: 27.1 },
            { text: "she", start: 27.1, end: 27.4 },
            { text: "is", start: 27.4, end: 27.7 },
            { text: "calm.", start: 27.7, end: 28.0 },
          ]
        },
      ]
    },

    {
      url: video5,
      title: "Section 5",
      subtitles: [
        {
          start: 0.0, end: 5.0,
          words: [
            { text: "Beth", start: 0.1, end: 0.4 },
            { text: "knows", start: 0.4, end: 0.7 },
            { text: "that,", start: 0.7, end: 1.0 },
            { text: "Sofia", start: 1.0, end: 1.3 },
            { text: "just", start: 1.3, end: 1.6 },
            { text: "wanted", start: 1.6, end: 1.9 },
            { text: "to", start: 1.9, end: 2.2 },
            { text: "make", start: 2.2, end: 2.5 },
            { text: "marks", start: 2.5, end: 2.8 },
            { text: "on", start: 2.8, end: 3.1 },
            { text: "paper,", start: 3.1, end: 3.4 },
            { text: "like", start: 3.4, end: 3.7 },
            { text: "her", start: 3.7, end: 4.0 },
            { text: "big", start: 4.0, end: 4.3 },
            { text: "sister.", start: 4.3, end: 4.6 },
          ]
        },

        {
          start: 6.3, end: 10.0,
          words: [
            { text: "Beth", start: 6.3, end: 6.6 },
            { text: "walks", start: 6.6, end: 6.9 },
            { text: "down", start: 6.9, end: 7.2 },
            { text: "stairs", start: 7.2, end: 7.5 },
            { text: "and", start: 7.5, end: 7.8 },
            { text: "tells", start: 7.8, end: 8.1 },
            { text: "her", start: 8.1, end: 8.4 },
            { text: "mum", start: 8.4, end: 8.7 },
            { text: "about", start: 8.7, end: 9.0 },
            { text: "her", start: 9.0, end: 9.3 },
            { text: "homework.", start: 9.3, end: 10.0 },
          ]
        },

        {
          start: 10.3, end: 14.0,
          words: [
            { text: "Mum", start: 10.8, end: 11.1 },
            { text: "is", start: 11.1, end: 11.4 },
            { text: "very", start: 11.4, end: 11.7 },
            { text: "proud", start: 11.7, end: 12.0 },
            { text: "that", start: 12.0, end: 12.3 },
            { text: "Beth", start: 12.3, end: 12.6 },
            { text: "is", start: 12.6, end: 12.9 },
            { text: "controlling", start: 12.9, end: 13.2 },
            { text: "her", start: 13.2, end: 13.5 },
            { text: "anger.", start: 13.5, end: 13.8 },
          ]
        },

        {
          start: 15.1, end: 18.9,
          words: [
            { text: "Mum", start: 15.5, end: 15.8 },
            { text: "tells", start: 15.8, end: 16.1 },
            { text: "Sofia", start: 16.1, end: 16.4 },
            { text: "to", start: 16.4, end: 16.7 },
            { text: "always", start: 16.7, end: 17.0 },
            { text: "ask", start: 17.0, end: 17.3 },
            { text: "before", start: 17.3, end: 17.6 },
            { text: "she", start: 17.6, end: 17.9 },
            { text: "colours.", start: 17.9, end: 18.5 },
          ]
        },

        {
          start: 19.0, end: 22.9,
          words: [
            { text: "Mum", start: 19.1, end: 19.4 },
            { text: "finds", start: 19.4, end: 19.7 },
            { text: "Beth", start: 19.7, end: 20.0 },
            { text: "a", start: 20.0, end: 20.3 },
            { text: "folder", start: 20.3, end: 20.6 },
            { text: "where", start: 20.6, end: 20.9 },
            { text: "she", start: 20.9, end: 21.2 },
            { text: "can", start: 21.2, end: 21.5 },
            { text: "keep", start: 21.5, end: 21.8 },
            { text: "her", start: 21.8, end: 22.1 },
            { text: "homework", start: 22.1, end: 22.4 },
            { text: "safe.", start: 22.4, end: 22.7 },
          ]
        },

        {
          start: 24.0, end: 30.0,
          words: [
            { text: "Beth", start: 24.1, end: 24.4 },
            { text: "is", start: 24.4, end: 24.7 },
            { text: "happy", start: 24.7, end: 25.0 },
            { text: "that", start: 25.0, end: 25.3 },
            { text: "she", start: 25.3, end: 25.6 },
            { text: "controlled", start: 25.6, end: 25.9 },
            { text: "her", start: 25.9, end: 26.2 },
            { text: "anger.", start: 26.2, end: 26.5 },
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
      { top: '15%', left: '10%' },
      { top: '15%', left: '15%' },
      { top: '15%', left: '15%' },
      { top: '15%', left: '15%' },
    ],

    2: [
      { top: '10%', right: '5%', isFlipped: true },
      { top: '10%', right: '5%', isFlipped: true },
      { top: '10%', right: '5%', isFlipped: true },
      { top: '10%', right: '15%' },
      { top: '10%', right: '35%' },
      { top: '10%', right: '35%' },
      { top: '10%', right: '35%' },
      { top: '1%', left: '35%' },

    ],

    3: [
      { bottom: '80%', left: '28%', isFlipped: true },
      { top: '10%', left: '45%' },
      { top: '10%', left: '45%' },
      { top: '10%', left: '45%' },
      { top: '20%', left: '25%' },
      { top: '10%', left: '20%' },
      { top: '10%', left: '65%', isFlipped: true },
      { top: '10%', left: '20%' },
    ],

    4: [
      { top: '10%', left: '10%' },
      { top: '5%', left: '35%' },
      { top: '5%', left: '55%', isFlipped: true },
      { top: '15%', left: '75%', isFlipped: true },
      { top: '25%', left: '10%' },
      { top: '25%', left: '15%' },
    ],
    5: [
      // { bottom: '80%', left: '48%', },
      // { top: '20%', left: '25%' },
      // { top: '10%', left: '50%', isFlipped: true },
      // { top: '10%', left: '50%', isFlipped: true },
      // { top: '70%', left: '50%', isFlipped: true }
    ],
    6: [
      // { bottom: '80%', left: '48%', transform: 'translateX(-50%)' },
      // { top: '10%', left: '10%' },
      // { top: '10%', left: '50%', isFlipped: true },
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

    if (isLast || !currentItem.url.endsWith(".mp4")) {
      ValidationAlert.storyEnd(() => {
        navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
      });
    } else {
      setShowBanner(false);
      setCurrentVideo(prev => prev + 1);
    }
  }, [currentVideo, videos, navigate, unitId, lessonId]);


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
    const correctWords = ["controlled", "her", "anger"];
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
                Highlight the phrase that teaches the
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                main lesson from Beth’s story.
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
