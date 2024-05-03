import React, { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { fetchJobList } from '../store/listing';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import FilterBox from '../components/filterBox';
import JobCard from '../components/jobCard';


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
    jobCompany: [],
    isRemote: false,
    minExperience: 0,
    minSalary: 0,
  });

  const [filterOptions, setFilterOptions] = useState({ location: [], role: [], jobCompany: [] });

  useEffect(() => {
    setFilterOptions({
      location: Array.from(new Set(jobList.map(job => job.location))).filter(loc => loc !== 'remote'),
      role: Array.from(new Set(jobList.map(job => job.jobRole))),
      jobCompany: Array.from(new Set(jobList.map(job => job.jobCompany))),
    });
  }, [jobList]);

  const filteredJobList = jobList.filter(job => 
    (filter.isRemote ? job.location === 'remote' : (filter.location.length === 0 || filter.location.includes(job.location))) &&
    (filter.role.length === 0 || filter.role.includes(job.jobRole)) &&
    (filter.jobCompany.length === 0 || filter.jobCompany.includes(job.jobCompany)) &&
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
        <Grid container spacing={3} wrap="wrap">
          {filteredJobList.map((job, index) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <div ref={loader} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
        <CircularProgress />
      </div>
    </Container>
  );
};

export default JobList;
