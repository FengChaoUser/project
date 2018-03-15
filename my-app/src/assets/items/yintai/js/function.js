
/*兼容性*/
/*
	getClass(className)
	获取指定的类名
	className  指定的类名
	range 指定的范围
	如果传入范围，就是指定的范围
	如果不传入范围，就是document
*/

function getClass(className,range){
	// 设置范围
	var range=range?range:document;
	// 判断浏览器
	if(document.getElementsByClassName){
		// w3c
		return range.getElementsByClassName(className);
	}else{
		// ie6~8
		// arr 保存指定的className对象
		// 获取所有的元素
		var all=range.getElementsByTagName("*");
		// 挑选指定的元素
		var arr=[];
		for(var i=0;i<all.length;i++){
			// 函数：判断当前元素的className是否包含指定的className
			if(checkClass(all[i].className,className)){
				arr.push(all[i]);
			}
		}
		// 挑选完毕,将数组输出
		return arr;
	}
}
function checkClass(obj,className){
	// 检查obj里面是否包含className
	// obj one two
	// className  "one"
	var arr=obj.split(" ");
	for(var i=0;i<arr.length;i++){
		if(arr[i]==className){
			return true;
		}
	}
	return false;
}


/* 
	getContent(obj,[val])
	获取或者设置对象的文本
	obj 指定的对象
	val 要设置的内容
*/
function getContent(obj,val){
	if(obj.innerText){
		if(val==undefined){
			return obj.innerText;
		}else{
			obj.innerText=val;
		}
	}else{
		if(val==undefined){
			return obj.textContent;
		}else{
			obj.textContent=val;
		}
	}
}


/*
	getStyle(obj,attr)
	获取指定元素的样式
	obj 指定的元素
	attr 指定的样式
*/
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,null)[attr];
	}
}



/*
	$("")
	.one 获取类名
	#one 获取id
	div 获取标签
*/


function $(selecter,ranges){
	if (typeof selecter=='string') {
		var ranges=ranges?ranges:document;
		if(selecter.charAt(0)=="."){
			return getClass(selecter.slice(1),ranges);
		}else if(selecter.charAt(0)=="#"){
			return document.getElementById(selecter.slice(1));
		}else if(/^[a-z][a-z1-6]{0,10}$/.test(selecter)){
			return ranges.getElementsByTagName(selecter);
		}else if(/^<[a-z][a-z1-6]{0,10}>$/.test(selecter)){
			return document.createElement(selecter.slice(1,-1));
		}
	} else if(typeof selecter=='function'){
		addEvent(window,'load',selecter)
	}
}

function getChilds(obj,type){
    var objs=obj.childNodes
    var newArr=[]
    var type=type?type:false;
      	if(type==true){
      		for (var i = 0; i <objs.length; i++) {
      			if(objs[i].nodeType==1||(objs[i].nodeType==3&&!(/^\s+$/.text(objs[i].nodeValue)))){
                    newArr.push(objs[i])
      			}
      		}
      	}
      	if(type==false){
	      	for (var i = 0; i <objs.length; i++) {
	      		if(objs[i].nodeType==1){
	                   newArr.push(objs[i])
	      		}
	      	}
	    }	
	    return newArr;
    }


function firstChild(obj){
      	return getChilds(obj)[0]
    }


function lastChild(obj){
      	var length=getChilds(obj).length;
      	return getChilds(obj)[length-1]
    }

function lastChild(obj,num){
      	var length=getChilds(obj).length;
      	if(num>=length){
      		return error;
      	}
      	return getChilds(obj)[num]
    }




function getNext1(obj){//获得元素节点
	var next=obj.nextSibling;
			if (next==null) {
				return false;
			}
			while(next.nodeType!=1){
				next=next.nextSibling;//更新next
				if (next==null) {
				return false;
				}
			}
			return next;
}
	
function getNext2(obj){//获得元素节点或有意义文本
	var next=obj.nextSibling;
	if (next==null) {
		return false
	}
	while ((next.nodeType==3&&/^\s+$/.test(next.nodeValue))||next.nodeType==8) {
		next=next.nextSibling;
		if (next==null) {
		return false
	}
	} 
	return next;

}

function getNext(obj,type){
	var type=type?type:false;
		if (type==1) {
			return getNext1(obj);
		}
	 if (type==false){
			return getNext2(obj);

			}
		}



function insertAfter(newobj,obj,type){
	var parent=obj.parentNode;//获取父元素
	var type=type?type:false;
	var pos=getNext(obj,type);
	if (!pos) {
		 parent.appendChild(newobj);
	} else{
		parent.insertBefore(newobj,pos);
	}

}
// addEvent(obj,type,fn)
// obj 对象  type 事件类型 fn事件处理程序
//  
function addEvent(obj,type,fn){
	if (obj.attachEvent) {
		obj.attachEvent('on'+type,fn)
	} else{
		obj.addEventListener(type,fn,false)
	};
}
function removeEvent(obj,type,fn){
	if (obj.detachEvent) {
		obj.detachEvent('on'+type,fn)//click--onclick
	} else{
		obj.removeEventListener(type,fn,false)
	};
}



//offset(obj)获取元素到body的实际位置
//返回值result={left:xx,top:xx}
//1.获取具有定位属性的父元素和自己
//2.left=所有父元素的offsetLeft+自己offsetLeft+所有父元素的左边框宽度
function offset(obj){
	var result={left:0,top:0}
	var arr=[];
	arr.push(obj);
	var parent=obj.parentNode;
	while(parent.nodeName!='BODY'){//nodeName返回的就是大写
		if (getStyle(parent,'position')=='relative'||getStyle(parent,'position')=='absolute') {
			arr.push(parent);
		}
		parent=parent.parentNode;
	}
	for (var i = 0; i < arr.length; i++) {
		var leftw=parseInt(getStyle(arr[i],'borderLeftWidth'));
		leftw=leftw?leftw:0;
		var topw=parseInt(getStyle(arr[i],'borderTopWidth'));
		topw=topw?topw:0;
		if(i==0){
			leftw=0;
			topw=0;
		}
		result.left+=arr[i].offsetLeft+leftw;
		result.top+=arr[i].offsetTop+topw;
	}
	return result;
}