import React, { useState, useEffect } from "react";
import { Bar, Pie, Line, Radar } from "react-chartjs-2";
import Dexie from "dexie";

const chartMap = {
  bar: Bar,
  pie: Pie,
  line: Line,
  radar: Radar,
};

// Initialize Dexie.js
const db = new Dexie("budgetApp");
db.version(1).stores({
  charts: "++id, month, data",
});

const History = () => {
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [chartTypes, setChartTypes] = useState<{
    [month: string]: keyof typeof chartMap;
  }>({});

  useEffect(() => {
    const fetchChartData = async () => {
      const data = await db.charts.toArray();
      setMonthlyData(data);
    };

    fetchChartData();
  }, []);

  const getChartDataForMonth = (data: any) => {
    const { income, bills, food, gas, misc, subscriptions, creditCards } =
      data.data;
    return {
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
          label: `Expenses for ${data.month}`,
          data: [
            income,
            bills.reduce(
              (total: number, bill: any) => total + Number(bill.amount),
              0
            ),
            food,
            gas,
            misc,
            subscriptions.reduce(
              (total: number, subscription: any) =>
                total + Number(subscription.amount),
              0
            ),
            creditCards,
          ],
          backgroundColor: [
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
  };

  const handleChartTypeChange = (
    month: string,
    type: keyof typeof chartMap
  ) => {
    setChartTypes((prevTypes) => ({ ...prevTypes, [month]: type }));
  };

  return (
    <section id="history">
      <div>
        <h2>Monthly Expense History</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {monthlyData.map((data) => {
            const ChartComponent = chartMap[chartTypes[data.month] || "bar"];

            return (
              <div key={data.id} className="border p-4 ">
                <h3>{data.month}</h3>
                <select
                  className="dark: bg-black"
                  onChange={(e) =>
                    handleChartTypeChange(
                      data.month,
                      e.target.value as keyof typeof chartMap
                    )
                  }
                  value={chartTypes[data.month] || "bar"}
                >
                  <option value="bar">Bar</option>
                  <option value="pie">Pie</option>
                  <option value="line">Line</option>
                  <option value="radar">Radar</option>
                </select>
                <ChartComponent data={getChartDataForMonth(data)} />
                {/* Flexbox layout for Bills and Subscriptions on the left */}
                <div className="flex justify-between items-start mt-4">
                  <div>
                    <h4 className="font-bold">Bills</h4>
                    <ul className="pl-5 list-none">
                      {data.data.bills.map((bill: any, index: number) => (
                        <li key={index}>
                          {bill.name}: ${bill.amount}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <h4 className="font-bold">Subscriptions</h4>
                      <ul className="list-none pl-5">
                        {data.data.subscriptions.map(
                          (subscription: any, index: number) => (
                            <li key={index}>
                              {subscription.name}: ${subscription.amount}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default History;
