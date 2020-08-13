import React  from 'react';
import "firebase/firestore";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import HomeContainer from './Home/Home.container';
import { BrowserRouter as Router } from "react-router-dom";

// Let's inject our global style attributes here
// to maintain consistency
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f8f8f6',
    },
    secondary: {
      main: '#b8c8b8'
    },
  },
});

function App() {
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <HomeContainer />
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
