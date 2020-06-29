import { isRunning } from "./running";
import { setCurrentAlgorithm } from "./algorithm";

export default function handleInitialData() {
    return (dispatch) => {
        // dispatch(showLoading())
        // return getInitialData()
        //     .then(({ users, tweets }) => {
        dispatch(isRunning({isRunning:false}));
        dispatch(setCurrentAlgorithm({currentAlgorithm:''}));
        // })
    }
}