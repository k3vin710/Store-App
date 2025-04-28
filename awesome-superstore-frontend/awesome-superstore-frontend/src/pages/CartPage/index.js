import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../routing/routes";
import {
  addQuantity,
  removeQuantity,
  removeProductFromCartAndSelection,
  clearCartState,
} from "../../redux/cartSlice";
import { placeOrder, getAddressByCustomerId } from "../../api/apiService";
import {
  NOTIFICATION_TYPE,
  emitNotification,
} from "../../utils/emitNotification";

const steps = ["Edit Order", "Select Address"];

export const shipModeOptions = [
  {
    value: "1",
    label: "First Class",
    cost: 20,
    shipDate: new Date(new Date().getDate() + 2),
  },
  {
    value: "2",
    label: "Second Class",
    cost: 10,
    shipDate: new Date(new Date().getDate() + 5),
  },
  {
    value: "3",
    label: "Same Day",
    cost: 50,
    shipDate: new Date(),
  },
  {
    value: "4",
    label: "Standard Class",
    cost: 0,
    shipDate: new Date(new Date().getDate() + 10),
  },
];

const CartPage = () => {
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.cart.cart);
  const [total, setTotal] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [selectedShipMode, setSelectedShipMode] = React.useState("");

  const dispatch = useDispatch();
  const customerId = useSelector((state) => state.auth.customerId);

  const onAddQuantityClick = (product) => {
    dispatch(addQuantity(product));
  };
  const onRemoveQuantityClick = (product) => {
    dispatch(removeQuantity(product));
  };
  const onDeleteItemClick = (product) => {
    dispatch(removeProductFromCartAndSelection(product));
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      //move to address step
      setActiveStep(activeStep + 1);
      await fetchAddress();
    }
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const onClickPlaceOrder = async () => {
    var discount = 0;
    var shipping = shipModeOptions.filter(
      (mode) => mode.value === selectedShipMode
    )[0];
    var sendCartData = cartData.map((data) => ({
      ...data,
      discount,
      shipping_cost: shipping.cost,
      profit: 0.1,
      sales: data.price * data.quantity,
    }));
    for (var i = 0; i < sendCartData.length; i++) {
      sendCartData[i].discount = 0;
    }
    try {
      const response = await placeOrder(
        sendCartData,
        selectedAddressId,
        customerId,
        selectedShipMode,
        shipping.shipDate
      );
      emitNotification(NOTIFICATION_TYPE.SUCCESS, "Order placed successfully.");
      dispatch(clearCartState());
      navigate(ROUTE_PATHS.orders);
    } catch (error) {
      emitNotification(NOTIFICATION_TYPE.ERROR, error.message);
    }
  };
  const fetchAddress = async () => {
    try {
      console.log(customerId);
      const response = await getAddressByCustomerId(customerId);
      setAddresses(response.data);
    } catch (error) {
      emitNotification(NOTIFICATION_TYPE.ERROR, error.message);
    }
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setSelectedAddressId(event.target.value);
  };
  const handleShipModeChange = (event) => {
    console.log(event.target.value);
    setSelectedShipMode(event.target.value);
  };

  useEffect(() => {}, []);
  useEffect(() => {
    var newTotal = 0;
    cartData.forEach((product) => {
      newTotal += product.quantity * product.price;
    });
    setTotal(newTotal.toFixed(2));
  }, [cartData]);
  return (
    <>
      <CssBaseline />

      <Container component="main" maxWidth="lg" sx={{ mb: 4, pt: 5 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h2" align="center">
            Your Cart
          </Typography>
          <Container component="main" maxWidth="sm">
            <Stepper
              activeStep={activeStep}
              sx={{ pt: 3, pb: 5 }}
              alternativeLabel
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Container>

          {activeStep === 0 && (
            <React.Fragment>
              <Typography variant="h6" sx={{ mb: 3 }} align="center">
                {cartData.length === 0
                  ? "No items in your cart"
                  : "Items in your cart are below"}
              </Typography>
              {cartData.map((product) => (
                <Paper
                  variant="outlined"
                  sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={8}>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        ID : {product.product_id}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        Product Name : {product.product_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Category : {product.category_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Sub-Category : {product.sub_category_name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Product Market : {product.market}
                      </Typography>
                      <Typography variant="button" display="block" gutterBottom>
                        Unit Price : ${product.price}
                      </Typography>
                    </Grid>

                    <Divider orientation="vertical" flexItem />

                    <Grid
                      item
                      xs={3}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Quantity
                      </Typography>
                      <Grid
                        container
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Grid item xs={4} textAlign="center">
                          <IconButton
                            aria-label="minus"
                            size="large"
                            onClick={(e) => onRemoveQuantityClick(product)}
                          >
                            <RemoveCircleOutlineIcon
                              fontSize="inherit"
                              color="secondary"
                            />
                          </IconButton>
                        </Grid>
                        <Grid item xs={4} textAlign="center">
                          {product.quantity}
                        </Grid>
                        <Grid item xs={4} textAlign="center">
                          <IconButton
                            aria-label="plus"
                            size="large"
                            onClick={(e) => onAddQuantityClick(product)}
                          >
                            <AddCircleOutlineIcon
                              fontSize="inherit"
                              color="secondary"
                            />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ mt: 2 }}
                      >
                        Total : ${(product.quantity * product.price).toFixed(2)}
                      </Typography>
                      <IconButton
                        aria-label="minus"
                        size="large"
                        onClick={(e) => onDeleteItemClick(product)}
                      >
                        <DeleteIcon fontSize="inherit" color="error" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ mb: 5 }}>
                  Your Total is {total}
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                  disabled={cartData.length === 0}
                >
                  Next
                </Button>
              </Box>
            </React.Fragment>
          )}
          {activeStep === 1 && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel
                      id="demo-controlled-radio-buttons-group"
                      sx={{ mb: 2 }}
                    >
                      Select Address
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={selectedAddressId}
                      onChange={(e) => handleChange(e)}
                    >
                      {addresses.map((address) => (
                        <Grid container spacing={2}>
                          <Grid item xs={2}>
                            <FormControlLabel
                              value={address.addr_id}
                              control={<Radio />}
                            />
                          </Grid>
                          <Grid item xs={10}>
                            <Card variant="outlined" sx={{ minWidth: 400 }}>
                              <CardContent>
                                <Grid container spacing={2}>
                                  <Grid item xs>
                                    <Typography
                                      variant="subtitle2"
                                      gutterBottom
                                    >
                                      City : {address.city_name}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs>
                                    <Typography
                                      variant="subtitle2"
                                      gutterBottom
                                    >
                                      State : {address.state_name}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                  <Grid item xs>
                                    <Typography
                                      variant="subtitle2"
                                      gutterBottom
                                    >
                                      Country : {address.country_name}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs>
                                    <Typography
                                      variant="subtitle2"
                                      gutterBottom
                                    >
                                      Region : {address.region_name}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                  <Grid item xs>
                                    <Typography
                                      variant="subtitle2"
                                      gutterBottom
                                    >
                                      Zip Code : {address.postal_code}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel
                      id="demo-controlled-radio-buttons-group"
                      sx={{ mb: 2 }}
                    >
                      Select Ship Mode
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={selectedShipMode}
                      onChange={(e) => handleShipModeChange(e)}
                    >
                      {shipModeOptions.map((shipMode) => (
                        <FormControlLabel
                          value={shipMode.value}
                          control={<Radio />}
                          label={shipMode.label}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={onClickPlaceOrder}
                  disabled={selectedAddressId === "" || selectedShipMode === ""}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Place Order
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default CartPage;
