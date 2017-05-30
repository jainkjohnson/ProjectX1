import React from 'react';
import {render} from 'react-dom';
import AppContainer from './containers'

class App extends React.Component {
  render () {
    return <AppContainer />;
  }
}

render(<App/>, document.getElementById('app'));
