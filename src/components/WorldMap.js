import React from "react";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const WorldMap = ({handleClick, setTooltipContent, filteredByCountry}) => {

    return (
        <ComposableMap data-tip="" projectionConfig={{
            scale: 200,
            rotation: [-10, 0, 0],
        }}>
            <ZoomableGroup>
                <Geographies geography={geoUrl}>
                    {({geographies}) =>
                        geographies.map(geo => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                onClick={() => handleClick(geo)}
                                onMouseEnter={() => {
                                    const {NAME} = geo.properties;
                                    setTooltipContent(`${NAME}`);
                                }}
                                onMouseLeave={() => {
                                    setTooltipContent("");
                                }}
                                style={{
                                    default: {
                                        fill: geo.properties.ISO_A2 === filteredByCountry ?
                                            "#E42" : "#D6D6DA",
                                        outline: "none"
                                    },
                                    hover: {
                                        fill: "#F53",
                                        outline: "none"
                                    },
                                    pressed: {
                                        fill: "#E42",
                                        outline: "none"
                                    }
                                }}
                            />
                        ))
                    }
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
    );
};


export default WorldMap;