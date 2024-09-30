import React from 'react';
import ChartComponent from './ChartComponent';

const Charts = () => {
  // Example data for a bar chart
  const barData = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Income',
        data: [1200, 1500, 800, 1700],
        backgroundColor: '#36A2EB',
      },
      {
        label: 'Expenses',
        data: [1000, 1200, 900, 1300],
        backgroundColor: '#FF6384',
      },
    ],
  };

  // Example data for a line chart
  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Savings',
        data: [200, 500, 300, 700],
        borderColor: '#4BC0C0',
        fill: false,
      },
    ],
  };

  // Example data for a pie chart
  const pieData = {
    labels: ['Rent', 'Groceries', 'Entertainment', 'Miscellaneous'],
    datasets: [
      {
        data: [400, 300, 200, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  // Options for the charts
  const options = {
    animations:{
        tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'center', 
      },
    },
  };

  return (
<section id="charts" className="bg-white dark:bg-gray-900 py-96">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-primary mb-8">User Friendly Charts</h2>

        {/* Flex container for charts */}
        <div className="flex flex-wrap justify-center gap-8">
          {/* Bar Chart */}
          <div className="w-full sm:w-1/3 max-w-xs">
            <h3 className="text-lg font-bold text-center mb-4">Income vs Expenses</h3>
            <div className="h-48">
              <ChartComponent type="bar" data={barData} options={options} />
            </div>
          </div>

          {/* Line Chart */}
          <div className="w-full sm:w-1/3 max-w-xs">
            <h3 className="text-lg font-bold text-center mb-4">Savings Over Time</h3>
            <div className="h-48">
              <ChartComponent type="line" data={lineData} options={options} />
            </div>
          </div>

          {/* Pie Chart */}
          <div className="w-full sm:w-1/3 max-w-xs">
            <h3 className="text-lg font-bold text-center mb-4">Expenses Breakdown</h3>
            <div className="h-48">
              <ChartComponent type="pie" data={pieData} options={options} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Charts;