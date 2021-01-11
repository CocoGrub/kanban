import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import { Card, AddForm,DeleteBtn } from '../index';
import './Panel.scss';
import {Draggable, Droppable} from "react-beautiful-dnd";
import {useDispatch} from "react-redux";
import ClearSvg from '../../assets/remove.svg';
import {DELETE_CARD, DELETE_COLUMN, RENAME_TITLE} from "../../store/actions";

const Panel = ({ ind,items,titleNumber,title }) => {
    let arr,prevTitle
    if(typeof items==='undefined'){
        title='new column'
    }else {
        arr=[items[Object.keys(items)]][0]
        prevTitle=title
    }
    const [currentTitle,setCurrentTitle]=useState('')
    const dispatch = useDispatch()

    useEffect(()=>{
        setCurrentTitle(title)
    },[title])
    const [showInput,setShowInput]=useState(false)
    const onSpanClick=()=>{
        setShowInput(!showInput)
    }

    const onChangeTitle=()=>{
        setShowInput(!showInput)
        dispatch(RENAME_TITLE(
                prevTitle,
                currentTitle,
                titleNumber
            ))
    }

    const setTitle=(e)=>{
        setCurrentTitle(e.target.value)
    }
    const deleteCard=(titleNumber,cardID,title)=>{
        dispatch(DELETE_CARD(titleNumber,cardID,title))
    }
    const deleteColumn=(titleNumber)=>{
        dispatch(DELETE_COLUMN(titleNumber))
    }

  return (
    <div className={classNames('panel', { 'panel--empty': !items })}>
        {arr&&(
            <>
                <div className='panel__header'>
                    {!showInput?(<>
                        <span onClick={onSpanClick}>{currentTitle}</span>
                            <DeleteBtn
                                onClick={() => {
                                    deleteColumn(titleNumber)}}>
                                delete
                            </DeleteBtn>
                        </>)

                        :(<>
                        <input type={'text'} onChange={setTitle} value={currentTitle}/>
                        <DeleteBtn onClick={onChangeTitle}>save</DeleteBtn>
                        </>)}
                </div>
                <Droppable key={ind} droppableId={`${ind}`}>
                    {(provided) => (
                        <div ref={provided.innerRef}>
                            {arr.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            <Card>
                                                {item.text}
                                                <img src={ClearSvg} alt={'remove item'}
                                                    onClick={() => {
                                                        deleteCard(titleNumber,item.id,title)
                                                    }}/>
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


export default Panel;
