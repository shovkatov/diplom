import React, {useState} from "react";
import {Modal} from "antd";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import {useNavigate} from "react-router-dom";

export const RegistrationPage = () => {
    const [callBack, setCallBack] = useState({
        name:'',
        phone:'',
        pass:'',
        pass1:'',
    });
    const [isModalVisible_1, setIsModalVisible_1] = useState(false);
    const navigate = useNavigate()

    const { phone, name , pass, pass1 } = callBack

    const handleCancel = () => {
        if(name===''&&phone===''&&pass===''&&pass1==='') return false
        setTimeout(()=>{
            setIsModalVisible_1(true)
        },1500)
        setTimeout(()=>{
            navigate('/')
        },2500)
    };

    return <div className="flex pt-10">
        <div className="w-1/2 px-5 m-auto">
            <span className="pl-20 text-3xl">Регистрация аккаунта</span><br/>
            <div className="px-20 pt-5">
                <label htmlFor="name" className="text-xl">Имя</label>
                <input id="name" value={name} onChange={e=>setCallBack({name: e.target.value})} className="w-full text-xl p-4 rounded mb-5 bg-gray-100" type="text" placeholder="имя"/>
                <label htmlFor="name" className="text-xl">Номер телефона</label>
                <input id="name" value={phone} onChange={e=>setCallBack({phone: e.target.value})} className="w-full text-xl p-4 rounded mb-5 bg-gray-100" type="text" placeholder="телефон"/>
                <label htmlFor="name" className="text-xl">Пароль</label>
                <input id="name1" value={pass} onChange={e=>setCallBack({pass: e.target.value})} className="w-full text-xl p-4 rounded mb-5 bg-gray-100" type="password" placeholder="пароль"/>
                <label htmlFor="name1" className="text-xl">Повтор пароля</label>
                <input id="name1" value={pass1} onChange={e=>setCallBack({pass1: e.target.value})} className="w-full text-xl p-4 rounded mb-5 bg-gray-100" type="password" placeholder="пароль"/>
                <div className="flex justify-between">
                    <button onClick={()=>handleCancel()} className="w-1/2 text-xl p-4 rounded mr-5 bg-blue-400 text-white uppercase">регистрация</button>
                    <div className="w-1/2 flex justify-end items-center iconsACC">
                        <GoogleIcon onClick={()=>window.location.href='https://mail.google.com/mail/u/0/#inbox'} className="text-green-500"/>
                        <FacebookIcon onClick={()=>window.location.href='https://www.facebook.com/'} className="text-blue-500"/>
                    </div>
                </div>
            </div>
        </div>
        <Modal className="call" visible={isModalVisible_1} onCancel={()=>setIsModalVisible_1(false)}>
            <h2 className="text-5xl text-center text-blue-500 font-bold mt-4">Спасибо</h2>
            <h2 className="text-3xl font-bold text-center mt-4">Ваш запрос в процесс обработки мы отправим вам смс код после обработки</h2>
        </Modal>
    </div>
}