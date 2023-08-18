import Map from './Map'
import './DepartureLocation.css'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Basic_Components_top from '../Basic_Component_top';
import Basic_Components_bottom from '../Basic_Component_bottom';
import axios from 'axios';
const { kakao } = window;

export default function DepartureLocation() {
    const movePage = useNavigate();
    const [detailAddr, setDetailAddr] = useState("");
    const [xDep, setXDir] = useState('');
    const [yDep, setYDir] = useState('');

    const sendData = async () => {
        let body = {
            currentX : xDep,
            currentY : yDep
        };
        try {
            await axios.post('/taxi/call', body);

            // Data sent successfully
            console.log('Data sent successfully');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    function goSetArrivalLocation() {
        movePage(`/arrivalLocation?xDep=${xDep}&yDep=${yDep}&depName=${detailAddr}`);
    }
    function goCallingPage() {
        console.log('sendData 이전 - xDep:', xDep, 'yDep:', yDep);
        sendData();
        movePage('/callingPage');
    };

    function handleDetailAddrChange(newDetailAddr) {
        setDetailAddr(newDetailAddr);
    }
    const changeDir = (dir) => {
        setXDir(dir.getLng());
        setYDir(dir.getLat());
    }
    console.log(xDep, yDep);

    return (
        <div className="App" style={{ height: '900px', width: '500px' }}>
            <div className="phone">
                <div className="screen">
                    <div className="basic_Components_top">
                        <Basic_Components_top />
                    </div>
                    <div className="div_head">
                        <div>
                            <p className="par_depLocationAsk1">어디서 출발하시나요?</p>
                            <p className="par_depLocationAsk2">지도를 움직여보세요!</p>
                        </div>
                        <Map
                            className="map1"
                            onDetailAddrChange={handleDetailAddrChange}
                            changeDir={changeDir}
                        />
                        <div>
                            {/*<div className="location_t">내 위치 &nbsp; </div>*/}
                            <div className="location_c">{detailAddr}</div> {/* 현 위치도 가져와야 함. 현재는 우선 '가져온 위치 정보'로 고정 */}
                        </div>
                        <div className="buttons">
                            <button className="btn_depLocationConfirm1" onClick={()=> {
                                goCallingPage();
                            }}>택시 부르기</button>
                            <button className="btn_depLocationConfirm2" onClick={()=> {
                                goSetArrivalLocation();
                            }}>목적지 입력하기</button>
                        </div>
                    </div>

                    <div className="basic_Components_bottom">

                        <Basic_Components_bottom />
                    </div>
                </div>
            </div>
        </div>
    )
}