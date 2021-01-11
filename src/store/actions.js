import state from './index';
import {v4 as uuid} from "uuid";
import {genName,reorder,move} from './helpers'


export const onDragEnd=(result)=> {
  const newState= state.getState()
  const prevState=[...newState]
  const res=[...prevState]
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
    for(let i =0;i<newState.length;i++){
      name=Object.keys(prevState[i])[0]
      res[i]= {[name]:newState[i]}
    }
    return{
      type:'MOVE',
      payload:res}
  } else {
    const result = move(items[sInd], items[dInd], source, destination);
    const newState = [...items].filter(group => group.length)
    newState[sInd] = result[sInd];
    newState[dInd] = result[dInd];
    let name=''
    for(let i =0;i<newState.length;i++){
      name=Object.keys(prevState[i])[0]
      res[i]= {[name]:newState[i]}
    }
    return{
      type:'MOVE',
      payload:res
    }
  }

}

export const ADD_CARD = (titleNumber,text,columnName) => {
  const newState= state.getState()
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
  const result=[...newState]
  const newObj= {
    [columnName]: col
  }
  result.splice(titleNumber,1,newObj )
  return {
    type: 'ADD_CARD',
    payload: [...result],
  };

};

export const RENAME_TITLE=(prevTitle, currentTitle, titleNumber)=>{
  const myState= state.getState()
  const newItems=[...myState]
  const newColumn=newItems[titleNumber][prevTitle]
  // eslint-disable-next-line no-unused-vars
  const { [prevTitle]: remove, ...rest } = newItems
  const titleToDel=newItems[titleNumber]
  const result=newItems.filter((x)=>x!==titleToDel)
  const obj={
    [currentTitle]:newColumn
  }
  result.splice(titleNumber, 0, obj)
  return {
    type:RENAME_TITLE,
    payload:[...result]
  }
}

export const DELETE_CARD=(titleNumber,cardID,title)=>{
  const newState= state.getState()
  const newItems=[...newState]
  const cole = newItems[titleNumber]
  const od=cole[Object.keys(cole)[0]].filter((x)=>x.id!==cardID)
  newItems.splice(titleNumber, 1);
  newItems.splice(titleNumber, 0, {[title]:od})
    return {
      type:'DELETE_CARD',
      payload:[...newItems]
    }
}

export const DELETE_COLUMN=(titleNumber)=>{
  const newState= state.getState()
  const result = [...newState];
  result.splice(titleNumber,1)
  return {
    type:'DELETE_COLUMN',
    payload:[...result]}
}