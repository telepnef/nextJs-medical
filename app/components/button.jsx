import clsx from "clsx";

const Button = ({ children, className, ...props }) => (
  <button
    className={clsx(
      className,
      "flex items-center rounded bg-primary-primary_green px-8 py-2.5 text-sm font-semibold leading-6 text-white",
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
