import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  // applicartion header logo
  limeHomeLogo: string = 'assets/design_assets_logo.svg';
  limeHomeAltText: string = 'limeHome logo';

  // applicartion menu
  limeHomeMenu: string = 'assets/design_assets_burger-icon.svg';
  limeHomeMenuAltText: string = 'limeHome menu';
}
