import * as Headless from "@headlessui/react";
import clsx from "clsx";
import { forwardRef } from "react";

export const Select = forwardRef(function Select(
  { className, multiple, small, ...props },
  ref,
) {
  return (
    <span
      data-slot="control"
      className={clsx([
        className,
        // Basic layout
        "group relative block w-full",
        // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
        "before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-white before:shadow",
        // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
        "dark:before:hidden",
        // Focus ring
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent after:has-[[data-focus]]:ring-2 after:has-[[data-focus]]:ring-blue-500",
        // Disabled state
        "has-[[data-disabled]]:opacity-50 before:has-[[data-disabled]]:bg-zinc-950/5 before:has-[[data-disabled]]:shadow-none",
        // Typography
        "text-primary-midnight text-base font-semibold placeholder:font-normal placeholder:text-zinc-500 dark:text-white dark:*:text-white",
      ])}
    >
      <Headless.Select
        ref={ref}
        multiple={multiple}
        {...props}
        className={clsx([
          // Basic layout
          `relative block w-full appearance-none rounded ${small ? "py-[calc(theme(spacing[2])-1px)]" : "py-[calc(theme(spacing[2.5])-0.5px)]"} `,
          // Horizontal padding
          multiple
            ? "px-[calc(theme(spacing[3.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)]"
            : "pl-[calc(theme(spacing[3.5])+1px)] sm:pr-[calc(theme(spacing.9)-1px)]",
          // Options (multi-select)
          "[&_optgroup]:font-semibold",
          // Border
          "border-primary-gray_3 border data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20",
          // Background color
          "bg-transparent dark:bg-white/5 dark:*:bg-zinc-800",
          // Hide default focus styles
          "focus:outline-none",
          // Invalid state
          "data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500 data-[invalid]:dark:border-red-600 data-[invalid]:data-[hover]:dark:border-red-600",
          // Disabled state
          "data-[disabled]:border-zinc-950/20 data-[disabled]:opacity-100 dark:data-[hover]:data-[disabled]:border-white/15 data-[disabled]:dark:border-white/15 data-[disabled]:dark:bg-white/[2.5%]",
        ])}
      />
      {!multiple && (
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5">
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.244078 0.410582C0.569515 0.0851447 1.09715 0.0851447 1.42259 0.410582L5.83333 4.82133L10.2441 0.410582C10.5695 0.0851447 11.0972 0.0851447 11.4226 0.410582C11.748 0.736019 11.748 1.26366 11.4226 1.58909L6.42259 6.58909C6.09715 6.91453 5.56952 6.91453 5.24408 6.58909L0.244078 1.58909C-0.0813593 1.26366 -0.0813593 0.736019 0.244078 0.410582Z"
              fill="#637381"
            />
          </svg>
        </span>
      )}
    </span>
  );
});
