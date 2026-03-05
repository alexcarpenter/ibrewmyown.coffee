import { type EmblaCarouselType } from "embla-carousel";

export const addDotBtnsAndClickHandlers = (
  emblaApi: EmblaCarouselType,
  dotsNode: HTMLElement,
): (() => void) => {
  let dotNodes: HTMLElement[] = [];

  const addDotBtnsWithClickHandlers = (): void => {
    dotsNode.innerHTML = emblaApi
      .scrollSnapList()
      .map(() => '<button class="embla__dot" type="button"></button>')
      .join("");

    const scrollTo = (index: number): void => {
      emblaApi.scrollTo(index);
    };

    dotNodes = Array.from(dotsNode.querySelectorAll(".embla__dot"));
    dotNodes.forEach((dotNode, index) => {
      dotNode.addEventListener("click", () => scrollTo(index), false);
    });
  };

  const toggleDotBtnsActive = (): void => {
    const previous = emblaApi.previousScrollSnap();
    const selected = emblaApi.selectedScrollSnap();
    dotNodes[previous].classList.remove("active");
    dotNodes[selected].classList.add("active");
  };

  const setDotProgress = (index: number, value: number): void => {
    dotNodes[index]?.style.setProperty("--dot-progress", String(value));
  };

  const onScroll = (): void => {
    const snapList = emblaApi.scrollSnapList();
    const progress = emblaApi.scrollProgress();

    // Find the two snaps that bracket the current progress
    let lower = 0;
    for (let i = 0; i < snapList.length - 1; i++) {
      if (progress >= snapList[i] && progress <= snapList[i + 1]) {
        lower = i;
        break;
      }
      // Handle over-scroll at the ends
      if (progress < snapList[0]) { lower = 0; break; }
      if (progress > snapList[snapList.length - 1]) { lower = snapList.length - 2; break; }
      lower = i;
    }
    const upper = lower + 1;

    const range = snapList[upper] - snapList[lower];
    const t = range === 0 ? 0 : Math.min(1, Math.max(0, (progress - snapList[lower]) / range));

    dotNodes.forEach((_, i) => {
      if (i === lower) setDotProgress(i, 1 - t);
      else if (i === upper) setDotProgress(i, t);
      else setDotProgress(i, 0);
    });
  };

  const onSettle = (): void => {
    const selected = emblaApi.selectedScrollSnap();
    dotNodes.forEach((_, i) => setDotProgress(i, i === selected ? 1 : 0));
  };

  emblaApi
    .on("init", addDotBtnsWithClickHandlers)
    .on("reInit", addDotBtnsWithClickHandlers)
    .on("init", toggleDotBtnsActive)
    .on("reInit", toggleDotBtnsActive)
    .on("init", onSettle)
    .on("reInit", onSettle)
    .on("select", toggleDotBtnsActive)
    .on("scroll", onScroll)
    .on("settle", onSettle);

  return (): void => {
    dotsNode.innerHTML = "";
  };
};
