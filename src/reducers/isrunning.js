import { IS_RUNNING } from '../actions/running'

export default function isRunning(state = {}, actions) {
    switch (actions.type) {
        case IS_RUNNING:
            return actions.isRunning
        default:
            return state
    }
}