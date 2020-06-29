export let getAnimatedListOfVisitedElementsLS = []

function linearSearch(element, array){
    getAnimatedListOfVisitedElementsLS = []
   for (let i = 0;i<array.length;i++){
    //    console.log(array[i])
       getAnimatedListOfVisitedElementsLS.push([i])
       if(element == array[i]){
           console.log(element,i);
           return i
       }
   }
    return -1
}

export default linearSearch