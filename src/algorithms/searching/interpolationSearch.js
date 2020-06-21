export let getAnimatedListOfVisitedElementsIS = []

function interpolationSearch(element, array) {
    let low = 0
    let high = array.length - 1
    getAnimatedListOfVisitedElementsIS=[]

    while (low <= high && element >= array[low] && element <= array[high]) {
        if (low === high) {
            if (array[low] == element) {
                return low
            }
            return -1
        }

        let position = low + parseInt(((parseFloat(high - low) / (array[high] - array[low])) * (element - array[low])))
        getAnimatedListOfVisitedElementsIS.push([position])
        if (array[position] == element) {
            return position
        }

        if (element > array[position]) {
            low = position + 1
        }
        else {
            high = position - 1
        }
    }
    return -1

}

export default interpolationSearch