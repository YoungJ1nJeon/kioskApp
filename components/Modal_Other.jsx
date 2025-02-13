import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModalType } from '../actions';
import { selectPrinting, resetAll, setOrderNumber  } from '../actions'; // 액션 생성자 이름 변경
import { formatCurrency, formatThreeDigit, formatRounding } from './utils/utils';

const Modal_Other = () => {
    const dispatch = useDispatch();
    const modalType = useSelector((state) => state.modalType);
    const randomNumber = useSelector((state) => state.orderNumber);
    const [selectedOption, setSelectedOption] = useState(null); // 선택된 옵션 상태
    const selectedBurgerMenu = useSelector((state) => state.selectedItem);
    const totalAmount = selectedBurgerMenu.reduce((total, burger) => total + burger.price, 0);
    const printingOption = useSelector((state) => state.selectedPrinting);
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 9);
    const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");
    const [countdown, setCountdown] = useState(3);

    //console.log('결제방식',selectedOption);
    const handleClickCancel = () => {
        dispatch(setModalType(null));
    }

    const handleClick = (option) => {
        setSelectedOption(option);
    };

    const handleConfirmClick = () => {
        dispatch(setModalType('printing')); // 모달 닫기
    };

    const handleClickReceipt = () => {
        dispatch(setModalType('method'));
        dispatch(selectPrinting('영수증')); // 수정된 액션 생성자 사용
    }

    const handleClickNumber = () => {
        dispatch(setModalType('method'));
        dispatch(selectPrinting('주문번호')); // 수정된 액션 생성자 사용
    }

    const handleClickCard = () => {
        dispatch(setModalType('cardpayment'));
    }

    const handleClickQr = () => {
        dispatch(setModalType('qrpayment'));
    }

    const handleClickReset = () => {
        dispatch(resetAll());
        dispatch(setOrderNumber());
    }

    // 'choose' 모달
    const ChooseModal = () => (
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

    // 'printing' 모달
    const PrintingModal = () => (
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

    // 'method' 모달
    const MethodModal = () => (
        <div className="method_wrap">
            <div className="method">
            <section className="modal_wrap">
            <div className="h2_wrap">
                <h2><span>결제수단을</span><br />선택해주세요.</h2>
            </div>
            <div className="select_wrap">
                <div className="card" onClick={handleClickCard}>
                    <div className="img"></div>
                    <p>신용카드</p>
                    </div>
                <div className="payco" onClick={handleClickQr}>
                    <div className="img"></div>
                    <p>페이코</p>
                </div>
                <div className="kakao" onClick={handleClickQr}>
                    <div className="img"></div>
                    <p>카카오페이</p>
                </div>
            </div>
            <div className="price_wrap">
                <div className="price">
                    <p className="total">총 결제금액</p>
                    <p className="total_price">{formatCurrency(totalAmount)}원</p>
                </div>
                <div className="btn_wrap">
                    <button onClick={handleClickCancel}>결제취소</button>
                </div>
            </div>
            </section>
            </div>
        </div>
    );

    const cardPaymentModal = () => (
        <div className="cardpayment_wrap">
            <div className="cardpayment">
                <section className="modal_wrap">
                    <div className="h2_wrap">
                        <h2><span>신용카드를</span><br />투입구에꽂아주세요</h2>
                        <p>결제 오류 시 마그네틱을 아래로 향하게 긁어주세요</p>
                        <p className="notif">{`${countdown}초후 자동 결제됩니다.`}</p>
                    </div>
                    <div className="select_wrap">
                        <div className="credit_img"></div>
                    </div>
                    <div className="price_wrap">
                        <div className="price">
                        <p className="total">총 결제금액</p>
                        <p className="total_price">{formatCurrency(totalAmount)}원</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );

    const qrPaymentModal = () => (
        <div className="qrpayment_wrap">
            <div className="qrpayment">
                <section className="modal_wrap">
                    <div className="h2_wrap">
                        <h2><span>QR코드(바코드)를</span><br /> 아래 스캐너에 읽혀주세요.</h2>
                        <p className="notif">{`${countdown}초후 자동 결제됩니다.`}</p>
                    </div>
                    <div className="select_wrap">
                        <div className="credit_img"></div>
                    </div>
                    <div className="price_wrap">
                        <div className="price">
                        <p className="total">총 결제금액</p>
                        <p className="total_price">{formatCurrency(totalAmount)}원</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );

    const completedModal = () => (
        <div className="completed_wrap">
            <div className="completed">
                <section className="modal_wrap">
                        <h2>주문이 완료되었습니다!</h2>
                        <p className="instructions_number">주문번호<br/><span className="number">{formatThreeDigit(randomNumber).toString()}</span></p>
                        <p className="instructions">출력된 {printingOption === '영수증' && (<span>영수증을</span>)}{printingOption === '주문번호' && (<span>주문번호표를</span>)} 받아가세요!</p>
                        <div className="printImg"></div>
                </section>
            </div>
        </div>
    );

    const receiptModal = () => (
        <div className="receipt_wrap">
            <div className="receipt">
                <button className="close_btn" onClick={handleClickReset}></button>
                <div className="top">
                    <p>[주문서] 버그킹 안산점(S)</p>
                </div>
                <div className="num">
                    <p>주문번호 : {formatThreeDigit(randomNumber).toString()}</p>
                </div>
                <div className="address">
                    <p>결제일시: {formattedDate}</p>
                    <p>매장주소 : 경기도 안산시</p>
                    <p>사업자번호 : 123-45-67890 대표 : 홍길동 </p>
                </div>
                <div className="tel">
                    <p>* 매장 : 012-345-6789</p>
                    <p>* 본사담당 : 010-1234-5678</p>
                    <p>* 고객센터문의 : 080-1234-4321( 09:00~18:00 ) </p>
                </div>
                <div className="list">
                    <ul>
                        {selectedBurgerMenu.map((burger, index) => (
                            <li key={index}>
                                <p className="name">* {burger.name}</p>
                                <p className="price">
                                    {formatCurrency(burger.price)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="cost">
                    <p><span className="amount">전체금액</span><span className="amount_won">{formatCurrency(totalAmount)}</span></p>
                    <p><span className="amount">물품가액</span><span className="amount_won">{formatCurrency(formatRounding(totalAmount-totalAmount/11))}</span></p>
                    <p><span className="amount">부가세액</span><span className="amount_won">{formatCurrency(formatRounding(totalAmount/11))}</span></p>  
                    <p><span className="amount">합계</span><span className="amount_won">{formatCurrency(totalAmount)}</span></p>
                </div>
                <div className="manager">
                    <p>담당자 : 홍길동</p>
                </div>
                <div className="toilet">
                    <p>화장실 1212*</p>
                </div>
                <div className="event">
                    <p>■ http://kor.bugking.com</p>
                    <p>▶ 설문 안료 하시면 버거단품<br/>&nbsp;&nbsp;&nbsp;&nbsp;구입시 세트로 무료 업그레이드 해드립니다.</p>
                    <p>▶ 설문조사 코드 : 123-45-678-901</p>
                    <p>▶ 완료 후 발급되는 코드를 적어주세요.</p>
                    <p className="code">□□□□□□□□</p>
                    <p>▶ 구입 매장에서만 영수증 제출 후 사용가능</p>
                    <p>▶ 코드 1개당 세트 업그레이드 1개만 적용가능</p>
                    <p>▶ 행사메뉴 및 딜리버리 주문시 사용 불가</p>
                    <p>▶ 사용 가능 기간 : 주문 후 2주</p>
                </div>
                <span className="barcode"></span>
            </div>
        </div>
    )

    const orderNumberModal = () => (
        <div className="orderNumber_wrap">
            <div className="orderNumber">
                <button className="close_btn" onClick={handleClickReset}></button>
                <div className="top">
                    <p>[주문서] 버그킹 안산점(S)</p>
                </div>
                <div className="num">
                    <p>주문번호 : {formatThreeDigit(randomNumber).toString()}</p>
                </div>
                <div className="address">
                    <p>결제일시: {formattedDate}</p>
                    <p>매장주소 : 경기도 안산시</p>
                    <p>사업자번호 : 123-45-67890 대표 : 홍길동 </p>
                </div>
                <div className="tel">
                    <p>* 매장 : 012-345-6789</p>
                    <p>* 본사담당 : 010-1234-5678</p>
                    <p>* 고객센터문의 : 080-1234-4321( 09:00~18:00 ) </p>
                </div>
                <div className="list">
                    <ul>
                        {selectedBurgerMenu.map((burger, index) => (
                            <li key={index}>
                                <p className="name">* {burger.name}</p>
                                <p className="price">
                                    {formatCurrency(burger.price)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
                <span className="barcode"></span>
            </div>
        </div>
    );

    // 3초 후에 completedModal로 변경
    useEffect(() => {
        switch (modalType) {
            case 'cardpayment':
            case 'qrpayment':
                const timer1 = setTimeout(() => {
                    dispatch(setModalType('completed')); // 'completed' 상태 변경
                }, 3000); // 3초 후에 completedModal로 변경
    
                return () => clearTimeout(timer1); // 클린업
            case 'completed':
                const timer2 = setTimeout(() => {
                    if (printingOption === '영수증') {
                        dispatch(setModalType('receipt')); 
                    } else if (printingOption === '주문번호') {
                        dispatch(setModalType('orderNumber'));
                    } // 'completed' 상태 변경
                }, 3000); // 3초 후에 completedModal로 변경

                setCountdown(3);
    
                return () => clearTimeout(timer2); // 클린업
            default:
                break;
        }
    }, [modalType]);

    useEffect(() => {
        
        let timer;
        // 카운트다운이 0초까지 진행되도록 1초마다 카운트다운을 업데이트
        if (modalType === 'qrpayment' || modalType === 'cardpayment' && countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1); // 1초마다 감소
                //console.log(countdown)
            }, 1000); // 1초 간격

        } else if (countdown === 0) {
            // 카운트다운이 0이 되면 자동으로 'completed' 상태로 전환
            dispatch(setModalType('completed'));
        }

        return () => clearInterval(timer); // 클린업
    }, [modalType, countdown, dispatch]); // 카운트다운과 modalType 변경 시마다 실행

    switch (modalType) {
        case 'choose':
        return ChooseModal();
        case 'printing':
        return PrintingModal();
        case 'method':
        return MethodModal();
        case 'cardpayment':
        return cardPaymentModal();
        case 'qrpayment':
        return qrPaymentModal();
        case 'completed':
        return completedModal();
        case 'orderNumber':
        return orderNumberModal();
        case 'receipt':
        return receiptModal();
        default:
        return null;
    }
};

export default Modal_Other;
