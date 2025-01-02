/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { getToken } from "@/services/jwt";
import axiosInstance from "@/services/axiosInstance";
import { useToast } from "@/hooks/use-toast";

export const DeleteQuestionDialog = ({
  selectedQuestion,
  handleDialogClose,
}) => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      const response = await axiosInstance.delete(
        `/questions/${selectedQuestion.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("questions");
      handleDialogClose();
      toast({
        title: "Question deleted successfully",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "An error occurred while deleting the question",
        variant: "destructive",
      });
    },
  });

  const handleQuestionDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div>
      <DialogContent aria-label="Delete question" className="bg-gray-900 w-96">
        <DialogHeader>
          <DialogTitle>
            <div className="text-gray-100">
              <h2 className="text-2xl font-bold text-center">
                Are you sure you want to delete this question?
              </h2>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Button
            variant="destructive"
            onClick={() => {
              // Delete the question
              handleQuestionDelete();
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
