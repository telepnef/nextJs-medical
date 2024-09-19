"use client";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { useRef } from "react";

const Chart = ({ reading, values, valueName, filterHours }) => {
  const dateToFilter = new Date();
  dateToFilter.setTime(dateToFilter.getTime() - filterHours * 60 * 60 * 1000);

  const filteredValues = values.filter((value) => {
    const valueDate = new Date(value[valueName].date);
    if (valueDate.getTime() > dateToFilter.getTime()) {
      return value;
    }
  });

  const chartComponentRef = useRef();

  const options = {
    title: {
      text: reading,
      align: "left",
      x: 40,
      y: 30,
      margin: 25,
      style: {
        fontSize: "1.75rem",
      },
    },

    subtitle: {
      text: "Pressure (mmHg)",
      align: "left",
      x: 40,
      y: 55,
      style: {
        fontSize: "1rem",
      },
    },

    yAxis: {
      title: {
        enabled: false,
      },
      lineColor: "#A0ACB7",
      lineWidth: 1,
      gridLineWidth: 0,
    },

    xAxis: {
      categories: filteredValues.map((value) => {
        const date = value[valueName].date;

        return date;
      }),
      title: {
        enabled: false,
      },
      lineColor: "#A0ACB7",
      gridLineColor: "#E7E7E7",
      gridLineDashStyle: "Solid",
      gridLineWidth: 1,
    },

    legend: {
      enabled: false,
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    color: "#2CA8B1",
    chart: {
      borderColor: "#E6E6E6",
      borderWidth: 1,
      borderRadius: 6,
      height: 450,
    },
    series: [
      {
        data: filteredValues.map((value) => ({
          y: value[valueName].value === 'Low' ? 0 : value[valueName].value,
          color: "#2CA8B1",
        })),
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
        },
      ],
    },

    tooltip: {
      formatter: function (tooltip) {
        console.log(this);
        const timestamp = new Date(this.x);
        const timestampString = `${timestamp.getDate()} ${timestamp.toLocaleString("default", { month: "short" })} ${timestamp.getFullYear()} ${timestamp.getHours()}:${timestamp.getMinutes()}`;
        console.log(timestamp.getDate());

        return `<div class="bg-white border-primary-green_6 text-primary-dark_2 min-w-60 rounded-lg border-2 border-solid px-4 py-3">
                  <p class="mb-1 leading-4">
                    <strong class="text-[10px]">timestamp</strong>
                    <br />
                    <span class="text-xs">${timestampString}</span>
                  </p>
                  <p class="leading-4">
                    <strong class="text-[10px]">pressure recorded</strong>
                    <br />
                    <strong class="text-lg">C - ${this.y}</strong>
                    <span class="text-[20px]">mmHg</span>
                  </p>
                </div>`;
      },
      useHTML: true,
      shadow: false,
      backgroundColor: "transparent",
    },
  };

  return (
    <div className="relative mb-6">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
      />
    </div>
  );
};

export default Chart;
