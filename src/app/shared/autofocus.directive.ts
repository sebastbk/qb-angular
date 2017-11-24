import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[qbAutofocus]'
})
export class AutofocusDirective implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.elementRef.nativeElement.focus();
  }
}
