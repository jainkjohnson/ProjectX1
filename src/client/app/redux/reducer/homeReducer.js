const ADD_CLICK = 'ADD_CLICK';

export function onAddClick(state = false, action = {}) {
    switch(action.type) {
        case 'ADD_CLICK':
            return action.value;
        default:
            return state;
    }

}

export function addClick(value) {
    return {
        type: ADD_CLICK,
        value
    }
}