/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { getToken } from "@/services/jwt";
import axiosInstance from "@/services/axiosInstance";
import { useToast } from "@/hooks/use-toast";

export const DeleteStudentDialog = ({ selectedStudent, handleDialogClose }) => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  console.log(selectedStudent);

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();

      const response = await axiosInstance.delete(
        `/students/${selectedStudent.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("students");
      handleDialogClose();
      toast({
        title: "Student deleted successfully",
        description: "The student has been deleted successfully",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "An error occurred while deleting the student",
        variant: "destructive",
      });
    },
  });

  const handleStudentDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div>
      <DialogContent aria-label="Delete student" className="bg-gray-900 w-96">
        <DialogHeader>
          <DialogTitle>
            <div className="text-gray-100">
              <h2 className="text-2xl font-bold text-center">
                Are you sure you want to delete this student?
              </h2>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Button
            variant="destructive"
            onClick={() => {
              // Delete the question
              handleStudentDelete();
              handleDialogClose();
            }}
            className="bg-red-500 hover:bg-red-600"
          >
            Delete
          </Button>
          <Button
            onClick={() => handleDialogClose()}
            className="bg-gray-800 hover:bg-gray-700"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </div>
  );
};
