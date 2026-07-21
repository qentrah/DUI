import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const videoPlayerVariants = cva(
  "relative overflow-hidden rounded-lg bg-black",
  {
    variants: {
      variant: {
        default: "aspect-video",
        fullscreen: "fixed inset-0 z-50",
        thumbnail: "cursor-pointer hover:opacity-90 transition-opacity",
      },
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "w-full",
      },
    },
    defaultVariants: { variant: "default", size: "full" },
  }
)

const videoVariants = cva("w-full h-full object-cover", {
  variants: {
    fit: {
      contain: "object-contain",
      cover: "object-cover",
      fill: "object-fill",
    },
  },
  defaultVariants: { fit: "cover" },
})

export interface VideoPlayerProps
  extends VariantProps<typeof videoPlayerVariants> {
  /** Video source URL */
  src: string
  /** Thumbnail poster image */
  poster?: string
  /** Video title for accessibility */
  title?: string
  /** Whether video is currently playing */
  isPlaying?: boolean
  /** Whether video should loop */
  loop?: boolean
  /** Whether to show controls */
  controls?: boolean
  /** Whether video is muted */
  muted?: boolean
  /** Volume level (0-100) */
  volume?: number
  /** Whether video should autoplay */
  autoPlay?: boolean
  /** Click handler for thumbnail variant */
  onClick?: () => void
  /** Custom className */
  className?: string
  /** Ref to the video element */
  videoRef?: React.RefObject<HTMLVideoElement>
  /** Video fit mode */
  fit?: "contain" | "cover" | "fill"
}

function VideoPlayer({
  src,
  poster,
  title,
  variant,
  size,
  fit,
  controls = true,
  loop = false,
  muted = false,
  volume = 100,
  autoPlay = false,
  onClick,
  className,
  videoRef,
}: VideoPlayerProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [showControls, setShowControls] = React.useState(true)
  const [currentVolume, setCurrentVolume] = React.useState(volume)
  const [isMuted, setIsMuted] = React.useState(muted)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(autoPlay)

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  if (variant === "thumbnail") {
    return (
      <div
        className={cn(videoPlayerVariants({ variant, className }))}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {poster && (
          <img
            src={poster}
            alt={title || "Video thumbnail"}
            className="w-full h-full object-cover"
          />
        )}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity",
            isHovered ? "bg-black/40" : "bg-black/20"
          )}
        >
          <svg
            className="w-16 h-16 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(videoPlayerVariants({ variant, size, className }))}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={controls && showControls}
        loop={loop}
        muted={isMuted}
        autoPlay={autoPlay}
        className={cn(videoVariants({ fit }))}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />
      
      {!controls && (
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity",
            showControls ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="text-white hover:text-white/80 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <div className="flex-1 bg-white/30 h-1 rounded-full overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <span className="text-white text-xs">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  const newMuted = !isMuted
                  setIsMuted(newMuted)
                  setCurrentVolume(newMuted ? 0 : volume)
                }}
                className="text-white hover:text-white/80 transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || currentVolume === 0 ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.59 8.59L12 13.17L7.41 8.59L6 10l6 6l6-6z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

VideoPlayer.displayName = "VideoPlayer"

export { VideoPlayer, videoPlayerVariants }