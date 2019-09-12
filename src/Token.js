import React, { Component } from 'react';
import { func } from 'prop-types';

class Token extends Component {
  static propTypes = {
    tokenChanged: func.isRequired
  };

  state = {
    tokenKey: 'serverman-token',
    token: '',
    tokenRef: React.createRef()
  };

  fetchToken = () => {
    const token = window.localStorage.getItem(this.state.tokenKey);

    if (token) {
      this.setState({ token });
      this.props.tokenChanged(token);
    }
  }

  saveToken = (token) => window.localStorage.setItem(this.state.tokenKey, token);

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token = this.state.tokenRef.current.value;

    if (! token || token === this.state.token) return;

    this.setState({ token });
    this.saveToken(token);
    this.props.tokenChanged(token);
  }

  componentDidMount() {
    this.fetchToken();
  }

  render() {
    const { state: { token, tokenRef } } = this;
    const inputClassNames = `input${token ? '' : ' is-danger'}`;
    const action = token ? 'Update' : 'Set';
    const styles = { marginBottom: '20px' };

    return (
      <form style={styles} onSubmit={this.handleSubmit}>
        <label className="label">Linode access token</label>
        <div className="field has-addons">
          <div className="control">
            <input 
              defaultValue={token}
              ref={tokenRef}
              className={inputClassNames} 
              type="text" 
              placeholder="Linode access token" />
          </div>
          <div className="control">
            <button type="submit" className="button is-info">{action} token</button>
          </div>
        </div>  
      </form>
    );
  }
}

export default Token;