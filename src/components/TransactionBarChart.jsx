import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// eslint-disable-next-line react/prop-types
const TransactionBarChart = ({ selectedMonth }) => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const fetchBarData = async () => {
      try {
        const response = await axios.get(
          "https://roxiler-systems-assignment-backend-r5oa.onrender.com/api/transactions/bar-chart",
          {
            params: { month: selectedMonth },
            timeout: 10000,
          }
        );
        if (Array.isArray(response.data)) {
          setBarData(response.data);
        } else {
          setBarData([]);
        }
      } catch (error) {
        console.error("Error fetching bar data:", error);
        setBarData([]);
      }
    };
    fetchBarData();
  }, [selectedMonth]);

  const data = {
    labels: Array.isArray(barData) ? barData.map((item) => item.range) : [],
    datasets: [
      {
        label: "Number of Items",
        data: Array.isArray(barData) ? barData.map((item) => item.count) : [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="w-full max-w-4xl border border-black  rounded-lg p-4">
      <Bar data={data} />
    </div>
  );
};

export default TransactionBarChart;
