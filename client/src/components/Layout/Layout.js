import {Link, Outlet} from "react-router-dom";

import "./Layout.css"

const Layout = () => {

    return (
        <>
            <div className={'layout'}>
                <div><Link to={"/"}><h1>Some Store</h1></Link></div>
                <div className={'auth'}>
                    <div><Link to={"/login"}>Вхід</Link></div>
                    <div><Link to={"/registration"}>Зареєструватися</Link></div>
                </div>
            </div>
            <Outlet/>
        </>
    );
};

export default Layout;