import ReactPlayer from "react-player";
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/react";
import "./video-player.css";

interface IProps {
  src: string;
}

const VideoPlayer = ({ src }: IProps) => {
  return (
    <MediaController className="group relative w-full aspect-video bg-black">
      <ReactPlayer
        slot="media"
        src={src}
        controls={false}
        style={{
          width: "100%",
          height: "100%",
        }}
      ></ReactPlayer>
      <MediaControlBar
        className="
          absolute bottom-0 left-0 right-0
          flex items-center gap-2
          bg-background/80 backdrop-blur
          border-t border-border
          px-3 py-2
          text-foreground
          opacity-0 group-hover:opacity-100
          transition-opacity
        "
      >
        <MediaPlayButton />
        <MediaSeekBackwardButton seekOffset={10} />
        <MediaSeekForwardButton seekOffset={10} />
        <MediaTimeRange />
        <MediaTimeDisplay showDuration />
        <MediaMuteButton />
        <MediaVolumeRange />
        <MediaPlaybackRateButton />
        <MediaFullscreenButton />
      </MediaControlBar>
    </MediaController>
  );
};

export default VideoPlayer;
