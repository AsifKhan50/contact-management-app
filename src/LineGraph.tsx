import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import Chart from 'chart.js/auto';
import { useQuery } from 'react-query';

Chart.register(...registerables);

interface Data {
  cases: {
    [key: string]: number;
  };
}

const LineGraph: React.FC = () => {
  const { data, isLoading, error } = useQuery<Data>('graphData', async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  const labels = Object.keys(data.cases).map((date) => format(new Date(date), 'MMM d'));

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Cases',
        fill: false,
        borderColor: '#007bff',
        data: Object.values(data.cases),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: {
            family: "'Open Sans', sans-serif",
            weight: 'bold',
          },
          color: 'gray',
        },
        grid: {
          display: false,
        },
      },
      y: {
        type: 'linear',
        min: 0,
        max: 800_000_000,
        ticks: {
          font: {
            family: "'Open Sans', sans-serif",
            weight: 'bold',
          },
          color: 'gray',
          stepSize: 2_000_000,
          callback: (value: number) => {
            if (value >= 100_000_000) {
              return `${value / 1_000_000}M`;
            } else if (value >= 1_000_000) {
              return `${value / 1_000_000}M`;
            } else if (value >= 1_000) {
              return `${value / 1_000}K`;
            }
            return value.toString();
          },
        },
        grid: {
          borderDash: [2],
          borderColor: 'gray',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            family: "'Open Sans', sans-serif",
            weight: 'bold',
          },
          color: 'gray',
        },
      },
    },
  };

  return (
    <div className="border-2 border-gray-100 rounded-md shadow-lg overflow-hidden" style={{ height: '75vh' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineGraph;
