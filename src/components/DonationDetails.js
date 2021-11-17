// import Typography from "@mui/material/Typography";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import React, {Fragment} from "react";
// import Grid from "@mui/material/Grid";
// import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";
// import uniq from "lodash/uniq";
// import TextField from "@mui/material/TextField";
// import {Checkbox} from "@mui/material";
// import Button from "@mui/material/Button";
// import Container from "@mui/material/Container";
// import Paper from "@mui/material/Paper";
//
// export default (({ ...props }) => {
//     const {
//         activeStep,
//         steps,
//         handleSubmit,
//         charities,
//         coins,
//         setSelectedCoin,
//         amount,
//         setAmount,
//         setSelectedCharity,
//         hasSubmitted,
//         selectedCharity,
//         selectedCoin,
//         setIsReceiptRequested,
//         isReceiptRequested,
//         setEmail,
//         email,
//     } = props;
//
//     const filterOptions = createFilterOptions({
//         matchFrom: 'any',
//         limit: 500,
//     });
//
//     return (
//         <Fragment>
//             <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
//                 <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
//                     <Typography component="h1" variant="h4" align="center">
//                         Donate Crypto
//                     </Typography>
//                     <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
//                         {steps.map((label) => (
//                             <Step key={label}>
//                                 <StepLabel>{label}</StepLabel>
//                             </Step>
//                         ))}
//                     </Stepper>
//                     {(activeStep === 0) ? (
//                         <Fragment variant="outlined" fullWidth onSubmit={handleSubmit}>
//                             <Grid container spacing={3}>
//                                 <Grid item xs={12}>
//                                     <Autocomplete
//                                         autoComplete
//                                         selectOnFocus
//                                         fullWidth
//                                         filterOptions={filterOptions}
//                                         id="charity-select"
//                                         options={uniq(charities || [])}
//                                         onChange={(e, val) => setSelectedCharity(val)}
//                                         getOptionLabel={(o) => o ? o.name : ""}
//                                         value={selectedCharity}
//                                         renderInput={(params) =>
//                                             <TextField
//                                                 {...params}
//                                                 required
//                                                 type="text"
//                                                 label="Choose a nonprofit"
//                                                 error={!selectedCharity && hasSubmitted}
//                                             />
//                                         }
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Autocomplete
//                                         autoComplete
//                                         selectOnFocus
//                                         fullWidth
//                                         filterOptions={filterOptions}
//                                         id="coin-select"
//                                         options={coins || []}
//                                         onChange={(e, val) => setSelectedCoin(val)}
//                                         getOptionLabel={(o) => o ? `${o.name} (${o.fullName})` : ""}
//                                         value={selectedCoin}
//                                         renderInput={(params) =>
//                                             <TextField
//                                                 {...params}
//                                                 required
//                                                 type="text"
//                                                 label="Choose a coin"
//                                                 error={!selectedCoin && hasSubmitted}
//                                             />
//                                         }
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12} sm={6}>
//                                     <TextField
//                                         required
//                                         type="number"
//                                         value={amount}
//                                         onChange={(e) => setAmount(e.target.value)}
//                                         label={`Amount ${selectedCoin ? `in ${selectedCoin.name}` : ""}`}
//                                         error={(!amount || amount === 0) && hasSubmitted}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12} sm={6}>
//                                     <TextField
//                                         required
//                                         disabled
//                                         variant="standard"
//                                         type="text"
//                                         label="USD (estimated)"
//                                         value={(selectedCoin && amount) ? `$${Math.round(selectedCoin.price * amount)}` : ""}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12} >
//                                     <Checkbox
//                                         value={isReceiptRequested}
//                                         label="Would you like a tax receipt emailed to you?"
//                                         onChange={(e, val) => setIsReceiptRequested(val)}
//                                     />Would you like a tax receipt emailed to you?
//                                 </Grid>
//                                 {isReceiptRequested && (
//                                     <Grid item xs={12} >
//                                         <TextField
//                                             required
//                                             variant="standard"
//                                             type="text"
//                                             label="Email"
//                                             value={email}
//                                             fullWidth
//                                             error={hasSubmitted && (isReceiptRequested && !email)}
//                                             onChange={(e) => setEmail(e.target.value)}
//                                         />
//                                     </Grid>
//                                 )}
//                                 <Grid item xs={12} >
//                                     <Button
//                                         variant="contained"
//                                         type="submit"
//                                         fullWidth
//                                         sx={{ mt: 3, ml: 1 }}
//                                         onClick={handleSubmit}
//                                     >
//                                         Donate Crypto
//                                     </Button>
//                                 </Grid>
//                             </Grid>
//                         </Fragment>
//     );
// })