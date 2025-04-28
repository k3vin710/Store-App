import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addAddress, getAllCitiesByState, getAllCountriesByRegion, getAllRegions, getAllStatesByCountry } from "../../api/apiService";
import { Avatar, Box, Button, Container, CssBaseline, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { NOTIFICATION_TYPE, emitNotification } from "../../utils/emitNotification";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../routing/routes";
import Typography from "@mui/material/Typography";


const AddAddress = () => {
    const customerId = useSelector((state) => state.auth.customerId);
    const navigate = useNavigate();

    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState(null);

    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);

    const [postalCode, setPostalCode] = useState("");

    useEffect(() => {
        const fetchRegions = async () => {
            const response = await getAllRegions();
            setRegions(response.data);
        }
        fetchRegions();
    }, [customerId]);

    useEffect(() => {
        const fetchCountries = async () => {
            if (selectedRegion === null) return;
            const response = await getAllCountriesByRegion(selectedRegion);
            setCountries(response.data);
        }
        fetchCountries();
    }, [selectedRegion]);

    useEffect(() => {
        const fetchStates = async () => {
            if (selectedCountry === null) return;
            const response = await getAllStatesByCountry(selectedCountry);
            setStates(response.data);
        }
        fetchStates();
    }, [selectedCountry]);

    useEffect(() => {
        const fetchCities = async () => {
            if (selectedState === null) return;
            const response = await getAllCitiesByState(selectedState);
            setCities(response.data);
        }
        fetchCities();
    }, [selectedState])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await addAddress(selectedCity, postalCode, customerId);
            emitNotification(NOTIFICATION_TYPE.SUCCESS, "Added new address successfully");
            navigate(ROUTE_PATHS.userProfile);
        } catch (error) {
            emitNotification(NOTIFICATION_TYPE.ERROR, error.message);
        }
    }

    return (
        <>
            <Container component="main" sx={{ pt: 4 }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Add New Address
                    </Typography>
                    <FormControl fullWidth sx={{ marginLeft: 20, marginRight: 20, marginTop: 5 }}>
                        <InputLabel id="region">Region</InputLabel>
                        <Select
                            labelId="region"
                            id="region"
                            value={selectedRegion}
                            label="region"
                            onChange={e => setSelectedRegion(e.target.value)}
                        >
                            {regions.map((region) => (
                                <MenuItem key={region.region_id} value={region.region_id}>
                                    {region.region_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ marginLeft: 20, marginRight: 20, marginTop: 3 }}>
                        <InputLabel id="country">Country</InputLabel>
                        <Select
                            labelId="country"
                            id="country"
                            value={selectedCountry}
                            label="country"
                            onChange={e => setSelectedCountry(e.target.value)}
                        >
                            {countries.map((country) => (
                                <MenuItem key={country.country_id} value={country.country_id}>
                                    {country.country_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ marginLeft: 20, marginRight: 20, marginTop: 3 }}>
                        <InputLabel id="state">State</InputLabel>
                        <Select
                            labelId="state"
                            id="state"
                            value={selectedState}
                            label="state"
                            onChange={e => setSelectedState(e.target.value)}
                        >
                            {states.map((state) => (
                                <MenuItem key={state.state_id} value={state.state_id}>
                                    {state.state_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ marginLeft: 20, marginRight: 20, marginTop: 3 }}>
                        <InputLabel id="city">City</InputLabel>
                        <Select
                            labelId="city"
                            id="city"
                            value={selectedCity}
                            label="city"
                            onChange={e => setSelectedCity(e.target.value)}
                        >
                            {cities.map((city) => (
                                <MenuItem key={city.city_id} value={city.city_id}>
                                    {city.city_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        id="postalCode"
                        name="postalCode"
                        type="postalCode"
                        autoFocus
                        label="Postal Code"
                        fullWidth
                        sx={{ marginLeft: 20, marginRight: 20, marginTop: 3 }}
                        value={postalCode}
                        onChange={e => setPostalCode(e.target.value)} />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}
                    >
                        Add New Address
                    </Button>
                </Box>
            </Container>
        </>
    )

}

export default AddAddress;