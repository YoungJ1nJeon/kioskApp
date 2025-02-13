import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setModalType } from '../actions';

const Modal_choose = () => {
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState(null); // 선택된 옵션 상태

    // 클릭 시 선택된 옵션 업데이트
    const handleClick = (option) => {
        setSelectedOption(option);
    };

    // 확인 버튼 클릭 시 모달 닫기
    const handleConfirmClick = () => {
        // console.log('옵션:', selectedOption); // 선택된 옵션 처리 (예: API 호출 또는 상태 업데이트)
        dispatch(setModalType('printing')); // 모달 닫기
    };

    return (
        <div className="payment_wrap">
            <div className="payment">
                <section className="modal_wrap">
                    <div className="h2_wrap">
                        <h2>선택해주세요.</h2>
                    </div>
                    <div className="select_wrap">
                        <div className="here" onClick={() => handleClick('here')}>
                            <div className="icon"></div>
                            <p>매장식사</p>
                            {selectedOption === 'here' && <span className="check">✔</span>}
                        </div>
                        <div className="takeout" onClick={() => handleClick('takeout')}>
                            <div className="icon"></div>
                            <p>포장주문</p>
                            {selectedOption === 'takeout' && <span className="check">✔</span>}
                        </div>
                    </div>
                    <div className="btn_wrap">
                        <button
                            className={selectedOption ? 'active' : 'disabled'}
                            disabled={!selectedOption}
                            onClick={handleConfirmClick}
                        >
                            확인
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Modal_choose;
