import React, { useState } from "react";
import { GoogleMap, InfoWindow, MarkerF } from "@react-google-maps/api";
import { useLoadScript } from "@react-google-maps/api";

const markers = [
  {
    id: 1,
    name: "グリー株式会社",
    position: { lat: 35.658756, lng: 139.731986 },
  },
  {
    id: 2,
    name: "株式会社メルカリ",
    position: { lat: 35.660205, lng: 139.729202 },
  },
  {
    id: 3,
    name: "株式会社カッシーナ・イクスシー",
    position: { lat: 35.6705225, lng: 139.7036485 },
  },
  {
    id: 4,
    name: "㈱ビームス 本社（BEAMS）",
    position: { lat: 35.6706882, lng: 139.6891846 },
  },
];

const key = process.env.NEXT_PUBLIC_API_KEY;

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: key,
  });

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };
  if (isLoaded) {
    return (
      <GoogleMap
        onLoad={handleOnLoad}
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={{ width: "100vw", height: "100vh" }}
      >
        {markers.map(({ id, name, position }) => (
          <MarkerF
            key={id}
            position={position}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker === id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div>{name}</div>
              </InfoWindow>
            ) : null}
          </MarkerF>
        ))}
      </GoogleMap>
    );
  } else {
    return <></>;
  }
}

export default Map;
