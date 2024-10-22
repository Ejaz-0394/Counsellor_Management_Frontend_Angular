import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInqComponent } from './view-inq.component';

describe('ViewInqComponent', () => {
  let component: ViewInqComponent;
  let fixture: ComponentFixture<ViewInqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewInqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
