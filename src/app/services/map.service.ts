import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MapTokenApiResponse } from '../models/map-token';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private tokenUrl =
    '/api/security/oauth/token?grant_type=client_credentials&client_id=33OkryzDZsKXE3m3H4FozU7RseACAMWIVe_jT-NCBOnsvRPIr9VtcNYmePPcYwqx01bop0dMD19atB48ABJXAQ==&client_secret=lrFxI-iSEg_SmROEVtBI55y3Wzl3N_rQD2H9pbJUXBJKBesJ_VaZ0rem9KfGK6pZwQaVfpz8hCFYFxXCBIBHr4UjSSGSNI_h'

  private addressUrl = '/api/places/geocode?itemCount=5&address='
  private tokenResponse!: MapTokenApiResponse;

  constructor(
    private http: HttpClient
  ) { }

  generateTokken() {
    console.log("2. Token Generating...");
    this.http.post(this.tokenUrl, {}).subscribe(
      tokenData => {
        // console.log(tokenData);
        this.tokenResponse = <MapTokenApiResponse>tokenData;
        console.log({ tokenResponse: this.tokenResponse })
      });
  }

  getAddresses(address: String) {
    console.log("Searching for addresses..." + address);
    return this.http.get(this.addressUrl + address, {
      headers: {
        'Authorization': this.tokenResponse.token_type + " " + this.tokenResponse.access_token
      },
    })
      .pipe(map((results: any) => results.copResults));
  }

}
