import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SortAccordion from "./Accordion/SortAccordion";
import FilterAccordion from "./Accordion/filterAccordion";
import { AnimatePresence, motion } from "framer-motion";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Paper from "@mui/material/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = ({ open, onOpen, onClose }) => {
  const [state, setState] = useState({
    openSidebar: false,
  });

  return (
    <>
      {/* <Button onClick={() => setState({ openSidebar: true })}>
        <MenuIcon sx={{ color: "white" }} />
      </Button> */}
      <SwipeableDrawer sx={{overflow: "hidden"}} open={open} onOpen={onOpen} onClose={onClose}>
        <Paper
        elevation={0}
          layout={true}
          component={motion.div}
          animate={{
            opacity: open ? 1 : 0,
            x: open ? 0 : -40,
          }}
          transition={{ type: "spring", damping: 9 }}
        >
          <div style={{ width: 350 }} role="presentation">
            <SearchBar />
            <Divider />
            <SortAccordion />
            <FilterAccordion />
          </div>
        </Paper>
      </SwipeableDrawer>
    </>
  );
};

export default Sidebar;
