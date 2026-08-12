import {
  AlertTriangle,
  MapPin,
  Navigation,
  Users,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "./LiveMap.css";

type Location = {
  id: number;
  name: string;
  type: "incident" | "shelter" | "team";
  location: string;
  status: string;
  coordinates: [number, number];
};

const locations: Location[] = [
  {
    id: 1,
    name: "Urban Flooding",
    type: "incident",
    location: "Lucknow",
    status: "Critical",
    coordinates: [26.8467, 80.9462],
  },
  {
    id: 2,
    name: "Relief Shelter A",
    type: "shelter",
    location: "Gomti Nagar",
    status: "420 people",
    coordinates: [26.8516, 81.0078],
  },
  {
    id: 3,
    name: "Rescue Team 04",
    type: "team",
    location: "Aliganj",
    status: "Deployed",
    coordinates: [26.8786, 80.9462],
  },
  {
    id: 4,
    name: "Severe Storm",
    type: "incident",
    location: "Kanpur",
    status: "High",
    coordinates: [26.4499, 80.3319],
  },
];

function createMarkerIcon(type: Location["type"]) {
  let background = "#e95867";

  if (type === "shelter") {
    background = "#5d76ff";
  }

  if (type === "team") {
    background = "#43b889";
  }

  const symbol =
    type === "incident"
      ? "⚠"
      : type === "shelter"
        ? "⌖"
        : "✚";

  return L.divIcon({
    className: "custom-map-marker",
    html: `
      <div
        style="
          width:34px;
          height:34px;
          border-radius:50%;
          background:${background};
          border:3px solid rgba(8,11,20,0.85);
          display:flex;
          align-items:center;
          justify-content:center;
          box-shadow:
            0 0 0 5px rgba(255,255,255,0.04),
            0 5px 15px rgba(0,0,0,0.4);
          color:white;
          font-size:14px;
        "
      >
        ${symbol}
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
}

function MapControls() {
  const map = useMap();

  return (
    <div className="map-controls">
      <button
        type="button"
        aria-label="Zoom in"
        onClick={() => map.zoomIn()}
      >
        <ZoomIn size={16} />
      </button>

      <button
        type="button"
        aria-label="Zoom out"
        onClick={() => map.zoomOut()}
      >
        <ZoomOut size={16} />
      </button>
    </div>
  );
}

export default function LiveMap() {
  return (
    <div className="live-map-page">

      <div className="live-map-header">

        <div>
          <p className="page-label">
            REAL-TIME MONITORING
          </p>

          <h1>
            Live Map
          </h1>

          <p className="page-description">
            Monitor incidents, shelters and emergency
            response teams in real time.
          </p>
        </div>

        <div className="map-status">
          <span className="live-dot" />
          Live monitoring
        </div>

      </div>


      <section className="map-card">

        <div className="map-toolbar">

          <div className="map-location">
            <Navigation size={15} />

            <span>
              Uttar Pradesh, India
            </span>
          </div>

        </div>


        <div className="map-container">

          <MapContainer
            center={[26.8467, 80.9462]}
            zoom={8}
            scrollWheelZoom={true}
            zoomControl={false}
            className="leaflet-map"
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            {locations.map((item) => (
              <Marker
                key={item.id}
                position={item.coordinates}
                icon={createMarkerIcon(item.type)}
              >

                <Popup>

                  <strong>
                    {item.name}
                  </strong>

                  <br />

                  {item.location}

                  <br />

                  <strong>
                    {item.status}
                  </strong>

                </Popup>

              </Marker>
            ))}


            <MapControls />

          </MapContainer>


          <div className="map-legend">

            <strong>
              Map Legend
            </strong>

            <div>
              <i className="legend-dot incident" />
              Active Incident
            </div>

            <div>
              <i className="legend-dot shelter" />
              Relief Shelter
            </div>

            <div>
              <i className="legend-dot team" />
              Response Team
            </div>

          </div>

        </div>

      </section>


      <section className="map-locations-card">

        <div className="locations-header">

          <div>

            <h2>
              Nearby Locations
            </h2>

            <p>
              Active emergency resources and incidents
            </p>

          </div>

          <span>
            {locations.length} locations
          </span>

        </div>


        <div className="location-list">

          {locations.map((item) => (

            <div
              className="location-row"
              key={item.id}
            >

              <div
                className={`location-icon ${item.type}`}
              >

                {item.type === "incident" && (
                  <AlertTriangle size={16} />
                )}

                {item.type === "shelter" && (
                  <MapPin size={16} />
                )}

                {item.type === "team" && (
                  <Users size={16} />
                )}

              </div>


              <div className="location-info">

                <strong>
                  {item.name}
                </strong>

                <span>
                  {item.location}
                </span>

              </div>


              <div
                className={`location-status ${item.type}`}
              >
                {item.status}
              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}