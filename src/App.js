import React, { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import { ABI } from "./constanst";

const { ethereum } = window;

function getContract(ABI, contractAddress) {
  // const provider = new ethers.providers.Web3Provider(ethereum); //ok
  const url = "https://proxy.devnet.neonlabs.org/solana";
  const provider = new ethers.providers.JsonRpcProvider(url); // not work
  return new ethers.Contract(contractAddress, ABI, provider);
}
function App() {
  const [data, setData] = useState();
  const address = "0x31ed2966c208bb863b31e32c5f0d51fb270d4b38"; //contract address to test

  const contractData = getContract(ABI, address);
  useEffect(() => {
    const fetData = async () => {
      try {
        // decimals, symmbol, name
        const result = await contractData.name();
        console.log("result:", result);
        setData(result);
      } catch (e) {
        console.log(e);
      }
    };
    fetData();
  }, []);
  console.log(data);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Data:</h1>
        <pre>{data}</pre>
      </header>
    </div>
  );
}

export default App;
