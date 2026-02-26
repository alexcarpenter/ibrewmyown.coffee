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

  emblaApi
    .on("init", addDotBtnsWithClickHandlers)
    .on("reInit", addDotBtnsWithClickHandlers)
    .on("init", toggleDotBtnsActive)
    .on("reInit", toggleDotBtnsActive)
    .on("select", toggleDotBtnsActive);

  return (): void => {
    dotsNode.innerHTML = "";
  };
};
