import { DataTable } from "@/components/DataTable";
import { DeleteStudentDialog } from "@/components/DeleteStudentDialog";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFetchStudents } from "@/hooks/useFetchData";
import {
  ArrowUpDown,
  Loader,
  MoreHorizontal,
  Pencil,
  PlusCircle,
  Trash,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { format } from "timeago.js";

export const StudentsPage = () => {
  const navigate = useNavigate();

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [dialogType, setDialogType] = useState("");

  const { students, isLoading, error } = useFetchStudents();

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

  // const students = useGlobalStore((state) => state.students) || [];
  // console.log(students);

  const handleDialogOpen = (type, student) => {
    setSelectedStudent(student);
    setDialogType(type);
  };

  const handleDialogClose = () => {
    setSelectedStudent(null);
    setDialogType("");
  };

  const handleEditStudent = (selectedStudent) => {
    handleDialogClose();
    navigate(`/admin/edit-student`, { state: { student: selectedStudent } });
  };

  const columns = [
    {
      accessorKey: "studentId",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full"
          >
            Student ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <div className="text-sm font-medium text-gray-100 text-center">
              {row.original.studentId}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full"
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <div className="text-sm font-medium text-gray-100 text-center">
              {row.original.name}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full"
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <div className="text-sm font-medium text-gray-100 text-center">
              {row.original.email}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "collegeName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full"
          >
            College Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <div className="text-sm font-medium text-gray-100 text-center">
              {row.original.collegeName}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "branch",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full"
          >
            Branch
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <div className="text-sm font-medium text-gray-100 text-center">
              {row.original.branch}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "phone",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full"
          >
            Phone
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <div className="text-sm font-medium text-gray-100 text-center">
              {row.original.phone}
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
        const student = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-center p-2 hover:bg-gray-800 rounded-md">
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="text-blue-500"
                onClick={() => {
                  handleEditStudent(student);
                }}
              >
                <Pencil className="h-5 w-5 mr-2" />
                Edit student
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => handleDialogOpen("delete", student)}
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

  const filterCols = ["collegeName", "branch", "updatedAt"];

  return (
    <Dialog open={!!dialogType} onOpenChange={handleDialogClose}>
      <div className="px-4 py-0 mx-auto mt-12 w-full max-w-7xl">
        <DataTable
          columns={columns}
          data={students}
          filterCols={filterCols}
          initialState={{ sorting: [{ id: "updatedAt", desc: true }] }}
        >
          <NavLink
            to="/admin/add-student"
            className="w-full md:w-auto"
          >
            <Button className="w-full md:w-auto">
              Add Student
              <PlusCircle style={{ width: "1.25rem", height: "1.25rem" }} />
            </Button>
          </NavLink>
        </DataTable>
      </div>
      {dialogType === "delete" && (
        <DeleteStudentDialog
          selectedStudent={selectedStudent}
          handleDialogClose={handleDialogClose}
        />
      )}
    </Dialog>
  );
};
