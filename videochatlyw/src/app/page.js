"use client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WaitingRoom from "./waiting-room/page";
import Room from "./room/page";

const router = createBrowserRouter([
  { path: "/", element: <WaitingRoom /> },
  { path: "/room", element: <Room /> },
]);

export default function Home() {
  return <RouterProvider router={router}></RouterProvider>;
}

// <div className={styles[""]}></div>
