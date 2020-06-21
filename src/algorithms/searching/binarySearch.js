export let getAnimatedListOfVisitedElementsBS = []

function binarySearch(element, array){
    getAnimatedListOfVisitedElementsBS = []
    let startIndex  = 0
    let endIndex = array.length-1
    
    let a = []
    while (startIndex <= endIndex) {
        let midIndex = Math.floor((startIndex + endIndex) / 2)
        // console.log(startIndex, midIndex, endIndex, element, array[midIndex])
    
        if (element == array[midIndex]) {
            getAnimatedListOfVisitedElementsBS.push([startIndex, midIndex, endIndex])
            // console.log('===', midIndex)
            a.push(midIndex)
            return parseInt(midIndex)
        }

        if (element < array[midIndex]) {
            getAnimatedListOfVisitedElementsBS.push([startIndex, midIndex, endIndex])

            // console.log('<')
            endIndex = midIndex - 1
        }
        else {
            // console.log('>')
            getAnimatedListOfVisitedElementsBS.push([startIndex, midIndex, endIndex])
            startIndex = midIndex + 1
        }
    }
}

export default binarySearch