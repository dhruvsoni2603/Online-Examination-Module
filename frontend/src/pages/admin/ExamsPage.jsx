import { DeleteExamDialog } from "@/components/DeleteExamDialog";
import { ExamCard } from "@/components/ExamCard";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { ViewExamDialog } from "@/components/ViewExamDialog";
import { useFetchExams } from "@/hooks/useFetchData";
import { Loader, PlusCircle, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const ExamsPage = () => {
  const { exams, isLoading, error } = useFetchExams();
  // console.log(exams);

  const navigate = useNavigate();

  const [selectedExam, setSelectedExam] = useState(null);
  const [dialogType, setDialogType] = useState("");

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

  if (!exams.length)
    return (
      <div className="flex justify-center items-center px-4 mx-auto pt-12 w-full h-screen max-w-7xl">
        <div className="text-gray-100 flex flex-col items-center justify-center space-y-4">
          <TriangleAlert className="h-12 w-12 text-yellow-500" />
          <h1 className="text-3xl font-bold">No exams found</h1>
          <p className="mt-4">Please create an exam to get started</p>
          <NavLink to="/admin/create-exam">
            <Button>Create Exam</Button>
          </NavLink>
        </div>
      </div>
    );

  const handleDialogOpen = (type, exam) => {
    setDialogType(type);
    setSelectedExam(exam);
  };

  const handleDialogClose = () => {
    setDialogType("");
    setSelectedExam(null);
  };

  const handleEditExam = (exam) => {
    navigate("/admin/edit-exam", { state: { exam } });
  };

  return (
    <Dialog open={!!dialogType} onOpenChange={handleDialogClose}>
      <div className="p-4 mx-auto mt-12 w-full max-w-7xl">
        <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col w-full md:w-2/3">
            <h1 className="text-2xl font-semibold">Exams</h1>
            <p className="text-gray-400">List of all exams</p>
          </div>
          <div className="flex justify-end w-full md:w-1/3">
            <NavLink to="/admin/create-exam" className="w-full md:w-auto">
              <Button className="w-full md:w-auto">
                <PlusCircle className="h-5 w-5" />
                Create Exam
              </Button>
            </NavLink>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exams.map((exam) => (
            <ExamCard
              key={exam.id}
              exam={exam}
              onView={() => handleDialogOpen("view", exam)}
              onEdit={() => handleEditExam(exam)}
              onDelete={() => handleDialogOpen("delete", exam)}
            />
          ))}
          {/* <ExamCard />
          <ExamCard />
          <ExamCard />
          <ExamCard />
          <ExamCard />
          <ExamCard />
          <ExamCard /> */}
        </div>
      </div>
      {dialogType === "view" && <ViewExamDialog exam={selectedExam} />}
      {/* Edit question button navigates to add question page with values passed */}
      {/* Delete question */}
      {dialogType === "delete" && selectedExam && (
        <DeleteExamDialog
          exam={selectedExam}
          handleDialogClose={handleDialogClose}
        />
      )}
    </Dialog>
  );
};
