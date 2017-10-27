import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsNavComponent } from './collections-nav.component';

describe('CollectionsNavComponent', () => {
  let component: CollectionsNavComponent;
  let fixture: ComponentFixture<CollectionsNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionsNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
