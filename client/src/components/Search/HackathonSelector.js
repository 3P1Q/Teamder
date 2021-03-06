// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

import SERVER_URL from '../../utils/constants';

export default function Asynchronous(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  // const [loading, setLoading] = React.useState(true);
  const loading = open && options.length === 0;

  // const [hackChoice, setHackChoice] = React.useState({name:""});

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await axios.get(`${SERVER_URL}/hackathons`);
      //await sleep(1e3); // For demo purposes.
      //console.log(response);
      const countries = await response.data;

      if(props.hackChoice === null)
        props.setHackChoice(countries[0]);
      //console.log(countries);

      if (active) {
        const opt = countries.map((option) => {
          const firstLetter = option.name[0].toUpperCase();
          return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
          };
        });
        // setOptions(countries.map((key) => key));
        setOptions(opt);
      }

      // setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
    fullWidth
    value={props.hackChoice}
    onChange={(e,v) => {props.setHackChoice(v)} }
      id="asynchronous-demo"
      className="hackathon-search"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(option) => option.firstLetter}
      loading={loading}
      renderInput={(params) => (
        <TextField
          style={props.disable?{display:"none"}:{}}
          //disabled={props.disable}
          {...params}
          label="Select Hackathon"
          variant="outlined"
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
