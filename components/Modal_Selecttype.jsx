import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Topping from './Modal_Topping';
import { addSelectedItem } from '../actions';
import { formatCurrency } from './utils/utils';

const Modal = ({ isOpen, onClose, itemDetails, itemName, type }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [showToppingModal, setShowToppingModal] = useState(false);
    const dispatch = useDispatch();

    if (!isOpen) return null;

    // 공통된 handleChange
    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    // 공통된 closeModal
    const closeModalClick = () => {
        setSelectedOption('');
        onClose();
    };

    const handleArticleClick = (value) => {
        setSelectedOption(value);
    };

    // 공통된 handleConfirm
    const handleConfirmClick = () => {
        let price;
        let selectedItemName = itemName;

        // 각 모달 type에 맞는 가격 및 이름 계산
        switch (type) {
            case 'burger':
                if (selectedOption === '단품') {
                    price = Number(itemDetails['가격']);
                    selectedItemName += ' 단품';
                } else if (selectedOption === '세트') {
                    price = Number(itemDetails['가격']) + 2500;
                    selectedItemName += ' 세트';
                } else if (selectedOption === '라지세트') {
                    price = Number(itemDetails['가격']) + 3200;
                    selectedItemName += ' 라지세트';
                }
                break;
            case 'king':
                if (selectedOption === '4조각') {
                    price = Number(itemDetails['가격']);
                    selectedItemName += ' 4조각';
                } else if (selectedOption === '8조각') {
                    price = Number(itemDetails['가격']) * 2 - 200;
                    selectedItemName += ' 8조각';
                }
                break;
            case 'side':
                price = Number(itemDetails['가격']);
                break;
            case 'coffee':
                if (selectedOption === '핫') {
                    price = Number(itemDetails['가격']);
                } else if (selectedOption === '아이스') {
                    price = Number(itemDetails['가격']);
                    selectedItemName = '아이스 ' + selectedItemName;
                }
                break;
            case 'drink':
                if (selectedOption === '기본') {
                    price = Number(itemDetails['가격']);
                } else if (selectedOption === '제로') {
                    price = Number(itemDetails['가격']);
                    selectedItemName += ' 제로';
                }
                break;
            default:
                break;
        }

        // 선택된 항목 디스패치
        const selectedItem = {
            name: selectedItemName,
            price: price,
        };
        dispatch(addSelectedItem(selectedItem));

        closeModalClick();
        
    };

    // 각 모달 type에 맞는 내용 렌더링
    const renderOptions = () => {
        switch (type) {
            case 'burger':
                return (
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
                )
            case 'king':
                return (
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
                );
            case 'side':
                return (
                    <>
                        <article onClick={() => handleArticleClick('단품')}>
                            <div className="a1">
                                <label className={selectedOption === '단품' ? 'select' : 'not_select'}>
                                    <span className="check"></span>
                                    <input type="radio" value="단품" checked={selectedOption === '단품'} onChange={handleChange}/>
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
                    </>
                );
            case 'drink':
                return (
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
                                <p className="price">{formatCurrency(Number(itemDetails['가격']))}원</p>
                            </div>
                            <div className="a3">
                                <img src={require(`../styles/images/${itemDetails["단품"].이미지}`)} alt={itemName} />
                            </div>
                        </article>
                    </>
                );
            case 'coffee':
                return (
                    <>
                        <article onClick={() => handleArticleClick('핫')}>
                                    <div className="a1">
                                        <label className={selectedOption === '핫' ? 'select' : 'not_select'}>
                                            <span className="check"></span>
                                            <input type="radio" value="핫" checked={selectedOption === '핫'} onChange={handleChange}/>
                                        </label>
                                    </div>
                                    <div className="a2">
                                        <h3>{itemName}</h3>
                                        <p className="price">{formatCurrency(Number(itemDetails['가격']))}원</p>
                                    </div>
                                    <div className="a3">
                                        <img src={require(`../styles/images/${itemDetails["핫"].이미지}`)} alt={itemName} />
                                    </div>
                        </article>
                        <article onClick={() => handleArticleClick('아이스')}>
                            <div className="a1">
                                <label className={selectedOption === '아이스' ? 'select' : 'not_select'}>
                                    <span className="check"></span>
                                    <input type="radio" value="아이스" checked={selectedOption === '아이스'} onChange={handleChange}/>
                                </label>
                            </div>
                            <div className="a2">
                                <h3>아이스 {itemName}</h3>
                                <p className="price">{formatCurrency(Number(itemDetails['가격']))}원</p>
                            </div>
                            <div className="a3">
                                <img src={require(`../styles/images/${itemDetails["아이스"].이미지}`)} alt={itemName} />
                            </div>
                        </article>
                    </>
                );
            default:
            return null;
        }
    };

    return (
        <div className="addItem_wrap">
            <div className="addItem">
                <section className="modal_wrap">
                    <button onClick={closeModalClick} className="close_btn"></button>
                    <div className="h2_wrap">
                        <h2>원하시는 구성을 선택해주세요.</h2>
                    </div>
                    <div className="select_wrap">
                        {itemDetails && renderOptions()}
                    </div>
                    <div className="btn_wrap">
                        <button className={selectedOption ? 'active' : 'disabled'} disabled={!selectedOption} onClick={handleConfirmClick}>확인</button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Modal;
