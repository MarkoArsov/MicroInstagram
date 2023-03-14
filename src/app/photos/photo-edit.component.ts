import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Photo } from './Photo';
import { PhotoService } from './photo.service';
import { UrlValidators } from './url.validator';

@Component({
  selector: 'pm-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit, OnDestroy {

  editForm!: FormGroup;

  sub!: Subscription;

  photo!: Photo;

  constructor(private builder: FormBuilder, private service: PhotoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.editForm = this.builder.group({
      albumId: ["", [Validators.required, Validators.min(1), Validators.max(100)]],
      title: ["", Validators.required],
      url: ["", [Validators.required, UrlValidators.urlValidator]],
      addThumbnail: false,
      thumbnailUrl: ""
    })
    
    this.editForm.get("addThumnail")?.valueChanges.subscribe(
      (isChecked: boolean) => {
        console.log("CHCHCHC")
        if (isChecked){
          console.log("checked")
          this.setThumbnailUrlValidators()
        }
        else{
          console.log("not checked")
          this.resetThumnailUrl()
        }
      }
    )

    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (id != 0) {
      this.sub = this.service.getPhoto(id).subscribe({
        next: p => this.displayPhoto(p)
      })
    }


  }

  displayPhoto(photo: Photo): void {
    if (this.editForm) {
      this.editForm.reset()
    }

    this.photo = photo;

    this.editForm.patchValue({
      albumId: this.photo.albumId,
      title: this.photo.title,
      url: this.photo.url,
      thumbnailUrl: this.photo.thumbnailUrl,
      addThumbnail: true,
    })

  }

  savePhoto() {
    if (this.editForm.valid) {
      if (this.editForm.dirty) {
        const p = { ...this.photo, ...this.editForm.value }
        if (p.addThumbnail == false) {
          p.thumbnailUrl = p.url
        }
        delete p.addThumbnail
        if ("id" in p) {
          this.updatePhoto(p)
        } else {
          this.createPhoto(p)
        }
      } else {
        this.saveComplete()
      }
    }
  }

  updatePhoto(p: Photo): void {
    this.service.updatePhoto(p).subscribe({
      next: r => {
        console.log(r)
        this.saveComplete()
      }
    })
  }

  createPhoto(p: Photo): void {
    this.service.createPhoto(p).subscribe({
      next: r => {
        console.log(r)
        this.saveComplete()
      },
      error: e => console.log(e)
    })
  }

  saveComplete() {
    this.editForm.reset()
    this.router.navigate(['/photos'])
  }

  validControl(controlName: string): boolean | undefined{
    return !this.editForm.get(controlName)?.valid && this.editForm.get(controlName)?.touched;
  }

  invalidUrlFormat(controlName: string): boolean | undefined{
    return this.editForm.get(controlName)?.errors?.['invalidUrl']
  }

  requiredUrl(): boolean | undefined{
    return this.editForm.get("url")?.errors?.['required']
  }

  setThumbnailUrlValidators(): void{
    this.editForm.get("thumbnailUrl")?.setValidators(Validators.compose([Validators.required, UrlValidators.urlValidator]))
  }

  resetThumnailUrl(): void{
    this.editForm.get("thumbnailUrl")?.reset()
    this.editForm.get("thumbnailUrl")?.clearValidators()
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe()
    }

  }


}


// 