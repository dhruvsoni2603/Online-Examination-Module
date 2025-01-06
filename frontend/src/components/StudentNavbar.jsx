/* eslint-disable react/prop-types */
import { Loader, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { TabsList, TabsTrigger } from "./ui/tabs";
import useAuth from "@/hooks/useAuth";
import { Tooltip, TooltipContent, TooltipProvider } from "./ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

export const StudentNavbar = ({ activeState, onExamSubmit, submitLoading, timeLeft }) => {
  const { logout } = useAuth();

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md">
      <nav className="container mx-auto flex items-center justify-between py-4">
        <div>
          <img
            src="https://ik.imagekit.io/dhruvsoni/roima%20logo.png"
            alt="logo"
            className="h-8 aspect-video"
          />
        </div>
        <div className="">
          <TabsList className="flex space-x-4">
            <TabsTrigger
              value="instructions"
              className="bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg text-white"
              disabled={!activeState}
            >
              General Instructions
            </TabsTrigger>
            <TabsTrigger
              value="mcq-section"
              className="bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg text-white"
            >
              MCQ Section
            </TabsTrigger>
            <TabsTrigger
              value="programming-section"
              className="bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg text-white"
            >
              Programming Section
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="flex items-center space-x-4 gap-6">
          {/* Timer */}
          <div className="flex items-center space-x-2">
            <div className="bg-gray-700 text-white px-2 py-2 rounded-lg">
              {formatTime(timeLeft)}
            </div>
            <Button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white" onClick={onExamSubmit}>
              {submitLoading && <Loader className="animate-spin" />}
              Submit
            </Button>
          </div>
          {/* User avator and logout icon */}
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="cursor-default">
                    <AvatarImage src="" alt="avatar" />
                    <AvatarFallback className="text-sm font-semibold p-2">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <Button variant="destructive" className="px-2" onClick={logout}>
                  <LogOut />
                </Button>
                <TooltipContent sideOffset={5} align="end">
                  John Doe
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </nav>
    </div>
  );
};
