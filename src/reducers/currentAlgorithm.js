import { SET_CURRENT_ALGORITHM } from '../actions/algorithm'

export default function currentAlgorithm(state = {}, actions) {
    switch (actions.type) {
        case SET_CURRENT_ALGORITHM:
            return actions.currentAlgorithm
        default:
            return state
    }
}