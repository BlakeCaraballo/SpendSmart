import React from 'react';
import { Chart, Bar } from 'react-chartjs-2';

const UserChart = ({ data }: { data: any }) => {
  const chartData = {
    labels: ['Income', 'Bills', 'Food', 'Gas', 'Misc', 'Subscriptions', 'Credit Cards'],
    datasets: [
      {
        label: 'Expenses Breakdown',
        data: [
          data.income,
          data.bills.reduce((total: number, bill: any) => total + Number(bill.amount), 0),
          data.food,
          data.gas,
          data.misc,
          data.subscriptions.reduce((total: number, subscription: any) => total + Number(subscription.amount), 0),
          data.creditCards
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB', '#FFCE56', '#FF6384'],
        borderWidth: 1
      }
    ]
  };

  return <Bar data={chartData} />;
};

export default UserChart;