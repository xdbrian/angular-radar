import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core'
import { SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet'
import { Browser } from '@syncfusion/ej2-base';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations'
import { radar, DATAMOCK } from './mock'
import { TreeViewComponent, NodeCheckEventArgs } from '@syncfusion/ej2-angular-navigations'
import { BdService } from './../service/bd.service'
import { AngularFirestore } from '@angular/fire/firestore'
import { ChartComponent } from '@syncfusion/ej2-angular-charts'

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css'],
  providers: [BdService]
})
export class SheetComponent implements OnInit {

  // maps the appropriate column to fields property
  public fields: Object = { value: "title" };
  // set the placeholder to the AutoComplete input
  public text: string = "Buscar radar";
  //enable the highlight property to highlight the matched character in suggestion list
  public highlight: Boolean = true;

  @ViewChild('treevalidate') tree?: TreeViewComponent;

  public nodeChecked(args: NodeCheckEventArgs): void {
    let isItemChecked = args.action == "check" ? true : false
    let itemfound: number = -1
    console.log(args)
    args.data.forEach(item => {
      let position: any = item['id']
      itemfound = this.data.findIndex(itemSearch => { return itemSearch.id == position })

      if (itemfound > -1) {
        let deleted: radar[] = this.data.splice(itemfound, 1);
        
        if (deleted.length > 0) {
          console.log('this.data add')
          deleted[0].isChecked = isItemChecked
          this.data.push(deleted[0])
          console.log(this.data)

          if(isItemChecked) {
          let newObjet:radar = new radar()
          Object.assign(newObjet, deleted[0]) 
          this.dataRadar.push(newObjet)
          }else{
            this.dataRadar.find(deleted[0])
          }
        }
      }
    })
    /*

      let itemfound:radar
      itemfound = this.data.find(itemSearch =>{return itemSearch.id ==position }) as radar
      if (itemfound != null) {


        let newObjet:radar = new radar
        if(args.action=="check"){
          console.log(itemfound)
          console.log('this.dataRadar.push(itemfound)')
        Object.assign(newObjet, itemfound)        
        this.dataRadar.push(newObjet)
        }
        
      }*/
/*
      console.log(this.chartContainer)
      if (this.chartContainer) {
        console.log('if (this.chartContainer)')
        //this.chartContainer.series[0].dataSource = this.data        
        //this.chartContainer?.dataBind();
      }
    */
  }

  deleteNode(args: any) {
    let node = args.target.closest('.e-list-item');
    //to remove node in TreeView
    this.tree?.removeNodes([node]);
    // you can get the updated data 
    console.log(this.tree?.getTreeData());

  }

  public listCheckedSelectedRadar: string[] = []
  public selected: number = 0
  public title: string = ""
  public data: radar[] = []
  public dataRadar: radar[] = []
  public mock: any[] = DATAMOCK
  public field: Object = { dataSource: this.mock, id: 'nodeId', text: 'title', iconCss: 'icon' };

  public showFormulaBar: Boolean = false
  public tooltip: Object = {}

  @ViewChild('spreadsheetObj') spreadsheetObj: SpreadsheetComponent | undefined;

  public primaryXAxis: Object = {}
  //Initializing Primary Y Axis
  public primaryYAxis: Object = {}


  @ViewChild('chart') chartContainer: ChartComponent | undefined;
  @ViewChild('leftSidebar') leftSidebar: SidebarComponent | undefined;
  @ViewChild('rightSidebar') rightSidebar: SidebarComponent | undefined;

  public width: string = '250px';
  public widthRight: string = '400px';
  public position: string = 'Right';
  public type: string = 'Push';
  public marker: Object = { visible: true, width: 10, height: 10, dataLabel: { name: 'x' } };

  constructor(db: AngularFirestore) {
    let dataitem = new radar()
    this.mock.forEach(element => {
      dataitem = new radar()
      Object.assign(dataitem, element)
      this.data.push(dataitem)
      this.tooltip = dataitem.tooltip
      this.primaryYAxis = dataitem.primaryYAxis
      this.primaryXAxis = dataitem.primaryXAxis
    });
    this.mock.forEach((value: radar, index: number) => { value.nodeId = +value.id })

    console.log(this.data)
  }

  uploadRadar(positionsChecked: any[]): void {
    this.data.forEach(item => { item.isChecked = false })
    positionsChecked.forEach(checked => {
      if (checked) {
        console.log('checked.node')
        console.log(checked)
        this.data[checked].isChecked = true
      }

    })

    console.log('uploadRadar')
    console.log(this.data)

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


    let dataitem = new radar()
    Object.assign(dataitem, this.mock[this.selected])
    dataitem.data = jsonObject.slice(1)
    console.log('dataitem')
    console.log(dataitem)
    this.mock[this.selected] = dataitem
    this.data[this.selected].data = jsonObject.slice(1)
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

  showRightToggle(args?: any) {
    this.spreadsheetObj?.refresh()
    this.rightSidebar?.show()
  }
}
