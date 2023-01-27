import React, { useEffect, useState } from "react";
import { GoogleMap, InfoWindow, MarkerF } from "@react-google-maps/api";
import { useLoadScript } from "@react-google-maps/api";

// const markers = [
//   {
//     id: 1,
//     name: "グリー株式会社",
//     position: { lat: 35.658756, lng: 139.731986 },
//   },
//   {
//     id: 2,
//     name: "株式会社メルカリ",
//     position: { lat: 35.660205, lng: 139.729202 },
//   },
//   {
//     id: 3,
//     name: "株式会社カッシーナ・イクスシー",
//     position: { lat: 35.6705225, lng: 139.7036485 },
//   },
//   {
//     id: 4,
//     name: "㈱ビームス 本社（BEAMS）",
//     position: { lat: 35.6706882, lng: 139.6891846 },
//   },
// ];

const key = process.env.NEXT_PUBLIC_API_KEY;

function Map(props) {
  
  // mapが読み込まれているか判定するメソッド
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: key,
  });
  
  // 検索結果がある場合、検索結果から必要項目を抜き出してmakersに配列として入れる
  const results= props.results
  console.log(results)
  const markers = [];
  results?.map((reult) => {
    console.log("reult._id",reult._id);
    console.log("reult.info.name",reult.info.name);
    console.log("lat",reult.location[0]);
    console.log("lng",reult.location[1]);
    
    markers.push({"id":reult._id,"name":reult.info.name,"position":{"lat":reult.location[0],"lng":reult.location[1]}})
  })
  console.log("markers",markers)
  // if (markers.length > 0){
  //   const bounds = new google.maps.LatLngBounds();
  //   markers.forEach(({ position }) => bounds.extend(position)); // 各物品の位置情報を描画範囲に追加する
  //   map.fitBounds(bounds);
  // }

  // InfoWindow(吹き出し)用にどのマーカーがアクティブかを判断する
  const [activeMarker, setActiveMarker] = useState();
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    console.log(marker)
    setActiveMarker(marker);
  };

  // mapの描画範囲を決める。描画範囲boundsに
  // [bounds, setBounds] = useState(); 
  const center = { lat: 35.6585805, lng: 139.7432389 }
  
  // const handleOnLoad = (map) => {
  //   const bounds = new google.maps.LatLngBounds();
  //   markers.forEach(({ position }) => bounds.extend(position)); // 各物品の位置情報を描画範囲に追加する
  //   map.fitBounds(bounds);
  // };

  // mapの読み込みが完了(isLoaded = true)の場合mapを描画する
  if (isLoaded) {
    return (
      <GoogleMap
        center={center}
        zoom={16}
        onClick={() => setActiveMarker()} // 
        mapContainerStyle={{ width: "70vw", height: "50vh" }}
      >
        {markers.map(({ id, name, position }) => (
          <MarkerF
            key={id}
            position={position}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker === id ? (
              <InfoWindow onCloseClick={() => setActiveMarker()}>
                <div>{name}</div>
              </InfoWindow>
            ) : <></>}
          </MarkerF>
        ))}
      </GoogleMap>
    );
  } else {
    return <></>;
  }
}

export default Map;
