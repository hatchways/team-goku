import React, { Component } from "react";
import "../App.css";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import leafGreen from "../assets/leaf-green.png";
import leafShadow from "../assets/leaf-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greenIcon: {
        lat: props.lat,
        lng: props.long,
      },

      zoom: 4.4,
    };
  }

  greenIcon = L.icon({
    iconUrl: leafGreen,
    shadowUrl: leafShadow,
    iconSize: [38, 95],
    shadowSize: [50, 64],
    iconAnchor: [22, 64],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  });

  render() {
    const positionGreenIcon = [
      this.state.greenIcon.lat,
      this.state.greenIcon.lng,
    ];

    return (
      <Map
        className="map"
        center={positionGreenIcon}
        zoom={this.state.zoom}
        style={{ fillColor: "yellow" }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={positionGreenIcon}
          //icon={this.greenIcon}
          onMouseOver={(e) => {
            e.target.openPopup();
          }}
          onMouseOut={(e) => {
            e.target.closePopup();
          }}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default Location;
