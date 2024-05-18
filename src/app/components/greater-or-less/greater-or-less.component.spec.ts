import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreaterOrLessComponent } from './greater-or-less.component';

describe('GreaterOrLessComponent', () => {
  let component: GreaterOrLessComponent;
  let fixture: ComponentFixture<GreaterOrLessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreaterOrLessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GreaterOrLessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
