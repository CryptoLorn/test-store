import {Route, Routes} from 'react-router-dom';

import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Layout from "./components/Layout/Layout";
import SneakerDetailsPage from "./pages/SneakerDetailsPage/SneakerDetailsPage";
import RequireAuth from "./hoc/RequireAuth";
import BasketPage from "./pages/BasketPage/BasketPage";

function App() {

    return (
        <>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/login'} element={<LoginPage/>}/>
                    <Route path={'/registration'} element={<LoginPage/>}/>
                    <Route path={'/sneaker/:id'} element={<SneakerDetailsPage/>}/>
                    <Route path={'/basket'} element={
                        <RequireAuth>
                            <BasketPage/>
                        </RequireAuth>
                    }/>
                    <Route path={'*'} element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
