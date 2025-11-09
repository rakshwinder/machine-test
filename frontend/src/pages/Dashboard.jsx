import { useEffect, useState } from "react";
import DigitalClock from "../components/DigitalClock";
import "../style/dashboard.css";
import axios from "axios";
import { BASE_URL } from "../../config/constant";

function Dashboard() {
  const [roots, setRoots] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/person/getAllPersons`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          const rootNodes = res.data.data.filter((p) => p.parent === null);
          setRoots(rootNodes);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const TreeNode = ({ person, level = 0 }) => {
    const indent = level * 35; 

    return (
      <div style={{ marginLeft: `${indent}px`, padding: "4px 0" }}>
        <div>
          {level > 0 && (
            <span style={{ color: "#95a5a6", marginRight: "8px" }}>└─</span>
          )}
          <span style={{ fontWeight: level === 0 ? "bold" : "normal", color: level === 0 ? "#1a73e8" : "#2c3e50" }}>
            {person.name}
          </span>
        </div>

        {person.children && person.children.length > 0 && (
          <div>
            {person.children.map((child) => (
              <TreeNode key={child._id} person={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome to Dashboard</h2>

      <div className="digital-clock-container">
        <DigitalClock />
      </div>

      <div className="hierarchy-container">
        <h3>Family Hierarchy</h3>
        {roots.length > 0 ? (
          <div style={{ padding: "10px 0", fontFamily: "monospace", lineHeight: "1.6" }}>
            {roots.map((root) => (
              <TreeNode key={root._id} person={root} level={0} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", color: "#7f8c8d", padding: "20px" }}>
            Loading hierarchy...
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;