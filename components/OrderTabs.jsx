import React, { useEffect, useState } from 'react';
import menuData from '../data/data.json';
import TypeModal from './Modal_Selecttype';
import { formatCurrency } from './utils/utils';

const OrderTabs = ({ selectedMenuItem }) => {
    const [currentMenu, setCurrentMenu] = useState({});
    const [isTypeModal, setTypeModalOpen] = useState(false);
    const [selectedItemDetails, setSelectedItemDetails] = useState(null);
    const [selectedItemName, setSelectedItemName] = useState('');
    const [modalType, setModalType] = useState(''); // 모달 종류 상태 추가

    useEffect(() => {
        if (selectedMenuItem) {
            setCurrentMenu(menuData['메뉴'][selectedMenuItem] || {});
        }
    }, [selectedMenuItem]);

    const handleItemClick = (itemDetails, itemName) => {
        setSelectedItemDetails(itemDetails);
        setSelectedItemName(itemName);

        switch (selectedMenuItem) {
            case '추천메뉴':
            case '프리미엄':
            case '와퍼&주니어':
            case '치킨&슈림프버거':
                setModalType('burger'); // 햄버거 모달
                break;
            case '사이드':
            case '음료&디저트':
                if (itemName === '바삭킹' || itemName === '너겟킹') {
                    setModalType('king');
                } else if (itemName === '코카콜라' || itemName === '스프라이트') {
                    setModalType('drink');
                } else if (itemName === '아메리카노') {
                    setModalType('coffee');
                } else {
                    setModalType('side'); // 사이드 모달
                }
                break;
            default:
                break;
        }

        setTypeModalOpen(true);
    };

    const closeModal = () => {
        setTypeModalOpen(false);
        setSelectedItemDetails(null);
        setSelectedItemName('');
        setModalType(''); // 모달 종류 초기화
    };

    return (
        <section className="bug_tabs">
            {Object.keys(currentMenu).map((item, index) => {
                const itemDetails = currentMenu[item];
                const imageSrc = itemDetails["단품"] ? itemDetails["단품"].이미지 : '';
                const price = itemDetails["가격"];

                return (
                    <article key={index} className="item" onClick={() => handleItemClick(itemDetails, item)}>
                        <ul>
                            {imageSrc && <li><img src={require(`../styles/images/${imageSrc}`)} alt={item} className="item_img" /></li>}
                            <li className="item_name">
                                <p>{item}</p>
                            </li>
                            <li className="item_price">
                                <p>{formatCurrency(price)} 원 ~</p>
                            </li>
                        </ul>
                    </article>
                );
            })}

            {isTypeModal && (
                <TypeModal
                    isOpen={isTypeModal}
                    onClose={closeModal}
                    itemDetails={selectedItemDetails}
                    itemName={selectedItemName}
                    type={modalType} // modalType을 prop으로 전달
                />
            )}
        </section>
    );
};

export default OrderTabs;
