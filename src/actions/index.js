import _ from "lodash"
import jsonPlaceholder from "../apis/jsonPlaceholder"

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts()) // await here makes sure that when the inner function gets called, it waits for the API request to resolve
  const userIds = _.uniq(_.map(getState().posts, "userId")) // _.map() goes through all the posts, pulls the userId property and puts it in an array. _.uniq() returns an array with just the unique userIds
  userIds.forEach((id) => dispatch(fetchUser(id))) // this iterates over the userIds array and calls fetchUser for each of them. no await before dispatch here as no logic is waiting for the user to be fetched

  // the above can alternatively be chained with lodash:
  /* _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach((id) => dispatch(fetchUser(id)))
    .value() */
}

export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/posts")

  dispatch({ type: "FETCH_POSTS", payload: response.data })
}

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`)

  dispatch({ type: "FETCH_USER", payload: response.data })
}

// export const fetchPosts = () => {
//   return async function (dispatch, getState) {
//     const response = await jsonPlaceholder.get("/posts")

//     dispatch({ type: "FETCH_POSTS", payload: response })
//   }
// }

// MEMOIZED:
// export const fetchUser = (id) => (dispatch) => {
//   _fetchUser(id, dispatch)
// }
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`)

//   dispatch({ type: "FETCH_USER", payload: response.data })
// })
