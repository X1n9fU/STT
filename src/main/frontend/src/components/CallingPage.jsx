import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Basic_Components_top from "../Basic_Component_top";
import Basic_Component_bottom from "../Basic_Component_bottom";
import './CallingPage.css';

export default function CallingPage() {

    const [showDriver, setShowDriver] = useState(false);
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
                setShowDriver(true);
            } catch (error) {
                console.error('Error fetching driver data:', error);
            }
        };
        fetchDriverData();
        const intervalId = setInterval(fetchDriverData, 1000);

        return () => {
            clearInterval(intervalId)
        }

    }, []);

    return (
        <div>
            <div className="App" style={{ height: '900px', width: '500px' }}>
                <div className="phone">
                    <div className="screen">
                        <div className="basic_Components_top">
                            <Basic_Components_top />

                        </div>
                        <div>
                            {showDriver ? (
                                <div className="div_head">
                                    <div>
                                        <div
                                            className="profile_info">
                                            <div className="profile"></div>
                                            <div className="name"> {driverInfo.name} 기사님</div>
                                            <div className="phone_number"> {driverInfo.phone}</div>
                                        </div>
                                        <div className="car_info">
                                            <div className="car_number">{driverInfo.carNumber}</div>
                                            <div className="car_type">{driverInfo.carType}</div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>no Call</div>
                            )}
                        </div>
                        <div className="basic_Components_bottom">
                            <Basic_Component_bottom />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

