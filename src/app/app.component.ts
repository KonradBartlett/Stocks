import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  amount: number = 0;   // amount of sales being made
  total: number = 0;    // total value made by selling

  Sales: any = [];      // array storing information about the sales
  Diffs: any = [];      // array storing difference between any 2 valid days
  Days: any = [];       // array storing stock price for a given day

  constructor() {
    // generate random amount of sale times
    this.amount = Math.floor(Math.random() * 4) + 2;
    // generate random stock values for each day
    for(var x = 0; x < Math.floor(Math.random() * 5 + 5); x++){
      this.Days.push({Day: x + 1, Value: Math.floor(Math.random() * 40 + 10)});
    }
    console.log(this.Days);
    // generate difference values
    this.checkDiffs();
    console.log(this.Diffs);
    // get the max values for the intended number of sales
    this.checkMax();
    console.log(this.Sales);
    // add profit
    this.totalValues();
    console.log(this.total);
  }

  checkDiffs(){
    // for each value in the week
    for(var x in this.Days){
      // for each day in the week
      for(var y in this.Days){
        // if you're not a previous day
        if(parseInt(y) > parseInt(x)){
          // add the difference value between if you were bought and sold on a later day
          this.Diffs.push({Bought: parseInt(x) + 1, Value1: this.Days[x].Value, Sold: parseInt(y) + 1, Value2: this.Days[y].Value, Diff: this.Days[y].Value - this.Days[x].Value});
        }
      }
    }
  }

  checkMax(){
    var done = []; // Diff array index that have already been used
    var c;         // current local max index
    var localMax = {Day1: null, Value1: null, Day2: null, Value2: null, Diff: null};   // current max value
    // for amount of sales being made
    for(var x = 0; x < this.amount; x++){
      // for difference between days
      for(var y in this.Diffs){
        // if difference is higher, and not already taken
        if(this.Diffs[y].Diff > localMax.Diff
          && !done.includes(y)){
            // set highest value to new highest value
            localMax = {Day1: this.Diffs[y].Bought, Value1: this.Diffs[y].Value1, Day2: this.Diffs[y].Sold, Value2: this.Diffs[y].Value2, Diff: this.Diffs[y].Diff};
            // add index of completed sale
            c = y;
          }
      }
      // add c to the list of sales that have been made to avoid duplicate sales
      done.push(c);
      // reset index
      c = null;
      // add diff record to 
      this.Sales.push(localMax);
      // reset localmax
      localMax = {Day1: null, Value1: null, Day2: null, Value2: null, Diff: null}; 
    }
  }

  totalValues(){
    for(var x in this.Sales){
      this.total += this.Sales[x].Diff;
    }
  }
}

