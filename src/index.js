import React from 'react'
import ReactDom from 'react-dom'
import App from './App.jsx'
import './styles/index.sass'
import {Provider} from 'react-redux'
import store from '../src/store/index'

ReactDom.render(<Provider store={store}><App/></Provider> , document.getElementById('app'))

