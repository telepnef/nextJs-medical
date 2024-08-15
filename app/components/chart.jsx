import ApexCharts from "apexcharts";
import { useEffect, useRef } from "react";
import { Subheading } from "./catalyst/heading";

const Chart = ({ reading, name, color }) => {
  const options = {
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "line",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -26,
      },
    },
    series: [
      {
        name,
        data: [30, 20, 35, 20, 30, 15, 25],
        color,
      },
    ],
    legend: {
      show: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };
  const chart = useRef(null);

  useEffect(() => {
    if (
      chart &&
      chart.current &&
      chart.current.innerHTML === "" &&
      typeof ApexCharts !== "undefined"
    ) {
      const newChart = new ApexCharts(chart.current, options);
      newChart.render();
    }
  }, []);

  return (
    <div className="mb-6 w-full max-w-full rounded-lg border border-solid border-primary-gray_1 bg-white p-4">
      <div className="mb-5">
        <Subheading
          className="mb-2 !text-[28px] !font-bold leading-[30px]"
          level={3}
        >
          {reading}
        </Subheading>
        <div className="text-base leading-6">Pressure (mmHg)</div>
      </div>
      <div className="[&_text:first-child]:translate-x-3.5" ref={chart}></div>
    </div>
  );
};

export default Chart;
