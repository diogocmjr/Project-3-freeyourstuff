import React, { useState, useRef } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

export default function Map(props) {
  const [viewport, setViewport] = useState({
    latitude: 52.52,
    longitude: 13.24,
    width: '100vw',
    height: 'calc(100vh - 134px)',
    zoom: 9
  }); 

  const[selectedItem, setSelectedItem] = useState(null)
  const mapRef = useRef();
  const accessToken = "pk.eyJ1IjoidHJhbnNpcmVudCIsImEiOiJja255bXRtZGowbHF0MnBvM3U4d2J1ZG5vIn0.IVcxB9Xw6Tcc8yHGdK_0zA"

  return (
    <div style={{marginTop:'67px', paddingTop: '20px'}}>
      <ReactMapGL 
        ref={mapRef}
        {...viewport} 
        mapboxApiAccessToken={accessToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        <Geocoder 
          mapRef={mapRef}
          onViewportChange={viewport => {
          setViewport(viewport);
          }}
          mapboxApiAccessToken={accessToken}
          position="top-right"
          zoom={15}
        />
        {props.filteredItems.filter(item => item.coordinates.length > 0)
          .map(item => (
            <Marker 
              key={item._id} 
              latitude={item.coordinates[1]}
              longitude={item.coordinates[0]}
            >
              <button className="marker-btn" onClick={(e) => {
                e.preventDefault();
                setSelectedItem(item);
              }}>
                <img src="/mapbox-icon.png" alt="" />
              </button>
            </Marker>
          ))}

        {selectedItem && (
          <Popup 
            latitude={selectedItem.coordinates[1]} 
            longitude={selectedItem.coordinates[0]}
            onClose={() => {
              setSelectedItem(null)
            }}
          >
            <div>
              <h2>{selectedItem.title}</h2>
              <p>{selectedItem.description}</p>
              <p>{selectedItem.owner.username}</p>
            </div>
          </Popup>
        )}
      </ReactMapGL>     
    </div>
  )
}
