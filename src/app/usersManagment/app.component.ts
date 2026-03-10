import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { User, UserRole } from './user';
import { UserService } from './user-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [/*RouterOutlet,*/ CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  //protected readonly title = signal('FrontEndApki');
  
  public users: User[];
  public selectedUser: User | null = null;
  public activeModal: String | null = null;


  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {
    this.users = [];
  }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        console.log("ODPOWIEDŹ Z SERWERA:", response);
        this.users = response;
        this.cdr.detectChanges();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.cdr.detectChanges();
      }
    );
  }

  public onOpenAddModal(): void {
    this.activeModal = 'add';
  }

  public onOpenUserModal(user: User, mode: String): void {
    this.selectedUser = user;
    this.activeModal = mode;
  }

  public closeModal(): void {
    this.activeModal = null;
    this.selectedUser = null;
  }

  public deleteUser(userId: number | null | undefined ): void {
    if(userId != null && userId != undefined){
    this.userService.deleteUser(userId).subscribe(
      (response) => {
        console.log("ODPOWIEDŹ Z SERWERA:", response);
        this.getUsers();
        this.closeModal();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.cdr.detectChanges();
      }
    )
  }
  }

  public onAddUserRaw(name: string, surname: string, login: string, email: string, pass: string): void {
    
    const newUser: User = {
      ID_User: null, 
      name: name,
      surname: surname,
      login: login,
      password: pass,
      email: email,
      userRole: UserRole.USER,
      enabled: false, 
      locked: false
    }

    this.userService.addUser(newUser).subscribe({
      next: (response: User) => {
        console.log("Dodano użytkownika!", response);
        this.getUsers();
        this.closeModal();
      },
      error: (error: HttpErrorResponse) => {
        alert("Błąd podczas dodawania: " + error.message);
      }
    });
  }

}

