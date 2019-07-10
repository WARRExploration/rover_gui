import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositeViewComponent } from './composite-view.component';

describe('CompositeViewComponent', () => {
  let component: CompositeViewComponent;
  let fixture: ComponentFixture<CompositeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompositeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
