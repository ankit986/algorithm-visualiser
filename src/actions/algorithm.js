export const SET_CURRENT_ALGORITHM = 'SET_CURRENT_ALGORITHM';

export  function setCurrentAlgorithm(currentAlgorithm){
    return{ 
        type:SET_CURRENT_ALGORITHM,
        currentAlgorithm
    }
}