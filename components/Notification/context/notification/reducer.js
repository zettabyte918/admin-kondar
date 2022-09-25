export const Reducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION": {
      return [...state, action.payload];
    }
    case "DELETE_NOTIFICATION": {
      const { payload } = action;
      payload.show = false;
      return state.map((notification) =>
        notification.id === action.payload
          ? {
              ...notification,
              show: false,
            }
          : notification
      );
    }
    // return state.filter((notification) => notification.id !== action.payload);

    default:
      return state;
  }
};
