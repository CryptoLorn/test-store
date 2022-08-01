import {Link, Outlet, useNavigate} from "react-router-dom";

import "./Layout.css"
import {useAuth} from "../../hooks/useAuth";
import basket from "../img/white_basket.png"
import Admin from "../Admin/Admin";

const Layout = () => {
    const {user, setUser} = useAuth();
    const navigate = useNavigate();

    const logOut = (cb) => {
        setUser(null);
        cb();
    }

    const logout = () => {
        logOut(() => navigate('/'), {replace: true})
    }

    return (
        <>
            <div className={'layout'}>
                <div><Link to={"/"}><h1>Some Store</h1></Link></div>
                <div>
                    {user?
                        <div>
                            {user.role === 'ADMIN'?
                                <div className={'navigation'}>
                                    <div className={'header_basket'}><Admin/></div>
                                    <div className={'header_basket'}><Link to={"/basket"}><img src={basket} alt={basket}/></Link></div>
                                    <div className={'logout'} onClick={logout}>Вийти</div>
                                </div>
                                :
                                <div className={'auth_user'}>
                                    <div className={'header_basket'}><Link to={"/basket"}><img src={basket} alt={basket}/></Link></div>
                                    <div className={'logout'} onClick={logout}>Вийти</div>
                                </div>}
                        </div>
                        :
                        <div className={'auth'}>
                            <div><Link to={"/login"}>Вхід</Link></div>
                            <div><Link to={"/registration"}>Реєстрація</Link></div>
                        </div>
                    }
                </div>
            </div>
            <Outlet/>
        </>
    );
};

export default Layout;