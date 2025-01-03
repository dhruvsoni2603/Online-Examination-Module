import {
  CircleCheckBig,
  CircleHelp,
  Eye,
  MoreHorizontal,
  Pencil,
  Timer,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

/* eslint-disable react/prop-types */
export const ExamCard = ({ exam, onView, onEdit, onDelete }) => {
  // console.log(exam);

  return (
    <div className="bg-gray-800 rounded-md p-4 flex flex-col justify-between gap-4">
      {/* Title */}
      <div className="flex justify-between items-start gap-4 ">
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-lg font-semibold">{exam.title}</h2>
          <p className="text-sm text-gray-400 text-justify">
            {exam.description}
          </p>
        </div>
      </div>
      {/* Badges */}
      <div className="">
        <div className="flex flex-col md:flex-wrap md:flex-row gap-2 md:w-full">
          <Badge className="text-xs sm:text-sm md:text-xs text-slate-200 bg-yellow-700 hover:bg-yellow-600 flex items-center gap-1 cursor-default w-max">
            <CircleHelp className="h-4 w-4" />
            {exam.questionIds.length} Questions
          </Badge>
          <Badge className="text-xs sm:text-sm md:text-xs text-slate-200 bg-green-700 hover:bg-green-600 flex items-center gap-1 cursor-default w-max">
            <CircleCheckBig className="h-4 w-4" />
            {exam.totalMarks} Marks
          </Badge>
          <Badge className="text-xs sm:text-sm md:text-xs text-slate-200 bg-blue-700 hover:bg-blue-600 flex items-center gap-1 cursor-default w-max">
            <Timer className="h-4 w-4" />1 hour
          </Badge>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-2 justify-between md:items-end md:w-full ">
        {/* Created By and Updated hrs ago */}
        <div className="flex flex-col justify-end md:items-center gap-1">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              {/* <AvatarImage src="https://randomuser.me/api/portrait" alt="John Doe" /> */}
              <AvatarFallback className="text-xs">JD</AvatarFallback>
            </Avatar>
            {/* <User className="h-5 w-5" /> */}
            <p className="text-xs text-gray-400">Created by John Doe</p>
          </div>
        </div>
        {/* View and more options */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
          <Tooltip delayDuration={600}>
            <TooltipTrigger
              className="flex items-center justify-center p-2 bg-green-800 hover:bg-green-900 rounded-md"
              onClick={onView}
            >
              {/* <Button size="sm" className="w-full md:w-auto"> */}
              <Eye className="h-5 w-5" />
              {/* </Button> */}
            </TooltipTrigger>
            <TooltipContent side="bottom">View</TooltipContent>
          </Tooltip>
          <DropdownMenu className="w-full md:w-auto">
            <DropdownMenuTrigger className="flex items-center justify-center p-2 bg-gray-900 hover:bg-gray-700 rounded-md">
              <MoreHorizontal className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="bottom"
              align="center"
              className="w-full"
            >
              <DropdownMenuItem className="text-blue-500" onClick={onEdit}>
                <Pencil className="h-5 w-5 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className="text-red-500">
                <Trash className="h-5 w-5 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
