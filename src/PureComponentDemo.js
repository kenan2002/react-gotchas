import React, {Component, PureComponent, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import './Counter.css';

const counterPropTypes = {
  id: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  onCountUp: PropTypes.func
};

const handleCounterUpdate = function () {
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
};

const renderCounter = function () {
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
};

class Counter extends Component {

  static propTypes = counterPropTypes;

  componentWillUpdate() {
    handleCounterUpdate.apply(this);
  }

  render() {
    return renderCounter.apply(this);
  }
}

class PureCounter extends Component {
  static propTypes = counterPropTypes;

  componentWillUpdate() {
    handleCounterUpdate.apply(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return renderCounter.apply(this);
  }
}

class ModernPureCounter extends PureComponent {
  static propTypes = counterPropTypes;

  componentWillUpdate() {
    handleCounterUpdate.apply(this);
  }

  render() {
    return renderCounter.apply(this);
  }
}

export default class PureComponentDemo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      pure: 0,
      modern: 0,
      shit1: 0,
      shit2: 0
    };
  }

  handleCounterCountUp = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  };

  handlePureCountUp = () => {
    this.setState({
      pure: this.state.pure + 1
    });
  };

  handleModernCountUp = () => {
    this.setState({
      modern: this.state.modern + 1
    });
  };

  handleShit1CountUp() {
    this.setState({
      shit1: this.state.shit1 + 1
    });
  }

  render() {
    return (
      <div>
        <h3>simple counter</h3>
        <Counter id="simple"
                 count={this.state.counter}
                 onCountUp={this.handleCounterCountUp}/>
        <h3>pure counter</h3>
        <PureCounter id="pure"
                     count={this.state.pure}
                     onCountUp={this.handlePureCountUp}/>
        <h3>modern pure counter</h3>
        <ModernPureCounter id="modern"
                           count={this.state.modern}
                           onCountUp={this.handleModernCountUp}/>
        <h3>modern pure counter with shit handler: bind</h3>
        <ModernPureCounter id="shit1"
                           count={this.state.shit1}
                           onCountUp={this.handleShit1CountUp.bind(this)}/>
        <h3>modern pure counter with shit handler: inline arrow function</h3>
        <ModernPureCounter id="shit2"
                           count={this.state.shit2}
                           onCountUp={() => {
                             this.setState({shit2: this.state.shit2 + 1})
                           }}/>
      </div>
    );
  }
}
