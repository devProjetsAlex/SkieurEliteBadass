import React, {useState, useEffect} from 'react';
import ReactMapGl, {Marker, Popup} from 'react-map-gl'
import * as parkData from "./data/skateboard-parks.json"
import './index.scss'

export default function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 46.80768228820832,
    longitude: -71.227009767104,
    zoom: 10
  });

  const [selectedPark, setSelectedPark] = useState(null)

  useEffect(() => {
    const listener = e => {
        if (e.key ==='Escape') {setSelectedPark(null)}
        if (e.window.onClick ==='onClick') {setSelectedPark(null)}
    }
    window.addEventListener("keydown", listener)

    return () => {
      window.removeEventListener("keydown", listener)
    }

  }, [])

  return (
    <div>
    <ReactMapGl
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/devprojetsalex/ck6uzs6ev03m81jnr03wu7wqr"
          onViewportChange={viewport => {
            setViewport(viewport)
          }}
      >
         {parkData.features.map((park)=>(
           <Marker
           key={park.properties.PARK_ID}
           latitude={park.geometry.coordinates[1]}
           longitude={park.geometry.coordinates[0]}
           >
             <button className='marker-btn' onClick={(e)=> {
               e.preventDefault();
               setSelectedPark(park)
             }}>
               <img src="/skateboarding.svg" alt='Skate Park Icon'/>
             </button>
           </Marker>
         ))}

         {selectedPark ? (
           <Popup
           latitude={selectedPark.geometry.coordinates[1]}
           longitude={selectedPark.geometry.coordinates[0]}
           onClose={() => setSelectedPark(null)}
           >
             <div>
         <h2>{selectedPark.properties.NAME}</h2>
         <p>{selectedPark.properties.DESCRIPTIO}</p>
             </div>
           </Popup>
         ) : null}
    </ReactMapGl>
   </div>
  )
}