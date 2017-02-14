import React, {PureComponent, PropTypes} from 'react';

import './Counter.css';

class Counter extends PureComponent {

  static propTypes = {
    count: PropTypes.number.isRequired,
    onCountUp: PropTypes.func
  };

  componentWillUpdate() {
    if (this._force) {
      this._force = false;
      return;
    }
    this._highlight = true;
    setTimeout(() => {
      this._highlight = false;
      this._force = true;
      this.forceUpdate();
    }, 200);
  }

  render() {
    const {
      count,
      onCountUp
    } = this.props;

    let className = 'Counter';

    if (this._highlight) {
      className += ' is-highlighted';
    }

    return (
      <div className={className}>
        <span>{count}</span>
        <button type="button"
                onClick={onCountUp}
                disabled={this._highlight}>+
        </button>
      </div>
    );
  }
}

class IndexKey extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      counters: [0, 1, 2],
      removeFirst: false
    }
  }

  handleToggleFirst = (event) => {
    this.setState(
      {
        removeFirst: event.target.checked
      }
    );
  };

  render() {
    let counters = Array.from(this.state.counters);
    const removeFirst = this.state.removeFirst;

    if (removeFirst) {
      counters.shift();
    }

    return (
      <div>
        <h3>without key (key=index)</h3>
        {
          counters.map((count, index) => {
            return <Counter key={index} count={count}/>
          })
        }
        <label>
          <input type="checkbox"
                 checked={removeFirst}
                 onChange={this.handleToggleFirst}/>
          omit first
        </label>
      </div>
    );
  }
}

class IdKey extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      counters: {
        first: 0,
        second: 1,
        third: 2
      },
      removeFirst: false
    }
  }

  handleToggleFirst = (event) => {
    this.setState(
      {
        removeFirst: event.target.checked
      }
    );
  };

  render() {
    let counters = Object.entries(this.state.counters);
    const removeFirst = this.state.removeFirst;

    if (removeFirst) {
      counters.shift();
    }

    return (
      <div>
        <h3>without key (key=index)</h3>
        {
          counters.map(([key, count]) => {
            return <Counter key={key} count={count}/>
          })
        }
        <label>
          <input type="checkbox"
                 checked={removeFirst}
                 onChange={this.handleToggleFirst}/>
          omit first
        </label>
      </div>
    );
  }
}

class RandomKey extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      counters: [0, 1, 2],
      removeFirst: false
    }
  }

  handleToggleFirst = (event) => {
    this.setState(
      {
        removeFirst: event.target.checked
      }
    );
  };

  render() {
    let counters = Array.from(this.state.counters);
    const removeFirst = this.state.removeFirst;

    if (removeFirst) {
      counters.shift();
    }

    return (
      <div>
        <h3>key=random</h3>
        {
          counters.map((count) => {
            return <Counter key={Math.random()} count={count}/>
          })
        }
        <label>
          <input type="checkbox"
                 checked={removeFirst}
                 onChange={this.handleToggleFirst}/>
          omit first
        </label>
      </div>
    );
  }
}

export default class KeyDemo extends PureComponent {
  render() {
    return (
      <div>
        <IndexKey/>
        <IdKey/>
        <RandomKey/>
      </div>
    );
  }
}
