import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { collectionsComponent } from './collections.component';

describe('collectionsComponent', () => {
  let component: collectionsComponent;
  let fixture: ComponentFixture<collectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ collectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(collectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
