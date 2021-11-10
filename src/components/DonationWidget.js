import React, { Fragment, useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import uniq from "lodash/uniq";
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard/lib/Component";
import { ContentCopy } from "@mui/icons-material";
import Container from "@mui/material/Container";
import {Checkbox} from "@mui/material";

const API_BASE_URL = 'https://crypto-for-charity.herokuapp.com/api/';
const fetchCharitiesApi = `${API_BASE_URL}charities`;
const fetchCoinsApi = `${API_BASE_URL}coins`;
const postDonationApi = `${API_BASE_URL}donation`;

const steps = ['Donation Details', 'Send Crypto'];

const fetchData = async (url, callback) => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        callback(json)
    } catch(e) {
        console.log("error", e);
    }
};

export default (() => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [charities, setCharities] = useState(null);
    const [coins, setCoins] = useState(null);
    const [selectedCharity, setSelectedCharity] = useState(null);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [amount, setAmount] = useState();
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [invoice, setInvoice] = useState(null);
    const [email, setEmail] = useState(null);
    const [isReceiptRequested, setIsReceiptRequested] = useState(false);

    useEffect(() => {
        if (!charities) fetchData(fetchCharitiesApi, setCharities).then();
        if (!coins) fetchData(fetchCoinsApi, setCoins).then();
    }, []);

    const handleSubmit = async () => {
        setHasSubmitted(true);
        if (!selectedCharity || !selectedCoin || !amount || amount === 0 || (isReceiptRequested && !email)) {
            return;
        }
        setActiveStep(activeStep + 1);
        console.log(selectedCharity);
        try {
            const response = await axios.post(postDonationApi, {
                amount,
                charityName: selectedCharity.name,
                ein: selectedCharity.ein,
                coin: selectedCoin.name,
                email,
                isReceiptRequested,
            });
            console.log(response.data[0]);
            if (response && response.data && response.data.length) {
                setInvoice(response.data[0]);
            }
        } catch(e) {
            console.log("error", e);
        }
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        limit: 500,
    });

    return (
        <Fragment>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Donate Crypto
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === 0 ? (
                        <FormControl variant="outlined" fullWidth onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        autoComplete
                                        selectOnFocus
                                        fullWidth
                                        filterOptions={filterOptions}
                                        id="charity-select"
                                        options={uniq(charities || [])}
                                        onChange={(e, val) => setSelectedCharity(val)}
                                        getOptionLabel={(o) => o ? o.name : ""}
                                        value={selectedCharity}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                required
                                                type="text"
                                                label="Choose a nonprofit"
                                                error={!selectedCharity && hasSubmitted}
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        autoComplete
                                        selectOnFocus
                                        fullWidth
                                        filterOptions={filterOptions}
                                        id="coin-select"
                                        options={coins || []}
                                        onChange={(e, val) => setSelectedCoin(val)}
                                        getOptionLabel={(o) => o ? `${o.name} (${o.fullName})` : ""}
                                        value={selectedCoin}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                required
                                                type="text"
                                                label="Choose a coin"
                                                error={!selectedCoin && hasSubmitted}
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        label={`Amount ${selectedCoin ? `in ${selectedCoin.name}` : ""}`}
                                        error={(!amount || amount === 0) && hasSubmitted}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        disabled
                                        variant="standard"
                                        type="text"
                                        label="USD (estimated)"
                                        value={(selectedCoin && amount) ? `$${Math.round(selectedCoin.price * amount)}` : ""}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <Checkbox
                                        value={isReceiptRequested}
                                        label="Would you like a tax receipt emailed to you?"
                                        onChange={(e, val) => setIsReceiptRequested(val)}
                                    />Would you like a tax receipt emailed to you?
                                </Grid>
                                {isReceiptRequested && (
                                    <Grid item xs={12} >
                                        <TextField
                                            variant="standard"
                                            type="text"
                                            label="Email"
                                            value={email}
                                            fullWidth
                                            error={hasSubmitted && (isReceiptRequested && !email)}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Grid>
                                )}
                                <Grid item item xs={12} >
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        fullWidth
                                        sx={{ mt: 3, ml: 1 }}
                                        onClick={handleSubmit}
                                    >
                                        Donate Crypto
                                    </Button>
                                </Grid>
                            </Grid>
                        </FormControl>
                    ) : (
                        <Fragment>
                            <Typography variant="h6" align="center">
                                Send {amount} {selectedCoin && selectedCoin.name} to this wallet address:
                            </Typography>
                            <Typography variant="body1" align="center" sx={{ mt: 3, ml: 1 }}>
                                {invoice ? (
                                    <CopyToClipboard text={invoice.walletAddress}>
                                        <Button variant="outlined" >{invoice.walletAddress} <ContentCopy /></Button>
                                    </CopyToClipboard>
                                ) : "...Loading"}

                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="outlined"
                                    type="button"
                                    sx={{ mt: 3, ml: 1 }}
                                    onClick={handleBack}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{ mt: 3, ml: 1 }}
                                    onClick={handleBack}
                                >
                                    Finished
                                </Button>
                            </Box>
                        </Fragment>
                        )}
                </Paper>
            </Container>
        </Fragment>
    );
})