import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.scss'],
})
export class FullScreenComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    const liElement = (<any>$('.view_box ul li'));
    const iW = liElement.width();
    let flag = true;
    liElement.parent().width(liElement.width() * liElement.length);

    /*
    * 开关原理：
    * 初始化默认为ture,点击时先判断flag的值，如果是false则return即跳出
    * 函数是在flag=false时才执行的，在函数执行阶段都未曾定义flag为true，只有
    * 函数在执行最后一步时才会再次定义flag的值，将flag定义为true，此时方可再次
    * 点击按钮
    *
    */
    function wheel() {
      if (!flag) {
        return;
      }
      flag = false;
      liElement.parent().animate({
        marginLeft: -iW,
      }, 600, function () {
        (<any>$('.view_box ul li')).first().appendTo(liElement.parent());
        liElement.parent().css('margin-left', 0);
        flag = true;
      });
    }

    /*
    * 鼠标移入清除定时器，移出重新执行
    */
    let timer = setInterval(wheel, 4000);
    (<any>$('.view_box')).hover(function () {
      clearInterval(timer);
    }, function () {
      timer = setInterval(wheel, 4000);
    });
    // 点击右键时轮播图的跳转
    (<any>$('.right_btn')).click(function () {
      wheel();
    });

    //  点击左键时轮播图的跳转

    (<any>$('.left_btn')).click(function () {
      if (!flag) {
        return;
      }
      flag = false;
      (<any>$('.view_box ul li')).last().prependTo(liElement.parent());
      liElement.parent().css('margin-left', -iW);
      liElement.parent().animate({
        marginLeft: 0,
      }, 600, function () {
        flag = true;
      });
    });
    (<any>$('.music')).click(function(){
      const music = (<any>$('#mp3_element'))[0];
      /*
      *  上面为什么“[0]”
      *  play()和pause()方法是DOM对象方法。不加“[0]”获取的是jquery对象
      *  解决方法：将jquery对象转化为DOM对象
      *  jquery对象只能使用jquery对象的方法，无法使用dom对象的方法
      *  DOM对象是用原生js获取的元素节点
      *  jquery提供了两种方法将一个jquery对象转换为dom对象，即[index]和get(index)
      *  因为jQuery对象就是一个数据对象
      */

      (<any>$(this)).toggleClass("play");
      if((<any>$(this)).hasClass("play")){
        music.play();
      }else{
        music.pause();
      }
    })
  }

}
