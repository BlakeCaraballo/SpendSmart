import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Dexie from 'dexie';

// Initialize Dexie.js
const db = new Dexie('budgetApp');
db.version(1).stores({
  charts: '++id, month, data'
});

const History = () => {
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      const data = await db.charts.toArray();
      setMonthlyData(data);
    };

    fetchChartData();
  }, []);

  const getChartDataForMonth = (data: any) => {
    const { income, bills, food, gas, misc, subscriptions, creditCards } = data.data; // Extract the actual form data
    return {
      labels: ['Income', 'Bills', 'Food', 'Gas', 'Misc', 'Subscriptions', 'Credit Cards'],
      datasets: [
        {
          label: `Expenses for ${data.month}`,
          data: [
            income,
            bills.reduce((total: number, bill: any) => total + Number(bill.amount), 0),
            food,
            gas,
            misc,
            subscriptions.reduce((total: number, subscription: any) => total + Number(subscription.amount), 0),
            creditCards
          ],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB', '#FFCE56', '#FF6384'],
          borderWidth: 1
        }
      ]
    };
  };

  const clearMonthData = async (month: string) => {
    const monthData = await db.charts.where('month').equals(month).toArray(); // Get all entries for the selected month
    if (monthData.length > 0) {
      await db.charts.where('month').equals(month).delete(); // Delete entries for the selected month
      setMonthlyData((prevData) => prevData.filter((data) => data.month !== month)); // Update state to remove the cleared month
    } else {
      alert(`No data found for ${month}.`);
    }
  };

  const handleClearHistory = async () => {
    const monthToClear = prompt('Enter the month to clear (e.g., January, February, etc.):');
    if (monthToClear) {
      if (['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].includes(monthToClear)) {
        clearMonthData(monthToClear);
      } else {
        alert('Invalid month entered. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Monthly Expense History</h2>
      <button onClick={handleClearHistory} className="bg-red-500 text-white p-2 mb-4">
        Clear History by Month
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {monthlyData.map((data) => (
          <div key={data.id} className="border p-4">
            <h3 className="text-xl">{data.month}</h3>
            <Bar data={getChartDataForMonth(data)} />
            <div className="mt-4">
              <h4 className="font-bold">Bills</h4>
              <ul className="list-disc pl-5">
                {data.data.bills.map((bill: any, index: number) => (
                  <li key={index}>
                    {bill.name}: ${bill.amount}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h4 className="font-bold">Subscriptions</h4>
              <ul className="list-disc pl-5">
                {data.data.subscriptions.map((subscription: any, index: number) => (
                  <li key={index}>
                    {subscription.name}: ${subscription.amount}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
