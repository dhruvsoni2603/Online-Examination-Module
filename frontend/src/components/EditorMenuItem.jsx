/* eslint-disable react/prop-types */
export default function MenuItem({ icon, title, action, isActive = null }) {
  return (
    <button
      className={`menu-item${isActive && isActive() ? " is-active" : ""}`}
      onClick={action}
      title={title}
    >
      {/* Icon of lucide react from props */}
      {icon}
    </button>
  );
}
