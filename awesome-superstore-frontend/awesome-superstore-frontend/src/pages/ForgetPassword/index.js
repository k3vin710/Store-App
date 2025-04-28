import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { changePassword, sendOTPByEmail, validateOTP } from "../../api/apiService";
import { NOTIFICATION_TYPE, emitNotification } from "../../utils/emitNotification";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../routing/routes";

const steps = ["Enter Email", "Enter New Password"];

export default function Checkout() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [otpCode, setOtpCode] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleNext = async () => {
    if (activeStep === 0) {
      try {
        const response = await validateOTP(email, otpCode);
        emitNotification(NOTIFICATION_TYPE.SUCCESS, response.message);
        setActiveStep(activeStep + 1);
      } catch (error) {
        emitNotification(NOTIFICATION_TYPE.ERROR, error.message);
      }
    } else {
      try {
        const response = await changePassword(email, password, confirmPassword);
        emitNotification(NOTIFICATION_TYPE.SUCCESS, response.message);
        navigate(ROUTE_PATHS.login);
      } catch (error) {
        emitNotification(NOTIFICATION_TYPE.ERROR, error.message);
      }
    }

  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const sendOTP = async (event) => {
    event.preventDefault();
    try {
      const response = await sendOTPByEmail(email);
      emitNotification(NOTIFICATION_TYPE.SUCCESS, response.message);
    } catch (error) {
      emitNotification(NOTIFICATION_TYPE.ERROR, error.message);
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />

      <Container component="main" maxWidth="sm" sx={{ mb: 4, pt: 5 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Forgot Password
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === 0 && (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Enter email id to reset password
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Button
                  variant="contained"
                  onClick={sendOTP}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Send Code
                </Button>
                <TextField
                  sx={{ mt: 3, ml: 1 }}
                  margin="normal"
                  required
                  id="enter-code"
                  label="Enter Code"
                  name="enter-code"
                  type="text"
                  autoFocus
                  value={otpCode}
                  onChange={e => setOtpCode(e.target.value)}
                />
              </Box>
              <Typography variant="subtitle1" sx={{ mt: 2, ml: 2 }}>
                Code sent. Please check your email
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Next
                </Button>
              </Box>
            </React.Fragment>
          )}
          {activeStep === 1 && (
            <React.Fragment>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Enter new password"
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Re-Type new password"
                type="password"
                id="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Change Password
                </Button>
              </Box>
            </React.Fragment>
          )}
          {activeStep === 2 && (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Your Password is changed successfully
              </Typography>
              <Typography variant="subtitle1">
                Redirecting to login page in 5 seconds...
              </Typography>
            </React.Fragment>
          )}{" "}
          <React.Fragment></React.Fragment>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
