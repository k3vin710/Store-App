import { Box, Button, Container, CssBaseline, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { changePasswordByCustId } from "../../api/apiService";
import { NOTIFICATION_TYPE, emitNotification } from "../../utils/emitNotification";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../routing/routes";


const ChangePassword = () => {
    const navigate = useNavigate();
    const customerId = useSelector((state) => state.auth.customerId);

    const [otpCode, setOtpCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            await changePasswordByCustId(customerId, otpCode, newPassword, confirmPassword);
            emitNotification(NOTIFICATION_TYPE.SUCCESS, "Changed password successfully");
            navigate(ROUTE_PATHS.userProfile);
        } catch (error) {
            emitNotification(NOTIFICATION_TYPE.ERROR, error.message);
        }
    }

    return (
        <>
            <Container component="main" sx={{ pt: 2 }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <TextField
                        id="otpCode"
                        name="otpCode"
                        type="otpCode"
                        autoFocus
                        label="OTP Code"
                        fullWidth
                        sx={{ marginLeft: 20, marginRight: 20, marginTop: 3 }}
                        value={otpCode}
                        onChange={e => setOtpCode(e.target.value)} />
                    <TextField
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        autoFocus
                        label="New Password"
                        fullWidth
                        sx={{ marginLeft: 20, marginRight: 20, marginTop: 3 }}
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)} />
                    <TextField
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoFocus
                        label="Confirm Password"
                        fullWidth
                        sx={{ marginLeft: 20, marginRight: 20, marginTop: 3 }}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)} />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}
                    >
                        Change Password
                    </Button>
                </Box>
            </Container>
        </>
    )
}

export default ChangePassword;