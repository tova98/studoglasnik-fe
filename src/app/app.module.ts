import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { UserFormComponent } from './component/user-form/user-form.component';
import { CategoryListComponent } from './component/category-list/category-list.component';
import { CategoryFormComponent } from './component/category-form/category-form.component';
import { LocationListComponent } from './component/location-list/location-list.component';
import { LocationFormComponent } from './component/location-form/location-form.component';
import { AdListComponent } from './component/ad-list/ad-list.component';
import { AdFormComponent } from './component/ad-form/ad-form.component';
import { SafePipe } from './component/safe.pipe';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { AuthInterceptor } from './component/auth.interceptor';
import { RegisterFormComponent } from './component/register-form/register-form.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { AdDetailsComponent } from './component/ad-details/ad-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteDialogComponent } from './component/delete-dialog/delete-dialog.component';
import { ErrorInterceptor } from './component/error.interceptor';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditPicturesComponent } from './component/edit-pictures/edit-pictures.component';
import { UserPictureComponent } from './component/user-picture/user-picture.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    CategoryListComponent,
    CategoryFormComponent,
    LocationListComponent,
    LocationFormComponent,
    AdListComponent,
    AdFormComponent,
    SafePipe,
    LoginFormComponent,
    RegisterFormComponent,
    NotFoundComponent,
    AdDetailsComponent,
    DeleteDialogComponent,
    UserProfileComponent,
    ChangePasswordComponent,
    EditPicturesComponent,
    UserPictureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatGridListModule,
    MatPaginatorModule,
    MatCheckboxModule,
    FontAwesomeModule
  ],
  providers: [[{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }]],
  bootstrap: [AppComponent]
})
export class AppModule { }
