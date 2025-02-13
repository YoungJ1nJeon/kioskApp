import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedItem } from '../actions';
import { formatCurrency } from './utils/formatCurrency';

const Modal_King = ({ isOpen, onClose, itemDetails, itemName }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const closeModalClick = () => {
        setSelectedOption('');
        onClose();
    };

    const handleArticleClick = (value) => {
        setSelectedOption(value);
    };

    const handleConfirmClick = () => {
        let price;
        let burgerName = itemName; 
    
        switch (itemName) {
        }
        if (selectedOption === '4조각') {
            price = Number(itemDetails['가격']);
            burgerName += ' 4조각'; 
        } else if (selectedOption === '8조각') {
            price = Number(itemDetails['가격']) * 2 - 200;
            burgerName += ' 8조각';
        }
    
        const selectedItem = {
            name: burgerName,
            price: price,
        };
    
        dispatch(addSelectedItem(selectedItem));
        closeModalClick();
    };

    if (!isOpen) return null;

    return (
        <div className="addItem_wrap">
            <div className="addItem">
                <section className="modal_wrap">
                    <button onClick={closeModalClick} className="close_btn"></button>
                    <div className="h2_wrap">
                        <h2>원하시는 구성을 선택해주세요.</h2>
                    </div>
                    <div className="select_wrap">
                        {itemDetails && (
                            <>
                                <article onClick={() => handleArticleClick('4조각')}>
                                    <div className="a1">
                                        <label className={selectedOption === '4조각' ? 'select' : 'not_select'}>
                                            <span className="check"></span>
                                            <input type="radio" value="4조각" checked={selectedOption === '4조각'} onChange={handleChange}/>
                                        </label>
                                    </div>
                                    <div className="a2">
                                        <h3>{itemName} 4조각</h3>
                                        <p className="price">{formatCurrency(Number(itemDetails['가격']))}원</p>
                                    </div>
                                    <div className="a3">
                                        <img src={require(`../styles/images/${itemDetails["단품"].이미지}`)} alt={itemName} />
                                    </div>
                                </article>
                                <article onClick={() => handleArticleClick('8조각')}>
                                    <div className="a1">
                                        <label className={selectedOption === '8조각' ? 'select' : 'not_select'}>
                                            <span className="check"></span>
                                            <input type="radio" value="8조각" checked={selectedOption === '8조각'} onChange={handleChange}/>
                                        </label>
                                    </div>
                                    <div className="a2">
                                        <h3>{itemName} 8조각</h3>
                                        <p className="price">{formatCurrency(Number(itemDetails['가격']) * 2 - 200)}원</p>
                                    </div>
                                    <div className="a3">
                                        <img src={require(`../styles/images/${itemDetails["다수"].이미지}`)} alt={itemName} />
                                    </div>
                                </article>
                            </>
                        )}
                    </div>
                    <div className="btn_wrap">
                        <button className={selectedOption ? 'active' : 'disabled'} disabled={!selectedOption} onClick={handleConfirmClick}>확인</button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Modal_King;
