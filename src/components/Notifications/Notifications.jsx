import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";

export default function Notifications(props) {
  // console.log("props", props.error);
  let open = true
  return (
    <Stack sx={{ width: "30%", margin: "auto", marginTop: -5 }} spacing={2}>
      {props.success && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            {props.success}
          </Alert>
        </Snackbar>
      )}
      {props.error && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            {props.error}
          </Alert>
        </Snackbar>
      )}
    </Stack>
  );
}
