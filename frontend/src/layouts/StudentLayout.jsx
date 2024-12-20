import { Outlet } from "react-router-dom";

const StudentLayout = () => {
  return (
    <div>
      <header>Student Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Student Footer</footer>
    </div>
  );
};

export default StudentLayout;