import {Route, Routes} from 'react-router-dom';

import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Layout from "./components/Layout/Layout";
import SneakerDetailsPage from "./pages/SneakerDetailsPage/SneakerDetailsPage";
import RequireAuth from "./hoc/RequireAuth";
import BasketPage from "./pages/BasketPage/BasketPage";
import Admin from "./components/Admin/Admin";
import AuthProvider from "./hoc/AuthProvider";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route path={'/'} element={<HomePage/>}/>
                    {/*<Route path={'/login'} element={<LoginPage/>}/>*/}
                    {/*<Route path={'/registration'} element={<LoginPage/>}/>*/}
                    <Route path={'/:name/:id'} element={<SneakerDetailsPage/>}/>
                    <Route path={'/admin'} element={
                        <RequireAuth>
                            <Admin/>
                        </RequireAuth>
                    }/>
                    {/*<Route path={'/basket'} element={*/}
                    {/*    <RequireAuth>*/}
                    {/*        <BasketPage/>*/}
                    {/*    </RequireAuth>*/}
                    {/*}/>*/}
                    <Route path={'*'} element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;
