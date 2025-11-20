import React from "react";
import "./index.scss";
import { PropTypes } from "prop-types";

const Table = ({ width, height, style }) => {
  Table.propTypes = {
    width: PropTypes.oneOf([...new Array(100)].map((_, i) => i + 1)),
    height: PropTypes.oneOf([...new Array(100)].map((_, i) => i + 1)),
    style: PropTypes.object,
  };

  style = {
    ...style,
    width: `${width}vw`,
    height: `${height}vh`,
  };

  return (
    <div className="tableContainer" style={style}>
      <div className="wholeTable">
        <div className="tableColor board" />
        <div className="bottom">
          <div className="tableColor foot leftFoot" />
          <div className="tableColor foot rightFoot" />
        </div>
      </div>
    </div>
  );
};

export default Table;
