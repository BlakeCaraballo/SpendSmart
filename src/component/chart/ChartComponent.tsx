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
  RadialLinearScale,
  RadarController,
  BubbleController,
} from 'chart.js';
import { Pie, Bar, Line, Radar, Doughnut, Bubble } from 'react-chartjs-2';

// Register necessary components for different chart types
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  RadarController,
  BubbleController
);

const chartMap = {
  pie: Pie,
  bar: Bar,
  line: Line,
  radar: Radar,
  doughnut: Doughnut,
  bubble: Bubble
};

const ChartComponent = ({ type, data, options }) => {
  const ChartType = chartMap[type] || Pie; // Default to Pie if no type is provided
  return <ChartType data={data} options={options} />;
};

export default ChartComponent;