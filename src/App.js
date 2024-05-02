import logo from './logo.png';
import './App.css';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function App() {
  return (
    <Container className="App">
      <Container className="App-content">
        <img src={logo} className="App-logo" alt="logo" />
        <Typography variant="h5" gutterBottom>
          Candidate Application Platform by <Link to="https://www.linkedin.com/in/arnavsharma2711/" className="App-link" target='blank'>Arnav Sharma</Link>
        </Typography>
        <Typography variant="h3">
          <Link to="/jobs" className="App-link">View Jobs Listing</Link>
        </Typography>
      </Container>
    </Container>
  );
}

export default App;
