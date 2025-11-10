import type React from "react";

export default function MotionContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen bg-slate-900 flex justify-center items-center">
      {children}
    </div>
  );
}
