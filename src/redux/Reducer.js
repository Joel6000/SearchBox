import {
  STORE_RESULT,
  REMOVE_RESULT,
  STORE_HISTORY,
  REMOVE_HISTORY,
  STORE_GEOMETRY,
} from './Action';

const initialState = {
  // Malaysia geometery as initial
  geometery: [],
  results: [],
  history: [],
};

function dataReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case STORE_RESULT:
      return {...state, results: action.payload};
    case REMOVE_RESULT:
      return {...state, results: []};
    case STORE_HISTORY:
      return {...state, history: [...state.history, action.payload]};
    case REMOVE_HISTORY:
      return {
        ...state,
        history: state.history.filter(
          obj => obj.index !== action.payload.index,
        ),
      };
    case STORE_GEOMETRY:
      return {
        ...state,
        geometery: [
          {
            latitude: action.payload.geometry.location.lat,
            longitude: action.payload.geometry.location.lng,
            address: action.payload.formatted_address,
          },
        ],
      };
    default:
      return state;
  }
}

export default dataReducer;
