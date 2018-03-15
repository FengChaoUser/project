$(function(){
	// body第一行微博手机显示隐藏
	var weibo=$(".body1left2")[0];
	var weibo1=$(".one")[0];
	var weibo2=$(".one2")[0];
	var shoujiyintai=$(".body1left4")[0];
	var shoujiyintai1=$(".two9")[0];
	var shoujiyintai2=$(".two2")[0];
	var shoujiyintai3=$(".body1left6")[1];
	var wodeyintai=$(".wdyt1")[0];
	var wodeyintai1=$(".wdyt3")[0];
	weibo1.onmouseover=weibo.onmouseover=function(){
		weibo1.style.display="block";
	}
	weibo1.onmouseout=weibo.onmouseout=function(){
		weibo1.style.display="none";
	}
	shoujiyintai1.onmouseover=shoujiyintai.onmouseover=function(){
		shoujiyintai1.style.display="block";
		shoujiyintai3.style.backgroundPosition="0 -20px"
	}
	shoujiyintai1.onmouseout=shoujiyintai.onmouseout=function(){
		shoujiyintai1.style.display="none";
		shoujiyintai3.style.backgroundPosition="0 1px"
	}
	wodeyintai1.onmouseover=wodeyintai.onmouseover=function(){
		wodeyintai1.style.display="block";
	}
	wodeyintai1.onmouseout=wodeyintai.onmouseout=function(){
		wodeyintai1.style.display="none";
	}
//************************ 轮播图*******************
	var lunbo=$(".four2");
	var nb=$(".nb");
	var anniu=$(".anniu1");
	var box=$(".four1")[0];
	var num=0;
	 	lunbo[0].style.zIndex=1;
	 	anniu[0].style.background="#e5004f";
	var t=setInterval(ytlb,3000);
	function ytlb(){
		num++;
		if(num==nb.length){
			num=0;
		}
		for (var i = 0; i < lunbo.length; i++) {	
			animate(lunbo[i],{opacity:0},1000)
			animate(nb[i],{opacity:0},980)
			anniu[i].style.background="#211616";
		};
		   animate(lunbo[num],{opacity:1},1000)
		   animate(nb[num],{opacity:1},980)
		   anniu[num].style.background="#e5004f";
		}
	for (var i = 0; i < nb.length; i++) {
		anniu[i].index=i;
		anniu[i].onclick=function(){
			for (var i = 0; i < anniu.length; i++) {
				animate(lunbo[i],{opacity:0},1000)
				animate(nb[i],{opacity:0},980)
				anniu[i].style.background="#211616"
			};
			animate(lunbo[this.index],{opacity:1},1000)
			anniu[this.index].style.background="#e5004f";
			animate(nb[this.index],{opacity:1},980)
			num=this.index;
		}
	};
	box.onmouseover=function(){
		clearInterval(t);
	};
	box.onmouseout=function(){
		t=setInterval(ytlb,4000);
	};
//************************ 选项卡************
	var xuanxiangka=$(".xuanxiangka");
	var four_left=$(".four_left1")
for (var i = 0; i < xuanxiangka.length; i++) {
	four_left[i].index=i;
	xuanxiangka[i].index=i;
	xuanxiangka[i].onmouseover=four_left[i].onmouseover=function(){
			xuanxiangka[this.index].style.display="block";
	}
	xuanxiangka[i].onmouseout=four_left[i].onmouseout=function(){
			xuanxiangka[this.index].style.display="none";
	}
}
// *****************第五行bodre下划线5PX定位JS**********
	var five2_1=$(".five2_1");
	var five3=$(".five3");	// 定位下划线
	var five4=$(".five4")
	// console.log(five3)
	for (var i = 0; i < five2_1.length; i++) {
		five2_1[i].index=i;
		five2_1[i].onmouseover=function(){
			for (var i = 0; i < five3.length; i++) {
				five3[i].style.display="none";
				five4[i].style.display="none";
			}
			five3[this.index].style.display="block";
			five4[this.index].style.display="block";
		}
	}
	//动线
	var five4_1=$(".five4_1");
	for(var i=0;i<five4_1.length;i++){
		line(five4_1[i]);
		function line(obj){
			var bw=obj.offsetWidth;
			var bh=obj.offsetHeight;
			var zuo=$(".dxzuo")[i];
			var you=$(".dxyou")[i];
			var shang=$(".dxshang")[i];
			var xia=$(".dxxia")[i];
			obj.onmouseover=function(){
				animate(zuo,{height:bh},500);
				animate(you,{height:bh},500);
				animate(shang,{width:bw},500);
				animate(xia,{width:bw},500);
			}
			obj.onmouseout=function(){
				animate(zuo,{height:0},300);
				animate(you,{height:0},300);
				animate(shang,{width:0},300);
				animate(xia,{width:0},300);
			}
		}
	}
	// *****************第七行右边特效**********
	var qi3_2_1_1=$(".qi3_2_1_1");
	var qi4=$(".qi4")[0];
	var qi5=$(".qi5")[0];
	var qi6_1=$(".qi6_1");
	var qi6_2=$(".qi6_2");

	qi3_2_1_1[0].onmouseover=function(){
		qi4.style.display="block";
		qi5.style.display="none";
		qi6_1[0].style.background="#e5004f";
		qi6_1[1].style.background="#333";
	}
	qi3_2_1_1[1].onmouseover=function(){
		qi4.style.display="none";
		qi5.style.display="block";
		qi6_1[0].style.background="#333";
		qi6_1[1].style.background="#e5004f";
	}
	// *******************第七行线************
	var qi5_2=$(".qi5_2");
	for(var i=0;i<qi5_2.length;i++){
		line(qi5_2[i]);
		function line(obj){
			var zuo1=$(".dxzuo1")[i];
			var you1=$(".dxyou1")[i];
			var shang1=$(".dxshang1")[i];
			var xia1=$(".dxxia1")[i];
			obj.onmouseover=function(){
				animate(zuo1,{height:248},500);
				animate(you1,{height:248},500);
				animate(shang1,{width:198},500);
				animate(xia1,{width:198},500);
			}
			obj.onmouseout=function(){
				animate(zuo1,{height:0},300);
				animate(you1,{height:0},300);
				animate(shang1,{width:0},300);
				animate(xia1,{width:0},300);
			}
		}
	}
	//**********************第九行小轮播*************
	var nine4_1=$(".nine4_1")[0]; //大框
	var nine4_2=$(".nine4_2")[0]; 
	var nine4_3=$(".nine4_3")[0];
	nine4_2.onclick=function(){
		animate(nine4_1,{left:-170})
	}
	nine4_3.onclick=function(){
		animate(nine4_1,{left:0})
	}
   // 遇到问题 如何把他扒回来！！
   // *************第九行不循环轮播************
   var btnleft=$(".btnleft")[0];
   var btnright=$(".btnright")[0];
   var yq=$(".yq");
   var nine5=$(".nine5")[0];
   var nine5_1=$(".nine5_1")[0];
   nine5.onmouseover=function(){
   		animate(btnright,{right:0})
   		animate(btnleft,{left:0})
   }
   nine5.onmouseout=function(){
   		animate(btnright,{right:-30})
   		animate(btnleft,{left:-30})
   }
   btnleft.onclick=function(){
   		animate(nine5_1,{left:0})
		yq[0].style.background="#e5004f";
		yq[1].style.background="#666";
   }
   btnright.onclick=function(){
		animate(nine5_1,{left:-390})
		yq[1].style.background="#e5004f";
		yq[0].style.background="#666";
	}
	yq[0].onclick=function(){
		animate(nine5_1,{left:0})
		yq[0].style.background="#e5004f";
		yq[1].style.background="#666";

	}
	yq[1].onclick=function(){
		animate(nine5_1,{left:-390})
		yq[1].style.background="#e5004f";
		yq[0].style.background="#666";
	}
	//********************第九行右边动线**********
	var nine6_2=$(".nine6_2");
	for(var i=0;i<nine6_2.length;i++){
		line(nine6_2[i]);
		function line(obj){
			var zuo2=$(".dxzuo2")[i];
			var you2=$(".dxyou2")[i];
			var shang2=$(".dxshang2")[i];
			var xia2=$(".dxxia2")[i];
			obj.onmouseover=function(){
				animate(zuo2,{height:180},500);
				animate(you2,{height:180},500);
				animate(shang2,{width:270},500);
				animate(xia2,{width:270},500);
			}
			obj.onmouseout=function(){
				animate(zuo2,{height:0},300);
				animate(you2,{height:0},300);
				animate(shang2,{width:0},300);
				animate(xia2,{width:0},300);
			}
		}
	}
	// 第十行补充特效
	var nine42=$(".nine42")[0]; //左边按钮
	var nine43=$(".nine43")[0]; //右边按钮
	var ten=$(".ten")[0];
	nine42.onclick=function(){
		animate(ten,{left:-160})
	}
	nine43.onclick=function(){
		animate(ten,{left:0})
	}
	//第十一行补充特效
	var nine44=$(".nine44")[0]; //左边按钮
	var nine45=$(".nine45")[0]; //右边按钮
	var shiyi=$(".shiyi")[0];
	nine44.onclick=function(){
		animate(shiyi,{left:-160})
	}
	nine45.onclick=function(){
		animate(shiyi,{left:0})
	}
	// 第十二行补充特效
	var nine46=$(".nine46")[0]; //左边按钮
	var nine47=$(".nine47")[0]; //右边按钮
	var shier=$(".shier")[0];
	nine46.onclick=function(){
		animate(shier,{left:-160})
	}
	nine47.onclick=function(){
		animate(shier,{left:0})
	}
	// 第十三行补充特效
	var shisan=$(".shisan")[0]; //大框
	var shisan1=$(".shisan1")[0]; 
	var shisan2=$(".shisan2")[0];
	shisan1.onclick=function(){
		animate(shisan,{left:-170})
	}
	shisan2.onclick=function(){
		animate(shisan,{left:0})
	}
	//第十三行大框
	var shisan5=$(".shisan5")[0];
   var shisan6=$(".shisan6")[0];
   var shisan7=$(".shisan7");
   var shisan3=$(".shisan3")[0];
   var shisan4=$(".shisan4")[0];
   shisan3.onmouseover=function(){
   		animate(shisan6,{right:0})
   		animate(shisan5,{left:0})
   }
   shisan3.onmouseout=function(){
   		animate(shisan6,{right:-30})
   		animate(shisan5,{left:-30})
   }
   shisan5.onclick=function(){
   		animate(shisan4,{left:0})
		shisan7[0].style.background="#e5004f";
		shisan7[1].style.background="#666";
   }
   shisan6.onclick=function(){
		animate(shisan4,{left:-390})
		shisan7[1].style.background="#e5004f";
		shisan7[0].style.background="#666";
	}
	shisan7[0].onclick=function(){
		animate(shisan4,{left:0})
		shisan7[0].style.background="#e5004f";
		shisan7[1].style.background="#666";

	}
	shisan7[1].onclick=function(){
		animate(shisan4,{left:-390})
		shisan7[1].style.background="#e5004f";
		shisan7[0].style.background="#666";
	}
// 第十四行补充特效
	var shisi=$(".shisi")[0]; //大框
	var shisi1=$(".shisi1")[0]; 
	var shisi2=$(".shisi2")[0];
	shisi1.onclick=function(){
		animate(shisi,{left:-170})
	}
	shisi2.onclick=function(){
		animate(shisi,{left:0})
	}
//第十四行大框
	var shisi5=$(".shisi5")[0];
   var shisi6=$(".shisi6")[0];
   var shisi7=$(".shisi7");
   var shisi3=$(".shisi3")[0];
   var shisi4=$(".shisi4")[0];
   shisi3.onmouseover=function(){
   		animate(shisi6,{right:0})
   		animate(shisi5,{left:0})
   }
   shisi3.onmouseout=function(){
   		animate(shisi6,{right:-30})
   		animate(shisi5,{left:-30})
   }
   shisi5.onclick=function(){
   		animate(shisi4,{left:0})
		shisi7[0].style.background="#e5004f";
		shisi7[1].style.background="#666";
   }
   shisi6.onclick=function(){
		animate(shisi4,{left:-390})
		shisi7[1].style.background="#e5004f";
		shisi7[0].style.background="#666";
	}
	shisi7[0].onclick=function(){
		animate(shisi4,{left:0})
		shisi7[0].style.background="#e5004f";
		shisi7[1].style.background="#666";

	}
	shisi7[1].onclick=function(){
		animate(shisi4,{left:-390})
		shisi7[1].style.background="#e5004f";
		shisi7[0].style.background="#666";
	}
// 第十五行补充特效
	var shiwu=$(".shiwu")[0]; //大框
	var shiwu1=$(".shiwu1")[0]; 
	var shiwu2=$(".shiwu2")[0];
	shiwu1.onclick=function(){
		animate(shiwu,{left:-170})
	}
	shiwu2.onclick=function(){
		animate(shiwu,{left:0})
	}
//第十五行大框
	var shiwu5=$(".shiwu5")[0];
   var shiwu6=$(".shiwu6")[0];
   var shiwu7=$(".shiwu7");
   var shiwu3=$(".shiwu3")[0];
   var shiwu4=$(".shiwu4")[0];
   shiwu3.onmouseover=function(){
   		animate(shiwu6,{right:0})
   		animate(shiwu5,{left:0})
   }
   shiwu3.onmouseout=function(){
   		animate(shiwu6,{right:-30})
   		animate(shiwu5,{left:-30})
   }
   shiwu5.onclick=function(){
   		animate(shiwu4,{left:0})
		shiwu7[0].style.background="#e5004f";
		shiwu7[1].style.background="#666";
   }
   shiwu6.onclick=function(){
		animate(shiwu4,{left:-390})
		shiwu7[1].style.background="#e5004f";
		shiwu7[0].style.background="#666";
	}
	shiwu7[0].onclick=function(){
		animate(shiwu4,{left:0})
		shiwu7[0].style.background="#e5004f";
		shiwu7[1].style.background="#666";

	}
	shiwu7[1].onclick=function(){
		animate(shiwu4,{left:-390})
		shiwu7[1].style.background="#e5004f";
		shiwu7[0].style.background="#666";
	}
	//第十六行补充特效
	var nine48=$(".nine48")[0]; //左边按钮
	var nine49=$(".nine49")[0]; //右边按钮
	var shiliu=$(".shiliu")[0];
	nine48.onclick=function(){
		animate(shiliu,{left:-160})
	}
	nine49.onclick=function(){
		animate(shiliu,{left:0})
	}
	//第十七行补充特效
	var nine50=$(".nine50")[0]; //左边按钮
	var nine52=$(".nine52")[0]; //右边按钮
	var shiqi=$(".shiqi")[0];
	nine50.onclick=function(){
		animate(shiqi,{left:-160})
	}
	nine52.onclick=function(){
		animate(shiqi,{left:0})
	}
	// 右边绝对定位
	var jq=$(".jq")[0];
	var jddw=$(".jddw");
	var nine=$(".nine");

	var obj=document.documentElement.scrollTop=1;
		if (document.documentElement.scrollTop==1) {
			var obj=document.documentElement;
		}else{
			var obj=document.body;
		}
	window.onscroll=function(){
		var s=obj.scrollTop;
		if (s>665) {
			jq.style.display="block";
		}else{
			jq.style.display="none";
		}
	}
	for (var i = 0; i < jddw.length; i++) {
		jddw[i].index=i;
		jddw[i].onclick=function(){
			var yx=nine[this.index].offsetTop;
			animate(obj,{scrollTop:yx})
		}
	}
	jddw[9].onclick=function(){
		animate(obj,{scrollTop:0})
	}
})