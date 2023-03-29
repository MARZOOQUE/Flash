import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Notifications from "../Notifications/Notifications";

export default function DeleteProduct({ open, handleClose, productId }) {
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const handleDelete = () => {
    fetch(`https://dummyjson.com/products/${productId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 400 || res.status === 404) {
        setError("Something Went wrong. Please try again!");
      } else if (res.status === 200) {
        setSuccess("Successfully deleted the product");
      }
      // setLoader(false);
    });
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
          {"Are you sure to delete the selected product?"}
        </DialogTitle>

        <DialogActions>
          <Button
            style={{ backgroundColor: "#FF6433", color: "white" }}
            onClick={handleClose}
          >
            No
          </Button>
          <Button
            style={{ backgroundColor: "#2d545e", color: "white" }}
            onClick={handleDelete}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {error && <Notifications error={error} />}
      {success && <Notifications success={success} />}
    </>
  );
}
