import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faCamera, faKey } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { UserPictureComponent } from '../user-picture/user-picture.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  faKey = faKey;
  faCamera = faCamera;

  user: User;

  constructor(private authService: AuthService, private userService: UserService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser()!;
  }

  changePassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      admin: false
    };
    let dialogRef = this.dialog.open(ChangePasswordComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((changePasswordDto: { currentPassword: string, newPassword: string}) => {
      if(changePasswordDto) {
        const userId = this.authService.getCurrentUserId();
        this.userService.changePassword(userId, changePasswordDto).subscribe(() => {
          this.snackBar.open("Password changed successfully!", "✔️", { duration: 3000, panelClass: ['snackbar-success'], verticalPosition: 'top'});
        });
      }
    });
  }

  changeProfilePicture() {
    let dialogRef = this.dialog.open(UserPictureComponent);
    dialogRef.afterClosed().subscribe(picture => {
      if(picture) {
        const userId = this.authService.getCurrentUserId();
        let formData = new FormData();
        formData.append('picture', picture);
        this.userService.changeProfilePicture(userId, formData).subscribe(() => {
          this.authService.fetchUser().subscribe(user => {
            this.user = user;
          });
          this.snackBar.open("Profile picture changed successfully!", "✔️", { duration: 3000, panelClass: ['snackbar-success'], verticalPosition: 'top'});
        });
      }
    });
  }

}
