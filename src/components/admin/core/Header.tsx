import { SwitchTheme } from "@/components/switch-theme";
import { useGetAllNotificationQuery } from "@/redux/features/notification/notiApi";
import { AlignJustify, Bell } from "lucide-react";
import socketIO from "socket.io-client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
import { useSelector } from "react-redux";
// import TimeAgo from "timeago-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const ENDPOINT = process.env.NEXT_SOCKET_SERVER_URL || "http://localhost:4000";
const socketId = socketIO(ENDPOINT!, { transports: ["websocket"] });

type Props = {
  setNavActive: (navActive: boolean) => void;
  navActive: boolean;
};

const Header: FC<Props> = ({ setNavActive, navActive }) => {
  const { user } = useSelector((state: any) => state.auth);
  const { data, refetch } = useGetAllNotificationQuery({});
  const [audio] = useState(new Audio("/mixkit-correct-answer-tone-2870.wav"));
  useEffect(() => {
    const playAudio = async () => {
      await audio.play();
    };
    socketId.on("newNotification", (data) => {
      playAudio();
      refetch();
    });
  }, []);

  return (
    <div className="h-[57px] z-40 bg-white border-b flex justify-between items-center sticky top-0 dark:bg-black">
      <div className="">
        <AlignJustify
          className="ml-3 md:hidden cursor-pointer"
          onClick={() => setNavActive(!navActive)}
        />
      </div>
      <div className="flex items-center space-x-3 mr-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="relative  cursor-pointer">
              <Bell />
              <div className="absolute -top-1 -right-1 size-4 items-center justify-center bg-red-500 text-sm rounded-full">
                <p className="text-center">
                  {data?.result.filter((d: any) => d.status != "read").length}
                </p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72 mt-4 max-h-96 overflow-auto">
            <DropdownMenuLabel className=" text-primary">
              Notifications
            </DropdownMenuLabel>
            {data?.result.length ? (
              <div>
                {" "}
                {data?.result.map((noti: any, i: any) => {
                  if (noti?.status != "read") {
                    return (
                      <div className="" key={i}>
                        <DropdownMenuItem>
                          <div className=" flex flex-col">
                            <div className="flex justify-between w-full">
                              <h1>{noti?.title}</h1>{" "}
                              <p className=" cursor-pointer text-gray-500">
                                mark as read
                              </p>
                            </div>
                            <p className=" text-gray-600 dark:text-muted-foreground">
                              {noti?.message}
                            </p>
                            <p>
                              {" "}
                              <ReactTimeAgo
                                date={noti?.createdAt}
                                locale="en-US"
                              />
                            </p>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </div>
                    );
                  }
                })}
              </div>
            ) : (
              <h1 className=" my-3 text-center">Not found notification</h1>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <SwitchTheme />
        <Image
          alt="profile"
          width={45}
          height={45}
          className="rounded-full"
          src={user?.avatar ? user?.avatar?.url : "/images/profile.webp"}
        />
      </div>
    </div>
  );
};

export default Header;
