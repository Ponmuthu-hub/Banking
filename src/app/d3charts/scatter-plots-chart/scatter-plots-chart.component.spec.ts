import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterPlotsChartComponent } from './scatter-plots-chart.component';

describe('ScatterPlotsChartComponent', () => {
  let component: ScatterPlotsChartComponent;
  let fixture: ComponentFixture<ScatterPlotsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScatterPlotsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterPlotsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
