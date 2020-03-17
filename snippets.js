var reduxSnippet = `
import {createStore} from 'redux'

import {increment} from './store/actions.js'
import {counter} from './store/reducers.js'
let store = createStore(counter)
store.subscribe(()=>console.log(store.getState()))
// Test dispatch
store.dispatch(increment())
`
module.exports = {
    reduxSnippet
}