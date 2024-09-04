import { FC, useEffect, useState } from "react";
import axios from "axios";
import WatchPageSkeleton from "@/components/core/WatchSkeleton";
type Props = {
  videoUrl: string;
  name: string;
};
const VideoPlayer: FC<Props> = ({ videoUrl, name }) => {
  const [videoData, setVideoData] = useState({ otp: "", playbackInfo: "" });
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    axios
      .post("http://localhost:4000/api/courses/generateVideoUrl", {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
        setLoading(false);
      });
  }, [videoUrl]);
  return (
    <div>
      {loading ? (
        <WatchPageSkeleton />
      ) : (
        <div className=" ">
          {videoData?.otp && videoData?.playbackInfo && (
            <iframe
              className=" w-full h-[300px] md:h-[600px] border border-indigo-900 rounded-md p-2"
              src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}`}
              allow="encrypted-media"
              allowFullScreen
            ></iframe>
          )}
        </div>
      )}
    </div>
  );
};
export default VideoPlayer;
