import React from 'react';
import "./Wrapper.scss"
import { WRAPPER_HORIZONTAL, WRAPPER_VERTICAL_CENTER } from '../../constants/constants';

const Wrapper = ({ children, type }) => {
  switch (type) {
      case WRAPPER_HORIZONTAL:
        return <div className="wrapper horizontal">{ children }</div>
      case WRAPPER_VERTICAL_CENTER:
        return <div className="wrapper vertical-center">{ children }</div>
      default:
        return <div className="wrapper">{ children }</div>
  }
};

export default Wrapper;
