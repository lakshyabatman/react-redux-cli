var reduxSnippet = `
import {increment} from './store/actions.js'
import {decrement} from './store/reducers.js'
let store = createStore(counter)
store.subscribe(()=>console.log(store.getState()))
// Test dispatch
stpre.dispatch(increment())
`
module.exports = {
    reduxSnippet
}