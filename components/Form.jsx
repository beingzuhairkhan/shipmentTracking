import { useState } from 'react';

export default ({ setCreateShipmentModel, createShipment, createShipmentModel }) => {
    const [shipment, setShipment] = useState({
        receiver: "",
        pickupTime: "",
        distance: "",
        price: "",
    });

    const createItem = async () => {
        try {
            // Simple validation
            if (!shipment.receiver || !shipment.pickupTime || !shipment.distance || !shipment.price) {
                alert("Please fill in all fields.");
                return;
            }

            await createShipment(shipment);
            // Clear fields or close modal after success
            setShipment({
                receiver: "",
                pickupTime: "",
                distance: "",
                price: "",
            });
            setCreateShipmentModel(false); // Close modal after creation
        } catch (error) {
            console.error(error.message);
            alert("Error creating shipment: " + error.message);
        }
    };

    return createShipmentModel ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => setCreateShipmentModel(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    <div className="flex justify-end">
                        <button className="p-2 text-gray-400 rounded-md hover:bg-gray-100" onClick={() => setCreateShipmentModel(false)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 mx-auto"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
                        <h4 className="text-lg font-medium text-gray-800">Track Product, Create Shipment</h4>
                        <p className="text-[15px] text-gray-600">
                            Fill in the details to create a new shipment.
                        </p>
                        <form onSubmit={(e) => { e.preventDefault();
                            //  createItem(); 
                             }}>
                            <div className="relative mt-3">
                                <input type="text" placeholder="Receiver"
                                    className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    onChange={(e) => setShipment({ ...shipment, receiver: e.target.value })}
                                    // value={shipment.receiver} 
                                />
                            </div>
                            <div className="relative mt-3">
                                <input type="date" placeholder="Pickup Time"
                                    className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    onChange={(e) => setShipment({ ...shipment, pickupTime: e.target.value })}
                                    // value={shipment.pickupTime} // controlled input
                                />
                            </div>
                            <div className="relative mt-3">
                                <input type="text" placeholder="Distance"
                                    className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    onChange={(e) => setShipment({ ...shipment, distance: e.target.value })}
                                    // value={shipment.distance} // controlled input
                                />
                            </div>
                            <div className="relative mt-3">
                                <input type="text" placeholder="Price"
                                    className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    onChange={(e) => setShipment({ ...shipment, price: e.target.value })}
                                    // value={shipment.price} // controlled input
                                />
                            </div>
                            <button onClick={()=>createItem()} type="submit" className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white
                                bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2">
                                Create Shipment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ) : null; // Return null if not showing
};
