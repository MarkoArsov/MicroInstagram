import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { tick } from '@angular/core/testing';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Photo } from './Photo';
import { PhotoService } from './photo.service';

@Component({
  selector: 'pm-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy, AfterViewInit{

  photos: Photo[] = []

  displayedColumns: string[] = ['image', 'title'];
  dataSource!: MatTableDataSource<Photo>;

  sub!: Subscription

  _searchTerm = ""

  constructor(private service: PhotoService){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
   this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.sub = this.service.getPhotos().subscribe({
      next: photos =>  {
        this.photos = photos
        this.dataSource = new MatTableDataSource<Photo>(this.photos)
        this.dataSource.paginator = this.paginator;
      }
    })
  }



  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

}
