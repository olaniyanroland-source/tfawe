import { createBrowserRouter } from "react-router";
import { Layout }      from "./pages/Layout";
import { Home }        from "./pages/Home";
import { About }       from "./pages/About";
import { Pricing }     from "./pages/Pricing";
import { Appointment } from "./pages/Appointment";
import { Contact }     from "./pages/Contact";
import { NotFound }    from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true,           Component: Home },
      { path: "about",         Component: About },
      { path: "pricing",       Component: Pricing },
      { path: "appointment",   Component: Appointment },
      { path: "contact",       Component: Contact },
      { path: "*",             Component: NotFound },
    ],
  },
]);
