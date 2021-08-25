import { createStore } from 'redux'
import userReducer from './UserReducer';

const store = createStore(userReducer)

export default store