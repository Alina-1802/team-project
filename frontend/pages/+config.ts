import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import {AppProvider} from "@components/app-provider/AppProvider.tsx";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/Layout
  Layout: AppProvider,
  // https://vike.dev/head-tags
  title: "AIQuizzHub",
  description: "Demo showcasing Vike",

  extends: vikeReact,
} satisfies Config;
