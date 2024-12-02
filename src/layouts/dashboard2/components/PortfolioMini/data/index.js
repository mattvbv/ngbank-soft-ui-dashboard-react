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

  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching data");
        const response = await fetch("http://localhost:8082/portfolios/10000");
        console.log("Request sent");
        console.log("Response ok ? " + response.ok);
        if (!response.ok) throw new Error("Failed to fetch data");
        console.log("Getting json");
        const data = await response.json();
        console.log("Data fetched");
        setPortfolio(data);
        //console.log("portfolio value: " + portfolioValue);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // let intervalId;
    // intervalId = setInterval(fetchData, 3000); // Fetch every 1 second

    // // Cleanup interval on unmount
    // return () => clearInterval(intervalId);

    // SSE Connection
    const eventSource = new EventSource("http://localhost:8082/sse/portfolios/10000");

    eventSource.onmessage = (event) => {
      console.log("Received SSE data:", event.data);
      try {
        const updatedData = JSON.parse(event.data); // Assuming SSE data is JSON
        if (updatedData.value !== undefined) {
          // Update only the 'value' attribute of the portfolio
          setPortfolio((prevPortfolio) => ({
            ...prevPortfolio,
            value: updatedData.value,
          }));
          console.log("Portfolio value updated:", updatedData.value);
        }
      } catch (err) {
        console.error("Error parsing SSE data:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("Error with SSE connection:", err);
      setError("SSE connection failed");
      eventSource.close(); // Close the connection on error
    };

    // Cleanup SSE connection on unmount
    return () => {
      eventSource.close();
    };


  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return { portfolio };
}