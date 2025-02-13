import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModalType } from '../actions';
import { selectPrinting } from '../actions';


const Modal_printing = () => {
    const dispatch = useDispatch();
    const printing = useSelector((state) => state.selectedPrinting );

    const handleClickReceipt = () => {
        dispatch(setModalType('method'));
        dispatch(selectPrinting('영수증'));
        //console.log(printing);
    }

    const handleClickNumber = () => {
        dispatch(setModalType('method'));
        dispatch(selectPrinting('주문번호'));
    }

    return (
        <div className="printing_wrap">
            <div className="printing">
                <section className="modal_wrap">
                    <div className="h2_wrap">
                        <h2>출력할 영수증 또는 주문번호표를 선택해주세요.</h2>
                    </div>
                    <div className="select_wrap">
                        <div className="receipt">
                            <button onClick={handleClickReceipt}>영수증 출력</button>
                        </div>
                        <div className="number">
                            <button onClick={handleClickNumber}>주문번호표만 출력</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Modal_printing;
