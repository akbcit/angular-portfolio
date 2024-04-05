import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightWord]',
  standalone: true
})
export class HighlightWordDirective {
  @Input() highlightColor: string = 'yellow';
  @Input() wordPosition: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  // Called after the view has been fully initialized
  ngAfterViewInit() {
    this.highlightWord();
  }

  private highlightWord() {
    const content = this.el.nativeElement.textContent;
    let words = [];
    if (content) {
      words = content.split(" ");
    }
    if (words.length > this.wordPosition && this.wordPosition > -1) {
      // Wrap the targeted word in a span and apply the color
      words[this.wordPosition] = `<span style="color: ${this.highlightColor};">${words[this.wordPosition]}</span>`;
      console.log(words);
      // Update the element's HTML
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', words.join(' '));
    }
  }
}
