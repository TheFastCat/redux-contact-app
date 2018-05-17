import * as actionTypes from './actionTypes';

export const createContact = (contact) => {
    return {
      type: actionTypes.CREATE_NEW_CONTACT,
      contact: contact
    }
  };

export const deleteContact = (id) => {
    return {
        type: actionTypes.REMOVE_CONTACT,
        id: id
    }
}

export const updateContact = (contact, id) => {
    console.log("inside action creator");
    return {
        type: actionTypes.UPDATE_CONTACT,
        contact: contact,
        id: id
    }
}