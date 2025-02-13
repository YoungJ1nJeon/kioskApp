import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedItem } from '../actions';
import { formatCurrency } from './utils/formatCurrency';

const Modal_Drink = ({ isOpen, onClose, itemDetails, itemName }) => {
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
        if (selectedOption === '기본') {
            price = Number(itemDetails['가격']); 
        } else if (selectedOption === '제로') {
            price = Number(itemDetails['가격']);
            burgerName += ' 제로';
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
                                <article onClick={() => handleArticleClick('기본')}>
                                    <div className="a1">
                                        <label className={selectedOption === '기본' ? 'select' : 'not_select'}>
                                            <span className="check"></span>
                                            <input type="radio" value="기본" checked={selectedOption === '기본'} onChange={handleChange}/>
                                        </label>
                                    </div>
                                    <div className="a2">
                                        <h3>{itemName}</h3>
                                        <p className="price">{formatCurrency(Number(itemDetails['가격']))}원</p>
                                    </div>
                                    <div className="a3">
                                        <img src={require(`../styles/images/${itemDetails["단품"].이미지}`)} alt={itemName} />
                                    </div>
                                </article>
                                <article onClick={() => handleArticleClick('제로')}>
                                    <div className="a1">
                                        <label className={selectedOption === '제로' ? 'select' : 'not_select'}>
                                            <span className="check"></span>
                                            <input type="radio" value="제로" checked={selectedOption === '제로'} onChange={handleChange}/>
                                        </label>
                                    </div>
                                    <div className="a2">
                                        <h3>{itemName} 제로</h3>
                                        <p className="price">{formatCurrency(Number(itemDetails['가격']) * 2 - 200)}원</p>
                                    </div>
                                    <div className="a3">
                                        <img src={require(`../styles/images/${itemDetails["단품"].이미지}`)} alt={itemName} />
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

export default Modal_Drink;
