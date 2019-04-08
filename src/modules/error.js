export const GENERAL_ERROR = 'error/GENERAL_ERROR'

const initialState = {
  error: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GENERAL_ERROR:
      return {
        ...state,
        error: action.error
      }

    default:
      return state
  }
}

export const setError = (error) => (dispatch) =>
  new Promise((resolve) => {
    dispatch({
      type: GENERAL_ERROR,
      error
    })

    resolve(error)
  })
