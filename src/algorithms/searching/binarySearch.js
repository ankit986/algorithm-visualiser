export let getAnimatedListOfVisitedElements = []

// const  binarySearch = (element, array, startIndex, endIndex) => {
//     if (startIndex > endIndex)
//         return 'NO'

//     let midIndex = Math.floor((startIndex + endIndex) / 2)
//     console.log(startIndex, midIndex, endIndex, element, array[midIndex])
//     if (element === array[midIndex]) {
//         getAnimatedListOfVisitedElements.push([startIndex, midIndex, endIndex])

//         console.log('===')
//         return midIndex
//     }

//     else if (element < array[midIndex]) {
//         getAnimatedListOfVisitedElements.push([startIndex, midIndex, endIndex])

//         console.log('<')

//         binarySearch(element, array, startIndex, midIndex-1)
//     }
//     else {

//         console.log('>')
//         getAnimatedListOfVisitedElements.push([startIndex, midIndex, endIndex])

//         binarySearch(element, array, midIndex+1, endIndex)
//     }

// }
function binarySearch(element, array){
    getAnimatedListOfVisitedElements = []
    let startIndex  = 0
    let endIndex = array.length-1
    
    let a = []
    while (startIndex <= endIndex) {
        let midIndex = Math.floor((startIndex + endIndex) / 2)
        console.log(startIndex, midIndex, endIndex, element, array[midIndex])
    
        if (element == array[midIndex]) {
            getAnimatedListOfVisitedElements.push([startIndex, midIndex, endIndex])
            console.log('===', midIndex)
            a.push(midIndex)
            return parseInt(midIndex)
        }

        if (element < array[midIndex]) {
            getAnimatedListOfVisitedElements.push([startIndex, midIndex, endIndex])

            console.log('<')
            endIndex = midIndex - 1
        }
        else {
            console.log('>')
            getAnimatedListOfVisitedElements.push([startIndex, midIndex, endIndex])
            startIndex = midIndex + 1
        }
    }
}

export default binarySearch