import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation'; 
import { Component, OnInit, ViewChild ,ElementRef } from '@angular/core'; 
declare var google: any;

@Component({
  selector: 'app-map-inner',
  templateUrl: './map-inner.page.html',
  styleUrls: ['./map-inner.page.scss'],
})
export class MapInnerPage implements OnInit {
  constructor(private router: Router) { 
    this.mapElement = new ElementRef(undefined);
    this.getCurrentLocation().then((position: any) => {
      console.log('Current Position:', position);
      this.showMap(position.coords.latitude, position.coords.longitude);
    }); 
  }

  ngOnInit() {
  }

  navigateToMapPage(){
    this.router.navigate(['/map']);
  }

  @ViewChild('map', { static: true }) mapElement: ElementRef;
  map: any;
  showMap(latitude: any, longitude: any){
    let latLng = new google.maps.LatLng(latitude, longitude);
    let mapOptions = {
      center: latLng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  getCurrentLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
        const locOptions = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
        Geolocation.getCurrentPosition(locOptions).then((position: any) => {
          resolve(position);
        }).catch(e => {
          reject(e.message);
        });
    });
  }

}
