import { combineReducers } from 'redux';
import { HIDE_INITIALSCREEN, SELECT_MENU_ITEM, ADD_SELECTED_ITEM, REMOVE_SELECTED_ITEM, SET_MODAL_TYPE, SELECT_PRINTING, SET_ORDER_NUMBER, RESET_ALL} from '../actions';

// 초기 화면 리듀서
const initialScreenReducer = (state = true, action) => {
    switch (action.type) {
        case HIDE_INITIALSCREEN:
            return false;
        case RESET_ALL:
            return true;
        default:
            return state;
    }
};

// 메뉴 항목 리듀서
const menuReducer = (state = '추천메뉴', action) => {
    switch (action.type) {
        case SELECT_MENU_ITEM:
            return action.payload;
        case RESET_ALL:
            return '추천메뉴';
        default:
            return state;
    }
};

// 메뉴 추가, 삭제 리듀서
const selectedItemReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_SELECTED_ITEM:
            return [...state, action.payload];
        case REMOVE_SELECTED_ITEM:
            return state.filter((_, index) => index !== action.payload); // 인덱스에 해당하는 햄버거 제거
        case RESET_ALL:
            return [];
        default:
            return state;
    }
};

// 모달 띄우기 리듀서
const modalReducer = (state = null, action) => {
    switch (action.type) {
        case SET_MODAL_TYPE:
            return action.payload; // 모달 타입 설정 ('choose', 'payment') 또는 null로 닫기
        case RESET_ALL:
            return null;
        default:
            return state;
    }
};

//  영수증 주문번호표 리듀서

const pritingReducer = (state = null, action) => {
    switch (action.type) {
        case SELECT_PRINTING:
            return action.payload;
        case RESET_ALL:
            return null;
        default:
            return state;
    }
};

// 주문번호 저장 리듀서

// 주문번호 리듀서 추가
const orderNumberReducer = (state = 1, action) => {
    switch (action.type) {
        case SET_ORDER_NUMBER:
            return state + 1; // 이전 값에서 1을 증가
        default:
            return state;
    }
};



// 리듀서를 결합
const rootReducer = combineReducers({
    showInitialscreen: initialScreenReducer,
    selectedMenuItem: menuReducer,
    selectedItem: selectedItemReducer,
    modalType: modalReducer,
    selectedPrinting : pritingReducer,
    orderNumber: orderNumberReducer,
});

export default rootReducer;
