import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Folder } from '../models/folder.model';
import { FoldersService } from '../services/folders.service';

@Component({
  selector: 'app-folders-list',
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss']
})
export class FoldersListComponent implements OnInit {

  folders: Folder[];
  folderSubscription: Subscription;

  constructor(private foldersService: FoldersService) { }

  ngOnInit(): void {
    this.folderSubscription = this.foldersService.folderSubject.subscribe(
      (folders: Folder[]) => {
        this.folders = folders;
      }
    );
    this.foldersService.emitFolderSubject();
  }

  ngOnDestroy() {
    this.folderSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const title = form.value['title'];
    const newFolder = new Folder(title);
    this.foldersService.createNewFolder(newFolder);
    form.reset();
  }

  delete(id: number) {
    this.foldersService.deleteFolder(id);
  }

}
