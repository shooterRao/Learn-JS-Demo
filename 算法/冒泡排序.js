
	var arr = [7,4,6,2,8,5];
	console.log(arr);
	//var temp;
	for(var i=0;i<arr.length;i++){
      for(var j=0;j<arr.length - i;j++){
      	if (arr[j]>arr[j+1]) {
            //  temp = arr[j];
            //  arr[j] = arr[j+1];
			//  arr[j+1] = temp; 
			//ES6
			[arr[j],arr[j+1]] = [arr[j+1],arr[j]];
      	}
      	
      	}  
      }
	  console.log(...arr);  
	  
	
