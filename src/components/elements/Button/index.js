import "./index.scss";
import {PropTypes} from "prop-types";
import WordCompletionEvent from "../../../events/WordCompletionEvent";

const Button = ({content, style, width, height, color, onClick}) => {
    Button.propTypes = {
        content: PropTypes.string.isRequired,
        width: PropTypes.oneOf([...(new Array(100))].map((_, i) => i + 1)),
        height: PropTypes.oneOf([...(new Array(100))].map((_, i) => i + 1)),
        color: PropTypes.string,
        style: PropTypes.object,
        onClick: PropTypes.func
    };

    style = {...style, width: `${width}vw`, height: `${height}vh`, backgroundColor: color}

    const click = () => {
        if (onClick) {
            onClick();
            return;
        }
        document.dispatchEvent(new WordCompletionEvent())
    }

    return (
        <div className="buttonContainer fredokaOne" style={style} onClick={click}>
            <h6>{content}</h6>
        </div>
    );
}

export default Button;
