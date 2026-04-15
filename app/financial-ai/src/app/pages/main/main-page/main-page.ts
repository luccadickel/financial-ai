import { Component, signal } from '@angular/core';
import { SideBar } from '../side-bar/side-bar';
import { SideBarEnum } from '../../../models/enums/side-bar.enum';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [SideBar],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {
  currentView = signal<SideBarEnum>(SideBarEnum.DASHBOARD);
  
  viewTypes = SideBarEnum;

  onMenuSelected(selected: SideBarEnum) {
    this.currentView.set(selected);
  }
}
