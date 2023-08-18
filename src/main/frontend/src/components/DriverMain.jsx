'DriverMain.jsx'
import React, { useState, useEffect } from 'react';
import Basic_Components_top from '../Basic_Component_top';
import Basic_Components_bottom from '../Basic_Component_bottom';
import DriverCallReceive from './DriverCallReceive';
import DriverCallWaiting from './DriverCallWaiting';
import axios from 'axios';

export default function DriverMain() {
    const [viewReceive, setViewReceive] = useState(false);
    const [callReceiveData, setCallReceiveData] = useState({
        currentX: "",
        currentY: "",
        destinationX: "",
        destinationY: ""
    });
    const [showIframe, setShowIframe] = useState(false);
    const [driverInfo, setDriverInfo] = useState({
        name: "",
        phone: "",
        carNumber: "",
        carType: ""
    });

    useEffect(() => {
        const fetchDriverData = async () => {
            try {
                const response = await axios.get('/api/taxiDriver');
                const data = response.data;
                console.log('Driver Data:', data);
                setDriverInfo(data);
            } catch (error) {
                console.error('Error fetching driver data:', error);
            }
        };

        fetchDriverData();
    }, []);

    useEffect(() => {
        const fetchCallReceiveData = async () => {
            try {
                const response = await axios.get('/api/taxi');
                const data = response.data;
                console.log('Call Receive Data:', data);
                setCallReceiveData(data);
                setViewReceive(true);
            } catch (error) {
                console.error('Error fetching call receive data:', error);
            }
        };

        fetchCallReceiveData();

        const intervalId = setInterval(fetchCallReceiveData, 1000);

        return () => {
            clearInterval(intervalId);
        }

    }, []);

    const handleAcceptCall = () => {
        setShowIframe(true);
    };

    const handleDenyCall = () => {
        setViewReceive(false);
    };

    return (
        <div className="App" style={{ height: '900px', width: '500px' }}>
            <div className="phone">
                <div className="screen">
                    <div className="basic_Components_top">
                        <Basic_Components_top />
                        <hr />
                    </div>

                    <div className="mainComponentWrapper">
                        {showIframe ? (
                            <iframe src={`/test.html?currentX=${callReceiveData.currentX}&currentY=${callReceiveData.currentY}&destinationX=${callReceiveData.destinationX}&destinationY=${callReceiveData.destinationY}`} title="External Map" style={{
                                marginLeft: '6px',
                                width: '460px',
                                height: '800px',
                                border: 'none'
                            }}></iframe>
                        ) : (
                            <>
                                {viewReceive ? (
                                    <DriverCallReceive
                                        onAccept={handleAcceptCall}
                                        onDeny={handleDenyCall}
                                        callReceiveData={callReceiveData}
                                    />
                                ) : (
                                    <DriverCallWaiting />
                                )}
                            </>
                        )}
                    </div>

                    <div className="basic_Components_bottom">
                        <Basic_Components_bottom />
                    </div>
                </div>
            </div>
        </div>
    );
}