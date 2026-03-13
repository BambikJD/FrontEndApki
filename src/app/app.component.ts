import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { User, UserRole } from './usersManagment/user';
import { UserService } from './usersManagment/user-service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserComponent } from "./usersManagment/user.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  //protected readonly title = signal('FrontEndApki');
  
 
  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
   
  }

}

