import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './component/logged-in.guard';
import { AdminGuard } from './component/admin.guard';
import { NotLoggedInGuard } from './component/not-logged-in.guard';
import { UserListComponent } from './component/user-list/user-list.component';
import { UserFormComponent } from './component/user-form/user-form.component';
import { CategoryListComponent } from './component/category-list/category-list.component';
import { CategoryFormComponent } from './component/category-form/category-form.component';
import { LocationListComponent } from './component/location-list/location-list.component';
import { LocationFormComponent } from './component/location-form/location-form.component';
import { AdListComponent } from './component/ad-list/ad-list.component';
import { AdDetailsComponent } from './component/ad-details/ad-details.component';
import { AdFormComponent } from './component/ad-form/ad-form.component';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { RegisterFormComponent } from './component/register-form/register-form.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { ResourceOwnerGuard } from './component/resource-owner.guard';

const routes: Routes = [
  { path: '', redirectTo: '/ads', pathMatch: 'full' },
  { path: 'profile', component: UserProfileComponent, canActivate: [LoggedInGuard]},
  { path: 'edit-profile', component: UserFormComponent, canActivate: [LoggedInGuard]},
  { path: 'users', component: UserListComponent, canActivate: [AdminGuard] },
  { path: 'add-user', component: UserFormComponent, canActivate: [AdminGuard] },
  { path: 'edit-user/:id', component: UserFormComponent, canActivate: [AdminGuard] },
  { path: 'categories', component: CategoryListComponent, canActivate: [AdminGuard] },
  { path: 'add-category', component: CategoryFormComponent, canActivate: [AdminGuard] },
  { path: 'edit-category/:id', component: CategoryFormComponent, canActivate: [AdminGuard] },
  { path: 'locations', component: LocationListComponent, canActivate: [AdminGuard] },
  { path: 'add-location', component: LocationFormComponent, canActivate: [AdminGuard] },
  { path: 'edit-location/:id', component: LocationFormComponent, canActivate: [AdminGuard] },
  { path: 'ads', component: AdListComponent },
  { path: 'ads-user', component: AdListComponent, canActivate: [LoggedInGuard] },
  { path: 'ad/:id', component: AdDetailsComponent},
  { path: 'add-ad', component: AdFormComponent, canActivate: [LoggedInGuard] },
  { path: 'edit-ad/:id', component: AdFormComponent, canActivate: [LoggedInGuard, ResourceOwnerGuard] },
  { path: 'login', component: LoginFormComponent, canActivate: [NotLoggedInGuard] },
  { path: 'register', component: RegisterFormComponent, canActivate: [NotLoggedInGuard] },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
