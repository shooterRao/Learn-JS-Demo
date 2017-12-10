
      // var i,j,s=0,m=0;
      // for(i=1;i<100;i++){
      // 	for(j=2;j<=Math.sqrt(i);j++){
      // 		m=0;
      // 		if(i%j==0){
      // 			m=1;
      // 			break;
      // 		}
      // 	}
      // 	if(m==0 && i>1){
      //       s++;
      // 		console.log(i);
      // 		console.log(s);
      // 	}
      // }
	// 方法一
	// 思路，对正整数，如果用2到Math.sqrt(n)之间的所有整数去除，均无法整除，则n为质数
	function isPrime(element) {
		var start = 2;
		while(start <= Math.sqrt(element)) {
			if(element % start++ < 1 ) {
				return false;
			}
		}
		// 2，3为true
		return element > 1;
	}
	// 方法二
	function isPrimeq(n) {
		// 先排除2和3
		if(n <= 3) {
			return n > 1;
		}
		// 排除因数包含2和3的数
		if( n % 2 == 0 || n % 3 == 0) {
			return false;
		}
		for( var i = 5; i * i <= n; i += 6 ) {
			if(n % i == 0 || n % ( i + 2 ) == 0) {
				return false;
			}
		}
		return true;
	}
