/**
=========================================================
* Soft UI Dashboard React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Soft UI Dashboard React Base Styles
import colors from "assets/theme/base/colors";

const { info, dark } = colors;

const globals = {
  html: {
    scrollBehavior: "smooth",
  },
  "*, *::before, *::after": {
    margin: 0,
    padding: 0,
  },
  "a, a:link, a:visited": {
    textDecoration: "none !important",
  },
  "a.link, .link, a.link:link, .link:link, a.link:visited, .link:visited": {
    color: `${dark.main} !important`,
    transition: "color 150ms ease-in !important",
  },
  "a.link:hover, .link:hover, a.link:focus, .link:focus": {
    color: `${info.main} !important`,
  },

  // Add the flash-green class here
  ".flash-green": {
    animation: "flashGreen 1s ease-out",
  },
  // Define the keyframes animation for flashing effect
  "@keyframes flashGreen": {
    "0%": {
      color: "green",
      backgroundColor: "#e8f5e9", // Light green background
    },
    "50%": {
      color: "darkgreen",
      backgroundColor: "#c8e6c9", // Slightly darker green
    },
    "100%": {
      color: "green",
      backgroundColor: "white", // Reset background color
    },
  },

  
};

export default globals;
