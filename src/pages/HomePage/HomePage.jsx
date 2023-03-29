import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductList from "../../components/ProductList/ProductList";
import {
  fetchAsyncProducts,
  getAllProducts,
  getAllProductsStatus,
} from "../../store/productSlice";
import Loader from "../../components/Loader/Loader";
import { STATUS } from "../../utils/status";
import Grid from "@mui/material/Grid";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncProducts(100));
  }, []);

  const products = useSelector(getAllProducts);
  const productStatus = useSelector(getAllProductsStatus);

  return (
    <>
      <Grid sx={{ flexGrow: 1 }} container spacing={2} mt={2}>
        <Grid item xs={12}>
          {productStatus === STATUS.LOADING ? (
            <Loader />
          ) : (
            <ProductList products={products} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
