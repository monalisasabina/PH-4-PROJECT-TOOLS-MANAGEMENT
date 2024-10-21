import {useNavigate} from "react-router-dom"
import './ErrorPage.css'

function ErrorPage(){

    const navigate = useNavigate()

    function handleGoHome(){
        navigate('/')
         
      }

    return(
        <>
           <h1>ERROR PAGE</h1>
           <h2 className="err-message" >Oops! We can't find that page</h2>
           <button className="err-btn" onClick={handleGoHome}> HOME  </button>
           <img className="err-image-cont" src="https://cdn.vectorstock.com/i/500p/81/59/404-error-page-not-found-tiny-people-vector-51588159.jpg" />
        </>
    )
}

export default ErrorPage