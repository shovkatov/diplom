import React from "react";
import {useSelector} from "react-redux";

export const PartyPage = () => {
    const state = useSelector((state) => state.users);
    const newStates = useSelector((state) => state.searched);
    const parties = state.filter(i=>i.category==='party')

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
                    <div key={i.id} className="sm:w-1/2 w-full px-6 p-2">
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
    </div>
}