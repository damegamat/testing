import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const REACT_APP_MAPBOX_KEY =
  "pk.eyJ1IjoiZGVyYXJ0IiwiYSI6ImNrOGxwZTZsNzA1Y3Iza3F6c2Nka3FkOWIifQ.J7GaxL6EWcBH_vPAo8eOpw";

const Map = () => {
  const styles = {
    height: "100%",
    width: "100%",
    display: "block",
  };
  const sidebarStyle = {
    display: "inline-block",
    position: "absolute",
    top: "0",
    left: "0",
    margin: "12px",
    backgroundColor: "#404040",
    color: "#ffffff",
    padding: "6px",
    fontWeight: "bold",
    zIndex: "1",
  };

  const [map, setMap] = useState(null);
  const [mapInfo, setMapInfo] = useState({ lng: 0, lat: 0, zoom: 0 });
  const mapContainer = useRef(null);

  const [geojson, setGeojson] = useState({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          title: "mapBox",
          description: "San Fran",
        },
        geometry: {
          type: "Point",
          coordinates: [50.53, 50.18],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "mapBox",
          description: "San Fran",
        },
        geometry: {
          type: "Point",
          coordinates: [55.53, 50.18],
        },
      },
    ],
  });

  useEffect(() => {
    mapboxgl.accessToken = REACT_APP_MAPBOX_KEY;
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [mapInfo.lng, mapInfo.lat],
        zoom: mapInfo.zoom,
      });

      map.on("load", () => {
        geojson.features.forEach((marker) => {
          // create a HTML element for each feature
          let el = document.createElement("div");
          el.className = `marker`;

          //   let el = <span className="marker"></span>;
          // make a marker for each feature and add to the map
          new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(
                  "<h3>" +
                    marker.properties.title +
                    "</h3><p>" +
                    marker.properties.description +
                    "</p>"
                )
            )
            .addTo(map);
        });

        setMap(map);
        map.resize();

        map.on("move", () => {
          setMapInfo({
            lng: map.getCenter().lng.toFixed(4),
            lat: map.getCenter().lat.toFixed(4),
            zoom: map.getZoom().toFixed(2),
          });
        });
      });
      map.on("click", (e) => {
        console.log("LOG:", e);
        const obj = {
          type: "Feature",
          properties: {
            title: "mapBox",
            description: "San Frank",
          },
          geometry: {
            type: "Point",
            coordinates: [e.lngLat.lng, e.lngLat.lat],
          },
        };

        const features = [...geojson.features, obj];

        setGeojson({ ...geojson, features });
        // initializeMap({ setMap, mapContainer });
        console.log(geojson);
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [geojson]);
  console.log(geojson);
  return (
    <div style={styles}>
      <div>
        <div style={sidebarStyle}>
          Longitude: {mapInfo.lng} | Latitude: {mapInfo.lat} | Zoom:
          {mapInfo.zoom}
        </div>
      </div>
      <div ref={(el) => (mapContainer.current = el)} style={styles} />
    </div>
  );
};

export default Map;

// import React, { useRef, useState, useEffect } from "react";
// import styled from "styled-components";
// import mapboxgl from "mapbox-gl";

// mapboxgl.accessToken =
//   "pk.eyJ1IjoiZGVyYXJ0IiwiYSI6ImNrOGxwZTZsNzA1Y3Iza3F6c2Nka3FkOWIifQ.J7GaxL6EWcBH_vPAo8eOpw";

// const S = {
//   Map: styled.div`
//     width: 100%;
//     height: 500px;
//     position: relative;
//   `,
//   MapContent: styled.div`
//     position: absolute;
//     top: 0;
//     right: 0;
//     left: 0;
//     bottom: 0;
//   `,
//   Button: styled.button`
//     margin: 10px 0 0 10px;
//     float: left;
//     font: bold 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
//     background-color: #3386c0;
//     color: #fff;
//     position: absolute;
//     z-index: 1;
//     border: none;
//     display: block;
//     cursor: pointer;
//     padding: 8px 20px;
//     border-radius: 3px;

//     &:hover {
//       background-color: #4ea0da;
//     }
//   `,
// };

// const Map = ({
//   onPolygonCreated = () => {},
//   point,
//   polygon,
//   hideZoomTo = false,
// }) => {
//   const mapContainer = useRef(null);
//   const [mapPointer, setMapPointer] = useState(null);
//   const [viewport, setViewport] = useState({
//     lng: 152.847,
//     lat: -27.68,
//     zoom: 13,
//   });
//   let map;
//   useEffect(() => {
//     map = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [viewport.lng, viewport.lat],
//       zoom: viewport.zoom,
//     });

//     setMapPointer(map);

//     const draw = new window.MapboxDraw({
//       displayControlsDefault: false,
//       controls: {
//         trash: true,
//         point: true,
//       },
//     });

//     map.addControl(draw);

//     map.on("load", () => {
//       if (point) {
//         map.addLayer({
//           id: point.id,
//           type: "circle",
//           source: {
//             type: "geojson",
//             data: point,
//           },
//           paint: {
//             "circle-color": "#f1f075",
//             "circle-radius": 10,
//           },
//         });
//       }
//     });

//     // setMap(map);
//     map.resize();

//     // map.addControl(new mapboxgl.NavigationControl());

//     if (polygon) {
//       const { coordinates, type } = polygon.geometry;
//       if (type !== "Point") {
//         const bounds = new mapboxgl.LngLatBounds();
//         console.log(bounds);
//         coordinates[0].forEach((coords) => bounds.extend(coords));
//         map.fitBounds(bounds, { padding: 150 });
//       } else {
//         map.flyTo({
//           center: coordinates,
//           essential: true,
//         });
//       }
//     }
//   }, [polygon]);

//   const zoomTo = () => {
//     const { coordinates, type } = polygon.geometry;
//     if (type !== "Point") {
//       const bounds = new mapboxgl.LngLatBounds();
//       coordinates[0].forEach((coords) => bounds.extend(coords));
//       mapPointer.fitBounds(bounds, { padding: 150 });
//     } else {
//       mapPointer.flyTo({
//         center: coordinates,
//         essential: true,
//       });
//     }
//   };

//   return (
//     <S.Map>
//       <S.MapContent ref={mapContainer}></S.MapContent>
//       {polygon && !hideZoomTo && (
//         <S.Button onClick={zoomTo} id="zoom-to">
//           Zoom to
//         </S.Button>
//       )}
//     </S.Map>
//   );
// };

// export default Map;
