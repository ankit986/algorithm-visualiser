export const IS_RUNNING = 'IS_RUNNING';

export function isRunning(isRunning){
    return{ 
        type:IS_RUNNING,
        isRunning
    }
}