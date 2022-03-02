import {Route, Routes} from 'react-router-dom';
import AddItem from './components/admin/AddItem';
import EditItem from './components/admin/EditItem';
import ItemsList from './components/admin/ItemsList';
import ViewItem from './components/admin/ViewItem';
import Header from './components/Header';
import {AppBars} from "./pages/AppBar";
import {Home} from "./pages/Home";

function App() {
    return (
        <div className="py-5 px-10 min-h-screen bg-slate-200">
            <AppBars/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/admin/elyor" element={<ItemsList/>}/>
                <Route path="/admin/add" element={<AddItem/>}/>
                <Route path="/admin/view/:id" element={<ViewItem/>}/>
                <Route path="/admin/edit/:ID" element={<EditItem/>}/>
            </Routes>
        </div>
    );
}

export default App;
