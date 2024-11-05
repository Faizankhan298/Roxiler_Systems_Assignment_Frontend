import { useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const TransactionTable = ({ selectedMonth, searchTerm }) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (searchTerm) {
          setPage(1);
        }
        const response = await axios.get(
          "https://roxiler-systems-assignment-backend-r5oa.onrender.com/api/transactions/list",
          {
            // eslint-disable-next-line react/prop-types
            params: { month: selectedMonth, search: searchTerm?.trim(), page },
            timeout: 10000,
          }
        );
        if (Array.isArray(response.data)) {
          setTransactions(response.data);
        } else {
          setTransactions([]);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTransactions([]);
      }
    };

    fetchTransactions();
  }, [selectedMonth, searchTerm, page]);

  return (
    <div className="w-full max-w-6xl bg-yellow-200 rounded-lg overflow-hidden pb-2 border border-black ">
      <table className="w-full border-collapse ">
        <thead>
          <tr className="bg-yellow-300">
            <th className="border border-gray-800 px-4 py-2">ID</th>
            <th className="border border-gray-800 px-4 py-2">Title</th>
            <th className="border border-gray-800 px-4 py-2">Description</th>
            <th className="border border-gray-800 px-4 py-2">Price</th>
            <th className="border border-gray-800 px-4 py-2">Category</th>
            <th className="border border-gray-800 px-4 py-2">Sold</th>
            <th className="border border-gray-800 px-4 py-2">Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="border border-gray-800 px-4 py-2">
                {transaction.id}
              </td>
              <td className="border border-gray-800 px-4 py-2">
                {transaction.title}
              </td>
              <td className="border border-gray-800 px-4 py-2">
                {transaction.description}
              </td>
              <td className="border border-gray-800 px-4 py-2">
                {transaction.price}
              </td>
              <td className="border border-gray-800 px-4 py-2">
                {transaction.category}
              </td>
              <td className="border border-gray-800 px-4 py-2">
                {transaction.sold ? "Yes" : "No"}
              </td>
              <td className="border border-gray-800 px-4 py-2">
                <img
                  src={transaction.image}
                  alt={transaction.title}
                  className="w-16 h-16 object-cover"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full max-w-4xl mt-4 flex justify-between items-center px-8 text-gray-800">
        <span>Page No: {page}</span>
        <div>
          <button
            className="mr-2 text-blue-600 hover:underline"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
        <span>Per Page: 10</span>
      </div>
    </div>
  );
};

export default TransactionTable;
