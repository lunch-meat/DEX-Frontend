import Typography from "@mui/material/Typography";
import { CopyToClipboard } from "react-copy-to-clipboard/lib/Component";
import Button from "@mui/material/Button";
import {ContentCopy} from "@mui/icons-material";
import Container from "@mui/material/Container";
import CountdownTimer from "./CountdownTimer";
import React, { Fragment } from "react";
import { Stack } from "@mui/material";

export default (({ ...props }) => {
    const {
        amount,
        coinName,
        coinFullName,
        walletAddress,
        handleBack,
        handleNext,
        charityName,
    } = props;
    return (
        <Fragment>
            <Container align="center" >
                <CountdownTimer onComplete={handleNext} />
            </Container>
            <Typography variant="h6" align="center" sx={{ mt: 3 }}>
                Send {amount} {coinFullName} ({coinName}) to this wallet address:
            </Typography>
            <center><Typography variant="caption" align="center" sx={{ mt: 3 }} >
                {walletAddress ? (
                    <CopyToClipboard text={walletAddress}>
                        <Button variant="outlined" endIcon={<ContentCopy />}>
                            <Typography variant="caption" align="center">
                                {walletAddress}
                            </Typography>
                        </Button>
                    </CopyToClipboard>
                ) : "...Loading"}
            </Typography></center>
            <center>
            <Typography variant="caption" align="center" sx={{ mt: 3, ml: 1 }}>
                This address is for one time use only for {charityName}.
            </Typography>
            </center>
            <Stack direction="horizontal" >
                    <Button
                        variant="outlined"
                        type="button"
                        size="large"
                        fullWidth
                        sx={{ mt: 3, ml: 1 }}
                        onClick={handleBack}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        size="large"
                        fullWidth
                        sx={{ mt: 3, ml: 1 }}
                        onClick={handleNext}
                    >
                        Done
                    </Button>
            </Stack>
        </Fragment>
    )
})