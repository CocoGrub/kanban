import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Card, Button, AddForm } from '../index';
import './Panel.scss';
import {Draggable, Droppable} from "react-beautiful-dnd";
import {useDispatch} from "react-redux";

const Panel = ({ ind,el,items,titleNumber,title }) => {
    console.log(title,'title')
    let arr,prevTitle

    if(typeof items==='undefined'){
        
        title='new column'
    }else {
        arr=[items[Object.keys(items)]][0]
        prevTitle=title
    }

    // const titleNumber=items[0]
    const [currentTitle,setCurrentTitle]=useState('')
    const dispatch = useDispatch()
    useEffect(()=>{
        setCurrentTitle(title)
    },[title])

    console.log(currentTitle,'currentTitle')
    const onChangeTitle=()=>{
        dispatch({
            type:'RENAME_TITLE',
            payload:{
                prevTitle,
                currentTitle,
                titleNumber
            }
        })
    }
    const setTitle=(e)=>{
        setCurrentTitle(e.target.value)
    }


  return (
    <div className={classNames('panel', { 'panel--empty': !items })}>
        {arr&&(
            <>
       <div>
                <input type={'text'} onChange={setTitle} value={currentTitle}/>
                <button onClick={onChangeTitle}>save</button>
           <button
               type="button"
               onClick={() => {
                   dispatch({
                       type:'DELETE_COLUMN',
                       payload: {title,titleNumber}
                   })}}>
               delete col
           </button>
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

        <AddForm columnName={title} titleNumber={titleNumber}/>
    </div>
  );
};

// Panel.propTypes = {
//   text: PropTypes.string.isRequired,
// };

export default Panel;
