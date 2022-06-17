import {Map, Placemark, YMaps} from "react-yandex-maps";
import React, {useState} from "react";
import {Modal} from "antd";
import {Slide, Snackbar} from "@mui/material";
import {useDispatch} from "react-redux";
import {accountName} from "../redux/actions";

export const ContactPage = () => {
    const dispatch = useDispatch();
    const [callBack, setCallBack] = useState({
        name:'',
        l_name:'',
        phone:''
    });
    const [isModalVisible_1, setIsModalVisible_1] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);

    const { phone, name, l_name } = callBack

    const handleCancel = () => {
        handleClick(TransitionUp)
        if(name===''&&phone===''&&l_name==='') return false
        setTimeout(()=>{
            setIsModalVisible_1(true)
        },1000)
    };

    function TransitionUp(props) {
        return <Slide {...props} direction="up" />;
    }

    const handleClick = (Transition) => () => {
        setTransition(() => Transition);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return <div className="flex pt-10">
        <div className="w-1/2 px-5">
            <h2 className="text-3xl mb-6">Хотите разместить свою рекламу, добавить контент или  стать нашем партнёрем тогда оставьте свои данные и мы отправим вам ключ для идентификации по смс коду и наши операторы свяжуться с вами</h2>
            <span className="text-xl text-gray-400">Мы отправим вам смс код после заверщение</span><br/>
            <div className="pr-28 pt-5">
                <label htmlFor="name" className="text-xl">Имя</label>
                <input id="name" value={name} onChange={(e)=>setCallBack({name: e.target.value})} className="w-full text-xl p-4 rounded mb-5 bg-gray-100" type="text" placeholder="Имя"/>
                <label htmlFor="name" className="text-xl">Фамилия</label>
                <input id="name"onChange={(e)=>setCallBack({l_name: e.target.value})} value={l_name} className="w-full text-xl p-4 rounded mb-5 bg-gray-100" type="text" placeholder="Фамилия"/>
                <label htmlFor="name1" className="text-xl">Телефон</label>
                <input id="name1" value={phone} onChange={(e)=>setCallBack({phone: e.target.value})} className="w-full text-xl p-4 rounded mb-5 bg-gray-100" type="text" placeholder="Телефон"/>
                <button onClick={()=>handleCancel()} className="w-full text-xl p-4 rounded mr-5 bg-blue-400 text-white">Отправить</button>
            </div>
        </div>
        <div className="w-1/2 pl-28 contact">
            <YMaps>
                <Map
                    defaultState={{
                        center: [41.320883, 69.251898],
                        zoom: 12,
                    }}
                    width="auto"
                    height="288px"
                >
                    <Placemark geometry={[41.320883, 69.251898]} />
                </Map>
            </YMaps>
        </div>
        <Modal className="call" visible={isModalVisible_1} onCancel={()=>setIsModalVisible_1(false)}>
            <h2 className="text-5xl text-center text-blue-500 font-bold mt-4">Спасибо</h2>
            <h2 className="text-3xl font-bold text-center mt-4">Ваш запрос в процесс обработки мы отправим вам смс код после обработки</h2>
        </Modal>
        <Snackbar
            open={open}
            onClose={handleClose}
            TransitionComponent={transition}
            message="I love snacks"
            key={transition ? transition.name : ''}
        />
    </div>
}