export const StudentNavbar = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md">
      <nav className="container mx-auto flex items-center justify-between py-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Student Portal</h1>
        </div>
        <div>
          <ul className="flex items-center space-x-4">
            <li>
              <a href="#" className="text-gray-800 dark:text-white">Home</a>
            </li>
            <li>
              <a href="#" className="text-gray-800 dark:text-white">Courses</a>
            </li>
            <li>
              <a href="#" className="text-gray-800 dark:text-white">Profile</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}