/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeClosed, Loader } from "lucide-react";
import useAuth from "@/hooks/useAuth";

export function LoginForm({ role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login, isPending } = useAuth(role);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
    setEmail("");
    setPassword("");
  };

  return (
    <>
      {/* Admin Login button */}
      {role === "student" && (
        <Button
          onClick={() => navigate("/login/admin")}
          className="absolute top-4 right-4"
        >
          Admin Login
        </Button>
      )}
      <form onSubmit={handleSubmit}>
        <Card className="mx-auto max-w-sm bg-gray-800 shadow-2xl rounded-lg min-w-72">
          <CardHeader className="flex flex-col items-center">
            {/* Company Logo */}
            <img
              src="/roima_logo.png"
              alt="Company Logo"
              className="h-24 mx-auto"
              loading="lazy"
            />
            <CardTitle className="text-2xl font-semibold text-gray-100">
              {role === "admin" ? "Admin " : ""}
              Login
            </CardTitle>
            <CardDescription className="text-sm text-gray-400">
              Enter your given credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {/* {error && <div className="text-sm text-red-500">{error}</div>} */}
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-100">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="grid gap-2 items-center">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-100">
                    Password
                  </Label>
                  {/* Button for viewing password */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 focus:outline-none"
                  >
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </button>
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Loader className="w-6 h-6 mr-2 animate-spin" />}
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </>
  );
}
