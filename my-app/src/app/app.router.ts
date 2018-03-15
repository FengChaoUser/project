/**
 * Created by zengchunyun on 2017/9/19.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';

const AppRouting: Routes = [
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {
    path: 'index',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(AppRouting, {useHash: false})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
