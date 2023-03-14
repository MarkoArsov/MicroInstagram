import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, tap, throwError, map, of } from "rxjs";
import { Photo } from "./Photo";

@Injectable({
    providedIn: "root"
})
export class PhotoService{
 private url = "https://jsonplaceholder.typicode.com/photos";

 constructor(private http: HttpClient){}

 getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.url)
 }

 getPhoto(id: number): Observable<Photo> {
    return this.http.get<Photo>(this.url + "/" + String(id))
 }

 updatePhoto(photo: Photo): Observable<Photo>{
   const headers = new HttpHeaders({'Content-Type' : 'application/json'})
   return this.http.put<Photo>(this.url + "/" + String(photo.id), photo, {headers: headers})
 }

 createPhoto(photo: Photo): Observable<Photo>{
   const headers = new HttpHeaders({'Content-Type' : 'application/json'})
   return this.http.post<Photo>(this.url, photo, {headers: headers})
 }

 deletePhoto(photo: Photo): Observable<{}>{
   const headers = new HttpHeaders({'Content-Type' : 'application/json'})
   return this.http.delete<Photo>(this.url + "/" + String(photo.id), {headers: headers})
 }

}