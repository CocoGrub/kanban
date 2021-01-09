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
      if(typeof payload.titleNumber==='undefined'){
        const newObj={[uuid()]:[{
          text:payload.text,
            id:uuid()
          }]}
        return [...state,newObj]
      }
        const col=[...state[payload.titleNumber][payload.columnName],{text:payload.text,id:uuid()}]
      const newS=[...state]
        const newObj= {
          [payload.columnName]: col
        }
      newS.splice(payload.titleNumber,1,newObj )

      return [...newS]
      // [...col,{text:payload.text,id:'dsdsax'}]
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
      console.log(payload,'pay')
      const cole = state[payload.titleNumber]
        const od=cole[Object.keys(cole)[0]].filter((x)=>x.id!==payload.cardID)
      console.log(od,'cole')
      console.log(state[payload.titleNumber][payload.title],'state[payload.titleNumber][payload.title]')
      newItems.splice(payload.titleNumber, 1);
      newItems.splice(payload.titleNumber, 0, {[payload.title]:od})
      console.log(newItems,'newItems')
      return [...newItems,]
    case'DELETE_COLUMN':
      const result = [...state];
      // const filteredItems = state.slice(0, payload.titleNumber).concat(state.slice(payload.titleNumber + 1, state.length))
      result.splice(payload.titleNumber,1)
      console.log(state)
      // const z=state.filter(x=>!x[payload.titleNumber])
      // console.log(payload.titleNumber)
      // newColumns.splice(payload.titleNumber,1)
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
