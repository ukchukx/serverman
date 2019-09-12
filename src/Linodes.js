import React, { Component } from 'react';
import { array } from 'prop-types';

class Linodes extends Component {
  static propTypes = {
    linodes: array.isRequired
  };

  render() {
    const { props: { linodes } } = this;

    return (
      <div className="list is-hoverable">
        {
          linodes.map(l => <a href="#" className="list-item" key={l.id}>{l.label}</a>)
        }
      </div>
    );
  }
}

export default Linodes;