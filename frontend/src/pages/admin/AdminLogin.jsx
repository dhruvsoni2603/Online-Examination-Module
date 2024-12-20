import { LoginForm } from "@/components/Login";

export const AdminLogin = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <LoginForm role={"admin"} />
    </div>
  );
};
