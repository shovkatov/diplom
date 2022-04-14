import {Route, Routes} from 'react-router-dom';
import AddItem from './components/admin/AddItem';
import EditItem from './components/admin/EditItem';
import ItemsList from './components/admin/ItemsList';
import ViewItem from './components/admin/ViewItem';
import {AppBars} from "./pages/AppBar";
import {Home} from "./pages/Home";
import {Auth} from "./components/admin/Auth";

function App() {
    return (
        <div className="py-5 px-36 min-h-screen bg-slate-200">
            <AppBars/>
            <Routes>
                <Route path="/" element={<Home/>}/>
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
