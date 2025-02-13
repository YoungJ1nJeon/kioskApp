import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from './Banner';
import Orderbug from './Orderbug';
import Initialscreen from './Initialscreen';
import { hideInitialscreen } from '../actions';  // 올바른 경로로 수정

const Kiosk = () => {
    const dispatch = useDispatch();
    const showInitialscreen = useSelector(state => state.showInitialscreen);

    const handleScreenClick = () => {
        dispatch(hideInitialscreen());
    };

    return (
        <div className="kiosk_wrap">
            {showInitialscreen && <Initialscreen onClick={handleScreenClick} />}
            <Banner />
            <Orderbug />
        </div>
    );
};

export default Kiosk;
