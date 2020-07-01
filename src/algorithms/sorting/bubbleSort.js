export let getAnimationOfBubbleSort = []

 export function doBubbleSort(array) {
   
    getAnimationOfBubbleSort = []
    let i = 0;

//    let j = 0;
while(i<=array.length-1){
    for(let j = 0; j<=array.length-i-1;j++){
     getAnimationOfBubbleSort.push([j])
     getAnimationOfBubbleSort.push([j])
     
     if(array[j]>array[j+1]){
        //  let temp = array[i];
        //  array[i] = array[j];
        //  array[j]= temp

         let temp = array[j]; 
         array[j] = array[j+1]; 
         array[j+1] = temp; 
         // getAnimationOfBubbleSort.push(-1)
         getAnimationOfBubbleSort.push([-1,j,array[j]])
         getAnimationOfBubbleSort.push([-1,j+1,array[j+1]])
 
        }
    }
    i++;
}
}
