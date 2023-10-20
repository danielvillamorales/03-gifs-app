import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) { }

  public isLoaded: boolean = false;

  get tags() {
    return  this.gifsService.tagsHistory;
  }


  searchTag(tag: string) {
    this.gifsService.searchTag(tag);
  }

  chanceLoaded(){
    this.isLoaded = !this.isLoaded;
  }

}
