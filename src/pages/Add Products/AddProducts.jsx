import { useState } from "react";
import { Grid, Paper, TextField, Button, Typography } from "@mui/material";
import Notifications from "../../components/Notifications/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Loader from "../../components/Loader/Loader";

const AddProducts = () => {
  const paperStyle = {
    padding: 20,
    height: "auto",
    maxWidth: 300,
    margin: "auto",
  };
  const btnstyle = { margin: "8px 0", backgroundColor: "#2d545e" };
  const [files, setFile] = useState();
  const [error, setError] = useState("");
  const [fromError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const [loader, setLoader] = useState(false);
  const [input, setInput] = useState({
    title: "",
    description: "",
    file: files,
    price: "",
  });

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  function onChangeFunc(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  let { title, description, price } = input;

  const onSubmit = () => {
    if (
      title.length < 1 ||
      price.length < 1 ||
      description.length < 1 ||
      files === undefined
    ) {
      setFormError("Please fill in all fields");
    } else {
        setLoader(true)
      fetch("https://dummyjson.com/product/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          description: description,
          price: price,
          images: [files?.name],
        }),
      }).then((res) => {
        if (res.status === 400 || res.status === 404) {
          setError("Something Went wrong. Please try again!");
        } else if (res.status === 200) {
          setSuccess("Successfully added the product");
        }
        setLoader(false)
      });

      setInput({
        title: "",
        description: "",
        file: "",
        price: "",
      });
      setFile();
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 4000);
    }

  };

  return (
    <>
      <Grid style={{ height: "80vh", display: "flex", alignItems: "center" }}>
        <Paper style={paperStyle}>
          <Typography variant="h5" color="#2d545e">Add New Product</Typography>
          <TextField
            placeholder="Enter Title"
            name="title"
            label="Title"
            value={title}
            onChange={(e) => onChangeFunc(e)}
            type="text"
            fullWidth
            required
            style={{ marginBottom: 20 }}
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
          <TextField
            type="file"
            onChange={handleFileChange}
            style={{ marginBottom: 10 }}
            fullWidth
            required
          />
          {fromError && <Alert severity="error" onClose={() => {setFormError("")}}>{fromError}</Alert>}
          <Button
            type="submit"
            onClick={onSubmit}
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Add Product
          </Button>
          { loader && <Loader /> }

        </Paper>
      </Grid>
      {error && <Notifications error={error} />}
      {success && <Notifications success={success} />}
    </>
  );
};

export default AddProducts;
