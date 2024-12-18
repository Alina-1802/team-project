import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import LayoutDefault from "layouts/LayoutDefault";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/Layout
  Layout: LayoutDefault,
  // https://vike.dev/head-tags
  title: "My Vike App",
  description: "Demo showcasing Vike",

  extends: vikeReact,
} satisfies Config;
