import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getOrdersByCustomerAndReturned, returnOrder} from "../../api/apiService";
import {Cached, MoreHoriz} from "@mui/icons-material";
import {emitNotification, NOTIFICATION_TYPE} from "../../utils/emitNotification";
import {useNavigate} from "react-router-dom";
import {ROUTE_PATHS} from "../../routing/routes";

const OrdersPage = () => {
    const customerId = useSelector((state) => state.auth.customerId);
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, [tabValue]);

    const fetchOrders = async () => {
        const isReturned = tabValue === 1;
        if (customerId === null) return;
        const response = await getOrdersByCustomerAndReturned(customerId, isReturned);
        setOrders(response.data);
    }

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleReturnOrder = async(orderId) => {
        try {
            await returnOrder(orderId);
            emitNotification(NOTIFICATION_TYPE.SUCCESS, "Successfully returned order");
            fetchOrders();
        } catch (error) {
            emitNotification(NOTIFICATION_TYPE.ERROR, error.message);
        }
    }

    return (
        <>
            <Container
                component="main"
                minWidth="lg"
                maxWidth="lg"
                sx={{pt: 2, pb: 2}}
            >
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h2" sx={{mt: 2}}>
                        Orders
                    </Typography>
                </Box>
                <Paper elevation={0}>
                    <Tabs
                        value={tabValue}
                        onChange={handleChange}
                        aria-label="disabled tabs example"
                        centered
                    >
                        <Tab label="Past Orders"></Tab>
                        <Tab label="Returned Orders"></Tab>
                    </Tabs>
                    <Container
                        component="main"
                        minWidth="md"
                        maxWidth="md"
                        sx={{mb: 4, pt: 5}}
                    >
                        <Stack spacing={2} sx={{pb: 5}}>
                            {
                                orders === null || orders.length === 0 &&
                                <>
                                    <Typography sx={{width: '100%', textAlign: 'center'}}>You have no orders</Typography>
                                </>
                            }
                            {orders.map((order) => (
                                <Card sx={{pl: 5}}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Order Id : {order.order_id}
                                        </Typography>

                                        <Typography sx={{mb: 1.5}} color="text.secondary">
                                            Order Date : {order.order_date}
                                        </Typography>
                                        <Typography variant="body2">
                                            Total Items : {order.total_items}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button endIcon={<MoreHoriz/>} onClick={() => navigate(ROUTE_PATHS.orderDetails + `?orderId=${order.order_id}`)}>
                                            More Details
                                        </Button>
                                        {tabValue === 0 &&
                                            <Button size="smail" endIcon={<Cached/>} onClick={() => handleReturnOrder(order.order_id)}>
                                                Return Order
                                            </Button>
                                        }
                                    </CardActions>
                                </Card>
                            ))}
                        </Stack>
                    </Container>
                </Paper>
            </Container>
        </>
    );
};

export default OrdersPage;
