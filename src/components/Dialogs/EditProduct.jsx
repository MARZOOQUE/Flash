import * as React from "react";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Button } from "@mui/material";
import Notifications from "../Notifications/Notifications";

export default function EditProduct({ open, handleClose, productEdit}) {
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  
  let [input, setInput] = useState({
    title: "",
    description: "",
    price: "",
  });
  
  let { title, description, price } = input;

  function onChangeFunc(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const handleEdit = () => {
    fetch(`https://dummyjson.com/products/${productEdit.id}`, {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: description,
        price: price,
      }),
    }).then((res) => {
      if (res.status === 400 || res.status === 404) {
        setError("Something Went wrong. Please try again!");
      } else if (res.status === 200) {
        setSuccess("Successfully deleted the product");
      }
      // setLoader(false)
    });
    setInput({title: "",
    description: "",
    price: "",})
    handleClose();
    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 4000);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit Product details"}
        </DialogTitle>
        <DialogContent>
          <TextField
            placeholder="Enter Title"
            name="title"
            label="Title"
            value={title}
            onChange={(e) => onChangeFunc(e)}
            type="text"
            fullWidth
            required
            style={{ marginBottom: 20, marginTop: 20 }}
          />
          <TextField
            label="Description"
            type="text"
            placeholder="Description"
            name="description"
            value={description}
            onChange={(e) => onChangeFunc(e)}
            fullWidth
            required
            style={{ marginBottom: 20 }}
          />
          <TextField
            label="Price"
            type="text"
            placeholder="Price"
            name="price"
            value={price}
            onChange={(e) => onChangeFunc(e)}
            style={{ marginBottom: 20 }}
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button
            style={{ backgroundColor: "#FF6433", color: "white" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#2d545e", color: "white" }}
            onClick={handleEdit}
            autoFocus
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
      {error && <Notifications error={error} />}
      {success && <Notifications success={success} />}
    </>
  );
}
