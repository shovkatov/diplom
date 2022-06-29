import React, {useState} from "react";
import {useSelector} from "react-redux";
import Box from "@mui/material/Box";
import {GeolocationControl, Map, Placemark, RouteButton, TypeSelector, YMaps} from "react-yandex-maps";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Modal from "@mui/material/Modal";

export const PartyPage = () => {
    const state = useSelector((state) => state.users);
    const newStates = useSelector((state) => state.searched);
    const parties = state.filter(i=>i.category==='party')
    const [open, setOpen] = React.useState(false);
    const [modalId, setModalId] = useState(null)
    const modalData = state.filter(i => i.id === modalId)

    const handleClose = () => {
        setOpen(false);
        setModalId(null)
    }

    const handleOpen = (id) => {
        setOpen(true);
        setModalId(id)
    }

    const cheking = () => {
        let news = null
        if (newStates.length === 0) {
            news = parties
        } else if (newStates.length !== 0) {
            news = newStates
        }
        return news
    }

    return <div className="pb-28 sm:pb-16">
        <div className="flex w-full justify-center"><h2
            className=" px-3 bg-slate-200 inline-block text-2xl font-bold uppercase translate-y-4">Вечеринки</h2>
        </div>
        <hr className="h-0.5 bg-yellow-400"/>
        <div className="mt-8 flex flex-wrap">
                {cheking().map(i=>(
                    <div onClick={() => handleOpen(i.id)} key={i.id} className="sm:w-1/2 w-full px-6 p-2 cursor-pointer">
                        <div className="bg-white flex p-2 h-44">
                            <img className="w-1/4 mr-4" src={`http://f0607823.xsph.ru/elyor/public/storage/event/${i.id}/${i.id}.jpg`} alt={i.title}/>
                            <div>
                                <h3 className="text-2xl">{i.title}</h3>
                                <span className="text-gray-400">{i.date}</span>
                                <p>{i.info}</p>
                            </div>
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
    </div>
}