import { createBrowserRouter } from "react-router";
import { Layout }      from "./pages/Layout";
import { Home }        from "./pages/Home";
import { About }       from "./pages/About";
import { Pricing }     from "./pages/Pricing";
import { Accessories } from "./pages/Accessories";
import { Appointment } from "./pages/Appointment";
import { Contact }     from "./pages/Contact";
import { CookiePolicy, PrivacyPolicy, TermsOfUse } from "./pages/Legal";
import { NotFound }    from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true,           Component: Home },
      { path: "about",         Component: About },
      { path: "pricing",       Component: Pricing },
      { path: "accessories",   Component: Accessories },
      { path: "accesories",    Component: Accessories },
      { path: "appointment",   Component: Appointment },
      { path: "contact",       Component: Contact },
      { path: "privacy-policy", Component: PrivacyPolicy },
      { path: "terms-of-use",   Component: TermsOfUse },
      { path: "cookie-policy",  Component: CookiePolicy },
      { path: "*",             Component: NotFound },
    ],
  },
]);
