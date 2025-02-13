import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from './utils/utils';
import { setModalType } from '../actions';
import { selectPrinting } from '../actions';


const Modal_method = () => {
    const dispatch = useDispatch();
    const printing = useSelector((state) => state.selectedPrinting );
    const selectedBurgerMenu = useSelector((state) => state.selectedItem);
    const totalAmount = selectedBurgerMenu.reduce((total, burger) => total + burger.price, 0);

    

    const handleClickCancel = () => {
        dispatch(setModalType(null));
    }

    

    return (
        <div className="method_wrap">
            <div className="method">
                <section className="modal_wrap">
                    <div className="h2_wrap">
                        <h2><span>결제수단을</span><br/>선택해주세요.</h2>
                    </div>
                    <div className="select_wrap">
                        <div className="card">
                            <div className="img"></div>
                            <p>신용카드</p>
                        </div>
                        <div className="payco">
                            <div className="img"></div>
                            <p>페이코</p>
                        </div>
                    </div>
                    <div className="price_wrap">
                        <div className="price">
                            <p className="total">총 결제금액</p>
                            <p className="total_price">{formatCurrency(totalAmount)}원</p>
                        </div>
                        <civ className="btn_wrap">
                            <button onClick={handleClickCancel}>결제취소</button>
                        </civ>
                        
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Modal_method;
