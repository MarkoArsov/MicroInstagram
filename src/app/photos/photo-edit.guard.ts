import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PhotoEditComponent } from './photo-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PhotoEditGuard implements CanDeactivate<PhotoEditComponent> {
  canDeactivate(
    component: PhotoEditComponent): boolean  {

    if(component.editForm.dirty){
      return confirm("Navigate away and lose changes?")
    }
    return true;
  }
  
}
