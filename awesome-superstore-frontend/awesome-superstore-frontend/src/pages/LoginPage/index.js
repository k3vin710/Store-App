import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ROUTE_PATHS } from "../../routing/routes";
import MaterialLink from "../../components/Link";
import { loginCustomer } from "../../api/apiService";
import {
  NOTIFICATION_TYPE,
  emitNotification,
} from "../../utils/emitNotification";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccessTokenState, setCustomerIdState } from "../../redux/authSlice";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  useEffect(() => {
    if (accessToken !== null) {
      navigate(ROUTE_PATHS.dashboard);
    }
  }, [accessToken]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    try {
      const response = await loginCustomer(email, password);
      dispatch(setAccessTokenState(response.data.token));
      dispatch(setCustomerIdState(response.data.customer.cust_id));
      emitNotification(NOTIFICATION_TYPE.SUCCESS, response.message);
    } catch (error) {
      emitNotification(NOTIFICATION_TYPE.ERROR, error.message);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ pt: 10 }}>
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
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <MaterialLink
                  to={ROUTE_PATHS.forgotPassword}
                  variant="body2"
                  text={"Forgot password?"}
                />
              </Grid>
              <Grid item>
                <MaterialLink
                  to={ROUTE_PATHS.register}
                  variant="body2"
                  text={"Don't have an account? Sign Up"}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
};

export default LoginPage;
