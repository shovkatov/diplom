import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {favouriteElement, getInfo} from "../redux/actions";
import {CircularProgress} from "@mui/material";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import {GeolocationControl, Map, Placemark, RouteButton, TypeSelector, YMaps} from "react-yandex-maps";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {message, notification} from "antd";

export const Home = () => {
    const state = useSelector((state) => state.users);
    const newStates = useSelector((state) => state.searched);
    const fav = useSelector((state) => state.favourite);
    const loading = useSelector((state) => state.loading);
    const [modalId, setModalId] = useState(null)
    const [filtered, setFiltered] = useState([])
    const dispatch = useDispatch();
    const modalData = state.filter(i => i.id === modalId)

    function getRandom(arr, n) {
        let result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            const x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len;
        }
        return result;
    }

    const boo1 = state.filter(i=>+i.date.substr(5,2)<5)
    const boo = boo1.filter(i=>+i.date.substr(8,2)<4)

    // console.log(state)
    // console.log(fav)
    // console.log(boo1)
    useEffect(() => {
        if (state.length === 0) {
            dispatch(getInfo());
        }
    }, []);

    const filterByCalendar = (days) => {

        const y = days.substr(0,4)
        const m = days.substr(5,2)
        const d = days.substr(8,2)
        // setFiltered(state.filter(i=>+i.date.substr(0,4)==y))
        // setFiltered(filtered.filter(i=>+i.date.substr(5,2)==m))
        // setFiltered(filtered.filter(i=>+i.date.substr(8,2)===d))
        setFiltered(state.filter(i=>i.date===days))
    }
    // console.log(filtered)

    const filterByDay = (day) => {
        if (day==23){
            const y = state.filter(i=>+i.date.substr(0,4)==2022)
            const m = y.filter(i=>+i.date.substr(5,2)==6)
            const d = m.filter(i=>+i.date.substr(8,2)==23)
            setFiltered(d)
        } else if (day==26){
            const y = state.filter(i=>+i.date.substr(0,4)==2022)
            const m = y.filter(i=>+i.date.substr(5,2)==6)
            const d = m.filter(i=>+i.date.substr(8,2)==26)
            setFiltered(d)
        }
        else if (day==30){
            const y = state.filter(i=>+i.date.substr(0,4)==2022)
            const m = y.filter(i=>+i.date.substr(5,2)==6)
            const d = m.filter(i=>+i.date.substr(8,2)==30)
            setFiltered(d)
        }
        else if (day==7){
            const y = state.filter(i=>+i.date.substr(0,4)==2022)
            const m = y.filter(i=>+i.date.substr(5,2)==7)
            const d = m.filter(i=>+i.date.substr(8,2)<24)
            setFiltered(d)
        }
        else if (day==0){
            setFiltered(state)
        }

        // setFiltered(d)
    }

    const checking = () => {
        let news = null
        if (newStates.length === 0) {
            // news = getRandom(state,state.length)
            news = state
        } else if (newStates.length !== 0) {
            news = newStates
        }
        return news
    }

    const checking1 = () => {
        let news = null
        if (filtered.length === 0) {
            news = checking()
        } else if (filtered.length !== 0) {
            news = filtered
        }
        return news
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = (id) => {
        setOpen(true);
        setModalId(id)
    }
    const handleClose = () => {
        setOpen(false);
        setModalId(null)
    }

    const handleclicked = (id) => {
        dispatch(favouriteElement(id))
        info()
    }

    const info = () => {
        notification.success({
            message: 'Добавлено в Избранные',
            // description:
            //     'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };

    return loading ? (
        <div className="flex justify-center items-center h-screen">
            <CircularProgress color="success" size={150}/>
        </div>
    ) : (<div>
        <div className="flex w-full justify-center"><h2
            className=" px-3 bg-slate-200 inline-block text-2xl font-bold uppercase translate-y-4">Все мероприятие</h2>
        </div>
        <hr className="h-0.5 bg-yellow-400"/>
        <select className="selectFilter bg-white border-black border-2 text-xl px-3 rounded"
                defaultValue="0"
                onChange={(e)=>filterByDay(e.target.value)}>
            <option value="0">все</option>
            <option value="23">за день</option>
            <option value="26">за 3 дня</option>
            <option value="30">за недели</option>
            <option value="7">месяц</option>
        </select>
        <input type="date" onChange={(e)=>filterByCalendar(e.target.value)} className="bg-white border-black border-2 text-xl py-1 px-3 mt-5 rounded"/>
        <div className="card_wrapper mt-4 pt-6 flex flex-wrap justify-between">
            {checking1().map((i) => (
                <div key={i.id}
                     className="hover:scale-110 duration-700 w-11/12 sm:w-80 md:w-96 xl:w-80 mx-auto mb-14 bg-white rounded-md overflow-hidden">
                    <img
                        onClick={() => handleOpen(i.id)}
                        className="w-full h-72 "
                        src={`http://f0607823.xsph.ru/elyor/public/storage/event/${i.id}/${i.id}.jpg`}
                        alt={i.title}
                    />
                    <div className="py-2 px-4 z-20 wrap-box">
                        <p className="text-xl pb-4 font-bold">{i.title}</p>
                        <p className="text-lg font-bold ">{i.date}</p>
                        <p className="text-base">{i.place}</p>  
                        <p className="text-lg">{i.price} UZS</p>
                        <FavoriteIcon className="hover:text-red-500" onClick={()=>handleclicked(i.id)}/>
                    </div>
                </div>
            ))}
        </div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <>
                {modalId ? <Box className="modal">
                    <div className="flex">
                        <div className="w-1/2">
                            <img
                                className="w-full h-80"
                                src={`http://f0607823.xsph.ru/elyor/public/storage/event/${modalData[0].id}/${modalData[0].id}.jpg`}
                                alt={modalData[0].title}
                            />
                            <hr/>
                            <YMaps>
                                <Map
                                    defaultState={{
                                        center: [(+modalData[0].location.split(',')[0]), (+modalData[0].location.split(',')[1])],
                                        zoom: 12,
                                    }}
                                    width="auto"
                                    height="288px"
                                >
                                    <GeolocationControl options={{
                                        float: 'left'
                                    }} />
                                    <RouteButton options={{
                                        float: 'right'
                                    }} />
                                    <TypeSelector options={{
                                        float: 'right'
                                    }} />
                                    <Placemark geometry={[(+modalData[0].location.split(',')[0]), (+modalData[0].location.split(',')[1])]} />
                                </Map>
                            </YMaps>
                        </div>
                        <div className="w-1/2 px-5">
                            <p className="text-5xl font-bold uppercase text-center mb-2">{modalData[0].title}</p>
                            <p className="text-3xl uppercase text-center mb-4">{modalData[0].place}</p>
                            <span className="text-2xl flex items-center mb-2"><CalendarTodayIcon className="mr-1"/>{modalData[0].date}</span>
                            <span className="text-2xl flex items-center mb-2"><LocationOnIcon className="mr-1"/>{modalData[0].address}</span>
                            <span className="text-2xl flex items-center mb-2"><AttachMoneyIcon className="mr-1"/>{modalData[0].price} сум</span>
                            <span className="text-2xl flex items-center mb-5"><LocalPhoneIcon className="mr-1"/>{modalData[0].contact}</span>
                            <p className="text-xl">{modalData[0].info}</p>
                        </div>
                    </div>
                </Box> : ''}
            </>
        </Modal>
    </div>)
}