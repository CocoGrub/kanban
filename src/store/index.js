import {applyMiddleware, compose, createStore} from 'redux';
import {v4 as uuid} from 'uuid'


const initialState = [
  {
    today: [
      { text: 'Take paper',id: uuid() },
      { text: 'Take pen',id: uuid() },
    ],
  },
  {
    tomorrow: [
      { text: 'Eat pizza',id:uuid() },
    ]
  }
]


const data = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ADD_CARD':
      return payload
    case 'MOVE':
      return payload
    case 'MOVE_OUTSIDE':
      return [...state]
    case 'ADD_COLUMN':
      return { ...state,items:[...state.items,[]], };
    case 'RENAME_TITLE':
      const {prevTitle,currentTitle,titleNumber}=payload;
      const newState=[...state]
      const newColumn=newState[titleNumber][prevTitle]
      const { [prevTitle]: remove, ...rest } = newState
      const titleToDel=newState[titleNumber]
      const dwq=newState.filter((x)=>x!==titleToDel)
      const obj={
        [currentTitle]:newColumn
      }
      dwq.splice(titleNumber, 0, obj)
      return [...dwq]
    case 'DELETE_CARD':
      const newItems=[...state]
      const cole = state[payload.titleNumber]
      const od=cole[Object.keys(cole)[0]].filter((x)=>x.id!==payload.cardID)
      newItems.splice(payload.titleNumber, 1);
      newItems.splice(payload.titleNumber, 0, {[payload.title]:od})
      return [...newItems,]
    case'DELETE_COLUMN':
      const result = [...state];
      result.splice(payload.titleNumber,1)
      return [...result]
    default:
      return state;
  }
};

// const index = createStore(
//   Card,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// );

const store = createStore(
    data, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({name:'main'})
);

export default store;
