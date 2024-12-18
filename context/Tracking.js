"use client";
import React, { useState, useEffect } from 'react'
import Web3Modal from 'web3modal'
import { ethers , BrowserProvider } from 'ethers'
import { formatEther } from "ethers";


//internal import
import tracking from '../context/Tracking.json';
const ContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

const ContractABI = tracking.abi;


//--fetch the contract

const fetchContract = (signerOrProvider) =>
    new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
    // state variable 

    const DappName = "Product Tracking Dapp";
    const [currentUser, setCurrentUser] = useState("");

    const createShipment = async (items) => {
        const { receiver, pickupTime, distance, price } = items;
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            // 
             const provider = new ethers.providers.Web3Provider(connection)

            // let provider;
            // window.ethereum.enable().then(provider = new ethers.providers.Web3Provider(window.ethereum));
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            
            const createItem = await contract.createShipment(
                receiver,
                Math.floor(new Date(pickupTime).getTime() / 1000), // Ensure you are sending the timestamp in seconds
                distance,
                ethers.utils.parseUnits(price, 18), // Update to use ethers.utils
            {
                value: ethers.utils.parseUnits(price, 18) // Update to use ethers.utils
            }
            );
            await createItem.wait();
            console.log("createItem" , createItem);
        } catch (error) {
            console.error("Something went wrong", error);
            console.error("Something went wrong", error?.message);
        }
    };
    

    const getAllShipments = async () => {
        try {
        
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            console.log("Contract Address:", ContractAddress);
            const shipments = await contract.getAllTransaction();
            console.log("shipments" + shipments)
            const allShipments = shipments.map((shipment) => ({
                sender: shipment.sender,
                receiver: shipment.receiver,
                // price: formatEther(shipment.price.toString()),
                price : ethers.utils.formatEther(shipment.price.toString()),
                pickupTime: shipment.pickUpTime.toNumber(),
                deliveryTime: shipment.deliveryTime.toNumber(),
                distance: shipment.distance.toNumber(),
                isPaid: shipment.isPaid,
                status: shipment.status,

            }));
            console.log("allShipments" + allShipments)
            return allShipments;
        } catch (error) {
            console.log("Something went wrong", error);
        }
    };

    const getShipmentsCount = async () => {
        try {
            if (!window.ethereum) return 'Install MetaMask';
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            })

            // const provider = new ethers.JsonRpcProvider();
            const provider = new ethers.providers.JsonRpcProvider()
            const contract = fetchContract(provider);
            const shipmentsCount = await contract.getShipmentsCount(accounts[0]);
            return shipmentsCount.toNumber();

        } catch (error) {
            console.log("something went wrong", error)
        }
    };

    const completeShipment = async (completeShip) => {
        console.log(completeShip);

        const { receiver, index } = completeShip;
        try {
            if (!window.ethereum) return "Install Metamask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const transaction = await contract.completeShipment(
                accounts[0],
                receiver,
                index,
                {
                    gasLimit: 500000, // gas limit
                }
            );
            transaction.wait();
            console.log(transaction);

        } catch (error) {
            console.log("something went wrong", error)
        }

    };

    const getShipment = async (index) => {
        console.log(index * 1);
        try {
            if (!window.ethereum) return "Install Metamask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            // const provider = new ethers.JsonRpcProvider();
            const provider = new ethers.providers.JsonRpcProvider()
            const contract = fetchContract(provider);
            const shipment = await contract.getShipment(accounts[0], index * 1); // multiply by 1 show we can convert into number
            const singleShipLength = {
                sender: shipment[0],
                receiver: shipment[1],
                pickupTime: shipment[2].toNumber(),
                deliveryTime: shipment[3].toNumber(),
                distance: shipment[4].toNumber(),
                price: ethers.utils.formatEther(shipment[5].toString()),
                status: shipment[6],
                isPaid: shipment[7]
            }

            return singleShipLength;


        } catch (error) {
            console.log("something went wrong", error)
        }
    };

    const startShipment = async (getProduct) => {
        const { receiver, index } = getProduct;

        try {
            if (!window.ethereum) return "Install Metamask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const shipment = await contract.startShipment(
                accounts[0],
                receiver,
                index * 1
            )
            shipment.wait();
            console.log(shipment)


        } catch (error) {
            console.log("something went wrong", error)
        }
    };

    // check wallet connection 
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) return "Install Metamask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            if (accounts.length) {
                setCurrentUser(accounts[0]);
            } else {
                return "No account"
            }

        } catch (error) {
            console.log("something went wrong", error)
        }
    };

    // connect wallet function

    const connectWallet = async () => {
        try {
            if (!window.ethereum) return "Install Metamask";
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentUser(accounts[0]);
        } catch (error) {
            console.log("something went wrong", error)
        }
    };

    useEffect(() => {
        checkIfWalletConnected()

    }, [])

    return (
        <TrackingContext.Provider
            value={{
                createShipment,
                getAllShipments,
                getShipmentsCount,
                completeShipment,
                getShipment,
                startShipment,
                connectWallet,
                DappName,
                currentUser,
            }}
        >
            {children}
        </TrackingContext.Provider>
    );




} 