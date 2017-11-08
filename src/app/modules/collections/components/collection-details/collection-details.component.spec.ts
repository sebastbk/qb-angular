import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { collectionDetailComponent } from './collection-detail.component';

describe('collectionDetailComponent', () => {
  let component: collectionDetailComponent;
  let fixture: ComponentFixture<collectionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ collectionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(collectionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
