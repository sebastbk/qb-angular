import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { collectionSearchComponent } from './collection-search.component';

describe('collectionSearchComponent', () => {
  let component: collectionSearchComponent;
  let fixture: ComponentFixture<collectionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ collectionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(collectionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
