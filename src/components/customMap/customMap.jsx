"use client"

import { useState, useEffect, Suspense, useRef } from 'react';
import styles from "./customMap.module.css"

import Link from 'next/link';

import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import "leaflet-defaulticon-compatibility";

import { getNearPois } from '@/lib/data.server'

import { MapContainer, Marker, Popup, TileLayer, Polyline } from "react-leaflet";

import L from 'leaflet';


// 自定义图标
const centerIcon = L.icon({
    iconUrl: 'center-marker.png', // 自定义图标的 URL
    iconSize: [25, 40], // 图标的大小
    iconAnchor: [12, 40], // 图标将对应标记点的位置
    popupAnchor: [0, -36] // 弹出框的锚点
});


const CustomMap = async () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    const [resJson, setResJson] = useState(null)

    const centerMarkerRef = useRef(null);

    useEffect(() => {
        // 设置延时
        const timer = setTimeout(() => {
            // 3 秒后执行的代码
            if (centerMarkerRef.current !== null && !centerMarkerRef.current.isPopupOpen()) {
                // @ts-ignore
                console.log('do open')
                centerMarkerRef.current.openPopup();
            }
        }, 1500);

        // 清理定时器
        return () => clearTimeout(timer);
    }, [centerMarkerRef]);

    const fetchPois = async (centerLng, centerLat) => {
        try {
            const resultJson = await getNearPois(centerLng, centerLat);
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
                        <h1>Your current longitude and latitude coordinates are</h1>
                        <h2 className={styles.resultText}>({location.lng}, {location.lat})</h2>
                    </div>
                    {
                        resJson &&
                        <div className={styles.mapContainer}  >
                            <Suspense fallback={<div>Loading...</div>}>
                                <MapContainer
                                    key={new Date().getTime()}
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
                                        icon={centerIcon} ref={centerMarkerRef}>
                                        <Popup>
                                            Where you are
                                        </Popup>
                                    </Marker>

                                    {resJson.items.map((item, index) => (
                                        <Marker key={index} position={[item.lat, item.lng]}>
                                            <Popup>
                                                <Link href={`https://www.google.com/search?q=${item.poi_name}`} target="_blank" className={styles.resultText}>{item.poi_name}</Link> is <span className={styles.resultText}>{item.distance}</span> meters away from you.
                                            </Popup>
                                        </Marker>


                                    ))}Link

                                    {resJson.items.map((item, index) => (
                                        <Polyline positions={[[resJson.lat, resJson.lng], [item.lat, item.lng]]} color="blue"
                                            weight={5}
                                            key={index}
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