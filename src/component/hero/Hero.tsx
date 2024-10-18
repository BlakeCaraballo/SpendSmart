import React from "react";
import ChartComponent from "../chart/ChartComponent";

// Generate months as labels
const generateLabels = (count) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months.slice(0, count);
};

// Generate random numbers for chart data
const generateData = (min, max, count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push((Math.random() * (max - min) + min).toFixed(2));
  }
  return data;
};

// A function to create semi-transparent colors (you can adjust the color and transparency)
const transparentize = (color: string, opacity: number = 0.5): string => {
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0"); // Ensure the alpha is 2 characters long
  return `${color}${alpha}`;
};

// Your color palette (similar to what 'Utils.CHART_COLORS' would provide)
const CHART_COLORS = {
  red: "#FF6384",
  orange: "#FF9F40",
  yellow: "#FFCE56",
  green: "#4BC0C0",
  blue: "#36A2EB",
  purple: "#9966FF",
  grey: "#C9CBCF",
};

const Hero = () => {
  const inputs = {
    min: 8,
    max: 16,
    count: 8,
    decimals: 2,
    continuity: 1,
  };

  const labels = generateLabels(inputs.count);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "D0",
        data: generateData(inputs.min, inputs.max, inputs.count),
        borderColor: CHART_COLORS.red,
        backgroundColor: transparentize(CHART_COLORS.red),
        fill: true, // Filling under the data line
      },
      {
        label: "D1",
        data: generateData(inputs.min, inputs.max, inputs.count),
        borderColor: CHART_COLORS.orange,
        hidden: true,
        backgroundColor: transparentize(CHART_COLORS.orange),
        fill: "-1", // Fill based on the previous dataset
      },
      {
        label: "D2",
        data: generateData(inputs.min, inputs.max, inputs.count),
        borderColor: CHART_COLORS.yellow,
        backgroundColor: transparentize(CHART_COLORS.yellow),
        fill: true,
      },
      {
        label: "D3",
        data: generateData(inputs.min, inputs.max, inputs.count),
        borderColor: CHART_COLORS.green,
        backgroundColor: transparentize(CHART_COLORS.green),
        fill: "true", // No filling for this dataset
      },
      {
        label: "D4",
        data: generateData(inputs.min, inputs.max, inputs.count),
        borderColor: CHART_COLORS.blue,
        backgroundColor: transparentize(CHART_COLORS.blue),
        fill: true, // Fill relative to the previous dataset
      },
      {
        label: "D5",
        data: generateData(inputs.min, inputs.max, inputs.count),
        borderColor: CHART_COLORS.purple,
        backgroundColor: transparentize(CHART_COLORS.purple),
        fill: true,
      },
      {
        label: "D6",
        data: generateData(inputs.min, inputs.max, inputs.count),
        borderColor: CHART_COLORS.grey,
        backgroundColor: transparentize(CHART_COLORS.grey),
        fill: true, // Filling under this line
      },
    ],
  };

  const config = {
    type: "radar",
    data: data,
    options: {
      plugins: {
        filler: {
          propagate: false,
        },
      },
      scales: {
        r: {
          angleLines: {
            display: true,
          },
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            display: true,
            color: "#FF6384",
            font: {
              size: 14,
              weight: "bold",
            },
          },
        },
      },
    },
  };

  return (
    <section
      id="hero"
      className="dark:bg-gradient-to-b from-gray-900 to-black py-80"
    >
      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Track Your Budget Easily
          </h1>
          <p className="text-lg text-primary mb-6">
            Get insights into your spending and manage your finances
            effortlessly.
          </p>
          <a
            href="#charts"
            className="bg-primary text-white px-6 py-2 rounded-2xl text-lg hover:bg-primary-foreground dark:bg-blue-700 dark:text-black"
          >
            View Charts
          </a>
        </div>

        {/* Render the radar chart */}
        <div className="w-full max-w-xl mx-auto h-96">
          <ChartComponent type="radar" data={data} options={config} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
