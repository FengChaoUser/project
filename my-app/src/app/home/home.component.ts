import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    // 加上"any"解决Property 'fullpage' does not exist on type 'JQuery'的问题
    (<any>$('#full_screen')).fullpage({
      sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90'],
      navigation: true,
      easing: 'linear',
      navigationTooltips: [
        'HOME', 'SKILLS', 'PC WEB', 'ICON', 'MOBILE WEB', 'BIG SCRIPT', 'ABOUT ME',
      ],
      afterLoad(anchorLink, index) {
        // console.log(index);
        if (index == 1) {
          $('.section').eq(0).addClass('start');
        }else{
          $('.section').eq(0).removeClass('start');
        }
        if (index == 2) {
          $('.section').eq(1).addClass('start');
        } else {
          $('.section').eq(1).removeClass('start');
        }
        if (index == 3) {
          $('.section').eq(2).addClass('start');
        } else {
          $('.section').eq(2).removeClass('start');
        }
        if (index == 4) {
          $('.section').eq(3).addClass('start');
        }else{
          $('.section').eq(3).removeClass('start');
        }
        if (index == 5) {
          $('.section').eq(4).addClass('start');
        }else{
          $('.section').eq(4).removeClass('start');
        }
        if (index == 6) {
          $('.section').eq(5).addClass('start');
        }else{
          $('.section').eq(5).removeClass('start');
        }
        if (index == 7) {
          $('.section').eq(6).addClass('start');
        }else{
          $('.section').eq(6).removeClass('start');
        }
      },
      onLeave: function (index, direction) {
        if (index == '1') {
          $('.section').eq(0).removeClass('start')
        }
        if (index == '2') {
          $('.section').eq(1).removeClass('start')
        }
        if (index == '3') {
          $('.section').eq(2).removeClass('start')
        }
        if (index == '4') {
          $('.section').eq(3).removeClass('start')
        }
        if (index == '5') {
          $('.section').eq(4).removeClass('start')
        }
        if (index == '6') {
          $('.section').eq(5).removeClass('start')
        }
        if (index == '7') {
          $('.section').eq(6).removeClass('start')
        }
      },
    });
    const arrow = $('.arrow');
    arrow.click(function () {
      (<any>$('#full_screen')).fullpage.moveSectionDown();
    });

  }

}
