import React, { Component } from 'react';
import { object, string } from 'prop-types';

class Linode extends Component {
  static propTypes = {
    linode: object.isRequired,
    baseUrl: string.isRequired,
    token: string.isRequired
  };

  state = {
    working: false,
    result: 'idle',
    status: this.props.linode.status
  };

  resetResult = () => this.setState({ result: 'idle' });

  restart = () => {
    this.resetResult();

    this.setState({ working: true });

    const { props: { baseUrl, linode: { id }, token } } = this;

    fetch(`${baseUrl}linode/instances/${id}/reboot`, {
      method: 'post',
      headers: new Headers({ Authorization: `Bearer ${token}` })
    })
    .then(response => response.status === 200 ? 'rebooting': 'failure')
    .then((result) => {
      if (result === 'failure') {
        this.setState({ result, working: false, status: 'offline' });
      } else {
        this.setState({ status: result });
        this.runUntilRebootDone();
      }
    });
  }

  runUntilRebootDone = () => {
    const { props: { baseUrl, linode: { id }, token } } = this;

    fetch(`${baseUrl}linode/instances/${id}`, {
      method: 'get',
      headers: new Headers({ Authorization: `Bearer ${token}` })
    })
    .then(response => response.status === 200 ? response.json() : ({ status: 'indeterminate' }))
    .then(({ status }) => {
      if (status === 'rebooting') setTimeout(() => this.runUntilRebootDone(), 2000);
      
      if (status === 'running') this.setState({ working: false, result: 'success', status });

      if (status === 'indeterminate') this.setState({ working: false, result: 'failure', status: 'offline' });
    });
  }

  render() {
    const { props: { linode: { type, label, image, ipv4: [ip] } }, state: { status, result, working } } = this,
      buttonClasses = `button is-medium${working ? ' is-loading' : ''}`;

    return (
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            {label}
            &emsp;
            <span className="subtitle is-6">(IP: {ip})</span>
          </p>
          {this.renderStatus(status)}
        </header>
        <div className="card-content">
          <div className="content">
            {this.genericTag('Type', type)}
            {this.genericTag('Image', image)}
            <hr />
            <button disabled={working} onClick={this.restart} className={buttonClasses}>Restart</button>
            <div style={{ marginBottom: '10px', marginTop: '10px' }}>
            {
              !working ? <p/> :
              <progress className="progress is-small is-warning">Rebooting...</progress>
            }
            </div>
            {this.renderRestartResult(result, working)}
          </div>
        </div>
      </div>
    );
  }

  renderStatus = (status) => {
    const classNames = `tag${status === 'running' ? ' is-primary' : 
      (status === 'rebooting' ? ' is-warning' : ' is-danger')}`;
    
    return (
      <div className="tags has-addons" style={{ marginRight: '10px' }}>
        <span className="tag">Status</span>
        <span className={classNames}>{status}</span>
      </div>
    );
  }

  renderRestartResult = (result, working) => {
    if (result === 'idle' || working) return <p/>;

    const classNames = `notification${result === 'success' ? ' is-success' : ' is-danger'}`;

    return (
      <div className={classNames} style={{ marginTop: '10px' }}>
        <button onClick={this.resetResult} className="delete"></button>
        {result === 'success' ? 'Restart succeeded' : 'Restart failed'}
      </div>
    );
  }

  genericTag = (label, value) => (
    <div className="tags has-addons">
      <span className="tag is-dark">{label}</span>
      <span className="tag">{value}</span>
    </div>
  );
}

export default Linode;