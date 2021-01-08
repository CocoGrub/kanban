import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Card, Button, AddForm } from '../index';
import './Panel.scss';
import {Draggable, Droppable} from "react-beautiful-dnd";
import {useDispatch} from "react-redux";

const Panel = ({ ind,el,items,titleNumber }) => {
    // if(typeof items==='undefined'){
    //     items=[{}]
    // }
    const title=Object.keys(items)[0]
    // const titleNumber=items[0]
    const arr=[items[Object.keys(items)]][0]
    console.log(titleNumber,'titleNumber')
    const dispatch = useDispatch()
    const prevTitle=title
    const [currentTitle,setCurrentTitle]=useState(title)
    const onChangeTitle=()=>{
        dispatch({
            type:'RENAME_TITLE',
            payload:{
                prevTitle,
                currentTitle,
                title
            }
        })
    }
    const setTitle=(e)=>{
        setCurrentTitle(e.target.value)
    }


  return (
    <div className={classNames('panel', { 'panel--empty': !items })}>
        {arr&&(
            <><div>
                <input type={'text'} onChange={setTitle} value={currentTitle}/>
                <button onClick={onChangeTitle}>save</button>
            </div>

                <Droppable key={ind} droppableId={`${ind}`}>
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef}>
                            {arr.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            <Card>
                                                {item.text}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        dispatch({
                                                            type:'DELETE_CARD',
                                                            payload:{
                                                                title:title,
                                                                cardID:item.id,
                                                                titleNumber
                                                            }})
                                                    }}>
                                                    delete
                                                </button>
                                            </Card>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </>
        )}

        <AddForm columnName={title}/>
    </div>
  );
};

// Panel.propTypes = {
//   text: PropTypes.string.isRequired,
// };

export default Panel;
