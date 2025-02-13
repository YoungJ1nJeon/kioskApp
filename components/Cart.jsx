import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from './utils/utils';
import { removeSelectedItem, setModalType, resetAll } from '../actions';
import Modal_Other from './Modal_Other'; // 통합된 모달 컴포넌트 import

const Cart = () => {
  const dispatch = useDispatch();
  const selectedBurgerMenu = useSelector((state) => state.selectedItem);
  const modalType = useSelector((state) => state.modalType); // Redux에서 modalType 가져오기

  const totalAmount = selectedBurgerMenu.reduce((total, burger) => total + burger.price, 0);
  const isCartEmpty = selectedBurgerMenu.length === 0;

  const handleDelete = (index) => {
    dispatch(removeSelectedItem(index)); // 선택된 메뉴의 인덱스 전달
  };

  const handlePayment = () => {
    dispatch(setModalType('choose')); // 'choose' 모달 열기
  };

  const handleClickCancel = () => {
    dispatch(resetAll());
  }

  return (
    <>
      <section className="cart_tabs">
        <article className="cart_wrap">
          <div className="d1">
            <p className="cart">
              카트 <span>{selectedBurgerMenu.length}</span>
            </p>
            <p className="price">
              총 주문금액 <span>{formatCurrency(totalAmount)}</span> 원
            </p>
          </div>
          <div className="d2">
            {isCartEmpty ? (
              <p className="empty">카트에 담긴 상품이 없습니다.</p>
            ) : (
              <div className="menuList">
                <ul>
                  {selectedBurgerMenu.map((burger, index) => (
                    <li key={index}>
                      <button
                        className="delete_btn"
                        onClick={() => handleDelete(index)}
                      ></button>
                      <p className="b_name">{burger.name}</p>
                      <p className="b_price">
                        {formatCurrency(burger.price)} 원
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="d3">
            <button
              className={`btn_1 ${isCartEmpty ? 'disabled' : ''}`}
              disabled={isCartEmpty}
              onClick={handleClickCancel}
            >
              취소
            </button>
            <button
              className={`btn_2 ${isCartEmpty ? 'disabled' : ''}`}
              disabled={isCartEmpty}
              onClick={handlePayment}
            >
              결제하기
            </button>
          </div>
        </article>
      </section>

      {/* Modal 컴포넌트 사용 */}
      <Modal_Other />
    </>
  );
};

export default Cart;
