import React, { useState } from "react";
import { Pie, Bar, Line, Radar } from "react-chartjs-2";

// Define available chart types
const chartMap = {
  pie: Pie,
  bar: Bar,
  line: Line,
  radar: Radar,
};

const UserChart = ({ data }: { data: any }) => {
  const [chartType, setChartType] = useState<keyof typeof chartMap>("bar");

  const chartData = {
    labels: [
      "Income",
      "Bills",
      "Food",
      "Gas",
      "Misc",
      "Subscriptions",
      "Credit Cards",
    ],
    datasets: [
      {
        label: "Expenses Breakdown",
        data: [
          data.income,
          data.bills.reduce(
            (total: number, bill: any) => total + Number(bill.amount),
            0
          ),
          data.food,
          data.gas,
          data.misc,
          data.subscriptions.reduce(
            (total: number, subscription: any) =>
              total + Number(subscription.amount),
            0
          ),
          data.creditCards,
        ],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
        ],
        borderWidth: 1,
      },
    ],
  };

  const ChartComponent = chartMap[chartType];

  return (
    <div>
      <select
        className="dark:bg-black"
        onChange={(e) => setChartType(e.target.value as keyof typeof chartMap)}
        value={chartType}
      >
        <option value="bar">Bar</option>
        <option value="pie">Pie</option>
        <option value="line">Line</option>
        <option value="radar">Radar</option>
      </select>
      <div
        className="mx-auto"
        style={{
          width: "55%", // 50% of the parent width
          height: "55%", // 50% of the parent height
          paddingBottom: "500px", // Padding at the bottom of the chart
          paddingTop: "200px",
        }}
      >
        <ChartComponent data={chartData} />
      </div>
    </div>
  );
};

export default UserChart;
