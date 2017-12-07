import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { BottomNavigation, BottomNavigationButton } from 'material-ui';
import { Assignment, Group } from 'material-ui-icons';

import PeopleContainer from './people/people-container';
import GroupContainer from './group/group-container';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.location === '/' ? 0 : 1,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  handleChange(event, value) {
    this.setState({ value });
  }
  render() {
    const { value } = this.state;
    return (
      <React.Fragment>
        <Helmet
          htmlAttributes={{ lang: 'ko', amp: undefined }} // amp takes no value
          defaultTitle="Lunch App"
          titleTemplate="Lunch App - %s"
          titleAttributes={{ itemprop: 'name', lang: 'ko' }}
          meta={[
            { name: 'description', content: 'make group for lunch' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          ]}
        />
        <Route
          path="/"
          render={({ match, location, history }) => (
            <BottomNavigation
              value={value}
              onChange={this.handleChange}
              showLabels
            >
              <BottomNavigationButton label="People" icon={<Assignment />} onClick={() => history.push('/')} />
              <BottomNavigationButton label="Group" icon={<Group />} onClick={() => history.push('/group')} />
            </BottomNavigation>
          )}
        />
        <Switch>
          <Route exact path="/" component={PeopleContainer} />
          <Route exact path="/group" component={GroupContainer} />
        </Switch>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  location: PropTypes.string.isRequired,
};

export default App;
