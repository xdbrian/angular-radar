import { Component, OnInit, ViewChild } from '@angular/core';
import { SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
import { Browser } from '@syncfusion/ej2-base';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { radar, DATAMOCK } from './mock'
import { TreeViewComponent, NodeCheckEventArgs } from '@syncfusion/ej2-angular-navigations';
import { BdService } from './../service/bd.service'
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css'],
  providers: [ BdService ]
})
export class SheetComponent implements OnInit {

  public searchData: { [key: string]: Object }[] = [
    { Name: 'Australia', Code: 'AU' },
    { Name: 'Bermuda', Code: 'BM' },
    { Name: 'Canada', Code: 'CA' },
    { Name: 'Cameroon', Code: 'CM' },
    { Name: 'Denmark', Code: 'DK' },
    { Name: 'France', Code: 'FR' },
    { Name: 'Finland', Code: 'FI' },
    { Name: 'Germany', Code: 'DE' },
    { Name: 'Greenland', Code: 'GL' },
    { Name: 'Hong Kong', Code: 'HK' },
    { Name: 'India', Code: 'IN' },
    { Name: 'Italy', Code: 'IT' },
    { Name: 'Japan', Code: 'JP' },
    { Name: 'Mexico', Code: 'MX' },
    { Name: 'Norway', Code: 'NO' },
    { Name: 'Poland', Code: 'PL' },
    { Name: 'Switzerland', Code: 'CH' },
    { Name: 'United Kingdom', Code: 'GB' },
    { Name: 'United States', Code: 'US' }];
    // maps the appropriate column to fields property
    public fields: Object = { value: "Name" };
    // set the placeholder to the AutoComplete input
    public text: string = "Find a country";
    //enable the highlight property to highlight the matched character in suggestion list
    public highlight: Boolean = true;
    
@ViewChild ('treevalidate') tree?: TreeViewComponent;

public nodeChecked(args: NodeCheckEventArgs): void{
  console.log("The checked node's id is: "+this.tree?.checkedNodes);

  if(this.tree?.checkedNodes[0])
  this.uploadRadar(this.tree?.checkedNodes[0])  
}

deleteNode(args:any){
  let node = args.target.closest('.e-list-item');
   //to remove node in TreeView
   this.tree?.removeNodes([node]);
   // you can get the updated data 
   console.log(this.tree?.getTreeData());
}


  public selected:number=0
  public title: string
  public data: Object[] = []
  public mock:any[] = DATAMOCK
  public field:Object ={  dataSource: this.mock, id: 'nodeId', text: 'title', iconCss: 'icon'};

  public showFormulaBar: Boolean = false
  public tooltip: Object

  @ViewChild('spreadsheetObj')
  public spreadsheetObj: SpreadsheetComponent | undefined;

  public primaryXAxis: Object
  //Initializing Primary Y Axis
  public primaryYAxis: Object


  @ViewChild('leftSidebar') leftSidebar: SidebarComponent | undefined;
  @ViewChild('rightSidebar') rightSidebar: SidebarComponent | undefined;

  public width: string = '250px';
  public widthRight: string = '400px';
  public position: string = 'Right';
  public type: string = 'Push';
  public marker: Object = { visible: true, width: 10, height: 10, dataLabel: { name: 'x' } };


  constructor(db: AngularFirestore) {
    let dataitem = new radar()
    Object.assign(dataitem, this.mock[0])
    this.data = dataitem.data
    this.tooltip = dataitem.tooltip
    this.primaryYAxis = dataitem.primaryYAxis
    this.primaryXAxis = dataitem.primaryXAxis
    this.title = dataitem.title

    this.mock.forEach((value:radar,index:number)=>{ value.nodeId=index })

    db.collection('company').valueChanges().subscribe(resData => { 
      console.log('resData')
      console.log(resData)
      let dataSource:any[] = resData
      let length = resData.length;
      let  i = 0
      for (i = 0; i < length; i++) {}
      console.log(dataSource[i])
    })
  }

  public band: boolean = false
  uploadRadar(position:any): void {
    this.selected=position
    let dataitem = new radar()
    Object.assign(dataitem, this.mock[position])

    this.band = !this.band
    this.data = dataitem.data
    this.tooltip = dataitem.tooltip
    this.primaryYAxis = dataitem.primaryYAxis
    this.primaryXAxis = dataitem.primaryXAxis
    this.title = dataitem.title
  }

  ngOnInit(): void {
    this.leftSidebar?.show()
  }


  dataSourceChanged(): void {
    
        let jsonObject: any[] = [];
        let cell: any[] = []
    
        this.spreadsheetObj?.getActiveSheet().rows?.map(item => {
          let xValue: any
          let yValue: any
          let zValue: any
          item?.cells?.forEach((dato, key) => {
            if (key == 0)
              zValue = dato.value
            else if (key == 1)
              xValue = dato.value
            else
              yValue = dato.value
          })
          return { "text": zValue, "x": xValue, "y": yValue }
        }).forEach(final => {
          jsonObject.push(final)
        })
        this.data = jsonObject.slice(1)

        let dataitem = new radar()
        Object.assign(dataitem, this.mock[this.selected])
        dataitem.data=this.data
        console.log('dataitem')
        console.log(dataitem)
        this.mock[this.selected]=dataitem
  }

  isValid(item: any, back: any) {
    return item ? item : back
  }

  leftToggle() {
    this.leftSidebar?.toggle();
    this.showFormulaBar = !this.showFormulaBar
  }
  rightToggle() {
    this.spreadsheetObj?.refresh()
    this.rightSidebar?.toggle();
  }

  showRightToggle(args?:any) {
    this.spreadsheetObj?.refresh()
    this.rightSidebar?.show()
  }
}
