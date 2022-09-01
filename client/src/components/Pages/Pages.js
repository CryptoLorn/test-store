import React from 'react';
import {Pagination} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

import {useAuth} from "../../hooks/useAuth";
import {setPage} from "../../store/page.slice";

const Pages = () => {
    // const {page, setPage, totalCount} = useAuth()
    const {page} = useSelector(state => state.pageReducer); //totalCount
    const {totalCount} = useSelector(state => state.sneakerReducer);
    const dispatch = useDispatch();

    let limit = 5
    const pageCount = Math.ceil(totalCount / limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
            <Pagination>
                {pages.map(currentPage =>
                    <Pagination.Item
                        key={currentPage}
                        active={page === currentPage}
                        onClick={() => dispatch(setPage(currentPage))}
                    >
                        {currentPage}
                    </Pagination.Item>
                )}
            </Pagination>
    );
};

export default Pages;