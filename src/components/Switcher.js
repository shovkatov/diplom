import {lazy, Suspense} from "react"
import {useSelector} from "react-redux";

const Main = lazy(() => import("./admin/ItemsList"))
const Auth = lazy(() => import("./admin/Auth"))

export const Switcher = () =>{
    const screen = useSelector((state) => state.screen);
    switch (screen) {
        case "documents":
            return <Suspense><Main/></Suspense>
        case "main":
        default:
            return <Suspense><Auth/></Suspense>
    }
}