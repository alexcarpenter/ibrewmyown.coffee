import { type EmblaCarouselType } from "embla-carousel";

export const addDotBtnsAndClickHandlers = (
  emblaApi: EmblaCarouselType,
  dotsNode: HTMLElement,
): (() => void) => {
  let dotNodes: HTMLElement[] = [];

  let snapList: number[] = [];
  let snapCount = 0;

  let lower = 0;
  let prevLower = -1;
  let prevUpper = -1;

  const progressCache: number[] = [];

  const setDotProgress = (index: number, value: number): void => {
    if (progressCache[index] === value) return;
    progressCache[index] = value;
    dotNodes[index]?.style.setProperty("--dot-progress", String(value));
  };

  const addDotBtnsWithClickHandlers = (): void => {
    snapList = emblaApi.scrollSnapList();
    snapCount = snapList.length;

    dotsNode.innerHTML = snapList
      .map(() => '<button class="embla__dot" type="button"></button>')
      .join("");

    dotNodes = Array.from(
      dotsNode.querySelectorAll<HTMLButtonElement>(".embla__dot"),
    );

    progressCache.length = snapCount;
    progressCache.fill(-1);
  };

  const onClick = (e: Event): void => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains("embla__dot")) return;

    const index = Array.prototype.indexOf.call(dotNodes, target);
    if (index !== -1) emblaApi.scrollTo(index);
  };

  const toggleDotBtnsActive = (): void => {
    const previous = emblaApi.previousScrollSnap();
    const selected = emblaApi.selectedScrollSnap();

    dotNodes[previous]?.classList.remove("active");
    dotNodes[selected]?.classList.add("active");
  };

  const onScroll = (): void => {
    if (snapCount < 2) return;

    const progress = emblaApi.scrollProgress();

    while (lower < snapCount - 2 && progress > snapList[lower + 1]) {
      lower++;
    }
    while (lower > 0 && progress < snapList[lower]) {
      lower--;
    }

    const upper = lower + 1;

    const lowerSnap = snapList[lower];
    const upperSnap = snapList[upper];

    const t = (progress - lowerSnap) / (upperSnap - lowerSnap || 1);

    if (prevLower !== lower && prevLower !== -1) {
      setDotProgress(prevLower, 0);
    }
    if (prevUpper !== upper && prevUpper !== -1) {
      setDotProgress(prevUpper, 0);
    }

    setDotProgress(lower, 1 - t);
    setDotProgress(upper, t);

    prevLower = lower;
    prevUpper = upper;
  };

  const onSettle = (): void => {
    const selected = emblaApi.selectedScrollSnap();

    for (let i = 0; i < snapCount; i++) {
      setDotProgress(i, i === selected ? 1 : 0);
    }

    lower = selected;
    prevLower = selected;
    prevUpper = selected + 1;
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

  dotsNode.addEventListener("click", onClick);

  return (): void => {
    dotsNode.innerHTML = "";
    dotsNode.removeEventListener("click", onClick);
  };
};
