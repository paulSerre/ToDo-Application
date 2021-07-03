import { Component, Input, OnInit } from '@angular/core';
import { FoldersService } from 'src/app/services/folders.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {

  @Input() id: number;
  @Input() index: number;
  @Input() folderName: string;

  constructor(private foldersService: FoldersService) { }

  ngOnInit(): void {
  }

  delete() {
    this.foldersService.deleteFolder(this.id);
  }

}
