import React, { useEffect, useState } from "react";
import DepMap from "./DepMap.js";
import './SetArrivalLocation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faKeyboard, faL } from "@fortawesome/free-solid-svg-icons";
import Basic_Components_top from '../Basic_Component_top';
import Basic_Components_bottom from '../Basic_Component_bottom';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SetArrivalLocation() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const xDep = params.get('xDep');
    const yDep = params.get('yDep');
    const depName = params.get('depName');

    const [customDestination, setCustomDestination] = useState('');
    const [destination, setDestination] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달이 열려있는지 여부
    const [buttonText1, setButtonText1] = useState("말로 찾기"); // 좌측 버튼 텍스트 설정하기
    const [buttonText2, setButtonText2] = useState("글로 찾기"); // 우측 버튼 텍스트 설정하기

    const [xDir, setXDir] = useState('');
    const [yDir, setYDir] = useState('');

    const movePage = useNavigate();
    function goCallingPage() {
        movePage('/callingPage');
    };

    const handleOpenModal = () => { // 말로 찾기, 글로 찾기 버튼을 클릭할 경우 실행됨
        setIsModalOpen(true); // 모달의 오픈 여부 true로 설정
    };

    const changeSearch = (placename) => {
        setCustomDestination(placename);
    };
    const changeXdir = (xdir) => {
        setXDir(xdir);
    };
    const changeYdir = (ydir) => {
        setYDir(ydir);
    };
    console.log(xDir, yDir);
    useEffect(() => {
        if (customDestination) {
            setDestination(customDestination); // Set the custom destination
            setIsModalOpen(false);
            setCustomDestination(''); // Clear the input field
            setButtonText1("호출하기"); // 좌측 버튼 텍스트를 "호출하기"로 변경
            setButtonText2("다시 찾기"); // 우측 버튼 텍스트를 "다시 찾기"로 변경
        }
    }, [customDestination]);
    const handleCloseModal = () => { // 띄워져 있는 모달의 닫기 버튼을 클릭할 경우 실행됨
        if (customDestination) { // 입력값이 있는지 확인
            setIsModalOpen(false);
            setDestination(customDestination); // Set the custom destination
            setCustomDestination(''); // Clear the input field
            setButtonText1("호출하기"); // 좌측 버튼 텍스트를 "호출하기"로 변경
            setButtonText2("다시 찾기"); // 우측 버튼 텍스트를 "다시 찾기"로 변경
        } else {
            setIsModalOpen(false); // 모달의 오픈 여부 false로 설정
        }
    };

    useEffect(() => {
        if (destination) {
            setIsModalOpen(false);
        };
    }, [destination]);
    console.log(
        "Dep X: "+xDep+" / Dep Y: "+yDep+" / Arr X: "+xDir+" / Arr Y: "+yDir);
    const handleConfirm = () => { // 모달을 닫고(목적지가 설정되고) 버튼이 변경되었을 때,
        // 좌측 버튼(호출하기)을 클릭할 경우 실행됨
        setIsModalOpen(false);
        goCallingPage();
        sendData();
    };

    const sendData = async () => {
        let body = {
            current : xDep,
            destination : xDir
        };

        try {
            await axios.post('http://3.37.217.126:8080', JSON.stringify(body), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Data sent successfully
            console.log('Data sent successfully');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Call the function to send the data

    const handleResearch = () => { // 모달을 닫고(목적지가 설정되고) 버튼이 변경되었을 때,
        // 우측 버튼(다시 찾기)을 클릭할 경우 실행됨
        setDestination(""); // 목적지(destination)을 ""로 초기화
        setButtonText1("말로 찾기"); // 좌측 버튼(확인하기)의 텍스트를 다시 초기 상태(말로 찾기)로 변경
        setButtonText2("글로 찾기"); // 우측 버튼(다시 찾기)의 텍스트를 다시 초기 상태(글로 찾기)로 변경
    };
    return (
        <div className="App" style={{ height: '900px', width: '500px' }}>
            <div className="phone">
                <div className="screen">
                    <div className="basic_Components_top">
                        <Basic_Components_top />

                    </div>

                    <div className="div_head">
                        <div className="location1">
                            <p>&nbsp;<b>{depName}</b></p> {/* 현 위치도 가져와야 함. 현재는 우선 '가져온 위치 정보'로 고정 */}
                        </div>
                        <div className="arrows"></div>
                        <div className="location2">
                            <p>&nbsp;<b>{destination}</b></p> {/* 목적지를 담는 destination 변수, 현재는 모달을 닫을 경우 '가져온 위치 정보'로 고정 */}
                        </div>
                        {/* 지도. 초기엔 현위치만 뜨고, 목적지 설정이 완료되면 경로를 보여줄 예정. 아직 구현 X */}
                        <div className="buttons">
                            {!destination && ( // 목적지가 아직 설정되지 않았을 때
                                <>
                                    <button
                                        className="btn_depLocationConfirm btn_shareHover"
                                        onClick={handleOpenModal}>
                                        <FontAwesomeIcon icon={faMicrophone} /> {buttonText1} {/* 말로 찾기 버튼 */}
                                    </button>
                                    <button
                                        className="btn_depLocationConfirm btn_shareHover"
                                        onClick={handleOpenModal}>
                                        <FontAwesomeIcon icon={faKeyboard} /> {buttonText2} {/* 글로 찾기 버튼 */}
                                    </button>
                                </>
                            )}
                            {destination && ( // 목적지가 설정되었을 때
                                <>
                                    <button
                                        className="btn_depLocationConfirm"
                                        onClick={handleConfirm}> {buttonText1} {/* 호출하기 버튼 */}
                                    </button>
                                    <button
                                        className="btn_depLocationConfirm"
                                        onClick={handleResearch}> {buttonText2} {/* 다시 찾기 버튼 */}
                                    </button>
                                </>
                            )}
                            {isModalOpen && (
                                <div className="modal-overlay">
                                    <div className="modal">
                                        <button onClick={handleCloseModal}>닫기</button> {/* 닫기 버튼, 누를 경우 목적지(destination)은 임시로 "가져온 위치 정보"로 저장되고 버튼이 변경됨 */}
                                        <DepMap changeSearch={changeSearch} changeXdir={changeXdir} changeYdir={changeYdir} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="basic_Components_bottom">

                        <Basic_Components_bottom />
                    </div>
                </div>
            </div>
        </div>
    );

}