import React from "react";

const colorClasses = {
  primary: "bg-primary text-white hover:bg-primary/90 focus:ring-primary",
  secondary: "bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary",
  success: "bg-success text-white hover:bg-success/90 focus:ring-success",
  muted: "bg-muted text-gray-700 hover:bg-gray-200 focus:ring-muted",
};

export default function Button({
  children,
  color = "primary",
  className = "",
  ...rest
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 ${
        colorClasses[color] || colorClasses.primary
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
} 