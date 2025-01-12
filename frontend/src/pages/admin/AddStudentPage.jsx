import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/services/axiosInstance";
import { getToken } from "@/services/jwt";
import { useMutation } from "@tanstack/react-query";
import { Loader, PlusCircle, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AddStudentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { toast } = useToast();

  const student = location.state?.student;
  // console.log(student);

  const [studentId, setStudentId] = useState(student?.studentId || "");
  const [name, setName] = useState(student?.name || "");
  const [email, setEmail] = useState(student?.email || "");
  const [collegeName, setCollegeName] = useState(student?.collegeName || "");
  const [branch, setBranch] = useState(student?.branch || "");
  const [phone, setPhone] = useState(student?.phone || "");

  // const queryClient = useQueryClient();

  const createStudentMutation = useMutation({
    mutationFn: async (newStudent) => {
      const token = getToken();

      let url;

      if (location.pathname.includes("edit-student")) {
        url = `${import.meta.env.VITE_API_URL}/api/students/${student.id}`;

        return axiosInstance.put(url, newStudent, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        url = `${import.meta.env.VITE_API_URL}/api/students/register`;

        return axiosInstance.post(url, newStudent, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    },
    onSuccess: () => {
      if (location.pathname.includes("edit-student")) {
        toast({
          title: "Student updated successfully",
          status: "success",
        });
      } else {
        toast({
          title: "Student saved successfully",
          status: "success",
        });
      }

      navigate("/admin/students");
    },
    onError: (error) => {
      if (location.pathname.includes("edit-student")) {
        toast({
          title: "Error updating student",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error saving student",
          description: error.response.data,
          variant: "destructive",
        });
      }
      console.error(error);
    },
  });

  const randomPasswordGenerator = () => {
    const length = 8;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$&";
    let password = "";

    for (let i = 0; i < length; i++) {
      const at = Math.floor(Math.random() * charset.length);
      password += charset[at];
    }

    return password;
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();

    // Validation

    if (!studentId) {
      toast({
        title: "Student ID is required",
        variant: "destructive",
      });
      return;
    }
    if (!name) {
      toast({
        title: "Name is required",
        variant: "destructive",
      });
      return;
    }
    if (!email) {
      toast({
        title: "Email is required",
        variant: "destructive",
      });
      return;
    }
    if (!collegeName) {
      toast({
        title: "College Name is required",
        variant: "destructive",
      });
      return;
    }
    if (!branch) {
      toast({
        title: "Branch is required",
        variant: "destructive",
      });
      return;
    }
    if (!phone) {
      toast({
        title: "Phone is required",
        variant: "destructive",
      });
      return;
    }

    if (!location.pathname.includes("edit-student")) {
      const newStudent = {
        studentId,
        name,
        email,
        password: randomPasswordGenerator(),
        collegeName,
        branch,
        phone,
      };

      createStudentMutation.mutate(newStudent);
    } else {
      const newStudent = {
        id: student.id,
        studentId,
        name,
        email,
        collegeName,
        branch,
        phone,
      };
      createStudentMutation.mutate(newStudent);
    }
  };

  const handleReset = () => {
    setStudentId("");
    setName("");
    setEmail("");
    setCollegeName("");
    setBranch("");
    setPhone("");
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="px-4 py-2 mx-auto mt-12 w-full max-w-7xl">
      <form onSubmit={handleStudentSubmit}>
        <header className="flex flex-col md:flex-row md:items-center justify-between pt-2 pb-4 gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-gray-50">
              {location.pathname.includes("edit-student")
                ? "Edit Student"
                : "Add Student"}
            </h1>
            <p className="text-md text-gray-400">
              {location.pathname.includes("edit-student")
                ? "Edit student details"
                : "Add a new student"}
            </p>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-end items-center gap-2 md:gap-4">
            <Button
              type="reset"
              variant="outline"
              className="w-full md:w-auto"
              onClick={handleReset}
            >
              <RotateCcw className="h-6 w-6" />
              Reset
            </Button>
            <Button type="submit" className="w-full md:w-auto">
              {createStudentMutation.isLoading ? (
                <Loader className="animate-spin h-6 w-6" />
              ) : (
                <PlusCircle className="h-6 w-6" />
              )}
              {location.pathname.includes("edit-student") ? "Update" : "Add"}
            </Button>
          </div>
        </header>
        <div className="flex flex-col gap-6 border border-gray-800 rounded-lg p-4">
          {/* Header fields */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                type="text"
                id="studentId"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Student ID"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="branch">Branch</Label>
              <Input
                type="text"
                id="branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="Branch"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
              />
            </div>
          </div>
          {/* Header and Email */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          {/* College name */}
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="collegeName">College Name</Label>
            <Input
              type="text"
              id="collegeName"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              placeholder="College Name"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
