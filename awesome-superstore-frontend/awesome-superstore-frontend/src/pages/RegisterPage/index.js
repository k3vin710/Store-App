import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { MenuItem } from "@mui/material";
import { ROUTE_PATHS } from "../../routing/routes";
import MaterialLink from "../../components/Link";
import { registerCustomer } from "../../api/apiService";
import { NOTIFICATION_TYPE, emitNotification } from "../../utils/emitNotification";
import { useNavigate } from "react-router-dom";
const customerSegmentOptions = [
  {
    value: "1",
    label: "Consumer",
  },
  {
    value: "2",
    label: "Corporate",
  },
  {
    value: "3",
    label: "Home Office",
  },
];

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("fullName");
    const segment = data.get("customerSegment");
    const email = data.get("email");
    const password = data.get("password");
    try {
      const response = await registerCustomer(name, segment, email, password);
      emitNotification(NOTIFICATION_TYPE.SUCCESS, response.message);
      navigate(ROUTE_PATHS.login);
    } catch (error) {
      emitNotification(NOTIFICATION_TYPE.ERROR, error.message);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ pt: 2 }}>
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
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
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
              id="fullName"
              label="Full Name"
              name="fullName"
              autoComplete="fullName"
              type="text"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
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
            <TextField
              margin="normal"
              required
              fullWidth
              select
              name="customerSegment"
              label="Customer Segment"
              helperText="Please select Customer Segment"
            >
              {customerSegmentOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

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
              Register
            </Button>
            <Grid container>
              <Grid item xs>
                <MaterialLink to={ROUTE_PATHS.default} variant="body2" text={"Forgot password?"}/>
              </Grid>
              <Grid item>
                <MaterialLink to={ROUTE_PATHS.login} variant="body2" text={"Already have an account? Sign In"}/>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default RegisterPage;
