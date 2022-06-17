import React from "react";
import {useSelector} from "react-redux";

export const TenderPage = () => {
    const state = useSelector((state) => state.users);
    const newStates = useSelector((state) => state.searched);
    const tender = state.filter(i=>i.category==='tender')

    const checking = () => {
        let news = null
        if (newStates.length === 0) {
            news = tender
        } else if (newStates.length !== 0) {
            news = newStates
        }
        return news
    }

    return <div className="pb-28 sm:pb-16">
        <div className="flex w-full justify-center"><h2
            className=" px-3 bg-slate-200 inline-block text-2xl font-bold uppercase translate-y-4">Конкурсы</h2>
        </div>
        <hr className="h-0.5 bg-yellow-400"/>
        <div className="mt-8 flex flex-wrap">
            {checking().map(i=>(
                <div key={i.id} className="sm:w-1/4 w-full p-2">
                    <div className="bg-white rounded overflow-hidden pb-2">
                        <img className="w-full mb-2 h-72" src={`http://f0607823.xsph.ru/elyor/public/storage/event/${i.id}/${i.id}.jpg`} alt={i.title}/>
                        <div className="h-20 px-4">
                            <h3 className="text-2xl">{i.title}</h3>
                            <p>{i.place}</p>
                            <p className="text-3xl">Цена : {i.price} UZS</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
}