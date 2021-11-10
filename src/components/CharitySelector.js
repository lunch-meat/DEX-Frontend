import React, { Fragment } from 'react';
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 500,
});

export default (({...props}) => {
    return (
        <Fragment>
            <Autocomplete
                autoComplete
                filterOptions={filterOptions}
                {...props}
            >
            </Autocomplete>
        </Fragment>
    );
})