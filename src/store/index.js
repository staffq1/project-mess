import {createStore} from 'redux'
import { redusers } from './reducers' 

const store = createStore(redusers)
export default store