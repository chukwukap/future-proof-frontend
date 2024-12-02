"use client";

import { TrendingUp } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

import {
	ChartConfig,
	ChartContainer,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Fragment } from "react";

export const description = "An area chart with gradient fill";

const chartData = [
	{ month: "January", desktop: 186 },
	{ month: "February", desktop: 305 },
	{ month: "March", desktop: 237 },
	{ month: "April", desktop: 73 },
	{ month: "May", desktop: 209 },
	{ month: "June", desktop: 214 },
];

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
	mobile: {
		label: "Mobile",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

export function AreaGradient() {
	const data = {
		labels: chartData.map(item => item.month),
		datasets: [
			{
				fill: true,
				label: 'Desktop',
				data: chartData.map(item => item.desktop),
				borderColor: chartConfig.desktop.color,
				backgroundColor: `${chartConfig.desktop.color}33`, // Adding transparency
				tension: 0.4,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
			},
			y: {
				grid: {
					display: false,
				},
			},
		},
		elements: {
			point: {
				radius: 0,
			},
		},
	};

	return (
		<Fragment>
			<ChartContainer
				className='w-full h-[17rem] mt-4'
				config={chartConfig}>
				<div className="absolute top-0 left-0 p-4 flex items-center gap-2">
					<TrendingUp className="w-4 h-4" />
					<span className="text-sm font-medium">Desktop Traffic</span>
				</div>
				<Line options={options} data={data} />
			</ChartContainer>

			<div className='flex w-full items-start gap-2 text-sm mt-6'>
				<div className='grid gap-2'>
					<div className='flex items-center gap-2 font-medium leading-none'>
						Trending up by 5.2% this month{" "}
						<TrendingUp className='h-4 w-4' />
					</div>
					<div className='flex items-center gap-2 leading-none text-muted-foreground'>
						January - June 2024
					</div>
				</div>
			</div>
		</Fragment>
	);
}
