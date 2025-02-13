import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedItem } from '../actions'; // actions.js의 경로
import { formatCurrency } from './utils/formatCurrency';

const Modal_Bug = ({ isOpen, onClose, itemDetails, itemName }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const dispatch = useDispatch();
    const selectedBurgerMenu = useSelector(state => state.selectedItem);

    //console.log('주문된 버거', selectedBurgerMenu);

    console.log('asdasd');
    //console.log(selectedOption)
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
    
        if (selectedOption === '라지세트') {
            price = Number(itemDetails['가격']) + 3200;
            burgerName += ' 라지세트'; 
        } else if (selectedOption === '세트') {
            price = Number(itemDetails['가격']) + 2500;
            burgerName += ' 세트';
        } else if (selectedOption === '단품') {
            price = Number(itemDetails['가격']);
            burgerName += ' 단품'; 
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
                                <article onClick={() => handleArticleClick('라지세트')}>
                                    <div className="a1">
                                        <label className={selectedOption === '라지세트' ? 'select' : 'not_select'}>
                                            <span className="check"></span>
                                            <input type="radio" value="라지세트" checked={selectedOption === '라지세트'} onChange={handleChange}/>
                                        </label>
                                    </div>
                                    <div className="a2">
                                        <h3>{itemName} 라지세트</h3>
                                        <p>{itemName}+프렌치프라이(L)+콜라(L)</p>
                                        <p className="price">{formatCurrency(Number(itemDetails['가격']) + 3200)}원</p>
                                    </div>
                                    <div className="a3">
                                        <img src={require(`../styles/images/${itemDetails["세트"].이미지}`)} alt={itemName} />
                                    </div>
                                </article>
                                <article onClick={() => handleArticleClick('세트')}>
                                    <div className="a1">
                                        <label className={selectedOption === '세트' ? 'select' : 'not_select'}>
                                            <span className="check"></span>
                                            <input type="radio" value="세트" checked={selectedOption === '세트'} onChange={handleChange}/>
                                        </label>
                                    </div>
                                    <div className="a2">
                                        <h3>{itemName} 세트</h3>
                                        <p>{itemName}+프렌치프라이(R)+콜라(R)</p>
                                        <p className="price">{formatCurrency(Number(itemDetails['가격']) + 2500)}원</p>
                                    </div>
                                    <div className="a3">
                                        <img src={require(`../styles/images/${itemDetails["세트"].이미지}`)} alt={itemName} />
                                    </div>
                                </article>
                                <article onClick={() => handleArticleClick('단품')}>
                                    <div className="a1">
                                        <label className={selectedOption === '단품' ? 'select' : 'not_select'}>
                                            <span className="check"></span>
                                            <input type="radio" value="단품" checked={selectedOption === '단품'} onChange={handleChange}/>
                                        </label>
                                    </div>
                                    <div className="a2">
                                        <h3>{itemName}</h3>
                                        <p>단품</p>
                                        <p className="price">{formatCurrency(Number(itemDetails['가격']))} 원</p>
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

export default Modal_Bug;
