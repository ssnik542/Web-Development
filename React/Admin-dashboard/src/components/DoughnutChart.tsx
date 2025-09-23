import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  labels?: string[];
  dataa: number[];
  bgColor: string[];
  cutout?: number | string;
  legend?: boolean;
  offset?: number[];
}

export default function DoughnutChart({
  labels,
  dataa,
  bgColor,
  cutout,
  legend = true,
  offset,
}: DoughnutChartProps) {
  const option: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        display: legend,
        position: "bottom" as const,
        labels: {
          padding: 40,
        },
      },
    },
    cutout,
  };
  const data: ChartData<"doughnut", number[], string> = {
    labels,
    datasets: [
      {
        data: dataa,
        backgroundColor: bgColor,
        borderWidth: 0,
        offset,
      },
    ],
  };

  return <Doughnut data={data} options={option} />;
}
