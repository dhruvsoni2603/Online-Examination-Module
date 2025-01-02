import { Button } from "@/components/ui/button"
import useAuth from "@/hooks/useAuth"

export const ExamPage = () => {

  const { logout } = useAuth("student")

  return (
    <div>
      <h1>Student Exam Page</h1>
      <Button onClick={logout}>
        Logout
      </Button>
    </div>
  )
}