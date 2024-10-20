import React, { useState } from "react";
import ChartComponent from "./ChartComponent";

const ChartsCarousel = () => {
  const [currDeg, setCurrDeg] = useState(0);

  // Example chart data
  const barData = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Income",
        data: [1200, 1500, 800, 1700],
        backgroundColor: "#36A2EB",
      },
      {
        label: "Expenses",
        data: [1000, 1200, 900, 1300],
        backgroundColor: "#FF6384",
      },
    ],
  };

  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Savings",
        data: [200, 500, 300, 700],
        borderColor: "#4BC0C0",
        fill: false,
      },
    ],
  };

  const pieData = {
    labels: ["Rent", "Groceries", "Entertainment", "Miscellaneous"],
    datasets: [
      {
        data: [400, 300, 200, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const radarData = {
    labels: [
      "Rent",
      "Groceries",
      "Entertainment",
      "Utilities",
      "Transportation",
    ],
    datasets: [
      {
        label: "My Data",
        data: [65, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: "My Second Dataset",
        data: [28, 48, 40, 19, 96, 27, 100],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
    ],
  };

  const doughnutData = {
    labels: ["Bills", "Entertainment", "Food", "Transport"],
    datasets: [
      {
        data: [250, 150, 300, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const bubbleData = {
    labels: ["Bills", "Entertainment"],
    datasets: [
      {
        label: "First Dataset",
        data: [
          {
            x: 20,
            y: 30,
            r: 15,
          },
          {
            x: 40,
            y: 10,
            r: 10,
          },
        ],
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  const charts = [
    { type: "bar", data: barData, label: "Income vs Expenses" },
    { type: "line", data: lineData, label: "Savings Over Time" },
    { type: "pie", data: pieData, label: "Expenses Breakdown" },
    { type: "radar", data: radarData, label: "Expense Distribution" },
    { type: "doughnut", data: doughnutData, label: "Expense Categories" },
    { type: "bubble", data: bubbleData, label: "Expense Categories" },
  ];

  const anglePerItem = 360 / charts.length;

  // Rotation logic
  const rotate = (direction: "next" | "prev") => {
    setCurrDeg((prevDeg) =>
      direction === "next" ? prevDeg - anglePerItem : prevDeg + anglePerItem
    );
  };

  return (
    <section
      id="charts"
      className="relative dark:bg-gradient-to-b from-black to-gray-900 py-96"
    >
      <div className="container mx-auto px-6 relative flex justify-center  py-12">
        <div
          className="carousel w-[300px] h-[300px] absolute transition-transform duration-1000 "
          style={{
            transform: `rotateY(${currDeg}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {charts.map((chart, index) => (
            <div
              key={index}
              className="item absolute w-[300px] h-[300px]  text-white flex items-center justify-center rounded-3xl p-4"
              style={{
                transform: `rotateY(${index * 60}deg) translateZ(300px)`,
                backgroundColor: "var(--color-bg)",
              }}
            >
              <ChartComponent
                type={chart.type}
                data={chart.data}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                }}
              />
            </div>
          ))}
        </div>

        {/* Next and Prev buttons */}
        <div
          className="next absolute top-[150] transform -translate-y-[-200%] right-5 bg-black p-4 rounded-2xl cursor-pointer  text-white"
          onClick={() => rotate("next")}
        >
          Next
        </div>
        <div
          className="prev absolute top-[150] transform -translate-y-[-200%] left-5 bg-black p-4 rounded-2xl cursor-pointer  text-white"
          onClick={() => rotate("prev")}
        >
          Prev
        </div>
      </div>
    </section>
  );
};

export default ChartsCarousel;
