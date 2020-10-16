import React, { useState } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Icon } from 'leaflet'
import * as parkData from './data/skateboard-parks.json'

const skateParkIcon = new Icon({
  iconUrl: '/icons/skate-park.svg',
  iconSize: [25, 25]
})

export default function App() {

  const [activePark, setActivePark] = useState(null)

  return (
    <Map center={[45.421532, -75.697189]} zoom={12} >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        parkData.features.map(park => (
          <Marker
            key={park.properties.PARK_ID}
            position={[
              park.geometry.coordinates[1],
              park.geometry.coordinates[0]
            ]}
            onclick={() =>
              setActivePark(park)
            }
            icon={skateParkIcon}
          />
        ))
      }

      {
        activePark &&
        <Popup
          position={[
            activePark.geometry.coordinates[1],
            activePark.geometry.coordinates[0]
          ]}
          onClose={() => setActivePark(null)}
        >
          <h2>{activePark.properties.NAME}</h2>
          <p>{activePark.properties.DESCRIPTIO}</p>
        </Popup>
      }
    </Map >
  );
}
