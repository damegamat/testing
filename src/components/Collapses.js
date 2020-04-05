/*eslint-disable*/
import React, { useState, useEffect, useReff } from "react";

import mapboxgl from "mapbox-gl";

// or "const mapboxgl = require('mapbox-gl');"

// reactstrap components
import { Card, CardHeader, CardBody, Collapse, Container } from "reactstrap";
import Map from "components/Map";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGVyYXJ0IiwiYSI6ImNrOGxwZTZsNzA1Y3Iza3F6c2Nka3FkOWIifQ.J7GaxL6EWcBH_vPAo8eOpw";

const Collapses = () => {
  let pageHeader = React.createRef();
  const [dataMap, setDataMap] = useState({ lng: 5, lat: 34, zoom: 2 });
  // let mapContainer = useReff(null);

  useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
    // const initializeMap = (mapContainer) => {
    //   const map = new mapboxgl.Map({
    //     container: mapContainer.current,
    //     style: "mapbox://styles/mapbox/streets-v11",
    //     center: [dataMap.lng, dataMap.lat],
    //     zoom: dataMap.zoom,
    //   });
    // };
  });
  // collapse states and functions
  const [collapses, setCollapses] = useState([]);
  const [flag, setFlag] = useState(false);
  const changeCollapse = (collapse) => {
    if (collapses.includes(collapse)) {
      setCollapses(collapses.filter((prop) => prop !== collapse));
    } else {
      setCollapses([...collapses, collapse]);
    }
  };

  return (
    <>
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/header.jpg") + ")",
          }}
          ref={pageHeader}
        ></div>
        {/* <div ref={(el) => (mapContainer = el)} className="mapContainer" /> */}
        <Container>
          <div id="acordeon">
            <div aria-multiselectable={true} id="accordion" role="tablist">
              <Card className="no-transition" className="color">
                <CardHeader
                  className="card-collapse"
                  id="headingOne"
                  role="tab"
                >
                  <h5 className="mb-0 panel-title">
                    <a
                      aria-expanded={collapses.includes(1)}
                      className="collapsed"
                      data-parent="#accordion"
                      href="#pablo"
                      id="collapseOne"
                      onClick={(e) => {
                        e.preventDefault();
                        changeCollapse(1);
                      }}
                    >
                      Map
                      <i className="nc-icon nc-minimal-down" />
                    </a>
                  </h5>
                </CardHeader>
                <Collapse isOpen={collapses.includes(1)}>
                  <CardBody className="size">
                    <Map />
                  </CardBody>
                </Collapse>
                <CardHeader
                  className="card-collapse"
                  id="headingTwo"
                  role="tab"
                >
                  <h5 className="mb-0 panel-title">
                    <a
                      aria-controls="collapseTwo"
                      aria-expanded={collapses.includes(2)}
                      className="collapsed"
                      data-parent="#accordion"
                      href="#pablo"
                      id="collapseTwo"
                      onClick={(e) => {
                        e.preventDefault();
                        changeCollapse(2);
                      }}
                    >
                      added locations
                      <i className="nc-icon nc-minimal-down" />
                    </a>
                  </h5>
                </CardHeader>
                <Collapse isOpen={collapses.includes(2)}>
                  <CardBody>
                    Anim pariatur cliche reprehenderit, enim eiusmod high life
                    accusamus terry richardson ad squid. 3 wolf moon officia
                    aute, non cupidatat skateboard dolor brunch. Food truck
                    quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
                    sunt aliqua put a bird on it squid single-origin coffee
                    nulla assumenda shoreditch et. Nihil anim keffiyeh
                    helvetica, craft beer labore wes anderson cred nesciunt
                    sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    Leggings occaecat craft beer farm-to-table, raw denim
                    aesthetic synth nesciunt you probably haven't heard of them
                    accusamus labore sustainable VHS.
                  </CardBody>
                </Collapse>
              </Card>
            </div>
            {/* end acordeon */}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Collapses;
