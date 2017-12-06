import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import preset from 'jss-preset-default';
import App from './App';
import reducers from './redux/reducers';
import configureStore from '../shared/redux/store/configureStore';

const sheetsRegistry = new SheetsRegistry();

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        background: 'linear-gradient(45deg, purple 30%, purple 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 36,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
      },
    },
    MuiInput: {
      inputSingleline: {
        height: 'auto',
      },
    },
  },
});

// Configure JSS
const jss = create(preset());
// const jss = create({ plugins: [...preset().plugins, rtl()] }); // in-case you're supporting rtl
jss.options.createGenerateClassName = createGenerateClassName;

const render = (location) => {
  const context = {};
  const store = configureStore(reducers);
  const html = renderToString(
    <StaticRouter location={location} context={context}>
      <Provider store={store}>
        <JssProvider registry={sheetsRegistry} jss={jss}>
          <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
            <App />
          </MuiThemeProvider>
        </JssProvider>
      </Provider>
    </StaticRouter>);

  // Grab the CSS from our sheetsRegistry.
  const css = sheetsRegistry.toString();
  const helmet = Helmet.renderStatic();

  return {
    html,
    css,
    state: store.getState(),
    helmet,
  };
};

export default render;
