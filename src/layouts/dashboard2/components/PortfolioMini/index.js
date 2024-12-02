/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/


// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

// Soft UI Dashboard Materail-UI example components
import Table from "examples/Tables/Table";

import React, { useState, useEffect } from 'react';

// Data
import data from "layouts/dashboard2/components/PortfolioMini/data";

function PortfolioMini() {
  const { portfolio } = data();
  const value = portfolio?.value || 0;
  const [flashing, setFlashing] = useState(false);

  useEffect(() => {
    // When the value changes, trigger the flashing animation
    console.log("Before flashing");
    setFlashing(true);
    console.log("In mini");

    // Reset the flashing animation after 1 second (duration of animation)
    const timer = setTimeout(() => {
      setFlashing(false);
    }, 4000); // Flash duration

    return () => clearTimeout(timer); // Cleanup on unmount or re-renders
  }, [portfolio?.value]);

  return (
    <Grid item xs={12} sm={6} xl={3}>
      <MiniStatisticsCard
        title={{ text: "Portfolio value" }}
        count={(
          <span className={flashing ? 'flash-green' : ''}>
            {value}
          </span>
        )}
        percentage={{ color: "success", text: "+55%" }}
        icon={{ color: "info", component: "paid" }}
      />
    </Grid>
  );
}

export default PortfolioMini;
