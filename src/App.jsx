import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import PeopleContainer from './people/people-container';

class App extends React.Component {
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  render() {
    return (
      <div>
        <Helmet
          htmlAttributes={{ lang: 'ko', amp: undefined }} // amp takes no value
          titleTemplate="%s | Lunch App"
          titleAttributes={{ itemprop: 'name', lang: 'ko' }}
          meta={[
            { name: 'description', content: 'make group for lunch' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          ]}
        />
        <Switch>
          <Route exact path="/" component={PeopleContainer} />
        </Switch>
      </div>
    );
  }
}

export default App;
