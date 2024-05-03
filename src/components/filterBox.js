import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, FormControlLabel, Switch, TextField, Grid, Box, Typography } from '@mui/material';

function FilterBox({ filter, setFilter, filterOptions }) {
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter(prevFilter => ({ ...prevFilter, [name]: Array.isArray(value) ? value : [value] }));
  };

  const handleSwitchChange = (event) => {
    const { name, checked } = event.target;
    setFilter(prevFilter => ({ ...prevFilter, [name]: checked }));
  };

  const handleNumberInputChange = (event) => {
    const { name, value } = event.target;
    setFilter(prevFilter => ({ ...prevFilter, [name]: value === '' ? '' : Number(value) }));
  };

  return (
<Grid container justifyContent="center">
      <Box sx={{ width: '80%', mt: 3, mb: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Filter Options
      </Typography>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
        <InputLabel id="company-label">Company Name</InputLabel>
        <Select
          labelId="company-label"
          name="jobCompany"
          multiple
          value={filter.jobCompany}
          onChange={handleFilterChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {filterOptions.jobCompany.map((loc, index) => (
            <MenuItem key={index} value={loc}>
              <Checkbox checked={filter.jobCompany.indexOf(loc) > -1} />
              <ListItemText primary={loc} />
            </MenuItem>
          ))}
        </Select>
        </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
        <InputLabel id="location-label">Location</InputLabel>
        <Select
          labelId="location-label"
          name="location"
          multiple
          value={filter.location}
          onChange={handleFilterChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {filterOptions.location.map((loc, index) => (
            <MenuItem key={index} value={loc}>
              <Checkbox checked={filter.location.indexOf(loc) > -1} />
              <ListItemText primary={loc} />
            </MenuItem>
          ))}
        </Select>
        </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="minExperience"
              value={filter.minExperience}
              onChange={handleNumberInputChange}
              label="Minimum Experiences"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="minSalary"
              value={filter.minSalary}
              onChange={handleNumberInputChange}
              label="Minimum Salary"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={filter.isRemote}
                  onChange={handleSwitchChange}
                  name="isRemote"
                  color="primary"
                />
              }
              label="Remote"
            />
          </Grid>
        </Grid>

      </Box>
    </Grid>
  );
}

export default FilterBox;
