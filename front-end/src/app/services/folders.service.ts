import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Folder } from '../models/folder.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FoldersService {

  private folders: Folder[] = [];
  folderSubject = new Subject<Folder[]>();

  private url:string = environment.BACKEND_HTTPS_SERVER;
  private endpoint:string = "/folders";

  constructor(private http: HttpClient) {
    this.getFolders();
  }

  getFolderById(id: number) {
    const folder = this.folders.find(
      (s) => {
        return s.folderId === id;
      }
    );
    return folder;
  } 

  emitFolderSubject() {
    this.folderSubject.next(this.folders.slice());
  }

  getFolders() {
    this.http
      .get<any>(this.url+this.endpoint)
      .subscribe(
        (response) => {
          this.folders = response;
          this.emitFolderSubject()
        },
        (error) => {
          console.log('Error : ' + error);
        }
      )
  }

  createNewFolder(newFolder: Folder) {
    this.http
      .post(this.url+this.endpoint, {
        "title": newFolder.title
      })
      .subscribe(
        (response: Folder) => {
          console.log("Successfully added.", response);
          this.folders.push(response);
          this.emitFolderSubject();
        },
        (error) => {
          console.log("Error : ", error);
        }
      )
  }

  deleteFolder(id: number) {
    // Delete the element from view.
    const elementPos = this.folders.map(function(o) { return o.folderId;}).indexOf(id);
    this.folders.splice(elementPos,1);
    // Delete the element from database.
    this.http
      .delete(this.url+this.endpoint+"/"+id)
      .subscribe(
        (_) => {
          console.log("Successfully deleted.");
          this.emitFolderSubject();
        },
        (error) => {
          console.log("Error : ", error);
        }
      )
  }

}
