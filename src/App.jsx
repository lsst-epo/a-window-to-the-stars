import React, { Component } from 'react';
import reactn from 'reactn';
import { hot } from 'react-hot-loader/root';
import { Route, HashRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/site/ScrollToTop';
import SiteHeader from './components/site/SiteHeader';
import Sections from './components/content/sections';
import ProgressContainer from './components/content/containers/ProgressContainer';
import StyleGuide from './StyleGuide';
import Questions from './Questions';
import Answers from './Answers';

@reactn
class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <ProgressContainer {...this.props}>
            <SiteHeader />
            <main className="container-main">
              <Sections />
              <Route exact path="/styles" component={StyleGuide} />
              <Route exact path="/questions" component={Questions} />
              <Route exact path="/answers" component={Answers} />
            </main>
          </ProgressContainer>
        </ScrollToTop>
      </Router>
    );
  }
}

export default hot(App);
