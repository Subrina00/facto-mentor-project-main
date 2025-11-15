import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function BarChart() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Destroy old chart if exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
          {
            label: "Amount ($)",
            data: [1700, 1000, 1200, 1500, 2450, 1600, 1600],
            backgroundColor: [
              "#E0F0E5",
              "#E0F0E5",
              "#E0F0E5",
              "#E0F0E5",
              "#E0F0E5",
              "#E0F0E5",
              "#E0F0E5",
            ],
            borderRadius: 1,
            hoverBackgroundColor: "#0F4E23",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { display: false },
          x: { grid: { display: false } },
        },
        plugins: {
          legend: { display: false },
        },
      },
    });

    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, []);

  return (
    <div className="w-full">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
