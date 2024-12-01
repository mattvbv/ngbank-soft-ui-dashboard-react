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

function Completion({ value, color }) {
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

const positionsTableData = {
  columns: [
    { name: "ticker", align: "left" },
    { name: "quantity", align: "left" },
    { name: "averagePrice", align: "left" },
    { name: "lastKnownPrice", align: "center" },
  ],

  rows: [
    {
      ticker: [logoSpotify, "IWDA"],
      quantity: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          10
        </SoftTypography>
      ),
      averagePrice: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          $100
        </SoftTypography>
      ),
      lastKnownPrice: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          $104.35
        </SoftTypography>
      ),
    },
    {
      ticker: [logoXD, "SXR8"],
      quantity: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          2
        </SoftTypography>
      ),
      averagePrice: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          $600
        </SoftTypography>
      ),
      lastKnownPrice: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          $605.39
        </SoftTypography>
      ),
    },    
  ],
};

export default positionsTableData;
