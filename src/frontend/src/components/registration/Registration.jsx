import { useState, useRef } from 'react';
import '../login/Login.scss';
import AuthService from '../../services/authService';
import { useHistory } from "react-router-dom";
import Spinner from '../spinner/Spinner';
import ErrorAuth from '../errorMessage/errorAuth/ErrorAuth';

function Registration(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    let history = useHistory();

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmitClick = () => {
        if(!firstName){
            setErrorMsg("Enter your name");
            setError(true);
            return;
        }

        if(!lastName){
            setErrorMsg("Enter your surname");
            setError(true);
            return;
        }

        if(!password){
            setErrorMsg("Enter a password");
            setError(true);
            return;
        }

        if(!email){
            setErrorMsg("Enter your email");
            setError(true);
            return;
        }

        setLoading(true);
        AuthService.register(firstName, lastName, email, password).then(() => {
            setLoading(false);
            history.push("/login");
        }).catch((error) => {
            setLoading(false);
            console.log(error.response);
            if(error.response.status === 400){
                setErrorMsg(error.response.data);
            }
            else{
                setErrorMsg("Unknown error!");
            }
            setError(true);
        });
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorAuth msg={errorMsg}/> : null;
    const content = !(loading) ? <View
                                        firstName={firstName}
                                        lastName={lastName}
                                        email={email}
                                        password={password}
                                        handleFirstNameChange={handleFirstNameChange}
                                        handleLastNameChange={handleLastNameChange}
                                        handleEmailChange={handleEmailChange}
                                        handlePasswordChange={handlePasswordChange}
                                        handleSubmitClick={handleSubmitClick}
                                        errorMessage={errorMessage}/> : null;

    return (
        <>
            {spinner}
            {content}
        </>
    );
}


const View = ({
    firstName,
    lastName,
    email,
    password,
    handleFirstNameChange,
    handleLastNameChange,
    handlePasswordChange,
    handleEmailChange,
    handleSubmitClick,
    errorMessage
}) => {
    return(
        <>
            {errorMessage}
            <div className='login'>
                <div className="login__title">Sign Up</div>
                <div className="login__form">
                    <div className="login__form-item">
                        <div className="login__form-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M377.7 338.8l37.15-92.87C419 235.4 411.3 224 399.1 224h-57.48C348.5 209.2 352 193 352 176c0-4.117-.8359-8.057-1.217-12.08C390.7 155.1 416 142.3 416 128c0-16.08-31.75-30.28-80.31-38.99C323.8 45.15 304.9 0 277.4 0c-10.38 0-19.62 4.5-27.38 10.5c-15.25 11.88-36.75 11.88-52 0C190.3 4.5 181.1 0 170.7 0C143.2 0 124.4 45.16 112.5 88.98C63.83 97.68 32 111.9 32 128c0 14.34 25.31 27.13 65.22 35.92C96.84 167.9 96 171.9 96 176C96 193 99.47 209.2 105.5 224H48.02C36.7 224 28.96 235.4 33.16 245.9l37.15 92.87C27.87 370.4 0 420.4 0 477.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 420.4 420.1 370.4 377.7 338.8zM176 479.1L128 288l64 32l16 32L176 479.1zM271.1 479.1L240 352l16-32l64-32L271.1 479.1zM320 186C320 207 302.8 224 281.6 224h-12.33c-16.46 0-30.29-10.39-35.63-24.99C232.1 194.9 228.4 192 224 192S215.9 194.9 214.4 199C209 213.6 195.2 224 178.8 224h-12.33C145.2 224 128 207 128 186V169.5C156.3 173.6 188.1 176 224 176s67.74-2.383 96-6.473V186z"/></svg>
                        </div>
                        <input type="text" placeholder="First Name" value={firstName} onChange={handleFirstNameChange} className="login__form-input" />
                    </div>
                    <div className="login__form-item">
                        <div className="login__form-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M352 128C352 198.7 294.7 256 224 256C153.3 256 96 198.7 96 128C96 57.31 153.3 0 224 0C294.7 0 352 57.31 352 128zM209.1 359.2L176 304H272L238.9 359.2L272.2 483.1L311.7 321.9C388.9 333.9 448 400.7 448 481.3C448 498.2 434.2 512 417.3 512H30.72C13.75 512 0 498.2 0 481.3C0 400.7 59.09 333.9 136.3 321.9L175.8 483.1L209.1 359.2z"/></svg>
                        </div>
                        <input type="text" placeholder="Last Name" value={lastName} onChange={handleLastNameChange} className="login__form-input" />
                    </div>
                    <div className="login__form-item">
                        <div className="login__form-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z"/></svg>
                        </div>
                        <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} className="login__form-input" />
                    </div>
                    <div className="login__form-item">
                        <div className="login__form-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M282.3 343.7L248.1 376.1C244.5 381.5 238.4 384 232 384H192V424C192 437.3 181.3 448 168 448H128V488C128 501.3 117.3 512 104 512H24C10.75 512 0 501.3 0 488V408C0 401.6 2.529 395.5 7.029 391L168.3 229.7C162.9 212.8 160 194.7 160 176C160 78.8 238.8 0 336 0C433.2 0 512 78.8 512 176C512 273.2 433.2 352 336 352C317.3 352 299.2 349.1 282.3 343.7zM376 176C398.1 176 416 158.1 416 136C416 113.9 398.1 96 376 96C353.9 96 336 113.9 336 136C336 158.1 353.9 176 376 176z"/></svg>
                        </div>
                        <input type="password" className="login__form-input" value={password} onChange={handlePasswordChange}  placeholder="Password"/>
                    </div>
                    <div className="login__form-submit" onClick={handleSubmitClick}>Submit</div>
                    <a href="http://localhost:3000/reset_password" className="login__form-reset">Forgot your password?</a>
                </div>
            </div>
        </>
    )
}

export default Registration;