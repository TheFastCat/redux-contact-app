import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as contactAction from './actions/contactAction';

class App extends Component {

  constructor(props){
    super(props);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleEditUpdate = this.handleEditUpdate.bind(this);
     
    this.state = {
      address: '',
      firstName: '',
      lastName: ''
    }
  }

  handleAddressChange(e){
    this.setState({
      address: e.target.value
    })
  }

  handleFirstNameChange(e){
    this.setState({
      firstName: e.target.value
    })
  }

  handleLastNameChange(e){
    this.setState({
      lastName: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    let contact = {
      address: this.state.address,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    }
    this.setState({
      address: '',
      firstName: '',
      lastName: ''
    });
    this.props.createContact(contact);
  }
  
  handleEditUpdate(e, key) {
    e.preventDefault();
    const contact = this.props.contacts[key];
    const updatedContact = {...contact,
      [e.target.name]: e.target.value
    }
    this.props.updateContact(updatedContact, key);
  }

  handleUpdate(e, key) {
    const contact = this.state[key];
    const updatedContact = {...contact,
      [e.target.name]: e.target.value
    }
    this.props.updateContact(updatedContact, key);
  }

  listView(data, index){
    return (
      <div key={index} className="row">
        <div className="col-md-10">
          <li key={'first-name-'+index} className="list-group-item clearfix">
            <input name="firstName" defaultValue={data.firstName} onChange={(e) => this.handleEditUpdate(e, index)} />
          </li>
          <li key={'last-name-'+index} className="list-group-item clearfix">
          <input name="lastName" defaultValue={data.lastName} onChange={(e) => this.handleEditUpdate(e, index)} />
          </li>
          <li key={'address-'+index} className="list-group-item clearfix">
          <input name="address" defaultValue={data.address} onChange={(e) => this.handleEditUpdate(e, index)} />
          </li>
        </div>
        <div className="col-md-2">
          <button key={'delete-'+index} onClick={(e) => this.deleteContact(e, index)} className="btn btn-danger btn-block">
            Remove
          </button>
        </div>
    </div> 
    )
  }

  deleteContact(e, index){
    e.preventDefault();
    this.props.deleteContact(index);
  }

  updateContact(e, index){
    e.preventDefault();
    const contact = this.props.contacts[index];
    // take a copy of that contact and update it with the new data
    const updatedContact = {...contact,
      [e.target.name]: e.target.value
    }

    this.props.updateContact(updatedContact, index);
  }

  render() {

    return(
      <div className="container">
        <h1>Clientside Redux Contacts Create, Update, Delete</h1>
        <hr />
        <div>
          <h3>Add Contact Form</h3>
          <form onSubmit={this.handleSubmit}>
            <label>First Name</label><input type="text" autoComplete='given-name' onChange={this.handleFirstNameChange} className="form-control" value={this.state.firstName} /><br />
            <label>Last Name</label><input type="text" autoComplete='family-name' onChange={this.handleLastNameChange} className="form-control" value={this.state.lastName} /><br />
            <label>Address</label><input type="text" autoComplete='address-line1' onChange={this.handleAddressChange} className="form-control" value={this.state.address} /><br />
            <input type="submit" className="btn btn-success" value="ADD"/>
          </form>
          <hr />
        { <ul className="list-group">
          {this.props.contacts.map((contact, i) => this.listView(contact, i))}
        </ul> }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    contacts: state.contacts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createContact: contact => dispatch(contactAction.createContact(contact)),
    deleteContact: index => dispatch(contactAction.deleteContact(index)),
    updateContact: (contact,index) => dispatch(contactAction.updateContact(contact, index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);