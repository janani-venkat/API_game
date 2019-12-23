import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'api-Game';
  constructor(private appService: AppService, private date: DatePipe) { }

  postData(postData){
    this.appService.output(postData).subscribe((data) => {

    });
  }

  excecuteProgramOne(){
    this.appService.input().subscribe((data: any[]) => {
    var count = 0;
    if(data){
    count = data.length;
    }else{
      count = 0;
    }
    var postData = {
      'count' : count
    };
    this.postData(postData);
    });
  }

  excecuteProgramTwo(){
    this.appService.input().subscribe((data: any[]) => {
      var yyyyMMdd = this.date.transform(new Date(),"yyyy-MM-dd");
      var modifiedDate = yyyyMMdd.replace(/-/g, ""); 
      var count = 0;
      for(var i=0 ; i< data.length ;i++){
         if(data[i].startDate != null && data[i].startDate.replace(/-/g, "") <= modifiedDate){
  
         if((data[i].endDate != null && data[i].endDate.replace(/-/g, "") >= modifiedDate) || (data[i].endDate == null)){
          count++;
        }
      }
    }
    var postData = {
      'count' : count
    };
    this.postData(postData);
    });
  }

  excecuteProgramThree(){
    this.appService.input().subscribe((data: any[]) => {
    var category = {};
    var yyyyMMdd = this.date.transform(new Date(),"yyyy-MM-dd");
    var modifiedDate = yyyyMMdd.replace(/-/g, ""); 
    for(var i=0 ; i< data.length ;i++){
       if(data[i].startDate != null && data[i].startDate.replace(/-/g, "") <= modifiedDate){

       if((data[i].endDate != null && data[i].endDate.replace(/-/g, "") >= modifiedDate) || (data[i].endDate == null)){
        if (category.hasOwnProperty(data[i].category) == false) { 
          category[data[i].category] = 1;
        }else{
          category[data[i].category]++;
        }
      }
    }
  }
  this.postData(category);
    });
  }


  excecuteProgramFour(){
    this.appService.input().subscribe((data: any[]) => {
    var totalValue = 0;  
    var yyyyMMdd = this.date.transform(new Date(),"yyyy-MM-dd");
    var modifiedDate = yyyyMMdd.replace(/-/g, ""); 
    for(var i=0 ; i< data.length ;i++){
       if(data[i].startDate != null && data[i].startDate.replace(/-/g, "") <= modifiedDate){

       if((data[i].endDate != null && data[i].endDate.replace(/-/g, "") >= modifiedDate) || (data[i].endDate == null)){
          totalValue += data[i].price;
      }
    }
  }
  var postData = {
    'totalValue' : totalValue
  };
  this.postData(postData);
    });
  }

  ngOnInit() {
  this.appService.start().subscribe((data) => {
    if(data['stage'] != undefined){
    var stageFetch = data['stage'].indexOf("/");
    var stage = data['stage'].substring(0,stageFetch);
    var totalStage = data['stage'].substring(stageFetch+1,data['stage'].length);
    if(stage <= totalStage){
      switch(stage) { 
        case "1": { 
          this.excecuteProgramOne(); 
           break; 
        } 
        case "2": { 
          this.excecuteProgramTwo(); 
           break; 
        } 
        case "3": {
          this.excecuteProgramThree(); 
           break;    
        } 
        case "4": { 
           this.excecuteProgramFour(); 
           break; 
        }  
        default: { 
           console.log("Invalid"); 
           break;              
        } 
     }
    }
  }else{
    console.log("Completed the test");
  }
  });
}
}
