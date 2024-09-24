import React, { useState } from "react";

const Login = () => {
  const [userAddress, setUserAddress] = useState(null);

  // Function to connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request access to the user's MetaMask accounts
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

        // After this line, you are connected to MetaMask, and the user has chosen an account
        // You can add additional logic here

        // Example: Check if the user is an admin
        const userAddress = accounts[0];
        setUserAddress(userAddress); // Set the user's address in the state
        const adminAddresses = ["0x7e2B46CfD8893e8A779a8aa33220d507CF09800E"]; // Replace with actual admin addresses

        if (adminAddresses.includes(userAddress)) {
          console.log("User is an admin");
          // You can perform admin-specific actions here
        } else {
          console.log("User is not an admin");
          // You can perform actions for regular users here
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("MetaMask is not detected in the browser");
    }
  };

  return (
    <div className="login-container" >

<div className="bg-gray-100 pb-24">
      <div className="container mx-auto flex flex-col items-center py-12 sm:py-24 ">
        <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10">
          Welcome to   
            <span className="text-indigo-700"> decentralized </span>
            voting application
          </h1>
          <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg">
          "Bringing Trust and Transparency to Elections with Decentralized Voting – Your Voice, Your Choice."
          </p>
        </div>
        <div className="flex justify-center items-center">
        {userAddress ? (

<div className="flex flex-col justify-center items-center my-5">
    <div className="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-[700px] mx-auto p-5 bg-white bg-clip-border shadow-md shadow-[rgb(243,243,243)] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
      <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
        <img
          src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
          className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
        />
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img
            className="h-full w-full rounded-full"
            src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png"
            alt=""
          />
        </div>
      </div>
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 text-indigo-700">
        Account Address: {userAddress}
        </h4>
      </div>
    </div>
  </div>  
      ) : (
          <button className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-transparent transition duration-150 ease-in-out hover:border-indigo-600 lg:text-xl lg:font-bold  hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-10 py-2 sm:py-4 text-sm" onClick={connectWallet}>
          Login Metamask
          </button> )}
        </div>
      </div>
    </div>

     
    </div>
  );
};

export default Login;
