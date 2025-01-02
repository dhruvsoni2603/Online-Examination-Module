import { DataTable } from "@/components/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  Eye,
  Loader,
  MoreHorizontal,
  Pencil,
  PlusCircle,
  Trash,
  TriangleAlert,
} from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { ViewQuestionDialog } from "@/components/ViewQuestionDialog";
import { DeleteQuestionDialog } from "@/components/DeleteQuestionDialog";
import { NavLink, useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import { useState } from "react";
import { useFetchQuestions } from "@/hooks/useFetchData";

export const QuestionsPage = () => {
  const navigate = useNavigate();

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [dialogType, setDialogType] = useState("");

  // Fetch questions using useFetch hook
  const { questions, isLoading, error } = useFetchQuestions();

  if (isLoading)
    return (
      <div className="text-gray-100 flex justify-center items-center h-96">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center px-4 mx-auto pt-12 w-full h-screen max-w-7xl">
        <div className="text-gray-100 flex flex-col items-center justify-center space-y-4">
          <TriangleAlert className="h-12 w-12 text-red-500" />
          <h1 className="text-3xl font-bold">Error: {error.message}</h1>
          {/* <p className="mt-4">Please try again later</p> */}
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try again
          </Button>
        </div>
      </div>
    );

  // const questions = useGlobalStore((state) => state.questions) || []; // Get questions from the global store
  // console.log(questions);

  const handleDialogOpen = (type, question) => {
    setDialogType(type);
    setSelectedQuestion(question);
  };

  const handleDialogClose = () => {
    setDialogType("");
    setSelectedQuestion(null);
  };

  const handleEditQuestion = (question) => {
    navigate("/admin/edit-question", { state: { question } });
  };

  const convertHtmlToText = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const columns = [
    {
      accessorKey: "text",
      header: "Question",
      cell: (info) => convertHtmlToText(info.getValue()),
    },
    {
      accessorKey: "category",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <div className="text-sm font-medium text-gray-100 text-center">
              {row.original.category}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <div className="text-sm font-medium text-gray-100 text-center">
              {row.original.type}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "difficultyLevel",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Difficulty Level
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <div className="text-sm font-medium text-gray-100 text-center">
              {row.original.difficultyLevel}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "marks",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Marks
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <div className="text-sm font-medium text-gray-100 text-center">
              {row.original.marks}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Last Updated",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <div className="text-sm font-medium text-gray-100 text-center">
              {format(new Date(row.original.updatedAt).toLocaleString())}
            </div>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const question = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-center p-2 hover:bg-gray-800 rounded-md">
              <MoreHorizontal className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleDialogOpen("view", question)}
              >
                <Eye className="h-5 w-5 mr-2" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-blue-500"
                onClick={() => handleEditQuestion(question)}
              >
                <Pencil className="h-5 w-5 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDialogOpen("delete", question)}
                className="text-red-500"
              >
                <Trash className="h-5 w-5 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const filterCols = ["category", "type", "difficultyLevel"];

  return (
    <Dialog open={!!dialogType} onOpenChange={handleDialogClose}>
      <div className="px-4 py-0 mx-auto mt-12 w-full max-w-7xl">
        <DataTable
          columns={columns}
          data={questions}
          filterCols={filterCols}
          initialState={{
            sorting: [{ id: "updatedAt", desc: true }],
            columnVisibility: { updatedAt: false }, // Set updatedAt column visibility to false
          }}
        >
          <NavLink
            to="/admin/add-question"
            className="w-full md:w-auto"
          >
            <Button className="w-full md:w-auto">
              Add Question
              <PlusCircle style={{ width: "1.25rem", height: "1.25rem" }} />
            </Button>
          </NavLink>
        </DataTable>
      </div>
      {/* View question */}
      {dialogType === "view" && (
        <ViewQuestionDialog selectedQuestion={selectedQuestion} />
      )}
      {/* Edit question button navigates to add question page with values passed */}
      {/* Delete question */}
      {dialogType === "delete" && (
        <DeleteQuestionDialog
          selectedQuestion={selectedQuestion}
          handleDialogClose={handleDialogClose}
        />
      )}
    </Dialog>
  );
};
