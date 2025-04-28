import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import Fab from "@mui/material/Fab";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../routing/routes";
import { updateCart, updateSelectedProducts } from "../../redux/cartSlice";
import {
  NOTIFICATION_TYPE,
  emitNotification,
} from "../../utils/emitNotification";
import { getAllProducts } from "../../api/apiService";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedProducts = useSelector((state) => state.cart.selectedProducts);
  const [productData, setProductData] = useState([]);
  const reduxCart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    onRowsSelectionHandler(selectedProducts);

    getAllProducts().then((data) => {
      setProductData(data.data.products);
    });
  }, []);

  const onRowsSelectionHandler = (ids) => {
    dispatch(updateSelectedProducts(ids));
  };

  const addSelectedProductsToCart = async () => {
    var selectedProductSet = new Set(selectedProducts);
    let newCartIds = new Set();

    let newCart = [];
    reduxCart.forEach((element) => {
      if (selectedProductSet.has(element.id)) {
        newCart.push(element);
        newCartIds.add(element.id);
      }
    });

    //add new products from selection
    productData.forEach((product) => {
      if (selectedProductSet.has(product.id) && !newCartIds.has(product.id)) {
        newCart.push({
          ...product,
          quantity: 1,
        });
        newCartIds.add(product.id);
      }
    });

    await dispatch(updateCart(newCart));
    emitNotification(NOTIFICATION_TYPE.SUCCESS, "Cart Updated Succesfully.");
    setTimeout(() => {
      navigate(ROUTE_PATHS.cart);
    }, 2000);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150, hide: true },
    { field: "product_id", headerName: "Product ID", width: 150 },
    { field: "product_name", headerName: "Product Name", width: 400 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "market", headerName: "Market", width: 100 },
    { field: "category_name", headerName: "Category Name", width: 150 },
    { field: "sub_category_name", headerName: "Sub Category Name", width: 200 },
  ];

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
          {selectedProducts.length !== 0 && (
            <Fab
              style={{ position: "fixed" }}
              variant="extended"
              color="primary"
              onClick={addSelectedProductsToCart}
            >
              <ShoppingCartIcon sx={{ mr: 1 }} />
              Add to Cart
            </Fab>
          )}

          <Typography component="h1" variant="h2" sx={{ mt: 10 }}>
            Welcome to Awesome Inc. Superstore
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Select products below to add to cart
          </Typography>

          <DataGrid
            sx={{ mb: 10 }}
            autoHeight
            rows={productData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 25 },
              },
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
            }}
            onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
            pageSizeOptions={[25, 50]}
            checkboxSelection
            rowSelectionModel={selectedProducts}
          />
          {/* </Box> */}
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
