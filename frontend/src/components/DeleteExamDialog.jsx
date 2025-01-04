/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { getToken } from "@/services/jwt";
import axiosInstance from "@/services/axiosInstance";
import { useToast } from "@/hooks/use-toast";

export const DeleteExamDialog = ({ exam, handleDialogClose }) => {
  console.log(exam);

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      const response = await axiosInstance.delete(`/exams/${exam.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("exams");
      handleDialogClose();
      toast({
        title: "Exam deleted successfully",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "An error occurred while deleting the exam",
        variant: "destructive",
      });
    },
  });

  const handleExamDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div>
      <DialogContent aria-label="Delete exam" className="bg-gray-900 w-96">
        <DialogHeader>
          <DialogTitle>
            <div className="text-gray-100">
              <h2 className="text-2xl font-bold text-center">
                Are you sure you want to delete this exam?
              </h2>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Button
            variant="destructive"
            onClick={() => {
              // Delete the question
              handleExamDelete();
              handleDialogClose();
            }}
            className="bg-red-500 hover:bg-red-600"
          >
            Delete
          </Button>
          <Button onClick={handleDialogClose} className="bg-gray-800">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </div>
  );
};
