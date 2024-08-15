import clsx from "clsx";

export function DescriptionList({ className, ...props }) {
  return (
    <dl
      {...props}
      className={clsx(
        className,
        "grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,theme(spacing.80))_auto] sm:text-sm/6",
      )}
    />
  );
}

export function DescriptionTerm({ className, ...props }) {
  return (
    <dt
      {...props}
      className={clsx(
        className,
        "col-start-1 pt-2.5 text-lg font-medium leading-5 text-primary-tail_grids sm:py-2.5 dark:text-zinc-400",
      )}
    />
  );
}

export function DescriptionDetails({ className, ...props }) {
  return (
    <dd
      {...props}
      className={clsx(
        className,
        "pb-2.5 pt-1 text-lg font-semibold leading-5 text-primary-midnight sm:py-2.5",
      )}
    />
  );
}
