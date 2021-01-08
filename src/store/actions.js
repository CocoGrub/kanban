import state from './index';

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
      // console.log(zz[prop])
      items.push(zz[prop])
    }

    // items.push(newItems[property])
  }
  console.log(items,'act items')
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
    const myState={}
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
    const myState=[]
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

export const ADD_CARD = (text) => {
  return {
    type: 'ADD_CARD',
    payload: text,
  };
};