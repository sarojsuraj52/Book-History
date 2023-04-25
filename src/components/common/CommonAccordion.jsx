import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CommonAccordion = ({ heading = "heading", children, icon }) => {
  const [expanded, setExpanded] = useState(false);
  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Accordion
        defaultExpanded={true}
        // expanded={expanded}
        onChange={handleAccordionChange}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            sx={{ display: "flex", alignItems: "center", pl: 1.5 }}
            variant="h6"
          >
            {icon}&nbsp;{heading}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CommonAccordion;
