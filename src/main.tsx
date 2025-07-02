import { router } from "#/router";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const target = document.querySelector("#root")!;

if (!target.innerHTML) {
  const root = createRoot(target);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
