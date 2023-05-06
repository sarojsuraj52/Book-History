import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import Footer from "./layout/Footer";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const cred = {
  email: "suraj@gmail.com",
  password: "12345678",
};

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
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

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      if (JSON.stringify(cred) == JSON.stringify(values)) {
        dispatch(authActions.login(values.email));
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            value={values.email}
            onChange={handleChange}
            fullWidth
            label="Email"
            name="email"
            autoComplete="email"
            onBlur={handleBlur}
            color={errors.email && touched.email ? "warning" : ""}
            helperText={errors.email && touched.email ? errors.email : ""}
            error={errors.email && touched.email}
          />

          <TextField
            margin="normal"
            value={values.password}
            onChange={handleChange}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onBlur={handleBlur}
            autoComplete="password"
            color={errors.password ? "warning" : ""}
            helperText={
              errors.password && touched.password ? errors.password : ""
            }
            error={errors.password && touched.password}
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
              <Link key="forgot-password" href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link key="sign-up" href="#" variant="body2">
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
