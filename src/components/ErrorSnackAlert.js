import { Alert, Snackbar } from "@mui/material";
import React from "react";

export default (({ hasError, setHasError }) => {
    return (
        <Snackbar
            open={hasError}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            autoHideDuration={6000}
            onClose={() => setHasError(false)}
        >
            <Alert severity="error">
                Oops, something went wrong.
            </Alert>
        </Snackbar>
    )
})