import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../index';
import './panel.scss';
import AddSvg from '../../assets/plus.svg';
const Panel = ({ items }) => {
  return (
    <div className="panel">
      <div className="panel__items">
        {items.map((card) => {
          return <Card {...card} />;
        })}
        <div className="panel__bottom">
          <div className="panel__bottom-add-btn">
            <img src={AddSvg} alt="add one card"></img>
            <span> Добавить еще одну карточку</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Panel.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Panel;
