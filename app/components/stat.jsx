import clsx from "clsx";
import { Badge } from "./catalyst/badge";
import { StatDown, StatUp } from "./svg-icons";

export function Stat({ title, value, change, className, threshold = null }) {
  const changeToNumeric = parseInt(change.replace("%", ""));
  let isOutsideOfThreshhold = false;

  if (threshold !== null) {
    isOutsideOfThreshhold =
      Math.abs(changeToNumeric) < threshold.minValue ||
      Math.abs(changeToNumeric) > threshold.maxValue;
  }

  return (
    <div className={clsx(className, "flex flex-col items-center")}>
      <div className="text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="text-nowrap text-base font-semibold">
        {value} <span className="text-xs font-light">mmHg</span>
      </div>
      <div className="mt-1 text-xs">
        <Badge
          className="!gap-0.5"
          color={isOutsideOfThreshhold ? "gray" : "pink"}
        >
          {change}

          {change.startsWith("-") ? (
            <>
              <StatDown
                className={
                  isOutsideOfThreshhold
                    ? "[&_path]:fill-primary-tail_grids"
                    : ""
                }
              />
            </>
          ) : (
            <>
              <StatUp
                className={
                  isOutsideOfThreshhold
                    ? "[&_path]:fill-primary-tail_grids"
                    : ""
                }
              />
            </>
          )}
        </Badge>{" "}
      </div>
    </div>
  );
}
