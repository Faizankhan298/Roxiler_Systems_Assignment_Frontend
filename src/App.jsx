import { useState } from "react";
import TransactionTable from "./components/TransactionTable";
import TransactionStatistics from "./components/TransactionStatistics";
import TransactionBarChart from "./components/TransactionBarChart";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="min-h-screen bg-blue-50 p-8 flex flex-col items-center">
        <div className="bg-white rounded-full p-8 mb-2">
          <h1 className="text-2xl font-bold text-center">
            Transaction Dashboard
          </h1>
        </div>

        <div className="w-full max-w-4xl mb-6 flex justify-between p-2 bg-gray-300 rounded-2xl">
          <input
            type="text"
            placeholder="Search transaction"
            className="px-4 py-2 rounded-full border border-black bg-gray-200 text-gray-600 placeholder-gray-600 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="relative">
            <select
              className="appearance-none px-4 py-2 pr-8 rounded-full border border-black bg-gray-200 text-gray-800 focus:outline-none cursor-pointer"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              onClick={handleSelectChange}
            >
              <option>January</option>
              <option>February</option>
              <option defaultValue>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
            <div
              className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-800 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl flex">
          <div className="flex-3">
            <h2 className="text-xl text-center mb-3  border border-black">
              Transaction Table
            </h2>
            <TransactionTable
              selectedMonth={selectedMonth}
              searchTerm={searchTerm}
            />
          </div>
          <div className="flex-1 flex flex-col  px-4 ">
            <div className="mb-4">
              <h2 className="text-xl text-center mb-3  border border-black">
                Transaction Statistics
              </h2>
              <TransactionStatistics selectedMonth={selectedMonth} />
            </div>
            <div>
              <h2 className="text-xl text-center mb-3  border border-black">
                Transaction Bar-Chart
              </h2>
              <TransactionBarChart selectedMonth={selectedMonth} />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-4 text-gray-600">
        Made with 💖 by Mohammed Faizan
      </div>
    </>
  );
};

export default App;