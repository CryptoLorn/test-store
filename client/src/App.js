import {Route, Routes} from 'react-router-dom';

import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Layout from "./components/Layout/Layout";
import SneakerDetailsPage from "./pages/SneakerDetailsPage/SneakerDetailsPage";
import RequireAuth from "./hoc/RequireAuth";
import BasketPage from "./pages/BasketPage/BasketPage";
import AuthProvider from "./hoc/AuthProvider";
import BrandProvider from "./hoc/BrandProvider";
import NikePage from "./pages/NikePage/NikePage";

function App() {

    return (
        <AuthProvider><BrandProvider>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/login'} element={<LoginPage/>}/>
                    <Route path={'/registration'} element={<LoginPage/>}/>
                    <Route path={'/:name/:id'} element={<SneakerDetailsPage/>}/>
                    <Route path={'/:name/brand/:id'} element={<NikePage/>}/>
                    <Route path={'/basket'} element={
                        <RequireAuth>
                            <BasketPage/>
                        </RequireAuth>
                    }/>
                    <Route path={'*'} element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </BrandProvider></AuthProvider>
    );
}

export default App;
