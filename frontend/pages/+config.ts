import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import {AppProvider} from "@components/app-provider/AppProvider.tsx";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/Layout
  // Layout: AppProvider,
  Wrapper: AppProvider,
  // https://vike.dev/head-tags
  title: "AIQuizzHub",
  description: "Cudowny kurs o sztucznej inteligencji",

  extends: vikeReact,
} satisfies Config;
