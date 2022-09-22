import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import {setPage} from "../../store/page.slice";

const Pages = () => {
    const {page} = useSelector(state => state.pageReducer);
    const {totalCount} = useSelector(state => state.sneakersReducer);
    const dispatch = useDispatch();

    let limit = 8;
    const pageCount = Math.ceil(totalCount / limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
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