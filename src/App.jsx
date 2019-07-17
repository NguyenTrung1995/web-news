import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import History from './pages/History';
import styled from 'styled-components';

const AppWrapper = styled.div`
  padding: 20px 100px;
  text-align: center;

  @media only screen and (max-width: 600px) {
    padding: 20px 20px;
  }
`

const NavBar = styled.div`
  margin-bottom: 20px;

  & > a {
    text-decoration: none;
    margin-right: 10px;
    background: #1e577b;
    color: #fff;
    border-radius: 4px;
    padding: 4px 10px;
    transition: all 0.5s;

    &:hover {
      background: #000;
    }
  }
`

const BodyWrapper = styled.div`

`

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <Router>
          <NavBar>
            <Link to={'/'}>Home</Link>
            <Link to={'/history-page'}>History</Link>
          </NavBar>
          <BodyWrapper>
            <Route exact path={`/`} component={Home} />
            <Route path={`/history-page`} component={History} />
          </BodyWrapper>
        </Router>
      </AppWrapper>
    );
  }
}

export default App;
