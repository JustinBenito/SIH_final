import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


import Graph from "./Data";

function BarChart() {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (chart) {
      chart.destroy();
    }

    const ctx = document.getElementById("myChart").getContext("2d");
    const newChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Python", "C++", "Java", "React", "Ds"],
        datasets: [
          {
            label: "Progess Bar",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255,255,255)",
              "rgba(255,255,255)",
              "rgba(255,255,255)",
              "rgba(255,255,255)",
              "rgba(255,255,255)",
              "rgba(255,255,255)",
            ],
            borderColor: [
              "rgba(255,255,255,1)",
              "rgba(255,255,255, 1)",
              "rgba(255,255,255,1)",
              "rgba(255,255,255, 1)",
              "rgba(255,255,255, 1)",
              "rgba(255,255,255,1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: "white", // Set y-axis label color to white
            },
          },
          x: {
            ticks: {
              color: "white", // Set x-axis label color to white
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "white", // Set legend label color to white
            },
          },
        },
        layout: {
          padding: {
            top: 20,
          },
        },
        elements: {
          bar: {
            backgroundColor: "rgba(255, 255, 255, 0.2)", // Set bar color to semi-transparent white
            borderColor: "rgba(255, 255, 255, 0.7)", // Set border color of bars to semi-transparent white
            borderWidth: 1,
          },
        },
      },
    });

    setChart(newChart);
  }, []);

  const canvasStyle = {
    backgroundColor: "black",
    color: "white",
    width: "500px",
    height: "300px",
  };

  const cpbstyle = {
    root: {},
    path: {
      stroke: '#00df9a',
      transition: ' 0.5s ease 0s',
      transformOrigin: 'center center',
    },
    trail: {
      stroke: '#000000',
      transformOrigin: 'center center',
    },
    text: {
      fill: '#FFFFFF',
      fontSize: '16px',
      fontWeight: 600,
    },
    background: {
      fill: '#FFFFFF',
    },
    // Set the width and height to make the circular progress bars smaller
    width: '40px', // Adjust this value to make the circular progress bars smaller
    height: '40px', // Adjust this value to make the circular progress bars smaller
  };

  return (
    <div className="flex bg-zinc-900">
      <div className="flex w-1/2 border-r border-dashed border-white">
        <div className="flex flex-col space-y-5 space-x-5 p-5">
          <div className="flex" style={canvasStyle}>
            <canvas id="myChart"></canvas>
          </div>
          <div className="flex items-center space-x-2 text-white text-2xl">
            <p>Python</p>
            <CircularProgressbar value={84} text="84" styles={cpbstyle} />
          </div>
          <div className="flex items-center space-x-2 text-white text-2xl">
            <p>Java</p>
            <CircularProgressbar value={44} text="44" styles={cpbstyle} />
          </div>
          <div className="flex items-center space-x-2 text-white text-2xl">
            <p>C++</p>
            <CircularProgressbar value={99} text="99" styles={cpbstyle} />
          </div>
        </div>
      </div>
      <div className="flex w-1/2">
        <Graph />
      </div>
    </div>
  );
}

export default BarChart;