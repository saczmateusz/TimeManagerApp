const history = (state = [], action) => {
    let newState;
    switch (action.type) {
      case "PUSH_TO_HISTORY":
        newState = [...state]
        newState.push(action.payload)
        return newState
      case "POP_FROM_HISTORY":
        newState = [...state]
        newState.pop()
        return newState
      default:
        return state
    }
  };
  
  export default history;
  