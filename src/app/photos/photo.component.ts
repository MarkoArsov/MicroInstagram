import { Component, Input } from '@angular/core';
import { Photo } from './Photo';

@Component({
  selector: 'pm-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {
    
  @Input() photo: Photo | undefined;

}
