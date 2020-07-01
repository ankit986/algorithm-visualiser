export let getAnimationOfBubbleSort = []

 export function doBubbleSort(array) {
   let i = 0;
//    let j = 0;
   while(i<=array.length-1){
       for(let j = 0; j<=array.length-i-1;j++){
        getAnimationOfBubbleSort.push([i,j])
        getAnimationOfBubbleSort.push([i,j])
        
        if(array[j]<array[j+1]){
            let temp = array[i];
            array[i] = array[j];
            array[j]= temp

            // getAnimationOfBubbleSort.push(-1)
            getAnimationOfBubbleSort.push([-1,i,array[i]])
            getAnimationOfBubbleSort.push([-1,j,array[j]])
    
           }
       }
       i++;
   }
}
 