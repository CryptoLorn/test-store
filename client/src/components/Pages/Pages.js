import React from 'react';
import {Pagination} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import {useAuth} from "../../hooks/useAuth";

const Pages = () => {
    const {page, totalCount, setPage} = useAuth()
    let limit = 4
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
                        onClick={() => setPage(currentPage)}
                    >
                        {currentPage}
                    </Pagination.Item>
                )}
            </Pagination>
    );
};

export default Pages;