import React from 'react'
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup,Line
  } from "react-simple-maps";
  import 'bootstrap/dist/css/bootstrap.min.css';
  
  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
  
const Mapdata = ({countries,mapdata,setTooltipContent}) => {
    return (
        <div className="map-data bg-dark">
       <ComposableMap projection="geoEqualEarth"
      projectionConfig={{
        scale: 190,
        center: [-40, 30]
      }}>
        <ZoomableGroup zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography key={geo.rsmKey} geography={geo} fill="#EAEAEC"
                stroke="#D6D6DA"
                
               
                
                
                
                />
              ))
            }
          </Geographies>
          {
              countries.map((country,index)=>(
                  
                  <Marker key={index} coordinates={country.latlng}>
                      
                      
                       <g
            fill="none"
            stroke="#FF5533"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(-12, -24)"
          >
            <circle cx="12" cy="10" r="3" />
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
          </g>
          <text
            textAnchor="middle"
            
            style={{ fontFamily: "system-ui", fill: "#5D5A6D",fontSize:"5px"}}
          >
            {country.country}-
            
          </text>

         
                  </Marker>

                  
              ))

          }
  
{
    mapdata.map((cords,index)=>(
        <Line
        key={index}
        from={cords.latlngfrom}
        to={cords.latlongTo}
        stroke="#000"
        strokeWidth={0.5}

        label={index}
        
        
      />
      
    ))
}
{
    console.log({mapdata})
}
      
        </ZoomableGroup>
        
      </ComposableMap>
     
        </div>
    )
}

export default Mapdata
