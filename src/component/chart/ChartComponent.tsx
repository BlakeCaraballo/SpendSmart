import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';

// Register necessary components for different chart types
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const chartMap = {
  pie: Pie,
  bar: Bar,
  line: Line,
};

const ChartComponent = ({ type, data, options }) => {
  const ChartType = chartMap[type] || Pie; // Default to Pie if no type is provided
  return <ChartType data={data} options={options} />;
};

export default ChartComponent;