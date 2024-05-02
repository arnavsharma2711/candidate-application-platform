import React from 'react';
import { Typography, Container, Button, Dialog, DialogTitle, DialogContent, Box } from '@mui/material';
import { Image } from '@mui/icons-material';

const MAX_DESCRIPTION_LENGTH = 150;

function JobCard({ index, job }) {
const { 
  id = '', 
  jobTitle = '',
  apply_link = '', 
  description = '', 
  maxSalary = 0, 
  minSalary = 0, 
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
      maxWidth: 345,
      borderRadius: '20px', 
      boxShadow: '0 3px 10px 3px rgba(0, 0, 0, .1)',
      padding: '10px',
      margin: '20px',
      backgroundColor: '#fff'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Image src={`https://weekday.works/images/${id}.png`} alt={jobRole} sx={{ width: '50px', height: 'auto', marginRight: '20px' }} />
        <Box>
          <Typography variant="h6" color="text.secondary">{jobTitle}</Typography>
          <Typography variant="h6" color="text.secondary">{jobRole}</Typography>
          <Typography variant="subtitle1" color="text.secondary">{location}</Typography>
        </Box>
      </Box>
      <Typography variant="subtitle2" color="text.secondary" sx={{ marginTop: '10px' }}>
        Estimated Salary: {salaryCurrencyCode}{minSalary ? `${minSalary} - ` : ''}{maxSalary}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" sx={{ marginTop: '10px' }}>About Company:</Typography>
      <Typography variant="body2" sx={{ marginBottom: '10px' }}>
        {description.substring(0, MAX_DESCRIPTION_LENGTH)}...
      </Typography>
      <Typography onClick={handleExpandClick} aria-expanded={expanded} sx={{ cursor: 'pointer', marginBottom: '10px' }}>
        Show More
      </Typography>

      <Dialog open={expanded} onClose={handleExpandClick}>
        <DialogTitle>Job Description</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            {description}
          </Typography>
        </DialogContent>
      </Dialog>
      <Typography variant="subtitle2" color="text.secondary" sx={{ marginTop: '10px' }}>Experience</Typography>

      <Typography variant="subtitle2" color="text.secondary" sx={{ marginBottom: '10px' }}>
        {minExp ? `${minExp} - ` : ''}{maxExp} years
      </Typography>
      <Button variant="contained" size="small" href={apply_link} target="_blank" rel="noopener noreferrer" sx={{ backgroundColor: 'rgb(85, 239, 196)', '&:hover': { backgroundColor: 'rgb(75, 215, 174)' }, width: '90%', display: 'block', margin: '0 auto' }}>Apply</Button>
      </Container>
  );
}

export default JobCard;
