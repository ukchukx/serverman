import React, { Component } from 'react';
import { array, func } from 'prop-types';

class Linodes extends Component {
  static propTypes = {
    linodes: array.isRequired,
    linodeSelected: func.isRequired
  };

  state = {
    selectedLinode: -1
  };

  selectLinode = (selectedLinode) => {
    this.setState({ selectedLinode });
    this.props.linodeSelected(selectedLinode);
  }

  render() {
    const { props: { linodes } } = this,
      listItemClassNames = (index) => `list-item${index === this.state.selectedLinode ? ' is-active' : ''}`;

    return (
      <div className="list is-hoverable">
        {
          linodes.map((l, i) => 
            <a href="#" 
              onClick={_ => this.selectLinode(i)} 
              className={listItemClassNames(i)} 
              key={l.id}>
              {l.label}
            </a>)
        }
      </div>
    );
  }
}

export default Linodes;