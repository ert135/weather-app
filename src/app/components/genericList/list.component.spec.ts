// list.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ListingComponent } from './list.component';

// A quick test component we can use to test our generic list with
@Component({
  template: `
    <ng-template #itemTemplate let-item>
      <p class="item">{{ item }}</p>
    </ng-template>

    <list-component
      [items]="items"
      [itemTemplate]="itemTemplate">
    </list-component>
  `
})
class TestHostComponent {
  items: string[] = [];
  @ViewChild('itemTemplate', { static: true }) itemTemplate!: TemplateRef<any>;
}

describe('ListingComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [ListingComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
  });

  it('should display fallback text when no items are given', () => {
    component.items = [];
    fixture.detectChanges();

    const fallback = fixture.debugElement.nativeElement.textContent;
    expect(fallback).toContain('No items to display.');
  });

  it('should render all items using the given template', () => {
    component.items = ['One', 'Two', 'Three'];
    fixture.detectChanges();

    const rendered = fixture.debugElement.queryAll(By.css('.item'));
    expect(rendered.length).toBe(3);
    expect(rendered[0].nativeElement.textContent).toContain('One');
    expect(rendered[1].nativeElement.textContent).toContain('Two');
    expect(rendered[2].nativeElement.textContent).toContain('Three');
  });
});