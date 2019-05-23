export const pushToHistory = screen => {
    return {
      type: "PUSH_TO_HISTORY",
      payload: task
    };
  };
  
export const popFromHistory = () => {
    return {
      type: "POP_FROM_HISTORY",
      payload: task
    };
  };
  