import {Route, Routes} from 'react-router-dom';
import {createContext} from "react";

import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Layout from "./components/Layout/Layout";
import SneakerDetailsPage from "./pages/SneakerDetailsPage/SneakerDetailsPage";

function App() {
const Context = createContext(null);

  return (
    <Context>
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/sneaker/:id'} element={<SneakerDetailsPage/>}/>
                <Route path={'*'} element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    </Context>
  );
}

export default App;
