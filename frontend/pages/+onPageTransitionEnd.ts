import type { OnPageTransitionEndAsync } from "vike/types";

export const onPageTransitionEnd: OnPageTransitionEndAsync = async () => {
  setTimeout(() => {
    document.querySelector("body")?.classList.remove("page-is-transitioning");
  }, 200)
};
