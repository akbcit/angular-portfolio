import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PageUnderlayComponent } from './page-underlay/page-underlay.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,PageUnderlayComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-portfolio';
  ngOnInit():void{
    document.body.addEventListener('touchmove', function (e) {
      if (document.body.classList.contains('no-scroll')) {
        e.preventDefault();
      }
    }, { passive: false }); 
  }
}
