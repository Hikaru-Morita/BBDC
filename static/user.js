"use strict";

function judgePrimeNumber(n) {
    if (n === 2) return true;
    for (let i = 2; i < n; i++) {
        if (n % i === 0) return false;
    }
    return true;
};

function showAllCurrentFunc(n, func) {
    var count = 0;
    for (let i = 1; i < n; i++) {
        setTimeout(judgePrimeNumber(i),1000);
        if(judgePrimeNumber(i)){
            count++;
        }
    }
    return count;
};

var xhrGet = new XMLHttpRequest();
var xhrPost = new XMLHttpRequest();
var id;
var target;

xhrGet.onload = function(){
    var response = JSON.parse(xhrGet.response);
    target = response["target"];
    id = response['taskID'];
}

var end = function(){
    let contents = document.getElementsByClassName('contents');
    for(var i = 1; i < contents.length; i++) {
        contents[i].style.display = "none";
    }
    contents[0].innerText = "モグちゃんが宝を見つけました!";
    setTimeout("location.href='/user-waiting'",3000);
}

var notReady = function(){
    let contents = document.getElementsByClassName('contents');
    for(var i = 1; i < contents.length; i++) {
        contents[i].style.display = "none";
    }
    contents[0].innerText = "モグちゃんの準備が整っていないようです...";
    setTimeout("location.href='./user-waiting'",3000);
}

var dig = function(){
    xhrGet.open('GET', 'make-task', false);
    xhrGet.send(null);
    console.log('id = ' + id );
    if (id == "0"){
        end();
        return;
    }
    else if(id == -1){
        notReady();
        return;
    }
    console.log('JS, target =' +  target)
    document.getElementById("num").innerText = target;
    var result = primeFactorization(target)
    document.getElementById("result").innerText = result;
    xhrPost.open('POST', 'complete-task', false);
    xhrPost.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhrPost.send('taskID=' + id + '&' + 'result=' + result + '&' + 'target=' + target);
    setTimeout(dig, 0);
}

setTimeout(dig, 500);

/*
	引数:n-素因数分解する整数
	値:nの素因数分解（{num:素因数, r:指数}を持つオブジェクト配列）
*/
var primeFactorization = function (n) {

	// 平方根を保存
	var s = Math.floor(Math.sqrt(n));

	var r = 0;

	var result = Array();

	// 2から平方根までの素因数を求める
	for (var i = 2;i <= s;i++) {

		if ((n % i) == 0) {

			r = 0; // 指数カウンタクリア

			do {

				r++; // 指数カウンタプラス

				n = n / i;

			} while ((n % i) == 0);

			// 素因数iを指数とともに保存
			result.push({num:i, r:r});

		}

	}

	// 残った素数を追加
	if (n > s) {
		result.push({num:n, r:1});
	}

    // return result;
    console.log(result);
    var s = '';
    for (var i = 0;i < result.length;i++) {

		if (i > 0) {
			s += '*';
		}

		s += result[i].num + '^' + result[i].r;
    }
    console.log(s);
    return s;
}
