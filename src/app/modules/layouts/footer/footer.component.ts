import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  baseUrl: any = document.getElementsByTagName('base')[0].href;
  year = new Date().getFullYear();
  constructor(){}

  ngOnInit() {
  }
}
