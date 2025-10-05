import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Layout from "./components/layout";
import Timeline from "./pages/timeline/timeline";
import Memo from "./pages/memo";
import Recap from "./pages/recap";
import Birthday from "./pages/birthday/birthday";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Birthday />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/memo" element={<Memo />} />
          <Route path="/recap" element={<Recap />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
