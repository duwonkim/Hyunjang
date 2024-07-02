import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 기본 마커 아이콘을 설정 (이 부분은 Leaflet의 기본 아이콘 설정 문제를 해결하기 위해 필요)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// 지역명과 해당 좌표를 매핑하는 객체
const locationCoordinates = {
  서울: [37.5665, 126.9780],
  부산: [35.1796, 129.0756],
  인천: [37.4563, 126.7052],
  대전: [36.3504, 127.3845],
  광주: [35.1595, 126.8526],
  울산: [35.5396, 129.3115],
  수원: [37.2636, 127.0286],
  성남: [37.4204, 127.1269],
  고양: [37.6584, 126.8320],
  용인: [37.2411, 127.1776],
  창원: [35.2279, 128.6811],
  부천: [37.5037, 126.7660],
  안산: [37.3219, 126.8309],
  남양주: [37.6367, 127.2165],
  천안: [36.8151, 127.1139],
  전주: [35.8242, 127.1480],
  대구: [35.8722, 128.6025]
};

const MapComponent = ({ initialCoords }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(initialCoords, 13);
  }, [initialCoords, map]);

  return null;
};

const Map = ({ location, resetMap }) => {
  const initialCoords = locationCoordinates[location] || [37.5665, 126.9780]; // 서울을 기본 좌표로 설정
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
      resetMap(mapRef.current, initialCoords);
    }
  }, [resetMap, initialCoords]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '200px' }}>
      <MapContainer center={initialCoords} zoom={13} style={{ height: "100%", width: "100%" }} ref={mapRef}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={initialCoords}>
          <Popup>
            {location}
          </Popup>
        </Marker>
        <MapComponent initialCoords={initialCoords} />
      </MapContainer>
    </div>
  );
};

export default Map;
