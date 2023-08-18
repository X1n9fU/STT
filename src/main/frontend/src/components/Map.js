import React, { useEffect, useState } from "react";
import DepartureLocation from "./DepartureLocation";
const { kakao } = window;

export default function Map({ onDetailAddrChange, changeDir }) {

    useEffect(() => {
        var lat;
        var lon;
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 1
        };

        var geocoder = new kakao.maps.services.Geocoder();

        // Initialize the map
        var map = new kakao.maps.Map(container, options);

        // Initialize the marker
        var marker = new kakao.maps.Marker({
            map: map
        });

        // Function to update marker's position and address
        function updateMarkerPosition(coords) {
            marker.setPosition(coords);

            // Get detailed address from coordinates
            searchDetailAddrFromCoords(coords, function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    var detailAddr = !!result[0].road_address ? result[0].road_address.address_name :
                        result[0].address.address_name;
                        onDetailAddrChange(detailAddr);
                }
            });
        }

        // Function to get detailed address from coordinates
        function searchDetailAddrFromCoords(coords, callback) {
            geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }

        // Set initial marker position and address
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                lat = position.coords.latitude;
                lon = position.coords.longitude;
                var locPosition = new kakao.maps.LatLng(lat, lon);
                updateMarkerPosition(locPosition);
                map.setCenter(locPosition);
            });
        } else {
            var locPosition = new kakao.maps.LatLng(37.468060, 127.039513);
            alert('현재 위치를 찾을 수 없습니다!');
        }

        // Listen for map's center_changed event
        kakao.maps.event.addListener(map, 'center_changed', function (position) {
            var center = map.getCenter();
            updateMarkerPosition(center);
            changeDir(center);
        });
    }, []);
    return (
        <>
            <div id="map" style={{ width: '400px', height: '250px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}></div>
        </>
    )
}
