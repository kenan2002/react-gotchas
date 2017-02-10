import React, {Component, PropTypes} from 'react';

import './Field.css';

class Field extends Component {
  handleRemove = () => {
    const {
      name,
      onRequestRemove,
    } = this.props;
    onRequestRemove && onRequestRemove(name);
  };

  handleMoveUp = () => {
    const {
      name,
      onRequestMoveUp,
    } = this.props;
    onRequestMoveUp && onRequestMoveUp(name);
  };

  handleMoveDown = () => {
    const {
      name,
      onRequestMoveDown,
    } = this.props;
    onRequestMoveDown && onRequestMoveDown(name);
  };

  render() {
    const {
      name,
      value,
      onChange
    } = this.props;

    const id = `field-input-${name}`;

    return (
      <div className="Field">
        <label htmlFor={id}>{name}</label>
        <input type="text"
               id={id}
               name={name}
               value={value}
               onChange={onChange}/>
        <button type="button"
                onClick={this.handleRemove}>
          Remove
        </button>
        <button type="button"
                onClick={this.handleMoveUp}>
          ↑
        </button>
        <button type="button"
                onClick={this.handleMoveDown}>
          ↓
        </button>
      </div>
    );
  }
}

class UncontrolledForm extends Component {

  static propTypes = {
    keyType: PropTypes.oneOf([
      'name',
      'index',
      'random'
    ]),
    title: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      fields: []
    };
  }

  handleFieldAdd = () => {
    const field = prompt('Input field name: ');
    if (field && this.state.fields.indexOf(field) === -1) {
      this.setState({
        fields: [
          ...this.state.fields,
          field
        ]
      });
    } else if (field) {
      alert(`Field "${field}" already exists.`);
    } else {
      alert(`Please input a non-empty field name.`);
    }
  };

  handleFieldRemove = (field) => {
    const fields = this.state.fields;
    const index = fields.indexOf(field);
    if (index !== -1) {
      this.setState({
        fields: [
          ...fields.slice(0, index),
          ...fields.slice(index + 1)
        ]
      });
    }
  };

  handleFieldMoveUp = (field) => {
    const fields = this.state.fields;
    const index = fields.indexOf(field);
    if (index !== 0 && index !== -1) {
      this.setState({
        fields: [
          ...fields.slice(0, index - 1),
          fields[index],
          fields[index - 1],
          ...fields.slice(index + 1)
        ]
      });
    }
  };

  handleFieldMoveDown = (field) => {
    const fields = this.state.fields;
    const index = fields.indexOf(field);
    if (index !== fields.length - 1 && index !== -1) {
      this.setState({
        fields: [
          ...fields.slice(0, index),
          fields[index + 1],
          fields[index],
          ...fields.slice(index + 2)
        ]
      });
    }
  };

  render() {
    const {
      title
    } = this.props;

    return (
      <div>
        <h3>{title}</h3>
        <form action="#">
          {this.state.fields.map((field, index) => {
              let key;
              switch (this.props.keyType) {
                case 'index':
                  key = index;
                  break;
                case 'random':
                  key = Math.random();
                  break;
                default:
                  key = field;
                  break;
              }
              return (
                <Field key={key}
                       name={field}
                       onRequestRemove={this.handleFieldRemove}
                       onRequestMoveUp={this.handleFieldMoveUp}
                       onRequestMoveDown={this.handleFieldMoveDown}/>
              );
            }
          )}
          <button type="button"
                  onClick={this.handleFieldAdd}>Add Field
          </button>
        </form>
      </div>
    );
  }
}

class ControlledForm extends Component {

  static propTypes = {
    keyType: PropTypes.oneOf([
      'name',
      'index',
      'random'
    ]),
    title: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      fields: []
    };
  }

  handleFieldAdd = () => {
    const name = prompt('Input field name: ');
    if (name && this.state.fields.indexOf(name) === -1) {
      this.setState({
        fields: [
          ...this.state.fields,
          {
            name,
            value: '',
            onChange: (event) => {
              const fields = this.state.fields;
              const index = fields.findIndex(f => f.name === name);
              if (index !== -1) {
                const value = event.target.value;
                this.setState({
                  fields: [
                    ...fields.slice(0, index),
                    {
                      ...fields[index],
                      value
                    },
                    ...fields.slice(index + 1)
                  ]
                });
              }
            }
          }
        ]
      });
    } else if (name) {
      alert(`Field "${name}" already exists.`);
    } else {
      alert(`Please input a non-empty field name.`);
    }
  };

  handleFieldRemove = (name) => {
    const fields = this.state.fields;
    const index = fields.findIndex(f => f.name === name);
    if (index !== -1) {
      this.setState({
        fields: [
          ...fields.slice(0, index),
          ...fields.slice(index + 1)
        ]
      });
    }
  };

  handleFieldMoveUp = (name) => {
    const fields = this.state.fields;
    const index = fields.findIndex(f => f.name === name);
    if (index !== 0 && index !== -1) {
      this.setState({
        fields: [
          ...fields.slice(0, index - 1),
          fields[index],
          fields[index - 1],
          ...fields.slice(index + 1)
        ]
      });
    }
  };

  handleFieldMoveDown = (name) => {
    const fields = this.state.fields;
    const index = fields.findIndex(f => f.name === name);
    if (index !== fields.length - 1 && index !== -1) {
      this.setState({
        fields: [
          ...fields.slice(0, index),
          fields[index + 1],
          fields[index],
          ...fields.slice(index + 2)
        ]
      });
    }
  };

  render() {
    const {
      title
    } = this.props;

    return (
      <div>
        <h3>{title}</h3>
        <form action="#">
          {this.state.fields.map((field, index) => {
              let key;
              switch (this.props.keyType) {
                case 'index':
                  key = index;
                  break;
                case 'random':
                  key = Math.random();
                  break;
                default:
                  key = field.name;
                  break;
              }

              return (
                <Field key={key}
                       name={field.name}
                       value={field.value}
                       onChange={field.onChange}
                       onRequestRemove={this.handleFieldRemove}
                       onRequestMoveUp={this.handleFieldMoveUp}
                       onRequestMoveDown={this.handleFieldMoveDown}/>
              );
            }
          )}
          <button type="button"
                  onClick={this.handleFieldAdd}>Add Field
          </button>
        </form>
      </div>
    );
  }
}

function Gotcha1() {
  return (
    <UncontrolledForm keyType="index"
                      title="Gotcha: key=index"/>
  );
}

function Gotcha2() {
  return (
    <UncontrolledForm keyType="random"
                      title="Gotcha: key=random"/>
  );
}

function Good() {
  return (
    <UncontrolledForm keyType="name"
                      title="Good: key=name"/>
  );
}

function Better() {
  return (
    <ControlledForm keyType="name"
                    title="Better: controlled, key=name"/>
  );
}

function Experiment1() {
  return (
    <ControlledForm keyType="index"
                    title="Experiment: controlled, key=index"/>
  );
}


function Experiment2() {
  return (
    <ControlledForm keyType="random"
                    title="Experiment: controlled, key=random"/>
  );
}

export default class StateLossDemo extends Component {
  render() {
    return (
      <div>
        <h2>State Loss</h2>
        <Gotcha1/>
        <Gotcha2/>
        <Good/>
        <Better/>
        <Experiment1/>
        <Experiment2/>
      </div>
    );
  }
}
