import React from "react";
import { FaUser, FaHome } from "react-icons/fa";

const DUMMY_ALL_Transactions = [
  {
    id: "t1",
    name: "Sajal Sharma",
    amount: 201.22,
    time: "22/12/22",
  },
  {
    id: "t2",
    name: "Aman Mandal",
    amount: 15.34,
    time: "22/12/22",
  },
  {
    id: "t3",
    name: "Dinesh Aitham",
    amount: 511.22,
    time: "22/12/22",
  },
  {
    id: "t4",
    name: "Sanskar Sharma",
    amount: 561.2,
    time: "22/12/22",
  },
  {
    id: "t4",
    name: "Sanskar Sharma",
    amount: 561.2,
    time: "22/12/22",
  },
  {
    id: "t4",
    name: "Sanskar Sharma",
    amount: 561.2,
    time: "22/12/22",
  },
];

const dashboard = () => {
  return (
    <section className="w-[95%] mx-auto">
      <nav className="flex justify-between px-6 py-4 mb-4">
        <h2 className="text-xl font-semibold font-Poppins">👋 Hi, Aman!</h2>
        <div className="flex gap-6 items-center">
          <FaHome size={25} />
          <FaUser size={23} />
        </div>
      </nav>

      <div className="flex gap-10">
        <div className="bg-gradient-to-b flex flex-[0.5] flex-col gap-10 from-[#FAE7F9] p-6 via-[#FFEDF1] to-[#FCEFDE] rounded-2xl">
          <div>
            <p className=" font-semibold py-2 px-1 text-xl font-Poppins">
              Scheduled transactions
            </p>

            <section className="bg-[#C0DFE2] rounded-xl p-7 h-[250px] overflow-y-scroll">
              <table className="text-gray-400">
                <tbody>
                  <tr className="text-white bg-black/60 ">
                    <th className="px-20 py-2 rounded-l-md">Name</th>
                    <th className="px-20 md:px-24">Amount</th>
                    <th className="px-20 rounded-r-md">Time</th>
                  </tr>

                  {DUMMY_ALL_Transactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="text-center text-white bg-black/10 mt-2"
                    >
                      <td className="py-2">{tx.name}</td>
                      <td>{tx.amount} USDC</td>
                      <td className="">{tx.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>

          <div>
            <p className=" font-semibold py-2 px-1 text-xl font-Poppins">
              All transactions
            </p>
            <section className="bg-gradient-to-r from-[#22212d] via-[#3b3741] to-[#5a555a] rounded-xl p-7 h-[250px] overflow-y-scroll">
              <table className="text-gray-400">
                <tbody>
                  <tr className="text-white bg-black/60 ">
                    <th className="px-20 py-2 rounded-l-md">Name</th>
                    <th className="px-20 md:px-24">Amount</th>
                    <th className="px-20 rounded-r-md">Time</th>
                  </tr>

                  {DUMMY_ALL_Transactions.map((tx) => (
                    <tr key={tx.id} className="text-center bg-black/20 mt-2">
                      <td className="py-2">{tx.name}</td>
                      <td>{tx.amount} USDC</td>
                      <td className="">{tx.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </div>
        <div className="bg-gradient-to-b p-4 from-[#FEE4C3]/20 to-[#FEE4C3]/95 flex-[0.5] rounded-xl">
          <p className=" font-semibold py-2 px-1 text-xl font-Poppins">
            Stream Details
          </p>
        </div>
      </div>
    </section>
  );
};

export default dashboard;
