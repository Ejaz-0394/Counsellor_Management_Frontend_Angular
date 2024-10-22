import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnqComponent } from './add-enq.component';

describe('AddEnqComponent', () => {
  let component: AddEnqComponent;
  let fixture: ComponentFixture<AddEnqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEnqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEnqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
