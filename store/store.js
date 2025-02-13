import { createStore } from 'redux';
import rootReducer from './reducers';  // 결합된 리듀서 import

// 스토어 생성
const store = createStore(rootReducer);

export default store;
