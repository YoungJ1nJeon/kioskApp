import React from 'react';

const Initialscreen = (props) => {
    return (
        <div className="Initialscreen_wrap" onClick={props.onClick}>
            <div className="logo"></div>
            <div className="h1_wrap">
                <h1>BUG KING<br />포트폴리오</h1>
            </div>
            <ul className="explanation_wrap">
                <li><span className="red">본 페이지는 포트폴리오 용으로 제작되었습니다.</span></li>
                <li>2인 이상이 커피, 음료류 디저트류만 주문 시 매장 내 머무르는 시간을<br/><span className="red">60분</span>으로 제한</li>
                <li>전화주문 안내 10:00 ~ 22:00<br />(매장별로 상이할 수 있습니다.)</li>
            </ul>
            <div className="click_box">
                <p>화면을 터치하세요.</p>
            </div>
        </div>
    );
};

export default Initialscreen;