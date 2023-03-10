import React, { useEffect, useState } from "react";
import { GoogleMap, InfoWindowF, MarkerF } from "@react-google-maps/api";
import { useLoadScript } from "@react-google-maps/api";

// 地図描画範囲の初期値を設定。今後、ログイン状態ではユーザー位置情報を中心とした描画範囲に設定したい。
const initialBounds = [
  {
    id: 1,
    position: { lat: 35.658756, lng: 139.731986 },
  },
  {
    id: 2,
    position: { lat: 35.660205, lng: 139.729202 },
  },
  {
    id: 3,
    position: { lat: 35.6705225, lng: 139.7036485 },
  },
  {
    id: 4,
    position: { lat: 35.6706882, lng: 139.6891846 },
  },
];

const key = process.env.NEXT_PUBLIC_API_KEY;

function Map(props) {
  // mapが読み込まれているか判定するメソッド
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: key,
  });

  // 検索結果がある場合、検索結果から必要項目を抜き出してmakersに配列として入れる
  const results = props.results;
  const markers = [];
  results?.map((result) => {
    const location = result.location.coordinates;
    markers.push({
      id: result._id,
      name: result.info.name,
      lender: result.lender.company_name,
      position: {
        lat: location[1],
        lng: location[0],
      },
    });
  });

  // InfoWindow(吹き出し)用にどのマーカーがアクティブかを判断する
  const [activeMarker, setActiveMarker] = useState();
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  // mapインスタンスを取得する。
  const [map, setMap] = useState();
  const handleOnLoad = (map) => {
    setMap(map);
  };

  // 検索結果が収まる描画範囲にする。
  useEffect(() => {
    if (map) {
      const bounds = new google.maps.LatLngBounds();
      if (markers.length > 0) {
        markers.forEach(({ position }) => bounds.extend(position));
      } else {
        initialBounds.forEach(({ position }) => bounds.extend(position));
      }
      map.fitBounds(bounds);
    }
  }, [markers]);

  // mapの読み込みが完了(isLoaded = true)の場合mapを描画する
  if (isLoaded) {
    return (
      <GoogleMap
        onLoad={handleOnLoad}
        onClick={() => setActiveMarker()} //
        mapContainerStyle={{ width: "100%", height: "100%" }}
      >
        {markers.map(({ id, name, lender, position }) => (
          <MarkerF
            key={id}
            position={position}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker === id ? (
              <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                <>
                  <p>{name}</p>
                  <p>{lender}</p>
                </>
              </InfoWindowF>
            ) : (
              <></>
            )}
          </MarkerF>
        ))}
      </GoogleMap>
    );
  } else {
    return <></>;
  }
}

export default Map;
