"use client"

import { useState, useEffect, Suspense } from 'react';
import styles from "./customMap.module.css"

import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import "leaflet-defaulticon-compatibility";

import { getNearPois } from '@/lib/data'

import { MapContainer, Marker, Popup, TileLayer, Polyline } from "react-leaflet";

import L from 'leaflet';

// 自定义图标
const centerIcon = L.icon({
    iconUrl: 'center-marker.png', // 自定义图标的 URL
    iconSize: [25, 40], // 图标的大小
    iconAnchor: [18, 40], // 图标将对应标记点的位置
    popupAnchor: [-12, -36] // 弹出框的锚点
});


const CustomMap = async () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    const [resJson, setResJson] = useState(null)

    const fetchPois = async (center_lng, center_lat) => {
        try {
            const resultJson = await getNearPois(center_lng, center_lat);
            console.log(resultJson)
            setResJson(resultJson)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (!location && !error) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });

                    fetchPois(position.coords.longitude, position.coords.latitude)
                },
                (err) => {
                    setError('Location permission is required to load the map.');
                }
            );
        }
    }, [location, error]);



    return (
        <div className={styles.container}>
            {
                location ? <div className={styles.resultContainer}>
                    <div className={styles.textContainer}>
                        <h1>Your current latitude and longitude coordinates are</h1>
                        <h2 className={styles.resultText}>({location.lng}, {location.lat})</h2>
                    </div>
                    {
                        resJson &&
                        <div className={styles.mapContainer} key={new Date().getTime()} >
                            <Suspense fallback={<div>Loading...</div>}>
                                <MapContainer
                                    preferCanvas={true}
                                    center={[resJson.lat, resJson.lng]}
                                    zoom={resJson.zoom}
                                    scrollWheelZoom={true}
                                    className={styles.map}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

                                    <Marker key={resJson.items.length} position={[resJson.lat, resJson.lng]}
                                        icon={centerIcon}>
                                        <Popup>
                                            Where you are
                                        </Popup>
                                    </Marker>

                                    {resJson.items.map((item, index) => (
                                        <Marker key={index} position={[item.lat, item.lng]}>
                                            <Popup>
                                                {item.poi_name} is {item.distance} meters away from you.
                                            </Popup>
                                        </Marker>


                                    ))}

                                    {resJson.items.map((item, index) => (
                                        <Polyline positions={[[resJson.lat, resJson.lng], [item.lat, item.lng]]} color="blue"
                                            weight={5}
                                            opacity={0.7}
                                            dashArray="10,10" />
                                    ))}

                                </MapContainer>
                            </Suspense>
                        </div>
                    }
                </div> : <div className={styles.requestContainer}>
                    <h1 className={styles.requestText}>{error || 'Attempting to retrieve your location....'}</h1>
                    <button className={styles.retryButton} onClick={() => setError(null)}>Retry</button>
                </div>

            }

        </div>
    );
}


export default CustomMap