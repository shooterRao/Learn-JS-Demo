
/* 

Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].

*/

var twoSum = function(nums, target) {
    var arr = [];
    if( is('Array',nums) && is('Number',target) ) {
        for(var i = 0; i< nums.length; i++ ) {
            for(var j = i+1; j< nums.length; j++) {
                if( nums[i]+nums[j] == target ) {
                     arr.push(i,j);
        
                     // return arr;
                }
            }
        }
        return arr  
    }else {
        return ;
    }
};

var is = function(type,obj) {
   var clas = Object.prototype.toString.call(obj).slice(8,-1);
   return obj != undefined && obj != null && clas == type;
}

console.log(twoSum([2,7,11,15],9));
