import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'app';

  constructor() {
  }

  ngOnInit() {
    function automaticResize() {
      const _DEFAULT_HEIGHT = 720;
      let _windowHeight = $(window).height();
      $('html').css('font-size', 100 / _DEFAULT_HEIGHT * _windowHeight);
    }

    automaticResize();
    // setTimeout(function () {
    //   $(window).resize(function () {
    //     automaticResize();
    //   });
    // }, 200);


  }
}
