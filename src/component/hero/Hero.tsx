import React from 'react';
import ChartComponent from '../chart/ChartComponent';


const Hero = () => {
  // Sample data for the pie chart
  const data = {
    labels: ['Rent', 'Groceries', 'Entertainment', 'Miscellaneous'],
    datasets: [
      {
        label: 'Expenses',
        data: [400, 300, 200, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

    // Options for the pie chart
    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      };

  return (
    <section id="hero" className="bg-gray-100 dark:bg-gradient-to-b from-gray-900 to-black py-80">
      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-primary mb-4">Track Your Budget Easily</h1>
          <p className="text-lg text-secondary mb-6">
            Get insights into your spending and manage your finances effortlessly.
          </p>
          <a href="#charts" className="bg-primary text-white px-6 py-2 rounded-md text-lg hover:bg-primary-foreground dark:bg-blue-700 dark:text-black">
            View Charts
          </a>
        </div>

       {/* Render the pie chart */}
       <div className="w-full max-w-xl mx-auto h-96"> {/* Adjust the height here */}
          <ChartComponent type="pie" data={data} options={options} />
        </div>
      </div>
    </section>
  );
};

export default Hero;