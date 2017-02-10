import React, {PureComponent, PropTypes} from 'react';

import './Counter.css';
import './Field.css';
import './Div.css';

const handleComponentWillUpdate = function () {
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

class Counter extends PureComponent {

  static propTypes = {
    count: PropTypes.number.isRequired,
    onCountUp: PropTypes.func
  };

  componentWillUpdate() {
    handleComponentWillUpdate.apply(this);
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
                onClick={onCountUp}>+
        </button>
      </div>
    );
  }
}

class Field extends PureComponent {

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func
  };

  componentWillUpdate() {
    handleComponentWillUpdate.apply(this);
  }

  render() {
    const {
      name,
      value,
      onChange
    } = this.props;

    let className = 'Field';
    if (this._highlight) {
      className += ' is-highlighted';
    }

    const id = `field-id-${name}`;

    return (
      <div className={className}>
        <label htmlFor={id}>{name}</label>
        <input type="text"
               id={id}
               value={value}
               onChange={onChange}
               name={name}/>
      </div>
    );
  }
}

class Title extends PureComponent {

  static propTypes = {
    children: PropTypes.string
  };

  render() {
    return <h3>{this.props.children}</h3>;
  }
}

// act as a <div> but highlighted on change
class Div extends PureComponent {
  componentWillUpdate() {
    handleComponentWillUpdate.apply(this);
  }

  render() {
    const {
      className,
      ...props
    } = this.props;

    let newClassName = `${className} Div`;
    if (this._highlight) {
      newClassName += ' is-highlighted';
    }

    return <div className={newClassName}
                {...props}/>;
  }
}

class PlainDOM extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      fieldValue: '',
      hideTitle: false
    };
  }

  handleCountUp = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  handleFieldChange = (event) => {
    this.setState({
      fieldValue: event.target.value
    });
  };

  handleHideTitleChange = () => {
    this.setState({
      hideTitle: !this.state.hideTitle
    });
  };

  render() {
    return (
      <div>
        {
          this.state.hideTitle || (
            <h3>Plain DOM</h3>
          )
        }

        <Div className="Counter">
          <span>{this.state.count}</span>
          <button type="button"
                  onClick={this.handleCountUp}>+
          </button>
        </Div>

        <Div className="Field">
          <label htmlFor="field-id-field">field</label>
          <input type="text"
                 id="field-id-field"
                 value={this.state.fieldValue}
                 onChange={this.handleFieldChange}
                 name="field"/>
        </Div>

        <label>
          <input type="checkbox"
                 value={this.state.hideTitle}
                 onChange={this.handleHideTitleChange}/> Hide title
        </label>
      </div>
    );
  }
}

class Abstraction extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      fieldValue: '',
      hideTitle: false
    };
  }

  handleCountUp = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  handleFieldChange = (event) => {
    this.setState({
      fieldValue: event.target.value
    });
  };

  handleHideTitleChange = () => {
    this.setState({
      hideTitle: !this.state.hideTitle
    });
  };

  render() {
    return (
      <div>
        {
          this.state.hideTitle || <Title>Abstract Components</Title>
        }
        <Counter count={this.state.count}
                 onCountUp={this.handleCountUp}/>
        <Field name="field"
               value={this.state.fieldValue}
               onChange={this.handleFieldChange}/>
        <label>
          <input type="checkbox"
                 value={this.state.hideTitle}
                 onChange={this.handleHideTitleChange}/> Hide title
        </label>
      </div>
    );
  }
}

export default class AbstractionDemo extends PureComponent {
  render() {
    return (
      <div>
        <PlainDOM/>
        <Abstraction/>
      </div>
    );
  }
}
