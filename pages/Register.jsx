import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { registerValidationSchema } from "../validationSchema/register.validation.schema";
import { useMutation } from "@tanstack/react-query";
import $axios from "../axios/axios.instance";
import { useDispatch } from "react-redux";
import { openSuccessSnackbar } from "../src/store/slices/snackbarSlice";

const Register = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // hit register api
  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (values) => {
      console.log(values);
      return await $axios.post("/user/register", values);
    },
    onSuccess: (res) => {
      navigate("/login");
      dispatch(openSuccessSnackbar(res?.data?.message));
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  return (
    <Box>
      <>
        {isPending && <LinearProgress color="primary" />}
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            // confirmPassword: "",
            role: "",
            // gender: "",
          }}
          validationSchema={registerValidationSchema}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {(formik) => {
            return (
              <Form
                onSubmit={formik.handleSubmit}
                style={{
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  width: "350px",
                  gap: "1rem",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
              >
                <Typography variant="h3">Sign up</Typography>

                <FormControl required>
                  <TextField
                    label="First name"
                    {...formik.getFieldProps("firstName")}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <FormHelperText error>
                      {formik.errors.firstName}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl required>
                  <TextField
                    label="Last name"
                    {...formik.getFieldProps("lastName")}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <FormHelperText error>
                      {formik.errors.lastName}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl required>
                  <TextField label="Email" {...formik.getFieldProps("email")} />
                  {formik.touched.email && formik.errors.email ? (
                    <FormHelperText error>{formik.errors.email}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl variant="outlined" required>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    {...formik.getFieldProps("password")}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <FormHelperText error>
                      {formik.errors.password}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl fullWidth required>
                  <InputLabel>Role</InputLabel>
                  <Select label="Role" {...formik.getFieldProps("role")}>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="viewer">Viewer</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </Select>
                  {formik.touched.role && formik.errors.role ? (
                    <FormHelperText error>{formik.errors.role}</FormHelperText>
                  ) : null}
                </FormControl>

                {/* <FormControl fullWidth required>
                  <InputLabel>Gender</InputLabel>
                  <Select {...formik.getFieldProps("gender")} label="Gender">
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="preferNotToSay">Other</MenuItem>/
                  </Select>
                  {formik.touched.gender && formik.errors.gender ? (
                    <FormHelperText error>
                      {formik.errors.gender}
                    </FormHelperText>
                  ) : null}
                </FormControl> */}

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mt: "1rem" }}
                >
                  Register
                </Button>

                <Link to="/login">Already registered? Login</Link>
              </Form>
            );
          }}
        </Formik>
      </>
    </Box>
  );
};

export default Register;
