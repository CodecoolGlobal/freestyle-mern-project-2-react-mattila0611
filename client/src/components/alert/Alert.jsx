import "./Alert.css";
import {BsFillExclamationTriangleFill,BsFillCheckCircleFill} from "react-icons/bs"

function Alert({ message, type }) {
    return (
        <div className={type === "error" ? "alert error" : "alert success"}>
            {type === "error" ? 
            <p className="errorIcon"><BsFillExclamationTriangleFill /></p> 
            : 
            <p className="succesIcon"><BsFillCheckCircleFill /></p> 
            }
            <p className="alertText">{message}</p>
        </div>
    )
}

export default Alert;