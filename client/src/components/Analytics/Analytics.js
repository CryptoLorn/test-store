import React from 'react';
import {useSelector} from "react-redux";

import "./Analytics.css";
import Analytic from "../Analytic/Analytic";

const Analytics = () => {
    const {analytics} = useSelector(state => state.analyticsReducer);

    return (
        <>
            <div className={'analytics_name_tables'}>
                <div className={'analytics_name'}><b>Sneakers Name</b></div>
                <div className={'analytics_views'}><b>Views</b></div>
                <div className={'analytics_bought'}><b>Bought</b></div></div>
            {analytics.map(analytic => <Analytic key={analytic.id} analytic={analytic}/>)}
        </>
    );
};

export default Analytics;