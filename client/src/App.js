import {Route, Routes} from 'react-router-dom';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Spinner} from "react-bootstrap";

import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Layout from "./components/Layout/Layout";
import SneakerDetailsPage from "./pages/SneakerDetailsPage/SneakerDetailsPage";
import {isAuth} from "./store/user.slice";
import AboutPage from "./pages/AboutPage/AboutPage";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(isAuth()).finally(() => setLoading(false));
    }, [])

    if (loading) {
        return <Spinner animation={'grow'}/>
    }

    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/:name/:id'} element={<SneakerDetailsPage/>}/>
                <Route path={'/about'} element={<AboutPage/>}/>
                <Route path={'*'} element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;
