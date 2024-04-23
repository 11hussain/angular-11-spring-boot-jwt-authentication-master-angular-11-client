import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser?: any;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';


  constructor(private token: TokenStorageService, private authService: AuthService) {
    console.log("Token -->"+token.getToken());
   }

  //  constructor(private token: TokenStorageService) {
  //    console.log("Token -->"+token.getToken());
  //   }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  onSubmit(): void {
    // Call the updateProfile function when the form is submitted
    this.updateProfile();
  }



  updateProfile(): void {
    this.authService.updateProfile(this.currentUser).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true; // Set isSuccessful to true upon successful registration
        // Optionally update the UI or show a success message
      },
      err => {
        console.error(err);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        // Handle error, e.g., show an error message
      }
    );
  }

}

