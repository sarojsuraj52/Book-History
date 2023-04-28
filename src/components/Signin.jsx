import React, {useEffect} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

import Footer from "./layout/Footer";
import { motion } from "framer-motion";

const cred = {
  email: "suraj@gmail.com",
  password: "12345678",
};

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state=> state.auth.isLoggedIn)

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [navigate]);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .matches(/\.com$/, "email must contain .com"),
    password: yup
      .string()
      .required()
      .min(8, "Password must be atleast 8 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      if (JSON.stringify(cred) == JSON.stringify(values)) {
        dispatch(authAction.login(values.email));
        alert("Login Successfull");
        navigate("/");
        action.resetForm();
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >

          <TextField
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            fullWidth
            label="Email"
            name="email"
            autoComplete="email"
            onBlur={formik.handleBlur}
            color={formik.errors.email && formik.touched.email ? "warning" : ""}
            helperText={
              formik.errors.email && formik.touched.email
                ? formik.errors.email
                : ""
            }
            error={formik.errors.email && formik.touched.email}
          />

          <TextField
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onBlur={formik.handleBlur}
            autoComplete="password"
            color={formik.errors.password ? "warning" : ""}
            helperText={
              formik.errors.password && formik.touched.password
                ? formik.errors.password
                : ""
            }
            error={formik.errors.password && formik.touched.password}
          />

          <Button
            component={motion.button}
            whileTap={{ scale: 0.7, transition: { duration: 0.3 } }}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </Container>
  );
};

export default Signin;
