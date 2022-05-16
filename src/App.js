import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ethers } from "ethers";
import { ABI, BUSDABI } from "./constanst";

const { ethereum } = window;

function getContract(ABI, contractAddress) {
  // const provider = new ethers.providers.Web3Provider(ethereum);
  // const url = "https://proxy.devnet.neonlabs.org/solana";
  const url = "https://bsc-dataseed.binance.org/";
  const provider = new ethers.providers.StaticJsonRpcProvider(url);
  // console.log(provider);
  // console.log(new ethers.Contract(contractAddress, ABI, provider));
  // console.log("provider", contractAddress, ABI);
  return new ethers.Contract(contractAddress, ABI, provider);
  // return new web3.eth.Contract(ABI, contractAddress);
}
function App() {
  const [data, setData] = useState();
  // const address = "0x31ed2966c208bb863b31e32c5f0d51fb270d4b38"; //token on Neon
  const address = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";

  const contractData = getContract(ABI, address);
  useEffect(() => {
    const fetData = async () => {
      try {
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
        <img src={logo} className="App-logo" alt="logo" />
        <p>{data}</p>
      </header>
    </div>
  );
}

export default App;
