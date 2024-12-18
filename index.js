'use client';  // Make sure this is placed at the very top of the file

import React, { useState, useEffect, useContext } from 'react';
import { Table, Form, Service, Profile, CompleteShipment, GetShipment, StartShipment } from '../tracking/components/index'

import { TrackingContext } from '../tracking/context/Tracking'

const Index = () => {
    const {
        currentUser,
        createShipment,
        getAllShipments,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentsCount,
    } = useContext(TrackingContext);

    // State variables
    const [createShipmentModel, setCreateShipmentModel] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [startModel, setStartModel] = useState(false);
    const [completeModel, setCompleteModel] = useState(false);
    const [getModel, setGetModel] = useState(false);

    // Data state variable
    const [allShipmentsData, setAllShipmentsData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const allData = await getAllShipments();
            console.log("alldata" , allData)
            setAllShipmentsData(allData);
        };
        fetchData();
    }, []);
     // Empty dependency array ensures the effect runs only once after the component mounts

    return (
        <>
            <Service
                setOpenProfile={setOpenProfile}
                setCompleteModel={setCompleteModel}
                setGetModel={setGetModel}
                setStartModel={setStartModel}
            />

            <Table
                setCreateShipmentModel={setCreateShipmentModel}
                allShipmentsData={allShipmentsData}
            />

            <Form
                createShipmentModel={createShipmentModel}
                createShipment={createShipment}
                setCreateShipmentModel={setCreateShipmentModel}
            />

            <Profile
                openProfile={openProfile}
                setOpenProfile={setOpenProfile}
                currentUser={currentUser}
                getShipmentsCount={getShipmentsCount}
            />

            <CompleteShipment
                completeModel={completeModel}
                setCompleteModel={setCompleteModel}
                completeShipments={completeShipment}
            />

            <GetShipment
                getModel={getModel}
                setGetModel={setGetModel}
                getShipments={getShipment}
            />

            <StartShipment
                startModel={startModel}
                setStartModel={setStartModel}
                startShipment={startShipment}
            />
        </>
    );
}

export default Index;
