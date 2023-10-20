import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';


const GIPHY_API_KEY : string = 'CBmS4a0fyxH99py8aYnuu3DyvFiPBWCn';
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];
  private serviceURl: string = 'https://api.giphy.com/v1/gifs';

  public gifList: Gif[] = [];

  constructor(private http: HttpClient) {
    this.loadLocalStorage();

   }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string):void{
    tag = tag.trim().toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( t => t !== tag);
    }

    if (tag.length >  0) this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
    localStorage.getItem('history') ? this._tagsHistory = JSON.parse(localStorage.getItem('history')!) : this._tagsHistory = [];
    if (this._tagsHistory.length > 0) this.searchTag(this._tagsHistory[0]);
  }

  async searchTag(tag: string) : Promise<void>{
    if (tag.trim().length === 0) return;
    this.organizeHistory(tag);

    //para alfgo muy sencillo
    //fetch('https://api.giphy.com/v1/gifs/search?api_key=CBmS4a0fyxH99py8aYnuu3DyvFiPBWCn&q=valorant&limit=10')
    //.then( resp => resp.json())
    //.then( data => console.log(data));
    const params = new HttpParams()
    .set('api_key', GIPHY_API_KEY)
    .set('q', tag)
    .set('limit', '12');

    this.http.get<SearchResponse>(`${this.serviceURl}/search`, {params})
    .subscribe( resp  => {
      this.gifList = resp.data;
      console.log(this.gifList);
    });
  }


}
