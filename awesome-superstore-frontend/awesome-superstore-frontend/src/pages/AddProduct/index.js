import React, {useEffect, useState} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {addProduct, getAllProductCategories, getAllProductSubcategories} from "../../api/apiService";
import {emitNotification, NOTIFICATION_TYPE} from "../../utils/emitNotification";
import {useNavigate} from "react-router-dom";
import {ROUTE_PATHS} from "../../routing/routes";

const productMarketOptions = [
    {
        value: "1",
        label: "Africa",
    },
    {
        value: "2",
        label: " Asia Pacific",
    },
    {
        value: "3",
        label: "Europe",
    },
    {
        value: "4",
        label: "LATAM",
    },
    {
        value: "5",
        label: "USCA",
    },
];

const AddProduct = () => {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubcategories] = useState([]);

    const [productName, setProductName] = useState();
    const [unitPrice, setUnitPrice] = useState();
    const [selectedMarket, setSelectedMarket] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    useEffect(() => {
        const fetchCategories = async() => {
            const response = await getAllProductCategories();
            setCategories(response.data);
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchSubcategories = async() => {
            if (selectedCategory === null) return;
            const response = await getAllProductSubcategories(selectedCategory);
            setSubcategories(response.data);
        }
        fetchSubcategories()
    }, [selectedCategory]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await addProduct(productName, unitPrice, selectedMarket, selectedSubcategory);
            emitNotification(NOTIFICATION_TYPE.SUCCESS, "Added new product sucessfully");
            navigate(ROUTE_PATHS.dashboard);
        } catch (e) {
            emitNotification(NOTIFICATION_TYPE.ERROR, e.message);
        }
    };

    return (
        <>
            <Container component="main" sx={{pt: 2}}>
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
                        Add New Product
                    </Typography>
                    <TextField
                        id="productName"
                        name="productName"
                        label="Product Name"
                        fullWidth
                        type="text"
                        sx={{marginLeft: 20, marginRight: 20, marginTop: 3}}
                        value={productName}
                        onChange={e => setProductName(e.target.value)}/>
                    <TextField
                        id="unitPrice"
                        name="unitPrice"
                        label="Unit Price (USD)"
                        type="number"
                        fullWidth
                        sx={{marginLeft: 20, marginRight: 20, marginTop: 3}}
                        value={unitPrice}
                        onChange={e => setUnitPrice(e.target.value)}/>
                    <FormControl fullWidth sx={{marginLeft: 20, marginRight: 20, marginTop: 3}}>
                        <InputLabel id="market">Market</InputLabel>
                        <Select
                          labelId="market"
                          id="market"
                          value={selectedMarket}
                          onChange={e => setSelectedMarket(e.target.value)}
                        >
                          {productMarketOptions.map((market) => (
                              <MenuItem key={market.value} value={market.value}>
                                {market.label}
                              </MenuItem>
                          ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ marginLeft: 20, marginRight: 20, marginTop: 3 }}>
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                            labelId="category"
                            id="category"
                            value={selectedCategory}
                            label="category"
                            onChange={e => setSelectedCategory(e.target.value)}>
                            {categories.map((category) => (
                                <MenuItem key={category.category_id} value={category.category_id}>
                                    {category.category_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ marginLeft: 20, marginRight: 20, marginTop: 3 }}>
                        <InputLabel id="subcategory">Sub Category</InputLabel>
                        <Select
                            labelId="subcategory"
                            id="subcategory"
                            value={selectedSubcategory}
                            label="subcategory"
                            onChange={e => setSelectedSubcategory(e.target.value)}>
                            {subCategories.map((subcategory) => (
                                <MenuItem key={subcategory.sub_category_id} value={subcategory.sub_category_id}>
                                    {subcategory.sub_category_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}
                    >
                        Add New Product
                    </Button>
                </Box>
            </Container>
        </>
);
};

export default AddProduct;
