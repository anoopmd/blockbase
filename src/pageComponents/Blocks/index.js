import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import range from 'lodash/range';
import { formatDistance } from 'date-fns';

const Blocks = () => {
  const web3 = new Web3('http://127.0.0.1:8545');
  const [blocks, setBlocks] = useState([]);

  useEffect(async () => {
    const latestBlockNumber = await web3.eth.getBlockNumber();

    let _blocks = [];
    if(latestBlockNumber) {
      _blocks = range(latestBlockNumber);
      for(let blockNum of _blocks) {
        const block = await web3.eth.getBlock(blockNum);

        block.timeAgo = formatDistance(new Date(block.timestamp * 1000), new Date(), { addSuffix: true });

        _blocks[blockNum] = block;
      }
    }

    setBlocks(_blocks);
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
                      Block
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      TX Count
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Gas used
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Gas Limit
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blocks && blocks.length ? blocks.map((block) => {
                    return (
                      <tr key={block.number} className="font-monospace">
                        <td className="px-6 py-1 whitespace-nowrap text-sm">{block.number}</td>
                        <td className="px-6 py-1 whitespace-nowrap text-sm">{block.timeAgo}</td>
                        <td className="px-6 py-1 whitespace-nowrap text-sm">{block.transactions.length}</td>
                        <td className="px-6 py-1 whitespace-nowrap text-sm">{block.gasUsed}</td>
                        <td className="px-6 py-1 whitespace-nowrap text-sm">{block.gasLimit}</td>
                        <td className="px-6 py-1 whitespace-nowrap text-sm">{block.size}</td>
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

export default Blocks;
