import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

export const AccountPage = () => {
    const dispatch = useDispatch();
    const [callBack1, setCallBack1] = useState({
        login:"",
        pass:""
    });
    const navigate = useNavigate()

    const { login , pass } = callBack1

    const handleCancel = () => {
        if(login===''&&pass==='') return false
        setTimeout(()=>{
            navigate('/')
        },1500)
        // dispatch(accountName(login))
    };

    return <div className="flex pt-10">
        <div className="w-1/2 px-5 m-auto">
            <span className="pl-20 text-3xl">Вход в аккаунт</span><br/>
            <div className="px-20 pt-5">
                <label htmlFor="name" className="text-xl">Логин</label>
                <input id="name" value={login} onChange={(e)=>setCallBack1({login: e.target.value})} className="w-full text-xl p-4 rounded mb-5 bg-gray-100" type="text" placeholder="логин"/>
                <label htmlFor="name1" className="text-xl">Пароль</label>
                <input id="name1" value={pass} onChange={(e)=>setCallBack1({pass: e.target.value})} className="w-full text-xl p-4 rounded mb-5 bg-gray-100" type="password" placeholder="пароль"/>
                <div className="flex justify-between">
                    <button onClick={()=>handleCancel()} className="w-full text-xl p-4 rounded mr-5 bg-blue-400 text-white uppercase">Авторизоваться</button>
                    <button onClick={()=>navigate('/registration')} className="w-full text-xl p-4 rounded bg-white text-blue-400 uppercase">регистрация</button>
                </div>
            </div>
        </div>
    </div>
}