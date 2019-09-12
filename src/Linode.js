import React, { Component } from 'react';
import { object } from 'prop-types';

class Linode extends Component {
  static propTypes = {
    linode: object.isRequired
  };

  render() {
    const { props: { linode: { type, status, label, image, ipv4: [ip] } } } = this;

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
          </div>
        </div>
      </div>
    );
  }

  renderStatus = (status) => {
    const classNames = `tag${status === 'running' ? ' is-primary' : ' is-danger'}`;
    
    return (
      <div className="tags has-addons" style={{ marginRight: '10px' }}>
        <span className="tag">Status</span>
        <span className={classNames}>{status}</span>
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