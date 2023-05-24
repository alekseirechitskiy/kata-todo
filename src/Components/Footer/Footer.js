import React from 'react';

import './Footer.css';
import FiltersList from '../FiltersList';

const Footer = ({ toDo, onClearAll, onAllClick, onActiveClick, onCompletedClick }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <FiltersList onAllClick={onAllClick} onActiveClick={onActiveClick} onCompletedClick={onCompletedClick} />
      <button className="clear-completed" onClick={onClearAll} type="button">
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {};

export default Footer;
