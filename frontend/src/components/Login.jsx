/* eslint-disable react/prop-types */
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
import axios from "axios";
import { useState } from "react";

// Function to fetch JWT token
const fetchToken = async (username, password) => {
  const response = await axios.post("http://localhost:3000/api/login", {
    username,
    password,
  });
  if (response.status === 200) {
    return response.data;
  } else if (response.status === 401) {
    return null;
  }
}

const fetchHello = async () => {
  console.log(document.cookie.split("myToken=")[1]);
  // Clear
  const response = await axios.get("http://localhost:3000/hello", {
    headers: {
      Authorization: `Bearer ${document.cookie.split("myToken=")[1]}`,
    },
  });
  console.log(response);

  if (response.status === 200) {
    return response.data;
  } else if (response.status === 401) {
    return null;
  }
}

export function LoginForm({ role }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    // Fetching JWT token from the server
    const tokenResponse = await fetchToken(username, password);
    if (tokenResponse) {
      // Store the token in cookies
      document.cookie = `myToken=${tokenResponse}`;
      setIsLoggedIn(true);
      console.log("Logged in successfully ", tokenResponse);
    } else {
      console.error("Invalid credentials");
    }
  }

  const handleGetHello = async (e) => {
    e.preventDefault();
    const helloResponse = await fetchHello();
    console.log(helloResponse);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mx-auto max-w-sm bg-white dark:bg-gray-800 shadow-2xl rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {role === "admin" ? "Admin" : "Student"} Login
          </CardTitle>
          <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label
                htmlFor="username"
                className="text-gray-800 dark:text-gray-100"
              >
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label
                  htmlFor="password"
                  className="text-gray-800 dark:text-gray-100"
                >
                  Password
                </Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline text-gray-500 dark:text-gray-400"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button variant="info" type="submit" className="w-full">
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
      {/* If logged in, say logged in otherwise not logged in */}
        {isLoggedIn ? <Button onClick={handleGetHello}>Get Hello</Button> : "Not logged in"}
      </div>
    </form>
  );
}
