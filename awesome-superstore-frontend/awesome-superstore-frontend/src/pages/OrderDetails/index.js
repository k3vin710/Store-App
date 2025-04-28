import {useNavigate, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {ROUTE_PATHS} from "../../routing/routes";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {getOrderDetails} from "../../api/apiService";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import {shipModeOptions} from "../CartPage";
import CardContent from "@mui/material/CardContent";
import {LocalShipping, MonetizationOn, Money} from "@mui/icons-material";


const OrderDetails = () => {
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();
    const [orderId, setOrderId] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!searchParams.get("orderId")) {
            navigate(ROUTE_PATHS.orders);
        } else {
            setOrderId(searchParams.get("orderId"));
        }
    }, [searchParams]);

    useEffect(() => {
        if (orderId === null) return;
        const fetchOrderDetails = async() => {
            const response = await getOrderDetails(orderId);
            setProducts(response.data);
        }
        fetchOrderDetails();
    }, [orderId]);

    const getShipMode = (shipModeCode) => {
        const index = shipModeOptions.findIndex((option)=> option.value === shipModeCode.toString());
        return index === -1 ? "Unknown ship mode" : shipModeOptions[index].label;
    }

    return (
        <>
            <Container component="main" sx={{pt:4}}>
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Order Details
                    </Typography>
                    <Container
                        component="main"
                        minWidth="md"
                        maxWidth="md"
                        sx={{mb: 4, pt: 5}}
                    >
                        <Stack spacing={2} sx={{pb: 5, mb: 1.5}}>
                            {products.map((product) => (
                                <Card sx={{pl: 5}}>
                                    <CardContent>
                                        <Typography variant="h5" sx={{mb:1}}>
                                            {product.product_name}
                                        </Typography>
                                        <LocalShipping/>
                                        <Typography color="text.secondary">
                                            Ship Mode: {getShipMode(product.ship_mode)}
                                        </Typography>
                                        <Typography variant="body2">
                                            Ship Date : {product.ship_date}
                                        </Typography>
                                        <Typography sx={{mb:1}} variant="body2">
                                            Shipping Cost : {product.shipping_cost}
                                        </Typography>

                                        <MonetizationOn/>
                                        <Typography variant="body2">
                                            Quantity : {product.quantity}
                                        </Typography>
                                        <Typography variant="body2">
                                            Discount : {product.discount}
                                        </Typography>
                                        <Typography variant="body2">
                                            Profit : {product.profit}
                                        </Typography>
                                        <Typography sx={{mb:1}} variant="body2">
                                            Sales : {product.sales}
                                        </Typography>

                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>
                    </Container>
                </Box>

            </Container>
        </>
    );
};

export default OrderDetails;