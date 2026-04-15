import { Component, signal, output, inject, OnInit } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { SideBarEnum } from '../../../models/enums/side-bar.enum';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar implements OnInit {
  activeMenu = signal<SideBarEnum>(SideBarEnum.DASHBOARD);

  sideBarEnumType = SideBarEnum;

  menuItems = signal<SideBarEnum[]>(
    Object.values(SideBarEnum).filter(item => item !== SideBarEnum.PERFIL)
  );

  menuLabels: Record<string, string> = {
    [SideBarEnum.DASHBOARD]: 'Dashboard',
    [SideBarEnum.TRANSACTIONS]: 'Transações',
    [SideBarEnum.CATEGORIES]: 'Categorias',
    [SideBarEnum.PERFIL]: 'Perfil',
    [SideBarEnum.CHATBOT]: 'Chatbot'
  };

  private authService = inject(AuthService);
  currentUser = this.authService.user;

  menuSelected = output<SideBarEnum>();

  ngOnInit() {
    this.authService.getUser().subscribe({
      next: () => { },
      error: (err) => console.error('Erro ao buscar usuário', err)
    });
  }

  selectMenu(item: SideBarEnum) {
    this.activeMenu.set(item);
    this.menuSelected.emit(item);
  }
}
