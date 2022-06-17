import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Address } from 'src/app/models/address';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user : User = new User();
  addresses: any;
  selectedAddress: any = {};

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    console.log("1. On Init of registered Component");
    this.mapService.generateTokken();//For Generating Token
  }

  register() {
    console.log('Register Users');
    console.log({user : this.user});
  }

 /*  onAddressType(value: any) {
    console.log(value);
    // Search addresses from Map API
    this.mapService.getAddresses(value).subscribe(addressResponse => {
      // console.log(addressResponse);
      this.addresses = addressResponse;
    })
  } */

  onAddressType() {
    const address = this.selectedAddress.formattedAddress;
    console.log();
    this.mapService.getAddresses(address).subscribe(addressResponse => {
      this.addresses = addressResponse;
    });
  }


  onSelectAddress(address: any) {
    console.log({ selectedAddress: address });
    this.selectedAddress = address;
    this.user.address = address;
    // To pass the empty list array, as we click/select the address from the list of 5 items then it will pass nothing.
    this.addresses = [];
  }

}
