import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoDetailsComponent } from './photos/photo-details.component';
import { PhotoDetailsGuard } from './photos/photo-details.guard';
import { PhotoEditComponent } from './photos/photo-edit.component';
import { PhotoEditGuard } from './photos/photo-edit.guard';
import { PhotoListComponent } from './photos/photo-list.component';

const routes: Routes = [
  {path: "photos", component: PhotoListComponent},
  {path: "photos/:id", component: PhotoDetailsComponent, canActivate: [PhotoDetailsGuard]},
  {path: "photos/:id/edit", component: PhotoEditComponent, canDeactivate: [PhotoEditGuard]},
  {path: '', redirectTo: "photos", pathMatch: "full"},
  {path: '**', redirectTo: "photos", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
