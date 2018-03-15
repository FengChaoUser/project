import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcWebComponent } from './pc-web.component';

describe('PcWebComponent', () => {
  let component: PcWebComponent;
  let fixture: ComponentFixture<PcWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
