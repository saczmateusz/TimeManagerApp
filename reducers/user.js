const user = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload
      };
    case "UNSET_USER":
      let empty = {}
      return empty
    case "SET_USER_TASKS":
      let newState = {
        ...state,
        tasks: action.payload
      }
      return newState;
    default:
      return state
  }
};

export default user;
