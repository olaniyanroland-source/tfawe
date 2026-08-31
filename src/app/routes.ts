import { createBrowserRouter } from "react-router";
import { Layout }      from "./pages/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, lazy: async () => ({ Component: (await import("./pages/Home")).Home }) },
      { path: "about", lazy: async () => ({ Component: (await import("./pages/About")).About }) },
      { path: "pricing", lazy: async () => ({ Component: (await import("./pages/Pricing")).Pricing }) },
      { path: "accessories", lazy: async () => ({ Component: (await import("./pages/Accessories")).Accessories }) },
      { path: "accesories", lazy: async () => ({ Component: (await import("./pages/Accessories")).Accessories }) },
      { path: "appointment", lazy: async () => ({ Component: (await import("./pages/Appointment")).Appointment }) },
      { path: "contact", lazy: async () => ({ Component: (await import("./pages/Contact")).Contact }) },
      { path: "privacy-policy", lazy: async () => ({ Component: (await import("./pages/Legal")).PrivacyPolicy }) },
      { path: "terms-of-use", lazy: async () => ({ Component: (await import("./pages/Legal")).TermsOfUse }) },
      { path: "cookie-policy", lazy: async () => ({ Component: (await import("./pages/Legal")).CookiePolicy }) },
      { path: "*", lazy: async () => ({ Component: (await import("./pages/NotFound")).NotFound }) },
    ],
  },
]);
