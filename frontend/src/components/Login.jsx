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

import axiosInstance from "@/services/axiosInstance";
import { Loader } from "lucide-react";
// import { setRole, setToken } from "@/services/jwt";
// import useAuth from "@/hooks/useAuth";

export function LoginForm({ role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //const { setUser } = useAuth(); // Context hook to set authenticated user

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // console.log(username, password);

    try {
      const response = await axiosInstance.post(`/${role}/login`, {
        email,
        password,
      });

      console.log(response);

      // const [token, role] = response.data;

      // Securely store the token in cookies
      // setToken(token);

      // Update the global AuthContext state
      // setRole(role);

      // Redirect user based on role
      // navigate(role === "ADMIN" ? "/admin/dashboard" : "/student/exam");
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
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
              {error && <div className="text-sm text-red-500">{error}</div>}
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-gray-100">
                    Password
                  </Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader className="w-6 h-6 mr-2 animate-spin" />}
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </>
  );
}
