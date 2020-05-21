export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_USER":
      return [...state, action.payload] // add the fetched user to the array
    default:
      return state
  }
}
