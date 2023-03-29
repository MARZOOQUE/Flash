import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea,  } from "@mui/material";
import DeleteProduct from "../Dialogs/DeleteProduct";
import EditProduct from "../Dialogs/EditProduct";

const ProductList = ({ products }) => {
  const [count, setCount] = useState(12);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [productId, setProudctId] = React.useState("");
  const [productEdit, setProudctEdit] = React.useState();

  const handleOpenDelete = (productid) => {
    setProudctId(productid)
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setProudctId("")
    setOpenDelete(false);
  };
  const handleOpenEdit = (product) => {
    setProudctEdit(product)
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setProudctEdit()
    setOpenEdit(false);
  };

  return (
    <>
      <Grid container  justifyContent="center" spacing={2} gap={2} >
        {products.slice(0, count).map((product) => (
          <Card sx={{ width: 300 }} key={product.id}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="240"
                image={product.thumbnail}
                alt="error"
                style={{ contain: "contain" }}
              />
              <CardContent >
                <Typography noWrap gutterBottom color="#2d545e" variant="h5" component="div" height="10">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" >
                  {product.brand}
                </Typography>
                <Typography variant="body2"  color="#FF6433">
                  $ {product.price} ({product.discountPercentage}% off)
                </Typography>
              </CardContent>
              <Grid container justifyContent="center" spacing={2} gap={2} mb={2} mt={1}>
                <Button  onClick={()=>handleOpenEdit(product)} style={{ backgroundColor:"#2d545e"}} variant="contained">Update</Button>
                <Button onClick={()=>handleOpenDelete(product.id)} style={{ backgroundColor:"#FF6433"}} variant="contained">Delete</Button>
              </Grid>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
      {count <= products.length && <Button
        variant="contained"
        onClick={() => setCount(count + 12)}
        style={{ backgroundColor: "#2d545e", margin: 15, marginBottom: 20 }}
      >
        Load More
      </Button>}
      {count > products.length && <Button
        variant="contained"
        onClick={() => setCount(12)}
        style={{ backgroundColor: "#2d545e", margin: 15, marginBottom: 20 }}
      >
        Show less
      </Button>}

      <DeleteProduct  open={openDelete} handleClose={handleCloseDelete} productId={productId}/>
      <EditProduct  open={openEdit} handleClose={handleCloseEdit} productEdit={productEdit} />
    </>
  );
};

export default ProductList;
