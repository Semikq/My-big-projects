import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from "../../Redux/reducers/authReducer"
import { addUser, loginUser } from '../../electronApi';
import { useNavigate } from 'react-router-dom';
import "./authorization.css"

function RenderAuthorizationLogIn({isAuthorization, setIsAuthorization}){
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleloginUser = async (email, password, name) => {
        if(name !== "" || password !== "" || email !== ""){
            const user = {
                name,
                email,
                password,
            }
            try {
                const result = await loginUser(user)
                const token = result.token
                dispatch(login({ token }))
                navigate("/")
            } catch (error) {
                setName("")
                setPassword("")
                setEmail("")
                alert("Невірна пошта чи пароль")
            }
        }
    }

    return (
        <div className='logIn'>
            <h2>LogIn</h2>
            <div className='attributes'>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter name'></input>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email'></input>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password'></input>
            </div>
            <div className='register'>
                <input type='button' onClick={() => setIsAuthorization(!isAuthorization)} value="Go to register"></input>
                <p>or</p>
                <input type='button' onClick={() => handleloginUser(email, password, name)} value="Log In"></input>
            </div>
        </div>
    )
}

function RenderAuthorizationRegister({isAuthorization, setIsAuthorization}){
    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const [tel, setTel] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleAddUser = async () => {
        if(name !== "" || surname !== "" || password !== "" || email !== "" || tel !== ""){
            const user = {
                name,
                surname,
                password,
                email,
                tel
            }
            try {
                const result = await addUser(user)
                const token = result.token
                dispatch(login({ token }))
                navigate("/")
            } catch (error) {
                setName("")
                setSurname("")
                setPassword("")
                setEmail("")
                setTel("")
                alert("Така пошта чи телефон вже існує")
            }
        }
    }

    return (
        <div className='logIn'>
            <h2>Register</h2>
            <div className='attributes'>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter name'></input>
                <input type='text' value={surname} onChange={(e) => setSurname(e.target.value)} placeholder='Enter surname'></input>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password'></input>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email'></input>
                <input type='tel' value={tel} onChange={(e) => setTel(e.target.value)} placeholder='Enter phone'></input>
            </div>
            <div className='register'>
                <input type='button' onClick={() => setIsAuthorization(!isAuthorization)} value="Go to logIn"></input>
                <p>or</p>
                <input type='button'
                onClick={() => handleAddUser(name, surname, password, email, tel)} value="Register"></input>
            </div>
        </div>
    )
}

export function CreateAuthorizationPage(){
    const [isAuthorization, setIsAuthorization] = useState(true)
    return (
        <div className='containerAuthorization'>
            {isAuthorization ?
             <RenderAuthorizationLogIn isAuthorization={isAuthorization} setIsAuthorization={setIsAuthorization} /> :
             <RenderAuthorizationRegister isAuthorization={isAuthorization} setIsAuthorization={setIsAuthorization} />}
        </div>
    )
}