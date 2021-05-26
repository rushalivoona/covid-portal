import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronaStatusComponent } from './corona-status.component';

describe('CoronaStatusComponent', () => {
  let component: CoronaStatusComponent;
  let fixture: ComponentFixture<CoronaStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoronaStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronaStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
