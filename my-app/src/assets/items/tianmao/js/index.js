$(function () {
// banner 轮播图  以及背景颜色
  // var imgs=$('.banner-box a');

  // var nums=$('.banner-box ol li');
  // var bg=$('.column-')
  // $(imgs[0]).css('z-index','1')
  // var arr=['#070226','#dadada','#e10c3a','#dadada','#f49ab6']
  // $(nums[0]).css('background-color','red');
  // $(bg[0]).css({'background-color':arr[0],'z-index':'0'})
  // // console.log(imgs)
  // wheel(imgs,nums,2000);
  // function wheel(img,num,times){
  // 	var i=0;
  // setInterval(function(){
  // 	i++;
  // 	if(i>=imgs.length){
  // 		i=0;
  // 	}
  // 	bg.css('z-index','-1')
  // 	$(bg[i]).css({'background-color':arr[i],'z-index':'0'})
  // 	imgs.css('z-index','0')
  // 	$(nums).css('background-color','')
  // 	$(imgs[i]).css('z-index','1')
  // 	$(nums[i]).css('background-color','red')
  // },times)
  // }

//bqnner效果
  //轮播图以及鼠标移入移出效果
  var imgs = $('.banner-box a');
  var nums = $('.banner-box ol li');
  // 获取轮播图img
  var img1 = $('.banner-box a img');
  // 获取点击图img
  var img2 = $('.banner-next li img');

  var rlists = $('.rlist li');		//右边banner的类
  var dcolor = [
    '#5772FD', '#556972', '#7ACEE0', '#FFF', '#AAECF7',
    '#FCEE5A', '#FEF7DA', '#1549ED', '#EFA135', '#1DBAC9',
    '#2A70AE', '#EF6D39', '#F7F7F7', '#2FC6FF', '#E40011'
  ];
  var bcolor = ['red', 'yellow', 'green', 'blue', 'black'];
  var bg = $('.column-');
  $(imgs[0]).css('z-index', '1');
  var arr = ['#070226', '#dadada', '#e10c3a', '#dadada', '#f49ab6'];
  $(nums[0]).css('background-color', 'red');
  $(bg[0]).css({'background-color': arr[0], 'z-index': '0'});
  // console.log(imgs)


  var i = 0;
  var t1 = setInterval(move, 2000);

  // alert(t1)
  function move() {
    i++;
    if (i >= imgs.length) {
      i = 0;
    }
    bg.css({'background-color': arr[i]});
    imgs.css('z-index', '2');
    $(nums).css('background-color', '');
    $(imgs[i]).css('z-index', '3');
    $(nums[i]).css('background-color', 'red');
    rlists.css('background-color', arr[i]);
  }


  var list = $('.banner-box li');

  var btns = $('.nav li');

  var baNext = $('.banner-next li');
  var menuBox = $('.nav .info');


  $(rlists[0]).css('display', 'block');

  baNext.css('display', 'none');
  btns.hover(function () {
    var index = $(this).index();
    $('.nav li').css('background-color', '');
    $(this).css('background-color', '#A90000');
    menuBox.css('display', 'none');
    rlists.css('display', 'none');
    bg.css('background-color', dcolor[index]);
    $(menuBox[index]).css('display', 'block');
    // 右边banner
    $(rlists[index])
      .css({'display': 'block', 'background-color': dcolor[index - 1]});
    clearInterval(t1);
    if (index == 0) {
      // console.log(index)
      t1 = setInterval(move, 2000);

      $(img1[i])
        .animate({width: '810px', marginTop: '0', marginLeft: '0'}, 2000);
      bg.css('background-color', arr[i]);
    }
    index -= 1;
    bg.css('background-color', dcolor[index]);
    baNext.removeAttr('style');
// 淡入淡出
    // $(baNext[index]).fadeIn(4000);

    // $(baNext[index]).fadeIn(4000);

    $(baNext[index]).css({'display': 'block'});


    $(img2, this).finish();
    $(img2[index])
      .animate({width: '810', marginTop: '0', marginLeft: '0'}, 2000);


  }, function () {


    img2.animate({width: '850', marginTop: '-20', marginLeft: '-12'}, 2000);
    list.css('z-index', '0');

    $(this).css('background-color', '#4A4A4A');

    rlists.css('z-index', '0');


  });
  // banner 右侧图片效果
  $('img', rlists).hover(function () {
    $(this).animate({marginLeft: '-5px'});
  }, function () {
    $(this).animate({marginLeft: '0'});
  });
// 热门品牌
  var btns = $('.mainbav_ a');
  var lists = $('.main-column');
  $(btns[0]).css({
    'font-weight': 'bold', 'color': '#222',
    'text-decoration': 'underline'
  });
  lists.css('display', 'none');
  $(lists[0]).css('display', 'block');
  btns.click(function () {
    var i = btns.index(this);
    $(btns).css({
      'font-weight': '', 'color': '',
      'text-decoration': ''
    });
    $(btns[i]).css({
      'font-weight': 'bold', 'color': '#222',
      'text-decoration': 'underline'
    });
    lists.css('display', 'none');
    $(lists[i]).css('display', 'block');
  });

// center4-right 图片浮动效果
  $('.center4-right div').hover(function () {
    $('img', this).animate({marginLeft: '-5'}, 300);
  }, function () {
    $('.center4-right img').animate({marginLeft: '0'}, 300);
  });
// 固定搜索框
  var len = 680;

  $(window).scroll(function () {
    var flag = true;
    var val = $(window).scrollTop();
    if (val >= len) {
      if (!flag) {
        return;
      }
      flag = false;
      $("#sea-box").finish();
      $("#sea-box").animate({top: 0}, 200);
    } else {
      flag = true;
      $("#sea-box").animate({top: -50}, 200);
    }
  });
//页面头鼠标移入效果
  //1.我的淘宝
  var myT = $('.my-box');  //按钮盒子
  $('.my-taoB');
  myT.hover(function () {
    $('.taoBh', this).show();
    $('.my-taoB', this).css({'height': '+=1', 'background-color': '#fff'});
    $('.my-box .taoBh').css({'border': '1px solid #f2f2f2', 'border-top': 0});
  }, function () {
    $('.taoBh').hide();
    $('.my-taoB').removeAttr('style');
  });


  // // 楼层轮播图
  var tupBox = $('.lunBo-box .ban-box');
  var imgBox = $('.ban-box .img-box');
  console.log(imgBox.width());
  var lbtn = $('.Fban-left .l-btn');
  var rbtn = $('.Fban-left .r-btn');
  var Fbox = $('.Fban-left');

  function floor(tupBox, imgBox, lbtn, rbtn, Fbox) {
    var p = 0;
    // 图片滚动
    var imgBoxW = $(imgBox[0]).width();
    var t = setInterval(floorA, 2000);
    var flag = true;

    function floorA() {
      if (!flag) {
        return;
      }
      flag = false;
      p++;
      if (p == imgBox.length) {
        p = 0;
      }
      tupBox.animate({marginLeft: -100}, 500, function () {
        tupBox.css({marginLeft: 0});
        $('.img-box', tupBox).first().appendTo(tupBox);
        flag = true;
      });
    }

    // 点击按钮切换
    lbtn.click(function () {
      if (!flag) {
        return;
      }
      flag = false;
      p--;
      if (p == -1) {
        p = imgBox.length - 1;
      }
      $('.img-box', tupBox).last().prependTo(tupBox);
      tupBox.css({marginLeft: -100});
      console.log(imgBoxW);
      tupBox.animate({marginLeft: 0}, 500, function () {


        flag = true;
      });
    });
    //右边按钮
    rbtn.click(function () {
      floorA();
    });

    // 滚动停止
    $('a', lbtn).fadeOut();
    $('a', rbtn).fadeOut();
    Fbox.hover(function () {
      clearInterval(t);
      $('a', lbtn).fadeIn();
      $('a', rbtn).fadeIn();
    }, function () {
      t = setInterval(floorA, 2000);
      $('a', lbtn).fadeOut();
      $('a', rbtn).fadeOut();
    });
  }

// 楼层轮播图以及点击事件
  floor($(tupBox[0]), $(imgBox[0]), $(lbtn[0]), $(rbtn[0]), $(Fbox[0]));		//1楼
  floor($(tupBox[1]), $(imgBox[1]), $(lbtn[1]), $(rbtn[1]), $(Fbox[1]));		//2楼
  floor($(tupBox[2]), $(imgBox[2]), $(lbtn[2]), $(rbtn[2]), $(Fbox[2]));		//3楼
  floor($(tupBox[3]), $(imgBox[3]), $(lbtn[3]), $(rbtn[3]), $(Fbox[3]));		//4楼
  floor($(tupBox[4]), $(imgBox[4]), $(lbtn[4]), $(rbtn[4]), $(Fbox[4]));		//5楼
  floor($(tupBox[5]), $(imgBox[5]), $(lbtn[5]), $(rbtn[5]), $(Fbox[5]));		//8楼
  // 楼层左部鼠标移入效果


  $('.ban-box .img-box a').hover(function () {

    $('img', this).animate({marginLeft: '2'}, 200);
  }, function () {
    $('img', '.ban-box .img-box').animate({marginLeft: '0'}, 200);
  });


// 右侧固定定位
  function wow(a, b) {
    a.hover(function () {
      b.animate({'opacity': 1, 'left': -90}, 200).css('display', 'block');
    }, function () {
      b.animate({'opacity': 0, 'left': -120}, 200, function () {
        b.css('display', 'none');
      });
    });
  }

  var a1 = $('.sidebar .A a');
  var b1 = $('.sidebar .A .word');
  wow(a1, b1);
  var a2 = $('.sidebar .B a');
  var b2 = $('.sidebar .B .word');
  wow(a2, b2);
  var a3 = $('.sidebar .C a');
  var b3 = $('.sidebar .C .word');
  wow(a3, b3);
  var a4 = $('.sidebar .D a');
  var b4 = $('.sidebar .D .word');
  wow(a4, b4);
  var a5 = $('.sidebar .E a');
  var b5 = $('.sidebar .E .word');
  wow(a5, b5);
  var a6 = $('.sidebar .F a');
  var b6 = $('.sidebar .F .word');
  wow(a6, b6);
  var a7 = $('.sidebar .G a');
  var b7 = $('.sidebar .G .word');
  wow(a7, b7);
  var a8 = $('.sidebar .H a');
  var b8 = $('.sidebar .H .word');
  a8.click(function () {
    $('html,body').animate({scrollTop: 0}, 200);
  });
  wow(a8, b8);


});
// // 楼层跳转
window.onload = function () {   //js原生代码  有时候jquery等待页面加载时  图片未加载完成

  var louCeng = $('.floor').height();
  var chuangK = 585;
  console.log(chuangK);
  var Lcbox = $('.louC-box li');
  var lctopR = [];
  var floor = $('.floor');

  floor.each(function (m, obj) {
    lctopR.push(Math.floor($(obj).position().top));
  });
  console.log(lctopR);
  $(window).scroll(function () {
    var top = $(window).scrollTop();
    if (top > 500) {
      $('.louC-box').fadeIn(300);
    } else {
      $('.louC-box').fadeOut(300);
    }
    var topA = chuangK + top - louCeng / 2;
    for (var q = 0; q < lctopR.length; q++) {

      if (lctopR[q] <= topA) {

        Lcbox.removeClass('hott');
        $(Lcbox[q]).addClass('hott');
      }
    }
  });
  var lcs = $('.louC-box .louc');
  Lcbox.click(function () {
    var m = $(this).index();

    $('html,body').animate({scrollTop: lctopR[m]}, 300);
  });
  Lcbox.hover(function () {
    var m = $(this).index();
    $(lcs[m]).css('display', 'block');
  }, function () {
    lcs.css('display', 'none');
  });
//    预加载图片
  $(window).scroll(function () {
    $('img[isLoaded !=1]').each(function () {
      var offsetTop = $(this).offset().top;
      var scrollTop = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scrollTop + windowHeight >= offsetTop) {
        var srcContent = $(this).attr('data-original');
        $(this).attr('src', srcContent);
        $(this).attr('isLoaded', 1);
      }
    });
  });
};
