import React,{useState,useRef,useEffect} from 'react';
import {useDispatch} from 'react-redux'
import PropTypes from 'prop-types';
import './AddForm.scss';
import { Card,Button } from '../index';
import AddSvg from '../../assets/add.svg';
import ClearSvg from '../../assets/remove.svg';
import {ADD_CARD} from '../../store/actions'

const AddForm = ({columnName,titleNumber}) => {
  const dispatch = useDispatch()
  const [showForm, setShowForm] = useState(false)
  const [text,setText] = useState('')
  const textAreaRef = useRef(null)
  useEffect(() => {
    if(textAreaRef.current){
      textAreaRef.current.focus()
    }
  }, [showForm])


  const addCard=()=>{
    dispatch(ADD_CARD(titleNumber,text,columnName))
    setText('')
    setShowForm(false)
  }
  return <>
  {showForm?(  <div className="add-form">
    <div className="add-form__input">
      <Card>
        <textarea value={text}
                  onChange={(e)=>{setText(e.target.value)}}
                  placeholder="Введите название карточки"
                  ref={textAreaRef} rows="3" />
      </Card>
      <div  className="add-form__button">
        <Button addCard={addCard} text={text} >Добавить карточку</Button>
        <img  onClick={() => setShowForm(false)} className="add-form__button-clear" src={ClearSvg} alt="Clear svg icon"/>
      </div>
    </div>
  </div>):(
  <div className="panel__bottom">
    <div className="panel__bottom-add-btn" onClick={()=>setShowForm(true)}>
      <img  src={AddSvg}  alt="add one card" />
  <span> Добавить еще одну карточку</span>
  </div>
  </div>)}
</>;
};

// AddForm.propTypes = {
//   text: PropTypes.string.isRequired,
// };

export default AddForm;
