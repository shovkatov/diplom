import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {delFavouriteElement, favouriteElement} from "../redux/actions";
import Box from "@mui/material/Box";
import {Map, Placemark, YMaps} from "react-yandex-maps";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Modal from "@mui/material/Modal";
import {notification} from "antd";

export const FavouritePage = () => {
    const state = useSelector((state) => state.users);
    const newStates = useSelector((state) => state.searched);
    const fav = useSelector((state) => state.favourite);
    const exhibition = state.filter(i=>i.id==='event')
    const dispatch = useDispatch();
    const [modalId, setModalId] = useState(null)
    const modalData = state.filter(i => i.id === modalId)
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
        dispatch(delFavouriteElement(id))
        info()
    }

    const info = () => {
        notification.success({
            message: 'Удалено из Избранные',
            // description:
            //     'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };

    return <div className="pb-28 sm:pb-16">
        <div className="flex w-full justify-center"><h2
            className=" px-3 bg-slate-200 inline-block text-2xl font-bold uppercase translate-y-4">Избранные</h2>
        </div>
        <hr className="h-0.5 bg-yellow-400"/>
        {fav.length===0?<div className="mt-20">
                <p className="text-5xl text-gray-400 text-center">У вас пока нет Избранные</p>
            </div>:
            <div className="mt-8 flex flex-wrap">
                {fav.map((i) => (
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
                            <FavoriteIcon onClick={()=>handleclicked(i.id)}/>
                        </div>
                    </div>
                ))}
            </div>
        }
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