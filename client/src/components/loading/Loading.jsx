import "./Loading.css";
import loading from "../../images/logo.png";

function Loading() {
    return (
        <div className="loading">
            <p>Loading...</p>
            <img src={loading} alt=""/>
        </div>
    )
}

export default Loading;