import { Location } from '@angular/common';
import { ListModel } from './../../models/list.model';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-render',
  templateUrl: './render.component.html',
  styleUrl: './render.component.scss'
})
export class RenderComponent implements OnInit {
  _eventadd: number;
  @Input() description: any;
  @Input() data: any;
  descriptions: any;
  datas: any;
  lists: any [] = [];
  isDropDownBoxOpened = false;
  

  constructor(private sanitizer: DomSanitizer, private location: Location, private ListModel: ListModel) {}

  ngOnInit() {
      this.datas = this.data;
      this.descriptions = this.description;
      let i =0;
      for (let description of this.descriptions) {
          if(description.listtype){
              let result = this.getLists(i,description.listtype);
          }
          i++;
      }
  }

  async getLists(i,code) {
      var results: any = await this.ListModel.getAllByCode(code);
      if(results.length > 0){
          this.lists[code] = results;
      }
  }

  handleEvent(){
  }
}
