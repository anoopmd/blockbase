import React, { useEffect, useState } from "react"
import Web3 from 'web3';

const Accounts = () => {
  const web3 = new Web3('http://127.0.0.1:8545');
  const [accounts, setAccounts] = useState([]);

  useEffect(async () => {
    const ethAccounts = await web3.eth.getAccounts();
    const accounts = []

    for(let address of ethAccounts) {
      let balance = await web3.eth.getBalance(address);
      let txCount = await web3.eth.getTransactionCount(address);

      accounts.push({
        address: address,
        balance: balance,
        txCount: txCount
      });
    }

    console.log(accounts);

    setAccounts(accounts);
  }, []);

  return (
    <div className="accounts mt-6 px-2">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Balance
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      TX Count
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {accounts && accounts.length ? accounts.map((account) => {
                    return (
                      <tr key={account.address} className="font-monospace">
                        <td className="px-6 py-1 whitespace-nowrap text-sm">{account.address}</td>
                        <td className="px-6 py-1 whitespace-nowrap text-sm">
                          <span className="inline-block text-right" style={{minWidth: '220px'}}>{account.balance}</span> ETH
                        </td>
                        <td className="px-6 py-1 whitespace-nowrap text-sm">{account.txCount}</td>
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

export default Accounts;
