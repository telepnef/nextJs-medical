import clsx from "clsx";
import MultiRangeSlider from "multi-range-slider-react";
import { useState } from "react";
import { Checkbox, CheckboxField } from "./catalyst/checkbox";
import { Field, Fieldset } from "./catalyst/fieldset";

const MultiRange = ({
  color = "green",
  reading,
  measure = "mmHg",
  min = 0,
  max = 100,
  handleRangeChange,
  isSingleRange = false,
}) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [isInverted, setIsInverted] = useState(false);
  const objectReadingName =
    reading === "C" ? "top" : reading === "B1" ? "middle" : "bottom";

  const handleMinMax = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);

    if (
      handleRangeChange &&
      (minValue !== e.minValue || maxValue !== e.maxValue)
    ) {
      console.log(e.minValue);
      console.log(e.maxValue);
      console.log(reading);

      handleRangeChange(
        objectReadingName,
        measure,
        e.minValue,
        e.maxValue,
        isInverted,
      );
    }
  };

  const handleInverted = () => {
    setIsInverted(!isInverted);
    handleRangeChange(
      objectReadingName,
      measure,
      minValue,
      maxValue,
      !isInverted,
    );
  };

  const colors = {
    green: {
      class: `[&_.caption_*]:!bg-primary-green_3 ${isInverted ? "[&_.bar-left]:!bg-primary-green_3 [&_.bar-right]:!bg-primary-green_3 [&_.thumb]:after:bg-primary-gray_9" : "[&_.thumb]:after:bg-primary-green_3"}`,
      hex: "#4CC2CB",
    },
    red: {
      class: `[&_.caption_*]:!bg-primary-red_2 ${isInverted ? "[&_.bar-left]:!bg-primary-red_2 [&_.bar-right]:!bg-primary-red_2 [&_.thumb]:after:bg-primary-gray_9" : "[&_.thumb]:after:bg-primary-red_2"}`,
      hex: "#C21A88",
    },
    darkRed: {
      class:
        "[&_.caption_*]:!bg-primary-primary_red [&_.thumb]:after:bg-primary-primary_red",
      hex: "#E3616E",
    },
  };

  const currentColor = colors[color];

  return (
    <Fieldset className={`${isSingleRange ? "w-full lg:w-1/3" : "!mt-6"}`}>
      <div
        className={`${isSingleRange ? "text-primary-tai_grids mb-1 text-xs font-semibold leading-6" : "mb-3 text-[21px] font-medium leading-[14px] text-black"}`}
      >
        {reading}
      </div>
      <div
        className={`${isSingleRange && "flex items-center justify-between rounded-lg border border-solid border-primary-gray_2 p-3"}`}
      >
        {!isSingleRange && (
          <div className="mt-3 text-[21px] leading-7 text-primary-dark_1">
            {minValue} - {maxValue}
          </div>
        )}
        {isSingleRange && (
          <div className="min-w-11 text-base font-semibold text-black">
            {minValue}%
          </div>
        )}
        <div
          className={`flex items-start justify-between ${isSingleRange && "w-full"}`}
        >
          <Field className={isSingleRange ? "w-full" : "w-[70%]"}>
            <MultiRangeSlider
              min={min}
              max={max}
              step={1}
              minValue={0}
              labels={[`${min} ${measure}`, `${max} ${measure}`]}
              maxValue={100}
              ruler={false}
              className={clsx(
                //base
                "!border-none !shadow-none [&_.bar-left]:!p-0 [&_.bar]:h-1 [&_.label]:!w-max [&_.label]:!text-primary-gray_8 [&_.labels]:!m-[15px_-10px_-22px_-10px]",
                // Inner styles
                "[&_.thumb-left]:before:!mx-[-5px] [&_.thumb]:before:!my-[-5px] [&_.thumb]:before:!h-[15px] [&_.thumb]:before:!w-[15px] [&_.thumb]:before:!border-none [&_.thumb]:before:!shadow-none",
                // Outter styles
                `[&_.thumb]:after:content [&_.thumb]:after [&_.thumb-left]:after:mx-[-13px] [&_.thumb-right]:after:mx-[-19px] [&_.thumb]:after:absolute [&_.thumb]:after:my-[-13px] [&_.thumb]:after:h-[30px] [&_.thumb]:after:w-[30px] [&_.thumb]:after:rounded-[50%] ${!isInverted && "[&_.thumb]:after:opacity-20"}`,
                // Bar
                "[&_.bar-inner]:!border-none [&_.bar-inner]:!shadow-none [&_.bar-left]:!border-none [&_.bar-left]:!bg-primary-gray_5 [&_.bar-left]:!shadow-none [&_.bar-right]:!border-none [&_.bar-right]:!bg-primary-gray_5 [&_.bar-right]:!shadow-none",
                // Caption
                "[&_.caption_*]:!shadow-none",
                // For single range slider
                `${isSingleRange && "!py-0 [&_.label]:!hidden"}`,
                currentColor.class,
              )}
              thumbRightColor={isInverted ? "#EDEDF3" : currentColor.hex}
              thumbLeftColor={isInverted ? "#EDEDF3" : currentColor.hex}
              barInnerColor={isInverted ? "#EDEDF3" : currentColor.hex}
              onInput={handleMinMax}
            />
          </Field>
          {!isSingleRange && (
            <CheckboxField>
              <Checkbox onChange={handleInverted} />
            </CheckboxField>
          )}
        </div>
        {isSingleRange && (
          <div
            style={{ color: currentColor.hex }}
            className="ml-2 min-w-11 text-base font-semibold"
          >
            {maxValue}%
          </div>
        )}
      </div>
    </Fieldset>
  );
};

export default MultiRange;
