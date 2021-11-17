import React, { Fragment, useState, useEffect } from 'react';
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import axios from "axios";
import {Close, Warning} from "@mui/icons-material";
import Container from "@mui/material/Container";
import {
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import SendCrypto from "./SendCrypto";
import { Check } from "@material-ui/icons";
import ErrorSnackAlert from "./ErrorSnackAlert";
import ThankYouPage from "./ThankYouPage";
import texas from './cryptoIcons/texas.png';

const API_BASE_URL = 'https://crypto-for-charity.herokuapp.com/api/';
const fetchCharitiesApi = `${API_BASE_URL}charities`;
const fetchCoinsApi = `${API_BASE_URL}coins`;
const postDonationApi = `${API_BASE_URL}donation`;

const steps = ['Details', 'Send', 'Confirm'];

export default (() => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [charities, setCharities] = useState(null);
    const [coins, setCoins] = useState(null);
    const [selectedCharity, setSelectedCharity] = useState({ name: 'Texas', ein: '000000', });
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [amount, setAmount] = useState(1);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [invoice, setInvoice] = useState(null);
    const [email, setEmail] = useState(null);
    const [isReceiptRequested, setIsReceiptRequested] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [hasError, setHasError] = useState(false);

    const fetchData = async (url, callback) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json);
            callback(json)
        } catch(e) {
            setHasError(true);
            console.log("error", e);
        }
    };

    useEffect(() => {
        if (!charities) fetchData(fetchCharitiesApi, setCharities).then();
        if (!coins) fetchData(fetchCoinsApi, setCoins).then();
    }, [charities, setCharities, coins, setCoins]);

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
            setHasError(true);
            console.log("error", e);
        }
    }

    const handleBack = () => {
        setActiveStep(0);
        setInvoice(null);
        setIsDialogOpen(true);
    };

    const handleConfirmNo = () => {
        setActiveStep(0);
        setInvoice(null);
        setIsDialogOpen(false);
    };

    const handleNext = () => {
        setIsDialogOpen(true);
    }

    const handleConfirmYes = () => {
        setActiveStep(3);
        setIsDialogOpen(false);
    }

    const resetForm = () => {
        setSelectedCoin(null);
        setIsReceiptRequested(null);
        setEmail(null);
        setAmount(1);
        setInvoice(null);
        setIsDialogOpen(false);
        setSelectedCharity(null);
        setHasSubmitted(false);
        setHasError(false);
        setActiveStep(0);
    }

    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        limit: 500,
    });

    return (
        <Fragment>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <center><img src={texas} width="50%" height="50%" /></center>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {(activeStep === 0) && (
                        <Fragment variant="outlined" fullWidth onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        autoComplete
                                        selectOnFocus
                                        fullWidth
                                        filterOptions={filterOptions}
                                        id="coin-select"
                                        options={coins || [{ name: '...Loading', fullName: "" }]}
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
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        required
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        label={`Amount ${selectedCoin ? `in ${selectedCoin.name}` : ""}`}
                                        error={(!amount || amount === 0) && hasSubmitted}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <TextField
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
                                            required
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
                                <Grid item xs={12} >
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
                        </Fragment>
                    )} {(activeStep === 1) && (
                        <SendCrypto
                            amount={amount}
                            walletAddress={invoice ? invoice.walletAddress : invoice}
                            coinName={selectedCoin ? selectedCoin.name : ""}
                            coinFullName={selectedCoin ? selectedCoin.fullName : ""}
                            charityName={selectedCharity ? selectedCharity.name : ""}
                            ein={selectedCharity ? selectedCharity.ein : ""}
                            handleBack={handleBack}
                            handleNext={handleNext}
                        />
                    )}
                    {(activeStep === 3) && (
                        <ThankYouPage resetDonationDetails={resetForm} />
                        )}
                    <Dialog open={isDialogOpen}>
                        <DialogTitle>
                            <Warning fontSize="medium" color="warning"/>    Did you send crypto to this wallet?
                        </DialogTitle>
                        <DialogContent>
                            Your confirmation lets us know whether or not to expect funds at this address.

                            If yes, then the wallet will remain active for 24 hours or until your transaction is clears.
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="text"
                                type="button"
                                fullWidth
                                sx={{ mt: 3, ml: 1 }}
                                onClick={handleConfirmNo}
                                startIcon={<Close />}
                            >
                                Nope, I didn't send crypto
                            </Button>
                            <Button
                                variant="text"
                                type="submit"
                                fullWidth
                                sx={{ mt: 3, ml: 1 }}
                                onClick={handleConfirmYes}
                                startIcon={<Check />}
                            >
                                Yes, I sent crypto
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <ErrorSnackAlert hasError={hasError} setHasError={setHasError} />
                </Paper>
            </Container>
        </Fragment>
    );
})