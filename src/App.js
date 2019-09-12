import React, { Component } from 'react';
import Token from './Token';

class App extends Component {
  state = {
    linodes: [],
    token: ''
  };

  handleTokenChanged = (token) => {
    this.setState({ token });
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <h1 className="title">Serverman</h1>
            </a>
          </div>
        </nav>
        <section className="section">
          <div className="container is-fluid">
            <Token tokenChanged={this.handleTokenChanged} />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
