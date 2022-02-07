import { Component, OnInit, ViewChild } from '@angular/core'
import { SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet'
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations'
import { radar, DATAMOCK } from './mock'
import { TreeViewComponent, NodeCheckEventArgs } from '@syncfusion/ej2-angular-navigations'
//import { AngularFirestore } from '@angular/fire/firestore'
import { ChartComponent, SeriesModel } from '@syncfusion/ej2-angular-charts';
import { DataSourceChangedEventArgs } from '@syncfusion/ej2-spreadsheet';
@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css']
})
export class SheetComponent implements OnInit {

  // maps the appropriate column to fields property
  public fields: Object = { value: "title" };
  // set the placeholder to the AutoComplete input
  public text: string = "Buscar radar";
  //enable the highlight property to highlight the matched character in suggestion list
  public highlight: Boolean = true;

  @ViewChild('treevalidate') tree?: TreeViewComponent;
  @ViewChild('chart') public chart: ChartComponent | undefined;
  public nodeChecked(args: NodeCheckEventArgs): void {

    let position = args.data[0]["id"]

    let itemUpdate: radar = this.data.find(itemSearch => { return itemSearch.id == position }) as radar
    itemUpdate.isChecked = args.action == "check" ? true : false

    if (this.chart) {
      this.dataRadar=[]
      this.chart.destroy();      
      Object.assign(this.dataRadar, this.data.filter(item => item.isChecked == true))

     setTimeout(() => {
      this.chart?.refresh();
    })
      
    }

    console.log('this.dataRadar')
    console.log(this.dataRadar)

  }

  deleteNode(args: any) {
    /*   let node = args.target.closest('.e-list-item');
       //to remove node in TreeView
       this.tree?.removeNodes([node]);
       // you can get the updated data 
       console.log(this.tree?.getTreeData());
   */
  }

  public listCheckedSelectedRadar: string[] = []
  public selectedId: string = '0'
  public selectedIndex: number = 0
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

  @ViewChild('leftSidebar') leftSidebar: SidebarComponent | undefined;
  @ViewChild('rightSidebar') rightSidebar: SidebarComponent | undefined;

  public width: string = '250px';
  public widthRight: string = '400px';
  public position: string = 'Right';
  public type: string = 'Push';
  public marker: Object = { visible: true, width: 10, height: 10, dataLabel: { name: 'x' } };

  constructor(/*db: AngularFirestore*/) {
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
    this.dataRadar = this.data.filter(item => item.isChecked)
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
    setTimeout(() => {
    this.leftToggle()
    })
  }

  changeDataSource(): void {
    
   this. dataSourceChanged(null)
  }

  dataSourceChanged(args: any): void {
    
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
        Object.assign(dataitem, this.mock[this.selectedIndex])
        dataitem.data = jsonObject.slice(1)
        this.mock[this.selectedIndex] = dataitem
        this.data[this.selectedIndex].data = jsonObject.slice(1)    
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
    this.selectedId = args
    this.selectedIndex= this.data.findIndex(item=>{return item.id==args})
    this.spreadsheetObj?.refresh()
    this.rightSidebar?.show()
  }

}
