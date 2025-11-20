import React from 'react';
import './index.scss';
import { PropTypes } from "prop-types";

const Poster = ({width, height, content, style, typed}) => {

 Poster.propTypes = {
    content: PropTypes.arrayOf(PropTypes.string).isRequired,
    typed: PropTypes.string,
    width: PropTypes.oneOf([...new Array(100)].map((_, i) => i + 1)),
    height: PropTypes.oneOf([...new Array(100)].map((_, i) => i + 1)),
    style: PropTypes.object,
  };

style = {
  ...style,
  width: `${width}vw`,
  height: `${height}vh`,
 
};

    const getFirstWordToDisplay = () => {
        return content[0] || ''
    }

    const getRemainingFirstWord = () => {
        const original = getFirstWordToDisplay();
        const currentTyped = typed || '';
        let correctCount = 0;
        for (let i = 0; i < Math.min(original.length, currentTyped.length); i++) {
            if (original[i] === currentTyped[i]) {
                correctCount++;
            } else {
                break;
            }
        }
        return original.slice(correctCount);
    }

    const getRestOfArrayToDisplay = () => {
        const requested = parseInt(process.env.REACT_APP_WORDS_DISPLAYED);
        const maxToShow = 10; // cap trailing words on poster
        const count = Number.isFinite(requested) ? Math.min(requested, maxToShow) : maxToShow;
        return [...content].filter((v, i) => i !== 0).slice(0, count);
    }

    return (
        <div className="posterContainer" style={style}>
            <div className="tape tape-top"/>
            <div className="contentContainer">
                <div className="openSans content">
                    <span className="firstWord">{`${getRemainingFirstWord()} `}</span>
                    <span>{getRestOfArrayToDisplay().join(' ')}</span>
                </div>
            </div>
            <div className="tape tape-bottom"/>
        </div>
    )
}

export default Poster;
