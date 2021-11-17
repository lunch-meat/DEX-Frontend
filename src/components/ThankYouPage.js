import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, {Fragment} from "react";

export default (({ resetDonationDetails }) => {
    return (
        <Fragment>
            <Typography variant="h5">
                Thank you for your donation!
                <center>
                    <Button
                        variant="contained"
                        onClick={resetDonationDetails}
                        sx={{ mt: 3, ml: 1 }}
                    >
                        Make another donation
                    </Button>
                </center>
            </Typography>
        </Fragment>
    )
})