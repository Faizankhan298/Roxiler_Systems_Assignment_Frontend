import { useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const TransactionStatistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      const response = await axios.get(
        "https://roxiler-systems-assignment-backend-r5oa.onrender.com/api/transactions/statistics",
        {
          params: { month: selectedMonth },
        }
      );
      setStatistics(response.data);
    };
    fetchStatistics();
  }, [selectedMonth]);

  return (
    <div className="max-w-4xl bg-yellow-200 rounded-lg p-4 border border-black">
      <h1 className="text-lg">Statistics - {`${selectedMonth}`}</h1>
      <hr className="bg-stone-600 h-1" />
      <div className="mt-2">
        <h1>Total Sale Amount: {statistics.totalSaleAmount}</h1>

        <h1>Total Sold Items: {statistics.totalSoldItems}</h1>
        <h1>Total Not Sold Items: {statistics.totalNotSoldItems}</h1>
      </div>
    </div>
  );
};

export default TransactionStatistics;
