// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

contract Tracking {
    enum ShipmentStatus {
        PENDING,
        IN_TRANSIT,
        DELIVERED
    }

    struct Shipment {
        address sender;
        address receiver; 
        uint pickUpTime;
        uint deliveryTime;
        uint distance;
        uint price;
        ShipmentStatus status;
        bool isPaid;
    }

    mapping(address => Shipment[]) public shipments;
    uint public shipmentCount;

    struct TypeShipment {
        address sender;
        address receiver; 
        uint pickUpTime;
        uint deliveryTime;
        uint distance;
        uint price;
        ShipmentStatus status;
        bool isPaid;
    }

    TypeShipment[] public typeShipments; 

    event ShipmentCreated(
        address indexed sender,
        address indexed receiver,
        uint pickUpTime,
        uint distance,
        uint price
    );

    event ShipmentInTransit(
        address indexed sender,
        address indexed receiver,
        uint pickUpTime
    );

    event ShipmentDelivered(
        address indexed sender,
        address indexed receiver,
        uint deliveryTime
    );

    event ShipmentPaid(
        address indexed sender,
        address indexed receiver,
        uint price
    );

    constructor() {
        shipmentCount = 0;
    }

    // Create shipment
    function createShipment(
        address _receiver,
        uint _pickUpTime,
        uint _distance,
        uint _price
    ) public payable {
        require(msg.value == _price, "Payment amount must match the price.");

        Shipment memory shipment = Shipment(
            msg.sender,
            _receiver,
            _pickUpTime,
            0,
            _distance,
            _price,
            ShipmentStatus.PENDING,
            false
        );

        shipments[msg.sender].push(shipment);
        shipmentCount++;

        typeShipments.push(
            TypeShipment(
                msg.sender,
                _receiver,
                _pickUpTime,
                0,
                _distance,
                _price,
                ShipmentStatus.PENDING,
                false
            )
        );

        emit ShipmentCreated(
            msg.sender,
            _receiver,
            _pickUpTime,
            _distance,
            _price
        );
    }

    // Start shipment
    function startShipment(
        address _sender,
        address _receiver,
        uint _index
    ) public {
        Shipment storage shipment = shipments[_sender][_index];
        TypeShipment storage typeShipment = typeShipments[_index];
        require(shipment.receiver == _receiver, "Invalid receiver");
        require(
            shipment.status == ShipmentStatus.PENDING,
            "Shipment already in transit"
        );

        shipment.status = ShipmentStatus.IN_TRANSIT;
        typeShipment.status = ShipmentStatus.IN_TRANSIT;

        emit ShipmentInTransit(_sender, _receiver, shipment.pickUpTime); 
    }

    // Complete delivery
    function completeShipment(
        address _sender,
        address _receiver,
        uint _index
    ) public {
        Shipment storage shipment = shipments[_sender][_index];
        TypeShipment storage typeShipment = typeShipments[_index];
        require(shipment.receiver == _receiver, "Invalid receiver");
        require(
            shipment.status == ShipmentStatus.IN_TRANSIT,
            "Shipment not in transit"
        );
        require(!shipment.isPaid, "Shipment already paid");

        shipment.status = ShipmentStatus.DELIVERED;
        typeShipment.status = ShipmentStatus.DELIVERED;
        typeShipment.deliveryTime = block.timestamp;
        shipment.deliveryTime = block.timestamp;

        uint amount = shipment.price;
        payable(shipment.sender).transfer(amount); // Transfer payment
        shipment.isPaid = true;
        typeShipment.isPaid = true;

        emit ShipmentDelivered(_sender, _receiver, shipment.deliveryTime);
        emit ShipmentPaid(_sender, _receiver, amount);
    }

    // Get shipment details
    function getShipment(
        address _sender,
        uint _index
    )
        public
        view
        returns (address, address, uint, uint, uint, uint, ShipmentStatus, bool)
    {
        Shipment memory shipment = shipments[_sender][_index];
        return (
            shipment.sender,
            shipment.receiver,
            shipment.pickUpTime,
            shipment.deliveryTime,
            shipment.distance,
            shipment.price,
            shipment.status,
            shipment.isPaid
        );
    }

    function getShipmentCount(address _sender) public view returns (uint) {
        return shipments[_sender].length;
    }

    function getAllTransaction(
        uint start,
        uint limit
    ) public view returns (TypeShipment[] memory) {
        uint end = start + limit > typeShipments.length
            ? typeShipments.length
            : start + limit;
        TypeShipment[] memory result = new TypeShipment[](end - start);
        for (uint i = start; i < end; i++) {
            result[i - start] = typeShipments[i];
        }
        return result;
    }
}
