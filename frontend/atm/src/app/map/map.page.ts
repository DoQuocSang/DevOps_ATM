import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation'; 
import { Component, OnInit, ViewChild ,ElementRef } from '@angular/core'; 
declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  navigateToHomePage(){
    this.router.navigate(['/home']);
  }

  navigateToMappInnerPage(){
    this.router.navigate(['/map-inner']);
  }
}
