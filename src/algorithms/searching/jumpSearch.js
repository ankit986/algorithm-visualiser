export let getAnimatedListOfVisitedElementsJS = []

function jumpSearch(element, array){
    getAnimatedListOfVisitedElementsJS = []
    const n = array.length
    let step =Math.floor( Math.sqrt(n))

    let prev = 0
    getAnimatedListOfVisitedElementsJS.push([prev])

    while(array[parseInt(Math.min(step,n) - 1)] < element){
        prev = step
        step += Math.floor( Math.sqrt(n))
        if(prev >= n){
            return -1
        }
        // console.log('prev step ',prev, step)
        getAnimatedListOfVisitedElementsJS.push([prev])
    }
    if(array[parseInt(prev)] != element){
        prev = step
        console.log('inside js prev ', prev,n)
        if(prev>=n)
            prev = n-1 
        
        getAnimatedListOfVisitedElementsJS.push([prev])

    }

    while(array[parseInt(prev)]>element){
        prev--
        // console.log('prev = ',prev)
        getAnimatedListOfVisitedElementsJS.push([prev])

        if(prev === Math.min(step,n))
            return -1
    }

    if(array[parseInt(prev)] == element){
        return prev
    }

    return -1
    

}

export default jumpSearch