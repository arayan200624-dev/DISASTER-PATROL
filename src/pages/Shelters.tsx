import { MapPin, Users, Bed, Phone, AlertCircle } from "lucide-react";
import "../styles/Shelters.css";

interface Shelter {
  id: number;
  name: string;
  location: string;
  capacity: number;
  occupancy: number;
  status: "operational" | "full" | "critical";
  amenities: string[];
  contact: string;
}

const sheltersData: Shelter[] = [
  {
    id: 1,
    name: "Lucknow Relief Center",
    location: "Lucknow, Uttar Pradesh",
    capacity: 500,
    occupancy: 450,
    status: "critical",
    amenities: ["Medical", "Food", "Water", "Bedding"],
    contact: "+91-9876543210",
  },
  {
    id: 2,
    name: "Kanpur Emergency Shelter",
    location: "Kanpur, Uttar Pradesh",
    capacity: 300,
    occupancy: 280,
    status: "full",
    amenities: ["Medical", "Food", "Water", "Sanitation"],
    contact: "+91-9876543211",
  },
  {
    id: 3,
    name: "Nainital Community Hall",
    location: "Nainital, Uttarakhand",
    capacity: 200,
    occupancy: 120,
    status: "operational",
    amenities: ["Food", "Water", "Bedding", "Information Desk"],
    contact: "+91-9876543212",
  },
  {
    id: 4,
    name: "Dehradun Sports Complex",
    location: "Dehradun, Uttarakhand",
    capacity: 600,
    occupancy: 200,
    status: "operational",
    amenities: ["Medical", "Food", "Water", "Bedding", "Power Supply"],
    contact: "+91-9876543213",
  },
  {
    id: 5,
    name: "Delhi Convention Center",
    location: "Delhi Region",
    capacity: 800,
    occupancy: 350,
    status: "operational",
    amenities: [
      "Medical",
      "Food",
      "Water",
      "Bedding",
      "Security",
      "Communication",
    ],
    contact: "+91-9876543214",
  },
];

function Shelters() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "#dc2626";
      case "full":
        return "#ea580c";
      case "operational":
        return "#16a34a";
      default:
        return "#64748b";
    }
  };

  const getOccupancyPercentage = (occupancy: number, capacity: number) => {
    return Math.round((occupancy / capacity) * 100);
  };

  const totalCapacity = sheltersData.reduce((sum, s) => sum + s.capacity, 0);
  const totalOccupancy = sheltersData.reduce((sum, s) => sum + s.occupancy, 0);
  const averageOccupancy = Math.round((totalOccupancy / totalCapacity) * 100);

  return (
    <div className="shelters-page">
      <div className="page-header">
        <div>
          <h1>Shelter Management</h1>
          <p>Real-time monitoring and management of relief shelters</p>
        </div>

        <div className="header-stats">
          <div className="stat-box">
            <MapPin size={20} />
            <div>
              <span>TOTAL SHELTERS</span>
              <strong>{sheltersData.length}</strong>
            </div>
          </div>

          <div className="stat-box">
            <Users size={20} />
            <div>
              <span>TOTAL OCCUPANCY</span>
              <strong>{totalOccupancy.toLocaleString()}</strong>
            </div>
          </div>

          <div className="stat-box">
            <Bed size={20} />
            <div>
              <span>TOTAL CAPACITY</span>
              <strong>{totalCapacity.toLocaleString()}</strong>
            </div>
          </div>

          <div className="stat-box">
            <AlertCircle size={20} />
            <div>
              <span>OCCUPANCY RATE</span>
              <strong>{averageOccupancy}%</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="shelters-grid">
        {sheltersData.map((shelter) => {
          const occupancyPercent = getOccupancyPercentage(
            shelter.occupancy,
            shelter.capacity
          );

          return (
            <div
              key={shelter.id}
              className="shelter-card"
              style={{
                borderTopColor: getStatusColor(shelter.status),
              }}
            >
              <div className="shelter-header">
                <div>
                  <h3>{shelter.name}</h3>
                  <div className="shelter-location">
                    <MapPin size={14} />
                    {shelter.location}
                  </div>
                </div>

                <div
                  className="status-badge"
                  style={{
                    backgroundColor: getStatusColor(shelter.status) + "20",
                    color: getStatusColor(shelter.status),
                  }}
                >
                  {shelter.status.toUpperCase()}
                </div>
              </div>

              <div className="occupancy-section">
                <div className="occupancy-info">
                  <div>
                    <span>Occupancy</span>
                    <strong>
                      {shelter.occupancy} / {shelter.capacity}
                    </strong>
                  </div>
                  <div className="occupancy-percent">{occupancyPercent}%</div>
                </div>

                <div className="occupancy-bar">
                  <div
                    className="occupancy-fill"
                    style={{
                      width: `${occupancyPercent}%`,
                      backgroundColor:
                        occupancyPercent >= 90
                          ? "#dc2626"
                          : occupancyPercent >= 75
                            ? "#ea580c"
                            : "#16a34a",
                    }}
                  />
                </div>
              </div>

              <div className="amenities-section">
                <span className="amenities-label">Available Facilities</span>
                <div className="amenities-list">
                  {shelter.amenities.map((amenity, i) => (
                    <div key={i} className="amenity-tag">
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              <div className="shelter-contact">
                <Phone size={16} />
                <span>{shelter.contact}</span>
              </div>

              <div className="shelter-actions">
                <button className="action-btn primary">View Details</button>
                <button className="action-btn secondary">Manage</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Shelters;
