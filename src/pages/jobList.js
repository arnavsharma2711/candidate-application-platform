import React, { useEffect } from 'react';
import JobCard from '../components/jobCard';
import { Box, Container, Grid } from '@mui/material';
import FilterBox from '../components/filterBox';
import { fetchJobList } from '../store/listing';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

function JobList() {
  const dispatch = useDispatch();
  const {
    jobList,
  } = useSelector(
    (state) => ({
      jobList: state.listStore.jobList || [],
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(fetchJobList());
  }, [dispatch]);

  return (
    <Container>
      <FilterBox />
      <Box>
        <Grid container spacing={3}>
          {jobList.map((job, index) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default JobList;
