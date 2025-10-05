import { Outlet } from "react-router-dom";
import Header from "./header";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-800 text-white">
      <Header />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-8 py-16">
        <Outlet />
      </main>
    </div>
  );
}
