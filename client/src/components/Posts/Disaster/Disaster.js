import React, { useState, useEffect } from "react";
import Axios from "axios";

import "./Disaster.css";

function Disasters() {
  const [disasterList, setDisasterList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/disaster/all").then((response) => {
      setDisasterList(response.data);
    });
  }, []);

  return (
    <div className="Disasters">
      {disasterList.map((val) => {
        if (val.active) {
          return (
            <h3>
              Type: {val.type} | Date: {val.date.slice(0, 10)} | Location:{" "}
              {val.location}
            </h3>
          );
        }
      })}
    </div>
  );
}

export default Disasters;
