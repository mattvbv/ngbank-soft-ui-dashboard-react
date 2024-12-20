/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";

// Images
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoWebDev from "assets/images/small-logos/logo-webdev.svg";
import logoXD from "assets/images/small-logos/logo-xd.svg";

import React, { useState, useEffect } from 'react';

function Completion({ value, color }) {
  console.log("Hello, world!");
  return (
    <SoftBox display="flex" alignItems="center">
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {value}%&nbsp;
      </SoftTypography>
      <SoftBox width="8rem">
        <SoftProgress value={value} color={color} variant="gradient" label={false} />
      </SoftBox>
    </SoftBox>
  );
}



const action = (
  <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
    more_vert
  </Icon>
);

function PositionsTableData() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  


  useEffect(() => {
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8082/portfolios/10000/positions"); // Replace with your API endpoint
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();

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

export default PositionsTableData;