import { Panel} from './components/index';
import {DragDropContext} from "react-beautiful-dnd";
import { useSelector } from 'react-redux';
import {useDispatch} from "react-redux";
import {onDragEnd} from "./store/actions";

function App() {
    const dispatch = useDispatch()
    const onDragEND=(x)=>{
        dispatch(onDragEnd(x))
    }
    const state = useSelector(state=>state)
    const newItems = {...state}
    const items=[]
    for(const property in newItems){
        items.push(newItems[property])
    }
    return (
        <div>

            <div style={{ display: "flex" }}>
                <DragDropContext onDragEnd={onDragEND} >
                    {items.map((el, ind) => (
                        <Panel
                            ind={ind}
                            key={ind}
                            titleNumber={Object.keys(newItems)[ind]}
                            items={items[ind]}
                            title={Object.keys(el)[0]}
                        />
                    ))}
                    <Panel />
                </DragDropContext>
            </div>
        </div>
    );
}

export default App;
