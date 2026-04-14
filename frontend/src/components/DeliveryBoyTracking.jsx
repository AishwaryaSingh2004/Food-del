/*
import React from 'react';
import scooter from "../assets/scooter.png";
import home from "../assets/home.png";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Icons
const deliveryBoyIcon = new L.Icon({
    iconUrl: scooter,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
});

const customerIcon = new L.Icon({
    iconUrl: home,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
});

function DeliveryBoyTracking({ data }) {

    if (!data) return null;

    const deliveryBoyLat = data.deliveryBoyLocation.lat;
    const deliveryBoyLon = data.deliveryBoyLocation.lon;
    const customerLat = data.customerLocation.lat;
    const customerLon = data.customerLocation.lon;

    const path = [
        [deliveryBoyLat, deliveryBoyLon],
        [customerLat, customerLon]
    ];

    const center = [deliveryBoyLat, deliveryBoyLon];

    return (
        <div className='w-full h-[400px] mt-3 rounded-xl overflow-hidden shadow-md'>
            <MapContainer
                className={"w-full h-full"}
                center={center}
                zoom={16}
                scrollWheelZoom={true}
               
            >

                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                
            </MapContainer>


        </div>
    )
}


export default DeliveryBoyTracking;*/



import React from 'react';
import scooter from "../assets/scooter.png";
import home from "../assets/home.png";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Icons
const deliveryBoyIcon = new L.Icon({
    iconUrl: scooter,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
});

const customerIcon = new L.Icon({
    iconUrl: home,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
});

function DeliveryBoyTracking({ data }) {

    if (!data) return null;

    const deliveryBoyLat = data?.deliveryBoyLocation?.lat;
    const deliveryBoyLon = data?.deliveryBoyLocation?.lon;
    const customerLat = data?.customerLocation?.lat;
    const customerLon = data?.customerLocation?.lon;

    // safety check
    if (
        deliveryBoyLat == null ||
        deliveryBoyLon == null ||
        customerLat == null ||
        customerLon == null
    ) return null;

    const path = [
        [deliveryBoyLat, deliveryBoyLon],
        [customerLat, customerLon]
    ];

    const center = [deliveryBoyLat, deliveryBoyLon];

    return (
        <div className='w-full h-[400px] mt-3 rounded-xl overflow-hidden shadow-md'>

            <MapContainer
                className="w-full h-full"
                center={center}
                zoom={16}
                scrollWheelZoom={true}
            >

                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* ✅ Delivery Boy Marker */}
                <Marker
                    position={[deliveryBoyLat, deliveryBoyLon]}
                    icon={deliveryBoyIcon}
                />
                    

                {/* ✅ Customer Marker */}
                <Marker
                    position={[customerLat, customerLon]}
                    icon={customerIcon}
                />
                   

                {/* ✅ Path Line */}
                <Polyline positions={path} />

            </MapContainer>

        </div>
    );
}

export default DeliveryBoyTracking;