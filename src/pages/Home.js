import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getInfo} from "../redux/actions";
import {CircularProgress} from "@mui/material";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import {Map, Placemark, YMaps} from "react-yandex-maps";

export const Home = () => {
    const state = useSelector((state) => state.users);
    const newStates = useSelector((state) => state.searched);
    const loading = useSelector((state) => state.loading);
    const [modalId, setModalId] = useState(null)
    const dispatch = useDispatch();
    const modalData = state.filter(i => i.id === modalId)

    useEffect(() => {
        if (state.length === 0) {
            dispatch(getInfo());
        }
    }, []);

    const cheking = () => {
        let news = null
        if (newStates.length === 0) {
            news = state
        } else if (newStates.length !== 0) {
            news = newStates
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

    return loading ? (
        <div className="flex justify-center items-center h-screen">
            <CircularProgress color="success" size={150}/>
        </div>
    ) : (<div>
        <div className="flex w-full justify-center"><h2
            className=" px-3 bg-slate-200 inline-block text-2xl font-bold uppercase translate-y-4">Все мероприятие</h2>
        </div>
        <hr className="h-0.5 bg-yellow-400"/>
        <div className="card_wrapper mt-4 pt-6 flex flex-wrap justify-between">
            {cheking().map((i) => (
                <div key={i.id} onClick={() => handleOpen(i.id)}
                     className="hover:scale-110 duration-700 w-11/12 sm:w-80 md:w-96 xl:w-80 mx-auto mb-14 bg-white rounded-md overflow-hidden">
                    <img
                        className="w-full h-72 "
                        src={`http://f0607823.xsph.ru/elyor/public/storage/event/${i.id}/${i.id}.jpg`}
                        alt={i.title}
                    />
                    <div className="py-2 px-4 z-20">
                        <p className="text-xl pb-4 font-bold">{i.title}</p>
                        <p className="text-lg font-bold ">{i.date}</p>
                        <p className="text-base">{i.place}</p>
                        <p className="text-lg">{i.price} UZS</p>
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
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {modalData[0].title}
                    </Typography>
                    <Typography id="modal-modal-description">
                        {modalData[0].info}
                    </Typography>
                    <div className="flex h-72">
                        <img
                            className="w-1/3"
                            src={`http://f0607823.xsph.ru/elyor/public/storage/event/${modalData[0].id}/${modalData[0].id}.jpg`}
                            alt={modalData[0].title}
                        />
                        <div className="px-2 pt-2">
                            <span className="text-xl flex items-center mb-2"><CalendarTodayIcon className="mr-1"/>{modalData[0].date}</span>
                            <span className="text-xl flex items-center mb-2"><LocationOnIcon className="mr-1"/>{modalData[0].address}</span>
                            <span className="text-xl flex items-center mb-2"><AttachMoneyIcon className="mr-1"/>{modalData[0].price} сум</span>
                            <span className="text-xl flex items-center mb-2"><LocalPhoneIcon className="mr-1"/>{modalData[0].contact}</span>
                        </div>
                        <div className="w-1/3 h-72">
                            <YMaps>
                                <Map
                                    defaultState={{
                                        center: [(+modalData[0].location.split(',')[0]), (+modalData[0].location.split(',')[1])],
                                        zoom: 12,
                                    }}
                                    width="auto"
                                    height="288px"
                                >
                                    <Placemark geometry={[(+modalData[0].location.split(',')[0]), (+modalData[0].location.split(',')[1])]} />
                                </Map>
                            </YMaps>
                        </div>
                    </div>
                </Box> : ''}
            </>
        </Modal>
    </div>)
}