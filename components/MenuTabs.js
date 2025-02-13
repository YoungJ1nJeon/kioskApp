import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMenuItem } from '../actions';  // 올바른 경로로 수정

const MenuTabs = () => {
    const dispatch = useDispatch();
    const selectedMenuItem = useSelector(state => state.selectedMenuItem);

    const handleMenuClick = (item) => {
        dispatch(selectMenuItem(item));
    };

    return (
        <section className="menu_tabs">
            <button onClick={() => handleMenuClick('추천메뉴')} className={`bo ri ${selectedMenuItem === '추천메뉴' ? 'selected' : ''}`}>추천메뉴</button>
            <button onClick={() => handleMenuClick('프리미엄')} className={`bo ri ${selectedMenuItem === '프리미엄' ? 'selected' : ''}`}>프리미엄</button>
            <button onClick={() => handleMenuClick('와퍼&주니어')} className={`bo ${selectedMenuItem === '와퍼&주니어' ? 'selected' : ''}`}>와퍼&주니어</button>
            <button onClick={() => handleMenuClick('치킨&슈림프버거')} className={`bo ri ${selectedMenuItem === '치킨&슈림프버거' ? 'selected' : ''}`}>치킨&슈림프버거</button>
            <button onClick={() => handleMenuClick('사이드')} className={`bo ri ${selectedMenuItem === '사이드' ? 'selected' : ''}`}>사이드</button>
            <button onClick={() => handleMenuClick('음료&디저트')} className={`bo ${selectedMenuItem === '음료&디저트' ? 'selected' : ''}`}>음료&디저트</button>
        </section>
    );
};

export default MenuTabs;
