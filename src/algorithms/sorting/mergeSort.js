export let getAnimationOfMergeSort = []

export function mergerSorter(array){
    // let auxilarryArray = []
    const auxilarryArray = array.slice();
    mergeSort(array, 0 , array.length-1, auxilarryArray)
    return auxilarryArray
}
export function mergeSort(array, startIndex = 0, endIndex = array.length - 1, auxilarryArray ) {
    if (startIndex === endIndex) {
        return 
    }
    let midIndex = Math.floor((startIndex + endIndex) / 2)
    mergeSort(array, startIndex, midIndex,auxilarryArray)
    mergeSort(array, midIndex + 1, endIndex, auxilarryArray)
    doMerge(array, startIndex, midIndex, endIndex, auxilarryArray)
}

function doMerge(array, startIndex, midIndex, endIndex, auxilarryArray) {

    let i = startIndex;
    let k = startIndex;
    let j = midIndex + 1;

    while (i <= midIndex && j <= endIndex) {
        console.log('i,j ', i, j)

        getAnimationOfMergeSort.push([i, j])
        getAnimationOfMergeSort.push([i, j])
        if (array[i] < array[j]) {
            getAnimationOfMergeSort.push([k, array[i]])

            auxilarryArray[k] = array[i]
            i++;
            k++;
        }
        else{
            getAnimationOfMergeSort.push([k, array[j]])

            auxilarryArray[k] = array[j]

            j++;
            k++;
        }
    }
    while(i<= midIndex){
        console.log('mi i,j ', i, j)

        getAnimationOfMergeSort.push([i, i])
        getAnimationOfMergeSort.push([i, i])

        getAnimationOfMergeSort.push([k, array[i]])

            auxilarryArray[k] = array[i]
            k++;
            i++;
    }
    while(j<= endIndex){
        console.log('i,j ', i, j)

        getAnimationOfMergeSort.push([j, j])
        getAnimationOfMergeSort.push([j, j])

        getAnimationOfMergeSort.push([k, array[j]])

        auxilarryArray[k] = array[j]
        k++;
        j++;
    }
    for (let a = startIndex; a<=endIndex; a++){
        array[a] = auxilarryArray[a]
    }
    return auxilarryArray
}