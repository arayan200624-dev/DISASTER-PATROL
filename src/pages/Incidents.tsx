import { useEffect, useState } from "react";

import {
  AlertTriangle,
  Clock3,
  MapPin,
  MoreHorizontal,
  Users,
  X,
} from "lucide-react";

import "./Incidents.css";

type BackendIncident = {
  id: number;
  title: string;
  description?: string;
  disaster_type: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  location: string;
  status: "ACTIVE" | "RESOLVED";
  reported_by?: string;
  created_at?: string;
  updated_at?: string;
};

type Incident = {
  id: string;
  title: string;
  location: string;
  type: string;
  severity: "Critical" | "High" | "Medium";
  status: "Active" | "Monitoring";
  affected: string;
  time: string;
};

type FormData = {
  title: string;
  description: string;
  disaster_type: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  location: string;
  reported_by: string;
};

function formatSeverity(
  severity: BackendIncident["severity"]
): Incident["severity"] {
  if (severity === "CRITICAL") return "Critical";
  if (severity === "HIGH") return "High";

  return "Medium";
}

function formatStatus(
  status: BackendIncident["status"]
): Incident["status"] {
  if (status === "ACTIVE") return "Active";

  return "Monitoring";
}

function formatTime(createdAt?: string) {
  if (!createdAt) return "Just now";

  const created = new Date(createdAt);
  const now = new Date();

  const difference = Math.floor(
    (now.getTime() - created.getTime()) / 60000
  );

  if (difference < 1) return "Just now";

  if (difference < 60) {
    return `${difference} min ago`;
  }

  const hours = Math.floor(difference / 60);

  if (hours === 1) return "1 hr ago";

  return `${hours} hrs ago`;
}

export default function Incidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    disaster_type: "Flood",
    severity: "MEDIUM",
    location: "",
    reported_by: "",
  });

  // =========================
  // FETCH INCIDENTS
  // =========================

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/incidents"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch incidents");
      }

      const result = await response.json();

      const formattedIncidents: Incident[] =
        result.data.map(
          (incident: BackendIncident) => ({
            id: `INC-${String(incident.id).padStart(
              3,
              "0"
            )}`,

            title: incident.title,

            location: incident.location,

            type: incident.disaster_type,

            severity: formatSeverity(
              incident.severity
            ),

            status: formatStatus(
              incident.status
            ),

            affected: "—",

            time: formatTime(
              incident.created_at
            ),
          })
        );

      setIncidents(formattedIncidents);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load incidents from the server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  // =========================
  // FORM INPUT
  // =========================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // CREATE INCIDENT
  // =========================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.disaster_type ||
      !formData.severity ||
      !formData.location
    ) {
      alert(
        "Please fill in all required fields."
      );

      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        "http://localhost:5000/api/incidents",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to create incident"
        );
      }

      // Close modal
      setShowModal(false);

      // Reset form
      setFormData({
        title: "",
        description: "",
        disaster_type: "Flood",
        severity: "MEDIUM",
        location: "",
        reported_by: "",
      });

      // Reload incidents from MySQL
      await fetchIncidents();
    } catch (err) {
      console.error(
        "Error creating incident:",
        err
      );

      alert(
        err instanceof Error
          ? err.message
          : "Failed to create incident."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // STATISTICS
  // =========================

  const activeIncidents = incidents.filter(
    (incident) =>
      incident.status === "Active"
  ).length;

  const criticalIncidents = incidents.filter(
    (incident) =>
      incident.severity === "Critical"
  ).length;

  const monitoringIncidents = incidents.filter(
    (incident) =>
      incident.status === "Monitoring"
  ).length;

  return (
    <div className="incidents-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="incidents-header">

        <div>

          <p className="page-label">
            DISASTER MANAGEMENT
          </p>

          <h1>
            Incidents
          </h1>

          <p className="page-description">
            Monitor and manage active disaster
            incidents across affected regions.
          </p>

        </div>

        <button
          className="create-incident-button"
          onClick={() => setShowModal(true)}
        >
          + Report Incident
        </button>

      </div>


      {/* =========================
          SUMMARY
      ========================= */}

      <div className="incident-summary">

        <div className="incident-summary-card critical-card">

          <div className="summary-top">

            <span>
              Active Incidents
            </span>

            <div className="summary-icon">
              <AlertTriangle size={15} />
            </div>

          </div>

          <strong>
            {activeIncidents}
          </strong>

          <small>
            Require immediate attention
          </small>

        </div>


        <div className="incident-summary-card">

          <div className="summary-top">

            <span>
              People Affected
            </span>

            <div className="summary-icon">
              <Users size={15} />
            </div>

          </div>

          <strong>
            —
          </strong>

          <small>
            Across all active incidents
          </small>

        </div>


        <div className="incident-summary-card">

          <div className="summary-top">

            <span>
              Critical Incidents
            </span>

            <div className="summary-icon">
              <AlertTriangle size={15} />
            </div>

          </div>

          <strong>
            {criticalIncidents}
          </strong>

          <small>
            Currently requiring response
          </small>

        </div>


        <div className="incident-summary-card">

          <div className="summary-top">

            <span>
              Under Monitoring
            </span>

            <div className="summary-icon">
              <Clock3 size={15} />
            </div>

          </div>

          <strong>
            {monitoringIncidents}
          </strong>

          <small>
            Response teams deployed
          </small>

        </div>

      </div>


      {/* =========================
          INCIDENT TABLE
      ========================= */}

      <section className="incidents-card">

        <div className="incidents-card-header">

          <div>

            <p className="table-label">
              LIVE OPERATIONS
            </p>

            <h2>
              Current Incidents
            </h2>

            <p>
              Live overview of reported disasters
            </p>

          </div>

          <button className="incident-filter">
            All incidents
          </button>

        </div>


        <div className="incident-table">

          <div className="incident-table-header">

            <span>INCIDENT</span>

            <span>SEVERITY</span>

            <span>STATUS</span>

            <span>AFFECTED</span>

            <span>REPORTED</span>

            <span />

          </div>


          {loading && (
            <div
              style={{
                padding: "35px 20px",
                color: "#68738a",
                textAlign: "center",
                fontSize: "11px",
              }}
            >
              Loading incidents...
            </div>
          )}


          {!loading && error && (
            <div
              style={{
                padding: "35px 20px",
                color: "#ff7180",
                textAlign: "center",
                fontSize: "11px",
              }}
            >
              {error}
            </div>
          )}


          {!loading &&
            !error &&
            incidents.length === 0 && (
              <div
                style={{
                  padding: "35px 20px",
                  color: "#68738a",
                  textAlign: "center",
                  fontSize: "11px",
                }}
              >
                No incidents found.
              </div>
            )}


          {!loading &&
            !error &&
            incidents.map((incident) => (

              <div
                className="incident-row"
                key={incident.id}
              >

                <div className="incident-name">

                  <div
                    className={`incident-icon ${incident.severity.toLowerCase()}`}
                  >
                    <AlertTriangle size={17} />
                  </div>

                  <div className="incident-details">

                    <strong>
                      {incident.title}
                    </strong>

                    <span className="incident-location">

                      <MapPin size={11} />

                      {incident.location}

                    </span>

                    <small>
                      {incident.id} ·{" "}
                      {incident.type}
                    </small>

                  </div>

                </div>


                <div className="severity-column">

                  <span
                    className={`severity ${incident.severity.toLowerCase()}`}
                  >
                    {incident.severity}
                  </span>

                </div>


                <div className="status-column">

                  <span
                    className={`incident-status ${incident.status.toLowerCase()}`}
                  >

                    <i />

                    {incident.status}

                  </span>

                </div>


                <div className="affected">

                  <Users size={14} />

                  <span>
                    {incident.affected}
                  </span>

                </div>


                <div className="reported-time">

                  <Clock3 size={13} />

                  <span>
                    {incident.time}
                  </span>

                </div>


                <button
                  className="incident-more"
                  aria-label="Incident options"
                >
                  <MoreHorizontal size={18} />
                </button>

              </div>

            ))}

        </div>

      </section>


      {/* =========================
          REPORT INCIDENT MODAL
      ========================= */}

      {showModal && (

        <div
          className="incident-modal-overlay"
          onClick={() => {
            if (!submitting) {
              setShowModal(false);
            }
          }}
        >

          <div
            className="incident-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="incident-modal-header">

              <div>

                <p className="modal-label">
                  DISASTER RESPONSE
                </p>

                <h2>
                  Report Incident
                </h2>

                <p>
                  Add a new incident to the
                  disaster management system.
                </p>

              </div>

              <button
                className="modal-close"
                onClick={() =>
                  !submitting &&
                  setShowModal(false)
                }
                aria-label="Close"
              >
                <X size={19} />
              </button>

            </div>


            {/* FORM */}

            <form
              className="incident-form"
              onSubmit={handleSubmit}
            >

              {/* TITLE */}

              <div className="form-group">

                <label>
                  Incident Title *
                </label>

                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Urban Flooding"
                  required
                />

              </div>


              {/* TYPE + SEVERITY */}

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Disaster Type *
                  </label>

                  <select
                    name="disaster_type"
                    value={
                      formData.disaster_type
                    }
                    onChange={handleChange}
                    required
                  >

                    <option value="Flood">
                      Flood
                    </option>

                    <option value="Storm">
                      Storm
                    </option>

                    <option value="Wildfire">
                      Wildfire
                    </option>

                    <option value="Earthquake">
                      Earthquake
                    </option>

                    <option value="Landslide">
                      Landslide
                    </option>

                    <option value="Cyclone">
                      Cyclone
                    </option>

                    <option value="Tsunami">
                      Tsunami
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>


                <div className="form-group">

                  <label>
                    Severity *
                  </label>

                  <select
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    required
                  >

                    <option value="LOW">
                      Low
                    </option>

                    <option value="MEDIUM">
                      Medium
                    </option>

                    <option value="HIGH">
                      High
                    </option>

                    <option value="CRITICAL">
                      Critical
                    </option>

                  </select>

                </div>

              </div>


              {/* LOCATION */}

              <div className="form-group">

                <label>
                  Location *
                </label>

                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Lucknow, Uttar Pradesh"
                  required
                />

              </div>


              {/* REPORTED BY */}

              <div className="form-group">

                <label>
                  Reported By
                </label>

                <input
                  name="reported_by"
                  value={formData.reported_by}
                  onChange={handleChange}
                  placeholder="e.g. Disaster Control Team"
                />

              </div>


              {/* DESCRIPTION */}

              <div className="form-group">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the incident..."
                  rows={4}
                />

              </div>


              {/* ACTIONS */}

              <div className="incident-form-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() =>
                    !submitting &&
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="submit-incident-button"
                  disabled={submitting}
                >
                  {submitting
                    ? "Reporting..."
                    : "Report Incident"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}