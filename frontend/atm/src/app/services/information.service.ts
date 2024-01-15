import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class InformationService {
    private informationData: string = ""; 

    setInformationData(data: string) {
      this.informationData = data;
    }
  
    getInformationData() {
      return this.informationData;
    }
}