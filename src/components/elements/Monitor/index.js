import React, {useState} from 'react';
import './index.scss';
import {PropTypes} from "prop-types";
import WordCompletionEvent from "../../../events/WordCompletionEvent";

const Monitor = ({width, height, content, style, expectedWord, onWordComplete, onTypingStart, onTypingChange, disabled}) => {

 Monitor.propTypes = {
    content: PropTypes.string,
    expectedWord: PropTypes.string,
    onWordComplete: PropTypes.func,
    onTypingStart: PropTypes.func,
    onTypingChange: PropTypes.func,
    disabled: PropTypes.bool,
    width: PropTypes.oneOf([...new Array(100)].map((_, i) => i + 1)),
    height: PropTypes.oneOf([...new Array(100)].map((_, i) => i + 1)),
    style: PropTypes.object,
  };

style = {
  ...style,
  width: `${width}vw`,
  height: `${height}vh`,
 
};

   const [value, setValue] = useState("")

    const handleChange=(e)=> {
        if (disabled) {
            return;
        }
        const newValue = e.target.value;
        if (onTypingStart) {
            onTypingStart();
        }
        // If last input produced a space (word delimiter), validate and clear
        const isSpaceInserted = newValue.endsWith(" ");
        if (isSpaceInserted) {
            const typedWord = newValue.trim();
            const correct = expectedWord ? typedWord === expectedWord : false;
            if (correct) {
                document.dispatchEvent(new WordCompletionEvent());
                if (onWordComplete) {
                    onWordComplete(true, typedWord);
                }
                setValue("");
                if (onTypingChange) {
                    onTypingChange("");
                }
            } else {
                // keep the typed word, but strip the trailing space
                setValue(typedWord);
                if (onTypingChange) {
                    onTypingChange(typedWord);
                }
            }
        } else {
            setValue(newValue);
            if (onTypingChange) {
                onTypingChange(newValue);
            }
        }
    }


    return (
        <div className="monitorContainer" style={style}>
            <div className="wholeMonitor">
                <div className="topPart monitorColor">
                    <div className="screen">
                        <div className="contentContainer">
                            <div className="content">
                            <textarea className="openSans" value={value} onChange={handleChange} disabled={disabled}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="stand">
                    <div className="monitorColor vertical"/>
                    <div className="horizontal">
                        <div className="monitorColor leftPart"/>
                        <div className="monitorColor centerPart"/>
                        <div className="monitorColor rightPart"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Monitor;
