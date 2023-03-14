import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Photo } from './Photo';
import { PhotoService } from './photo.service';

@Component({
  selector: 'pm-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit, OnDestroy {

  photo!: Photo

  sub!: Subscription;

  constructor(private service: PhotoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.sub = this.service.getPhoto(id).subscribe({
      next: p => this.photo = p
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  deletePhoto(): void {
   
    if (confirm("Are you sure you want to delete this photo?")) {
      this.service.deletePhoto(this.photo).subscribe({
        next: r => console.log("2")
      })
    }
  }

}
