import clsx from "clsx";
import { Badge } from "./catalyst/badge";
import { StatDown, StatUp } from "./svg-icons";
export function Stat({ title, value, change, className }) {
  return (
    <div className={clsx(className, "flex flex-col items-center")}>
      <div className="text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="text-base font-semibold">
        {value} <span className="text-xs font-light">mmHg</span>
      </div>
      <div className="mt-1 text-xs">
        <Badge
          className="!gap-0.5"
          color={change.startsWith("-") ? "pink" : "lime"}
        >
          {change}

          {change.startsWith("-") ? (
            <>
              <StatDown />
            </>
          ) : (
            <>
              <StatUp />
            </>
          )}
        </Badge>{" "}
      </div>
    </div>
  );
}
