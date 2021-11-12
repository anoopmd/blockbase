import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import range from 'lodash/range';
import { formatDistance } from 'date-fns';

const Transactions = () => {
  const web3 = new Web3('http://127.0.0.1:8545');
  const [transactions, setTransactions] = useState([]);

  useEffect(async () => {
    const latestBlockNumber = await web3.eth.getBlockNumber();

    let transactions = [];
    if(latestBlockNumber) {
      const blocks = range(latestBlockNumber);
      for(let blockNum of blocks) {
        const block = await web3.eth.getBlock(blockNum);

        if(block.transactions && block.transactions.length) {
          for(let blockTrx of block.transactions) {
            const transaction = await web3.eth.getTransaction(blockTrx);

            transaction.timeAgo = formatDistance(new Date(block.timestamp * 1000), new Date(), { addSuffix: true });
            transactions.push(transaction);
          }
        }

        block.timeAgo = formatDistance(new Date(block.timestamp * 1000), new Date(), { addSuffix: true });
      }
    }

    console.log(transactions);
    setTransactions(transactions);
  }, []);

  return (
    <div className="accounts mt-6 px-2">
      <div className="flex flex-col">
        <div className="-my-2 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block w-full sm:px-6 lg:px-8">
            <div className="shadow border-b border-gray-200 sm:rounded-lg">
              <table className="w-full table-fixed divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Tx Hash
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Block
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      From
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      To
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Gas
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions && transactions.length ? transactions.map((transaction) => {
                    return (
                      <tr key={transaction.hash} className="font-monospace">
                        <td className="px-6 py-1 whitespace-nowrap overflow-ellipsis overflow-hidden text-sm">{transaction.hash}</td>
                        <td className="px-6 py-1 whitespace-nowrap overflow-ellipsis overflow-hidden text-sm">{transaction.blockNumber}</td>
                        <td className="px-6 py-1 whitespace-nowrap overflow-ellipsis overflow-hidden text-sm">{transaction.timeAgo}</td>
                        <td className="px-6 py-1 whitespace-nowrap overflow-ellipsis overflow-hidden text-sm">{transaction.from}</td>
                        <td className="px-6 py-1 whitespace-nowrap overflow-ellipsis overflow-hidden text-sm">{transaction.to}</td>
                        <td className="px-6 py-1 whitespace-nowrap overflow-ellipsis overflow-hidden text-sm">{transaction.value}</td>
                        <td className="px-6 py-1 whitespace-nowrap overflow-ellipsis overflow-hidden text-sm">{transaction.gas}</td>
                      </tr>
                    );
                  }) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
