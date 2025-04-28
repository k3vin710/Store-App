import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddressDetails from "./AddressDetails";
import UserDetails from "./UserDetails";
import Paper from "@mui/material/Paper";

const UserProfile = () => {

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={2} sx={{ pt: 10 }}>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <UserDetails />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <AddressDetails />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default UserProfile;
