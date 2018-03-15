$(function () {
  $('.R').hover(function () {
    $('.b', this).show();
    $('.R').css({'height': '+=1', 'background-color': '#fff'});
  }, function () {
    $('.R .b').hide();
    $('.R').removeAttr('style');
  });
  $('.S').hover(function () {
    $('.b', this).show();
    $('.S').css({'height': '+=1', 'background-color': '#fff'});
  }, function () {
    $('.S .b').hide();
    $('.S').removeAttr('style');
  });
  // banner
  var imgs = $('.nav-banner a');
  var nums = $('.num li');
  var index = 0;
  setInterval(function () {
    index++;
    if (index >= imgs.length) {
      index = 0;
    }
    imgs.css('z-index', '0');
    nums.css('background', '');
    $(nums[index]).css({'background': 'red', 'opacity': '1'});
    $(imgs[index]).css('z-index', '1');
  }, 3000);
  // logo以及搜索框部分；
  var btns = $('#box .myShop');
  $(btns).hover(function () {

    $('.list', this).show();
  }, function () {
    $('#box .myShop-box .myShop .list').hide();
  });
  // 右侧小轮播
  var imgs2 = $('.hot-right ul li');
  var iw = 276;
  var bw = iw * imgs2.length;
  var ban2 = $('.hot-right ul');
  ban2.width(bw);
  var i = 0;
  var tt = setInterval(h, 1000);

  function h() {
    i++;
    if (i == imgs2.length - 1) {
      i = 0;
    }
    ban2.animate({marginLeft: -i * iw}, 300);
  }

  $('.hot-right').hover(function () {
    clearInterval(tt);
  }, function () {
    tt = setInterval(h, 1000);
  });
  var lbtn = $('.hot-right .lbtn');
  var rbtn = $('.hot-right .rbtn');
  rbtn.click(function () {
    h();
  });
  lbtn.click(function () {
    i--;
    if (i == -1) {
      i = imgs2.length - 1;
    }
    ban2.animate({marginLeft: -i * iw}, 300);
  });
  // 选项卡
  var tl = $('.hot-right .title .left');
  var tr = $('.hot-right .title .right');
  var tab1 = $('.aa .box .tab-1');
  var tab2 = $('.aa .box .tab-2');

  tr.hover(function () {
    $(this).css('background', '#fff');
    tl.css('background', '#fcf7f7');
    tab1.css('display', 'none');
    tab2.css('display', 'block');
  });
  tl.hover(function () {
    $(this).css('background', '#fff');
    tr.css('background', '#fcf7f7');
    tab2.css('display', 'none');
    tab1.css('display', 'block');
  });

  // center banner
  function center() {
    var center = $('.center a');
    var list = $('.center li');
    console.log(list);
    var e = 0;
    $(center[e]).fadeIn();
    var t1 = setInterval(w, 4000);

    function w() {
      e++;
      if (e >= center.length) {
        e = 0;
      }
      list.css({'background': '', 'opacity': .3});
      $(list[e]).css({'background': '#ca141d', 'opacity': 1});
      center.fadeOut();
      $(center[e]).fadeIn();
    }

    list.hover(function () {
      clearInterval(t1);
      var a = $(this).index();
      list.css({'background': '', 'opacity': .3});
      $(list[a]).css({'background': '#ca141d', 'opacity': 1});
      center.fadeOut();
      $(center[a]).fadeIn();
      e = a;

    }, function () {
      t1 = setInterval(w, 4000);
      center.finish();
    });
  }

  center();


  var len = 100;
  var flag = true;
  $(window).scroll(function () {
    var val = $(window).scrollTop();
    if (val >= len) {
      if (!flag) {
        return;
      }
      flag = false;
      $('#fixed .top').finish();
      $('#fixed .top').animate({'opacity': 1}, 200);
    } else {
      flag = true;
      $('#fixed .top').animate({'opacity': 0}, 200);
    }
  });

  // 返回顶部
  var top = $('#fixed .top');
  top.click(function () {
    $('html,body').animate({scrollTop: 0}, 500);
  });

//	按需加载
  $("img.lazy").lazyload({
    threshold: 200, // 设置阀值
    skip_invisible: false,
    effect: "fadeIn" // 设置图片渐入特效
  });
});
