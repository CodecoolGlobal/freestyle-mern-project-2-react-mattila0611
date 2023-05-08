import "./Alert.css";
import alert from "../../images/alert.png";

function Alert({ message }) {
    return (
        <div className="alert">
            <img src={alert} alt=""/>
            <p>{message}</p>
        </div>
    )
}

export default Alert;