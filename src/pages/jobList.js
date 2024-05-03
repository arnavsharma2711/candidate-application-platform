import React, { useEffect, useRef, useState } from 'react';
import JobCard from '../components/jobCard';
import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import FilterBox from '../components/filterBox';
import { fetchJobList } from '../store/listing';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

function JobList() {
  const dispatch = useDispatch();
  const {
    jobList, totalCount
  } = useSelector(
    (state) => ({
      jobList: state.listStore.jobList || [],
      totalCount: state.listStore.totalCount || 0,
    }),
    shallowEqual,
  );

const [filter, setFilter] = useState({
  location: [],
  role: [],
  isRemote: false,
  minExperience: 0,
  minSalary: 0,
});
  const [filterOptions, setFilterOptions] = useState({ location: [], role: []});

  useEffect(() => {
    setFilterOptions({
      location: Array.from(new Set(jobList.map(job => job.location))).filter(loc => loc !== 'remote'),
      role: Array.from(new Set(jobList.map(job => job.jobRole))),
      isRemote: false,
    });
  }, [jobList]);

  const filteredJobList = jobList.filter(job => 
    (filter.isRemote ? job.location === 'remote' : (filter.location.length === 0 || filter.location.includes(job.location))) &&
    (filter.role.length === 0 || filter.role.includes(job.jobRole)) &&
    (filter.minExperience === 0 || job.minExp >= filter.minExperience) &&
    (filter.minSalary === 0 || job.minJdSalary >= filter.minSalary)
  );

  const loader = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        dispatch(fetchJobList());
      }
    });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [dispatch]);

  return (
    <Container>
      <FilterBox filter={filter} setFilter={setFilter} filterOptions={filterOptions} />
      <Typography variant="h3" align="center">
        Job Listing
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        (Total jobs: {totalCount})
      </Typography>
      <Box>
        
        <Grid container spacing={3}>
          {filteredJobList.map((job, index) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <div ref={loader} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    </Container>
  );
};

export default JobList;
