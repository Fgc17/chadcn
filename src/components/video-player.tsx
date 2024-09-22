// client
"use client";
import { useRef, useState, useEffect } from "react";
import { Button } from "@headlessui/react";

import clsx from "clsx";
import { Icon } from "./icon";

interface VideoPlayerProps {
  title: string;
  videoUrl: string;
  thumbnailUrl?: string;
  coverUrl?: string;
  hideTime?: boolean;
}

export function VideoPlayer({
  title,
  videoUrl,
  thumbnailUrl,
  coverUrl,
  hideTime,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1); // Volume state
  const [showVolumeSlider, setShowVolumeSlider] = useState(false); // State to show/hide volume slider
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number) => {
    const newVolume = value / 100;
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const handleProgressChange = (value: number) => {
    if (videoRef.current) {
      const newTime = (value / 100) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleFullscreenChange = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        if (videoRef.current.requestFullscreen) {
          return videoRef.current.requestFullscreen();
        }

        if (isPlaying) {
          return (videoRef.current as any).webkitEnterFullscreen();
        }

        togglePlay();

        setTimeout(() => {
          (videoRef.current as any).webkitEnterFullscreen();
        }, 500);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, [videoRef.current?.duration]);

  useEffect(() => {
    if (videoRef.current) {
      setIsMuted(videoRef.current.muted);
    }
  }, [videoRef.current?.muted]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      videoElement.addEventListener("play", handlePlay);
      videoElement.addEventListener("pause", handlePause);

      return () => {
        videoElement.removeEventListener("play", handlePlay);
        videoElement.removeEventListener("pause", handlePause);
      };
    }
  }, []);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
      <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/50 to-transparent p-4 text-lg text-white">
        <div className="line-clamp-1">{title}</div>
      </div>
      <video
        ref={videoRef}
        className="w-full"
        controls={false}
        playsInline
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        poster={thumbnailUrl}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      {currentTime != 0 && (
        <div
          className="absolute inset-0 z-10 bg-transparent bg-contain"
          onClick={togglePlay}
        ></div>
      )}
      {currentTime === 0 && coverUrl && (
        <div
          className="absolute inset-0 z-30 cursor-pointer bg-contain"
          style={{
            backgroundImage: `url(${coverUrl})`,
          }}
          onClick={togglePlay}
        ></div>
      )}
      <div className="absolute inset-x-0 bottom-0 z-20 grid gap-2 bg-gradient-to-b from-transparent to-black/50">
        <div className="mb-0.5 px-3">
          <VideoSlider
            progress={(currentTime / duration) * 100}
            onSlide={handleProgressChange}
            className="bg-amber-600"
          />
        </div>
        <div className="relative flex items-center gap-3 p-3 pt-0 text-white [&_svg]:text-white">
          <Button onClick={togglePlay}>
            {isPlaying ? (
              <Icon name="Pause" className="h-5 fill-white" />
            ) : (
              <Icon name="Play" className="h-5 fill-white" />
            )}
          </Button>
          <div
            className="relative flex items-center gap-2"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <Button onClick={toggleMute}>
              {isMuted ? (
                <Icon name="VolumeOff" className="h-5 fill-white" />
              ) : (
                <Icon name="Volume2" className="h-5 fill-white" />
              )}
            </Button>
            {showVolumeSlider && (
              <div className="w-32">
                <VideoSlider
                  progress={volume * 100}
                  onSlide={handleVolumeChange}
                  className="bg-slate-500"
                />
              </div>
            )}
          </div>
          {!hideTime && (
            <div className="text-sm">
              {formatTime(currentTime)} /{" "}
              {duration ? formatTime(duration) : "--:--"}
            </div>
          )}
          <Button
            onClick={handleFullscreenChange}
            className="ml-auto hover:bg-black/50"
          >
            <Icon name="Expand" className="h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface VideoSliderSliderProps {
  progress: number;
  onSlide: (value: number) => void;
  className?: string;
}

export function VideoSlider({
  progress,
  onSlide,
  className,
}: VideoSliderSliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onSlide(value); // Call the onSlide function passed from the parent component
  };

  return (
    <div className="relative flex w-full">
      <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        value={progress || 0}
        onChange={handleChange}
        className="absolute inset-0 w-full cursor-pointer opacity-0"
      />
      <div className="flex flex-auto cursor-pointer rounded-full bg-slate-100">
        <div
          className={clsx(
            "h-1 rounded-l-full rounded-r-[1px]",
            className ?? "bg-indigo-600"
          )}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
