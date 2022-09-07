import React from 'react'
import Input from '../../components/reusables/Input'
import emailIcon from '../../assets/email.svg'
import passwordIcon from '../../assets/password.svg'
import phoneIcon from '../../assets/phone.svg'
import userIcon from '../../assets/user.svg'
import './authentication.css'
import { useState } from "react"
import StepContainer from '../../components/authentication/register/StepContainer'
import { useNavigate} from "react-router-dom"
import axios from "axios"

const Register = () => {
    
    let navigate = useNavigate()

    const [userInput, setUserInput] =useState({})
    const [step, setStep] = useState(1)
    const [fieldError, setFieldError] = useState(
        {
            FirstName: { message: "", error: false}, 
            LastName: { message: "", error: false}, 
            Email: { message: "", error: false}, 
            PhoneNumber: { message: "", error: false}, 
            Password: { message: "", error: false}, 
            ConfirmPassword: { message: "", error: false}
    }
    )

    const handleChange = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value })
        checkIfFieldIsEmpty(e) 
        }
        
    const handleClick = () => {
        axios.post("http://localhost:5000/accounts", userInput).
        then((data)=> console.log(data)).
        catch((error) => console.log(error))
    }

    const checkIfFieldIsEmpty = (e) => {
        switch(e.target.name){
            case "email":
                if(e.target.value === "") {
                    setFieldError({...fieldError,[e.target.name]: {
                                message: "Please enter a valid email",
                                error: true
                            }

                    })

                }else{
                    setFieldError({
                        ...fieldError,[e.target.name]: {
                            message: "",
                            error: false
                    }
                })
            }
                break;
            case "password":
                if(e.target.value === "") {
                    setFieldError({...fieldError,[e.target.name]: {
                                message: "Please enter a valid password",
                                error: true
                            }

                    })

                }else{
                    setFieldError({
                        ...fieldError,[e.target.name]: {
                            message: "",
                            error: false
                    
                    }
                })
            }
            default:
                break;
        } 
        if(e.target.value === "") return true
    }

  

return (
<div className="authenticationContainer">
    <div className="leftSide">
        <div className="leftSide-container">
        Have an account?
        <a onClick={()=>navigate("/login")}>
                
                  <span style={{
                        color: 'var(--primary_green)',
                        marginLeft: '4px'
                    }}>
                Login in
                </span>
                
        </a>  
            <div className="welcome-text">
                <h1>Welcome To Norbs</h1>
                <p>We are an event management platform, 
                    aimed at helping you facilitate and run a smooth event</p>
            </div>
            
                {step === 1 && <StepContainer step={1} headerTitle="Let's know you">
                <Input text="text" handleChange= {handleChange}icon={userIcon} label="FirstName" fieldError={fieldError} />
                <Input text="text" handleChange= {handleChange}icon={userIcon} label="LastName" fieldError={fieldError} />
                <Input text="text" handleChange= {handleChange}icon={emailIcon} label="Email" fieldError={fieldError} /> 
                </StepContainer>}

                {step === 2 && <StepContainer step={2} headerTitle="Let's Secure you">
                <Input text="text" handleChange= {handleChange}icon={phoneIcon} label="PhoneNumber" fieldError={fieldError} />
                <Input text="text" handleChange= {handleChange}icon={passwordIcon} label="Password" fieldError={fieldError} />
                <Input text="text" handleChange= {handleChange}icon={passwordIcon} label="ConfirmPassword" fieldError={fieldError} /> 
                </StepContainer>}

                  {step ===1 &&  
                  <button onClick={()=> setStep(2)} style={{width: '100%'}}className="authentication-button">
                        Next Step
                    </button>}
                    
                    {step ===2 && 
                    <div style={{display: 'flex', justifyContent: 'space-between', width: "100%"}} >
                    <button onClick={()=> setStep(1)} style={{width: '45%'}} className="authentication-button-alternate">
                        Go Back
                    </button>

                    <button style={{width: '45%'}}className="authentication-button" onClick={handleClick}>
                        Sign Up
                    </button>
                </div>}
            

            <div className="social-media">
                <a>
                    <div className="social-media-icon"></div>
                </a>

            </div>
        </div>
    </div>
    <div className="rightSide">

    </div>
  
</div>
  )
}


export default Register
