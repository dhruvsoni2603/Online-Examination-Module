import { LoginForm } from "@/components/Login";

export const StudentLogin = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <LoginForm role={"student"} />
    </div>
  );
};
