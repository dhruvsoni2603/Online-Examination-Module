import { Moon, Sun } from "lucide-react";
import "./App.css";
import { LoginForm } from "./components/Login";
import { Button } from "./components/ui/button";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  document.body.className = theme;

  return (
    <>
      <div className="bg-gray-200 dark:bg-gray-900 h-screen flex items-center justify-center">
        {/* Toggle Icon button */}
        <Button className="absolute top-4 right-4" onClick={toggleTheme}>
          {document.body.classList.contains("dark") ? <Sun /> : <Moon />}
        </Button>
        {/* tabs */}
        <Tabs defaultValue="admin">
          <TabsList className="grid w-full grid-cols-2 gap-2 rounded-t-lg bg-white dark:bg-gray-800">
            <TabsTrigger
              value="admin"
              className="col-span-1 text-center text-gray-800 dark:text-gray-100 data-[state=active]:bg-gray-200 dark:data-[state=active]:bg-gray-700"
            >
              Admin
            </TabsTrigger>
            <TabsTrigger
              value="student"
              className="col-span-1 text-center text-gray-800 dark:text-gray-100 data-[state=active]:bg-gray-200 dark:data-[state=active]:bg-gray-700"
            >
              Student
            </TabsTrigger>
          </TabsList>
          <TabsContent value="admin">
            <LoginForm role={"admin"} />
          </TabsContent>
          <TabsContent value="student">
            <LoginForm role={"student"} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default App;
