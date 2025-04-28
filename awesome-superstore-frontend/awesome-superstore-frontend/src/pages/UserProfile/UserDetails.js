import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { MenuItem } from "@mui/material";
import { getCustomerById, sendOTPByEmail, updateCustomer } from "../../api/apiService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCustomerIdState } from "../../redux/authSlice";
import { NOTIFICATION_TYPE, emitNotification } from "../../utils/emitNotification";
import { ROUTE_PATHS } from "../../routing/routes";
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

const UserDetails = () => {
  const navigate = useNavigate();
  const customerId = useSelector((state) => state.auth.customerId);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [segment, setSegment] = useState("");
  const [realEmail, setRealEmail] = useState("");

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await getCustomerById(customerId);
        setFullName(response.data.cust_name);
        setSegment(response.data.segment.toString());
        setEmail(response.data.email);
        setRealEmail(response.data.email);
      } catch (error) {
        emitNotification(error.message);
      }

    }
    fetchCustomer();
  }, [customerId])


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await updateCustomer(customerId, fullName, segment, email);
      setRealEmail(response.email);
      emitNotification(NOTIFICATION_TYPE.SUCCESS, "Updated customer data successfully");
    } catch (error) {
      emitNotification(NOTIFICATION_TYPE.ERROR, error.message);
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    try {
      const response = await sendOTPByEmail(realEmail);
      emitNotification(NOTIFICATION_TYPE.SUCCESS, response.message);
      navigate(ROUTE_PATHS.changePassword);
    } catch (error) {
      emitNotification(NOTIFICATION_TYPE.ERROR, error.message);
    }
  }

  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ pt: 1, pb: 5 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            User Details
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
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
              value={fullName}
              onChange={e => setFullName(e.target.value)}
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
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              select
              name="customerSegment"
              label="Customer Segment"
              helperText="Please select Customer Segment"
              value={segment}
              onChange={e => setSegment(e.target.value)}
            >
              {customerSegmentOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Grid container spacing={3}>
              <Grid item xs>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Save Details
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleChangePassword}
                >
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default UserDetails;
