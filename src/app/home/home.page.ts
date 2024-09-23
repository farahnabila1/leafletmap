import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map!: L.Map;

  constructor() { }

  ngOnInit() { }

  ionViewDidEnter() {
    // Koordinat awal peta
    this.map = L.map('mapId').setView([-7.4545375, 112.5005167], 10);

    // Menambahkan TileLayer untuk OpenStreetMap
    const openStreetMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Menambahkan TileLayer untuk Google Satellite
    const googleSatellite = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      attribution: '&copy; <a href="https://www.google.com/maps">Google</a>'
    });

    // Menambahkan TileLayer untuk Topographic (menggunakan Esri)
    const topographic = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://opentopomap.org/about">OpenTopoMap</a> contributors'
    });

    // Menambahkan baseMaps ke dalam Layer Control
    const baseMaps = {
      "OpenStreetMap": openStreetMap,
      "Satellite": googleSatellite,
      "Topographic": topographic
    };

    // Menambahkan kontrol Layer Control ke peta
    L.control.layers(baseMaps).addTo(this.map);

    // Menambahkan salah satu layer (misalnya OpenStreetMap) sebagai layer default
    openStreetMap.addTo(this.map);

    // Menambahkan marker dengan icon default Leaflet
    const marker = L.marker([-7.4545375, 112.5005167], {
      icon: L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        shadowSize: [41, 41]
      })
    }).addTo(this.map);

    marker.bindPopup('Kabupaten Sidoarjo').openPopup();

  }
}
