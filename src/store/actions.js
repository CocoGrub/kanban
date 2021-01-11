import state from './index';
import {v4 as uuid} from "uuid";

function genName(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const  charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};


export const onDragEnd=(result)=> {
  const newState= state.getState()
  const prevState=state.getState()
  const zedState=[...prevState]
  const newItems = {...newState}
  const items=[]
  for(const property in newItems){
    let zz = newItems[Object.keys(newItems)[property]]
    for(const prop in zz ){
      items.push(zz[prop])
    }
  }
  const { source, destination } = result;

  // if drop outside the list
  if (!destination) {
    return {
      type:'MOVE_OUTSIDE',
    };
  }
  const sInd = +source.droppableId;
  const dInd = +destination.droppableId;

  if (sInd === dInd) {
    const q = reorder(items[sInd], source.index, destination.index);
    const newState = [...items];
    newState[sInd] = q;
    let name=''
    console.log(newState,'newState')
    for(let i =0;i<newState.length;i++){
      name=Object.keys(prevState[i])[0]
      zedState[i]= {[name]:newState[i]}
    }
    console.log('prevState',prevState)
    return{
      type:'MOVE',
      payload:zedState}
  } else {
    const result = move(items[sInd], items[dInd], source, destination);
    const newState = [...items].filter(group => group.length)
    newState[sInd] = result[sInd];
    newState[dInd] = result[dInd];
    let name=''
    for(let i =0;i<newState.length;i++){
      name=Object.keys(prevState[i])[0]
      zedState[i]= {[name]:newState[i]}
    }
    return{
      type:'MOVE',
      payload:zedState
    }
  }

}

export const ADD_CARD = (titleNumber,text,columnName) => {
  const newState= state.getState()
  console.log(titleNumber,text,columnName,'titleNumber,text,columnName')
  if(typeof titleNumber==='undefined'){
    const newObj={[genName(6)]:[{
        text,
        id:uuid()
      }]}
    return {
      type: 'ADD_CARD',
      payload: [...newState,newObj]
    };
  }
  const col=[...newState[titleNumber][columnName],{text:text,id:uuid()}]
  const newS=[...newState]
  const newObj= {
    [columnName]: col
  }
  newS.splice(titleNumber,1,newObj )
  return {
    type: 'ADD_CARD',
    payload: [...newS],
  };

};

export const RENAME_TITLE=(prevTitle, currentTitle, titleNumber)=>{
  const myState= state.getState()
  const newState=[...myState]
  const newColumn=newState[titleNumber][prevTitle]
  const { [prevTitle]: remove, ...rest } = newState
  const titleToDel=newState[titleNumber]
  const dwq=newState.filter((x)=>x!==titleToDel)
  const obj={
    [currentTitle]:newColumn
  }
  dwq.splice(titleNumber, 0, obj)
  return {
    type:RENAME_TITLE,
    payload:[...dwq]
  }

}