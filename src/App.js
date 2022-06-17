import {Route, Routes} from 'react-router-dom';
import AddItem from './components/admin/AddItem';
import EditItem from './components/admin/EditItem';
import ItemsList from './components/admin/ItemsList';
import ViewItem from './components/admin/ViewItem';
import {AppBars} from "./pages/AppBar";
import {Home} from "./pages/Home";
import {Auth} from "./components/admin/Auth";
import {CinemaPage} from "./pages/CinemaPage";
import {PartyPage} from "./pages/PartyPage";
import {CoursePage} from "./pages/CoursePage";
import {EventsPage} from "./pages/EventsPage";
import {PromoPage} from "./pages/PromoPage";
import {ExhibitionPage} from "./pages/ExhibitionPage";
import {ConcertPage} from "./pages/ConcertPage";
import {TheatrePage} from "./pages/TheatrePage";
import {PlacesPage} from "./pages/PlacesPage";
import {TenderPage} from "./pages/TenderPage";
import {ContactPage} from "./pages/ContactPage";
import {FavouritePage} from "./pages/FavouritePage";
import {AccountPage} from "./pages/AccountPage";
import {RegistrationPage} from "./pages/RegistrationPage";

function App() {
    return (
        <div className="py-5 px-36 min-h-screen bg-slate-200">
            <AppBars/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/party" element={<PartyPage/>}/>
                <Route path="/course" element={<CoursePage/>}/>
                <Route path="/cinema" element={<CinemaPage/>}/>
                <Route path="/events" element={<EventsPage/>}/>
                <Route path="/promo" element={<PromoPage/>}/>
                <Route path="/exhibition" element={<ExhibitionPage/>}/>
                <Route path="/concert" element={<ConcertPage/>}/>
                <Route path="/theatre" element={<TheatrePage />}/>
                <Route path="/places" element={<PlacesPage />}/>
                <Route path="/tender" element={<TenderPage />}/>
                <Route path="/contact" element={<ContactPage />}/>
                <Route path="/favourite" element={<FavouritePage />}/>
                <Route path="/account" element={<AccountPage />}/>
                <Route path="/registration" element={<RegistrationPage />}/>
                <Route path="/admin" element={<Auth/>}/>
                <Route path="/admin/elyor" element={<ItemsList/>}/>
                <Route path="/admin/add" element={<AddItem/>}/>
                <Route path="/admin/view/:id" element={<ViewItem/>}/>
                <Route path="/admin/edit/:ID" element={<EditItem/>}/>
            </Routes>
        </div>
    );
}

export default App;
