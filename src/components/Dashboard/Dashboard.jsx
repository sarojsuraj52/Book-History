import React, { useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useCallback, Fragment } from "react";
// import  { Container, } from 'tsparticles-engine';
import Particles from "react-particles";
import { loadFull } from "tsparticles";
// import { Container as MuiContainer } from "@mui/material";
import Video from "../../assets/book.mp4";
import BookIcon from "@mui/icons-material/Book";
import { motion, AnimatePresence } from "framer-motion";
import BookForm from "../Book/BookForm";
import { useDispatch, useSelector } from "react-redux";
import SnackBar from "../common/SnackBar";

const Dashboard = () => {
  const [openCommonModal, setCommonModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const errorPOST = useSelector((state) => state.post.error);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log();
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#0d47a1",
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // stack columns on small screens
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh", // use min-height instead of height for flexibility
            color: "white",
          }}
        >
          <Box
            sx={{ maxWidth: { xs: "100%", sm: "50%" }, mb: { xs: 4, sm: 0 } }}
          >
            {" "}
            {/* adjust max-width and margin bottom based on screen size */}
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to BookHistory, folks!
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
              Gosh, I'm so excited to explore the magical world of books with
              you! Together, we'll learn about the history of books and the
              amazing stories they hold.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <AnimatePresence mode="wait">
                {openCommonModal && (
                  <BookForm
                    open={openCommonModal}
                    onClose={() => setCommonModal(false)}
                    method="POST"
                    openSnackbar={() => setSnackbarOpen(true)}
                  />
                )}
              </AnimatePresence>
              <Button
                component={motion.div}
                whileTap={{ scale: 0.7, transition: { duration: 0.2 } }}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                variant="contained"
                sx={{ backgroundColor: "white !important", color: "black" }}
                onClick={() => setCommonModal(true)}
              >
                <b>Get Started</b>
              </Button>
            </Box>
          </Box>
          <Box
            sx={{ maxWidth: { xs: "100%", sm: "50%" }, ml: { xs: 0, sm: 4 } }}
          >
            {" "}
            {/* adjust max-width and margin left based on screen size */}
            <Box>
              <video
                src={Video}
                autoPlay
                loop
                muted
                controls
                style={{
                  top: 0,
                  left: 0,
                  width: "100%", // adjust width to fill container
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            marginTop: "70px",
            zIndex: -1,
            color: "white",
          }}
        >
          <Typography
            variant="body1"
            component="p"
            style={{ display: "flex", alignItems: "center" }}
          >
            <BookIcon width={48} height={48} />
            &nbsp; BookHistory is a product of zCon Solutions Pvt Ltd. All
            rights reserved.
          </Typography>
        </Box>
      </Container>
      <SnackBar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        message={errorPOST ? errorPOST : "Book added successfully"}
        severity={errorPOST ? "warning" : "success"}
      />
    </Box>
  );
};

export default Dashboard;
