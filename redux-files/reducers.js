const counter = (state = 0,action) => {
    switch (action.type) {
        case 'INCREMEMT':
            return state+1
        case 'DECREMENT':
            return state-1
    }
}

export {
    counter
}