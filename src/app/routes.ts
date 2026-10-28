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
      { path: "appointment/fitting-journey", lazy: async () => ({ Component: (await import("./pages/FittingJourney")).FittingJourney }) },
      { path: "appointment/online-consultation", lazy: async () => ({ Component: (await import("./pages/OnlineConsultation")).OnlineConsultation }) },
      { path: "appointment/in-person-consultation", lazy: async () => ({ Component: (await import("./pages/InPersonConsultation")).InPersonConsultation }) },
      { path: "contact", lazy: async () => ({ Component: (await import("./pages/Contact")).Contact }) },
      { path: "privacy-policy", lazy: async () => ({ Component: (await import("./pages/Legal")).PrivacyPolicy }) },
      { path: "terms-of-use", lazy: async () => ({ Component: (await import("./pages/Legal")).TermsOfUse }) },
      { path: "cookie-policy", lazy: async () => ({ Component: (await import("./pages/Legal")).CookiePolicy }) },
      { path: "*", lazy: async () => ({ Component: (await import("./pages/NotFound")).NotFound }) },
    ],
  },
]);
