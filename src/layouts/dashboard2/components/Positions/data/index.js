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

import React, { useState, useEffect } from "react";

export default function data() {
  const [rows, setRows] = useState([]);
  const [updatedRowId, setUpdatedRowId] = useState(null); // Track the updated row ID for flashing
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const logos = [logoXD, logoAtlassian, logoSlack, logoSpotify, logoJira, logoInvesion];

  // Utility function to get a random logo
  const getRandomLogo = () => logos[Math.floor(Math.random() * logos.length)];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8082/portfolios/10000/positions");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();

        // Map the fetched data to the format expected by the table
        const formattedRows = data.map((item) => ({
          id: item.id, // Add a unique identifier
          ticker: [getRandomLogo(), item.ticker],
          quantity: item.quantity,
          averagePrice: item.averagePrice,
          lastKnownPrice: item.lastKnownPrice,
        }));
        setRows(formattedRows);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up SSE connection
    const eventSource = new EventSource("http://localhost:8082/sse/portfolios/10000/positions");

    eventSource.onmessage = (event) => {
      const updatedPosition = JSON.parse(event.data); // Assuming SSE data is JSON
      console.log("Received SSE update:", updatedPosition);


      setRows((prevRows) => {
        const existingRowIndex = prevRows.findIndex((row) => row.id === updatedPosition.id);
      
        if (existingRowIndex !== -1) {
          // Update the existing row
          return prevRows.map((row) =>
            row.id === updatedPosition.id
              ? {
                  ...row,
                  ...updatedPosition,
                  ticker: [
                    row.ticker[0], // Preserve the existing logo
                    updatedPosition.ticker || row.ticker[1], // Update ticker name if provided
                  ],
                }
              : row
          );
        } else {
          // Add new row
          return [
            ...prevRows,
            {
              id: updatedPosition.id,
              ticker: [getRandomLogo(), updatedPosition.ticker], // Assign a random logo only for new rows
              quantity: updatedPosition.quantity,
              averagePrice: updatedPosition.averagePrice,
              lastKnownPrice: updatedPosition.lastKnownPrice,
            },
          ];
        }
      });

      // Trigger flash effect for the updated or newly added row
      setUpdatedRowId(updatedPosition.id);
      setTimeout(() => setUpdatedRowId(null), 1000); // Reset after 1 second
    };

    eventSource.onerror = (err) => {
      console.error("SSE connection error:", err);
      eventSource.close();
    };

    // Cleanup on component unmount
    return () => eventSource.close();
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

  // Add flashing effect to rows
  const formattedRows = rows.map((row) => ({
    ...row,
    quantity: (
      <SoftTypography
        variant="button"
        color="text"
        fontWeight="medium"
        className={row.id === updatedRowId ? "flash-green" : ""}
      >
        {row.quantity}
      </SoftTypography>
    ),
    averagePrice: (
      <SoftTypography
        variant="button"
        color="text"
        fontWeight="medium"
        className={row.id === updatedRowId ? "flash-green" : ""}
      >
        {parseFloat(row.averagePrice).toFixed(2)}
      </SoftTypography>
    ),
    lastKnownPrice: (
      <SoftTypography
        variant="button"
        color="text"
        fontWeight="medium"
        className={row.id === updatedRowId ? "flash-green" : ""}
      >
        {parseFloat(row.lastKnownPrice).toFixed(2)}
      </SoftTypography>
    ),
  }));

  return { columns, rows: formattedRows };
}
