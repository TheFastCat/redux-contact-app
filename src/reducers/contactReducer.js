import * as actionTypes from '../actions/actionTypes';

export default (state = [], action) => {
    switch (action.type){
      case actionTypes.CREATE_NEW_CONTACT:
        return [
          ...state,
          Object.assign({}, action.contact)
        ];
      case actionTypes.REMOVE_CONTACT:
        return state.filter((data, i) => i !== action.id);
      case actionTypes.UPDATE_CONTACT:
      console.log("inside reducer");
        return state.map((item, index) => {
              console.log(`item:${JSON.stringify(item)}, index:${index}, action.id: ${action.id}`)
              if(index !== action.id) {
                  // This isn't the item we care about - keep it as-is
                  return item;
              } else {
                return {
                  ...action.contact,
                  ...action.id
              };  
            }   
          });
      default:
            return state;
    }
  };