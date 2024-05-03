import React from 'react';
import { Typography, Container, Button, Dialog, DialogTitle, DialogContent, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { LocationOn, Work } from '@mui/icons-material'
import { MAX_DESCRIPTION_LENGTH } from '../utils/constants';

function JobCard({ index, job }) {
  const { 
    jdUid = '', 
    jobCompany = '',
    companyImage= '',
    jdLink = '', 
    jobDetailsFromCompany = '', 
    maxJdSalary = 0, 
    minJdSalary = 0, 
    salaryCurrencyCode = '', 
    location = '', 
    minExp = 0, 
    maxExp = 0, 
    jobRole = '' 
  } = job;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container sx={{ 
      maxWidth: '100%',
      borderRadius: '20px', 
      boxShadow: '0 3px 10px 3px rgba(0, 0, 0, .1)',
      padding: '10px',
      backgroundColor: '#fff',
      marginTop: '20px',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img src={companyImage} alt={jobCompany} style={{ width: '50px', height: 'auto', marginRight: '20px' }} />
        <Box>
          <Typography variant="h6" color="text.secondary">{jobCompany}</Typography>
          <Typography variant="h6" color="text.secondary" style={{ textTransform: 'capitalize' }}>
            <Work /> {jobRole} Role
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" style={{ textTransform: 'capitalize' }}>
            <LocationOn /> {location}
          </Typography>
        </Box>
      </Box>
      <Typography variant="subtitle2" color="text.secondary" sx={{ marginTop: '10px' }}>
        Estimated Salary: {salaryCurrencyCode === 'USD' ? '$' : salaryCurrencyCode} {minJdSalary ? `${minJdSalary} - ` : ''}{maxJdSalary}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" sx={{ marginTop: '10px' }}>About Company:</Typography>
      <Typography variant="body2" sx={{ marginBottom: '10px' }}>
        {jobDetailsFromCompany.substring(0, MAX_DESCRIPTION_LENGTH)}...
      </Typography>
      <Typography onClick={handleExpandClick} aria-expanded={expanded} sx={{ cursor: 'pointer', marginBottom: '10px' }}>
        Show More
      </Typography>

      <Dialog open={expanded} onClose={handleExpandClick}>
        <DialogTitle>Job jobDetailsFromCompany</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            {jobDetailsFromCompany}
          </Typography>
        </DialogContent>
      </Dialog>
      <Typography variant="subtitle2" color="text.secondary" sx={{ marginTop: '10px' }}>Experience</Typography>

      <Typography variant="subtitle2" color="text.secondary" sx={{ marginBottom: '10px' }}>
        {minExp === maxExp ? `${minExp} years` : `${minExp ? `${minExp} - ` : ''}${maxExp} years`}
      </Typography>
      <Link to={`/job/${jdUid}`} style={{ textDecoration: 'none' }}>
        <Button variant="contained" size="small" sx={{ backgroundColor: 'rgb(85, 239, 196)', '&:hover': { backgroundColor: 'rgb(75, 215, 174)' }, width: '90%', display: 'block', margin: '0 auto' }}>
          Apply
        </Button>
      </Link>
    </Container>
  );
}

export default JobCard;
