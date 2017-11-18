import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchAreasComponent } from './research-areas.component';

describe('ResearchAreasComponent', () => {
  let component: ResearchAreasComponent;
  let fixture: ComponentFixture<ResearchAreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchAreasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
