const initialState = {
  report: [],
};

function ReportReducer(state = initialState, action) {
  if (action.type === "getreports") {
    console.log("getreports", action.payload);
    return { ...state, report: action.payload };
  }

  return state;
}

export default ReportReducer;
