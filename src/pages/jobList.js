import React, { useEffect, useRef } from 'react';
import JobCard from '../components/jobCard';
import { Box, CircularProgress, Container, Grid } from '@mui/material';
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
    <div ref={loader} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </div>
    </Container>
  );
}

export default JobList;
