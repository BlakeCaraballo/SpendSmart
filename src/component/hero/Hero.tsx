import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

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

  return (
    <section id="hero" className="bg-gray-100 dark:bg-background py-20">
      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-primary mb-4">Track Your Budget Easily</h1>
          <p className="text-lg text-secondary mb-6">
            Get insights into your spending and manage your finances effortlessly.
          </p>
          <a href="#charts" className="bg-primary text-white px-6 py-2 rounded-md text-lg hover:bg-primary-foreground">
            View Charts
          </a>
        </div>

        <div className="md:w-1/2">
          <Pie data={data} />
        </div>
      </div>
    </section>
  );
};

export default Hero;