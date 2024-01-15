import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    constructor() { }
    public async set(key: string, value: any): Promise<void> {
        localStorage.setItem(key, JSON.stringify(value));
    }
    public async get(key: string): Promise<any> {
        let value = localStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value);
        }
        return null;
    }
}