import React, { Component } from 'react';
import Web3 from 'web3';
import RNS from '@rsksmart/rns';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      domain: '',
      getting: false,
      addr: null,
      error: null,
    };

    this.handleDomainChange = this.handleDomainChange.bind(this);
    this.getAddress = this.getAddress.bind(this);
  }

  handleDomainChange(event) {
    this.setState({ domain: event.target.value, addr: null, error: null });
  }

  getAddress() {
    const { domain } = this.state;

    this.setState({ getting: true, addr: null, error: null  });

    const web3 = new Web3('https://public-node.rsk.co')
    const rns = new RNS(web3);

    rns.addr(domain)
    .then(addr => this.setState({ addr, getting: false }))
    .catch(error => this.setState({ error, getting: false }));
  }

  render() {
    const { domain, getting, addr, error } = this.state;

    return (
      <div>
        <input type="text" onChange={this.handleDomainChange} value={domain} />
        <button onClick={this.getAddress}>get address</button>
        {getting && '...'}
        {addr && <label>{addr}</label>}
        {error && <label>Error: {error.message} - Read more on {error.ref}</label>}
      </div>
    );
  }
};
