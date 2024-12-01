// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftProgress from "components/SoftProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import React, { useState, useEffect } from 'react';

export default function data() {

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching data");
        const response = await fetch("http://localhost:8082/portfolios/10000/positions");
        console.log("Request sent");
        console.log("Response ok ? " + response.ok);
        if (!response.ok) throw new Error("Failed to fetch data");
        console.log("Getting json");
        const data = await response.json();
        console.log("Data fetched");

        // Map the fetched data to the format expected by the table
        const formattedRows = data.map((item) => ({
          ticker: [item.logo || logoSpotify, item.ticker],
          quantity: (
            <SoftTypography variant="button" color="text" fontWeight="medium">
              {item.quantity}
            </SoftTypography>
          ),
          averagePrice: (
            <SoftTypography variant="button" color="text" fontWeight="medium">
              ${item.averagePrice}
            </SoftTypography>
          ),
          lastKnownPrice: (
            <SoftTypography variant="button" color="text" fontWeight="medium">
              ${item.lastKnownPrice}
            </SoftTypography>
          ),
        }));
        setRows(formattedRows);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const columns = [
    { name: "ticker", align: "left" },
    { name: "quantity", align: "left" },
    { name: "averagePrice", align: "left" },
    { name: "lastKnownPrice", align: "center" },
  ];

  return { columns, rows };
}