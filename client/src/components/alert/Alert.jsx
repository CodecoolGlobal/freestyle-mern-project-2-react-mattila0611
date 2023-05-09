import "./Alert.css";
import error from "../../images/error.png";
import success from "../../images/success.png";

function Alert({ message, type }) {
    return (
        <div className={type === "error" ? "alert error" : "alert success"}>
            <img src={type === "error" ? error : success} alt=""/>
            <p>{message}</p>
        </div>
    )
}

export default Alert;