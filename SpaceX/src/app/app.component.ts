import { Component, OnInit } from '@angular/core';
import { CustomService } from './custom.service';
import {Location} from '@angular/common'; 




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'SpaceX';
  data: any = [];
  years = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
  ];
  booleans = [true, false];

  launchSuccess: any = true;
  landingSuccess: any = true ;
  year: any;


  constructor(private http: CustomService, private location: Location) { }

  ngOnInit(): void {
    this.http.get("https://api.spacexdata.com/v3/launches?limit=100")
      .subscribe(data => {
        this.data = data
        
        this.location.go('launches?limit=100&launch_success=true');
      });
  }

  onSuccessfulLaunch(e) {
    this.data = []
    this.launchSuccess = e;
    this.http.get('https://api.spaceXdata.com/v3/launches?limit=100' + `&launch_success=${this.launchSuccess}`)
    .subscribe(data => {
      this.data = data
      
    this.location.go('launches?limit=100&launch_success=' + this.launchSuccess);

    });
  }

  onSuccessfulLanding(e) {
    this.landingSuccess = e;
    this.data = [];

    this.http.get('https://api.spaceXdata.com/v3/launches?limit=100' + `&launch_success=${this.launchSuccess}&land_success=${this.landingSuccess}`)
    .subscribe(data => {
      this.data = data
      
    this.location.go('launches?limit=100&launch_success=' + this.launchSuccess + '&land_success=' + this.landingSuccess);

    });
  }

  onYearSelect(e) {
    this.data = [];

    this.year = e;
    this.http.get('https://api.spacexdata.com/v3/launches?limit=100&' +`&launch_success=${this.launchSuccess}&land_success=${this.landingSuccess}&launch_year=${this.year}`)
    .subscribe(data => {
      this.data = data
      
      this.location.go('launches?limit=100&launch_success=' + this.launchSuccess + '&land_success=' + this.landingSuccess + '&launch_year=' + this.year);

    });
  }


}
