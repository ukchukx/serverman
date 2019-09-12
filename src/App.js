import React, { Component } from 'react';
import Token from './Token';
import Linodes from './Linodes';
import Linode from './Linode';

class App extends Component {
  state = {
    linodes: [],
    token: '',
    fetching: false,
    baseUrl: 'https://api.linode.com/v4/',
    selectedLinode: -1
  };

  handleTokenChanged = (token) => {
    this.setState({ token, fetching: true }, () => this.fetchLinodes());
  }

  fetchLinodes = () => {
    fetch(`${this.state.baseUrl}linode/instances`, {
      method: 'get',
      headers: new Headers({ Authorization: `Bearer ${this.state.token}` })
    })
    .then(response => response.status === 200 ? response.json(): ({ data: [] }))
    .then(({ data }) => this.setState({ linodes: data }))
    .finally(() => this.setState({ fetching: false }));
  }

  linodeSelected = (selectedLinode) => this.setState({ selectedLinode });

  render() {
    const { state:  { fetching, linodes, selectedLinode } } = this;

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
            <div className="columns">
              <div className="column">
                {
                  !fetching ? <p/> :
                  <progress className="progress is-small is-info">Fetching linodes</progress>
                }
                <Linodes linodes={linodes} linodeSelected={this.linodeSelected} />
              </div>
              {
                selectedLinode !== -1 ? 
                  <div className="column">
                    <Linode key={selectedLinode} linode={linodes.find((_, i) => i === selectedLinode)} />
                  </div>
                  :
                  <div />
              }
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
