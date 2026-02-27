"use client";
import * as React from "react";
import { Tooltip } from "@base-ui/react/tooltip";
import { useMemo } from "react";

export function ProductGroup({ products }: { products: any[] }) {
  const TooltipHandle = React.useMemo(
    () => Tooltip.createHandle<React.ComponentType>(),
    [],
  );

  return (
    <Tooltip.Provider>
      <div className="mt-5 grid grid-cols-5 gap-4">
        {products.map((product, index) => {
          const Payload = useMemo(
            () => () => <span>{product.title}</span>,
            [product.title],
          );
          return (
            <Tooltip.Trigger
              key={index}
              className="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-white"
              handle={TooltipHandle}
              payload={Payload}
              render={
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              closeDelay={100}
            >
              <img src={product.img} alt={product.title} />
            </Tooltip.Trigger>
          );
        })}
      </div>

      <Tooltip.Root handle={TooltipHandle}>
        {({ payload: Payload }) => (
          <Tooltip.Portal>
            <Tooltip.Positioner
              sideOffset={12}
              className="h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom,transform] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] data-instant:transition-none"
            >
              <Tooltip.Popup className="relative h-(--popup-height,auto) w-(--popup-width,auto) max-w-[500px] origin-(--transform-origin) rounded-md bg-black/10 text-sm font-medium backdrop-blur-sm transition-[width,height,opacity,scale] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:scale-90 data-ending-style:opacity-0 data-instant:transition-none data-starting-style:scale-90 data-starting-style:opacity-0">
                <Tooltip.Arrow className="flex transition-[left] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] data-instant:transition-none data-[side=bottom]:-top-2 data-[side=bottom]:rotate-0 data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:-bottom-2 data-[side=top]:rotate-180">
                  <div className="rotate-180 border-t-[8px] border-r-[8px] border-l-[8px] border-t-black/10 border-r-transparent border-l-transparent" />
                </Tooltip.Arrow>

                <Tooltip.Viewport className="relative h-full w-full overflow-clip px-[var(--viewport-inline-padding)] py-1 [--viewport-inline-padding:0.5rem] [&_[data-current]]:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding))] [&_[data-current]]:translate-x-0 [&_[data-current]]:opacity-100 [&_[data-current]]:transition-[translate,opacity] [&_[data-current]]:duration-[350ms,175ms] [&_[data-current]]:ease-[cubic-bezier(0.22,1,0.36,1)] data-[activation-direction~='left']:[&_[data-current][data-starting-style]]:-translate-x-1/2 data-[activation-direction~='left']:[&_[data-current][data-starting-style]]:opacity-0 data-[activation-direction~='right']:[&_[data-current][data-starting-style]]:translate-x-1/2 data-[activation-direction~='right']:[&_[data-current][data-starting-style]]:opacity-0 [&_[data-previous]]:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding))] [&_[data-previous]]:translate-x-0 [&_[data-previous]]:opacity-100 [&_[data-previous]]:transition-[translate,opacity] [&_[data-previous]]:duration-[350ms,175ms] [&_[data-previous]]:ease-[cubic-bezier(0.22,1,0.36,1)] data-[activation-direction~='left']:[&_[data-previous][data-ending-style]]:translate-x-1/2 data-[activation-direction~='left']:[&_[data-previous][data-ending-style]]:opacity-0 data-[activation-direction~='right']:[&_[data-previous][data-ending-style]]:-translate-x-1/2 data-[activation-direction~='right']:[&_[data-previous][data-ending-style]]:opacity-0 [[data-instant]_&_[data-current]]:transition-none [[data-instant]_&_[data-previous]]:transition-none">
                  {Payload !== undefined && <Payload />}
                </Tooltip.Viewport>
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        )}
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
