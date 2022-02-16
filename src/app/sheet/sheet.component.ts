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
  //Habilita la opción de seleccionar multiples radar y mostrarlos en un sólo
  public isShowCheckBox: Boolean = true

  @ViewChild('treevalidate') tree?: TreeViewComponent;
  @ViewChild('chart') public chart: ChartComponent | undefined;
  @ViewChild('spreadsheetObj') spreadsheetObj: SpreadsheetComponent | undefined;  
  @ViewChild('leftSidebar') leftSidebar: SidebarComponent | undefined;
  @ViewChild('rightSidebar') rightSidebar: SidebarComponent | undefined;

  public listCheckedSelectedRadar: string[] = []
  public selectedId: string = '0'
  public selectedIndex: number = 0
  public title: string = ""
  public dataMenuLeft: radar[] = []
  public dataRadar: radar[] = []
  public mock: any[] = DATAMOCK
  public field: Object = { dataSource: this.dataMenuLeft, id: 'nodeId'};

  public showFormulaBar: Boolean = false
  public tooltip: Object = {}

  public primaryXAxis: Object = {}
  //Initializing Primary Y Axis
  public primaryYAxis: Object = {}

  public width: string = '250px';
  public widthRight: string = '400px';
  public position: string = 'Right';
  public type: string = 'Push';
  public marker: Object = { visible: true, width: 10, height: 10, dataLabel: { name: 'x' } };
  

  public nodeChecked(args: NodeCheckEventArgs): void {

    let position = args.data[0]["id"]

    console.log('position')
    console.log(position)

    let itemUpdate: radar = this.dataMenuLeft.find(itemSearch => { return itemSearch.id == position }) as radar
    itemUpdate.isChecked = args.action == "check" ? true : false

    if (args.data.length > 0) {

      if (this.chart)
        //this.chart.destroy();

      this.dataRadar = []

      Object.assign(this.dataRadar, this.dataMenuLeft.filter(item => item.isChecked == true))

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

  constructor(/*db: AngularFirestore*/) {
    this.mock.forEach(element => {
      this.dataMenuLeft.push(element)
      this.tooltip = element.tooltip
      this.primaryYAxis = element.primaryYAxis
      this.primaryXAxis = element.primaryXAxis
    });
    this.mock.forEach((value: radar, index: number) => { value.nodeId = +value.id })

    console.log(this.dataMenuLeft)
    this.dataRadar = this.dataMenuLeft.filter(item => item.isChecked)
  }

  uploadRadar(positionsChecked: any[]): void {
    this.dataMenuLeft.forEach(item => { item.isChecked = false })
    positionsChecked.forEach(checked => {
      if (checked) {
        console.log('checked.node')
        console.log(checked)
        this.dataMenuLeft[checked].isChecked = true
      }

    })

    console.log('uploadRadar')
    console.log(this.dataMenuLeft)

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.leftToggle()
    })
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
    Object.assign(dataitem, this.mock[this.selectedIndex])
    dataitem.data = jsonObject.slice(1)
    this.mock[this.selectedIndex] = dataitem
    let item = jsonObject.slice(1)
    console.log('item')
    console.log(item)
    this.dataMenuLeft[this.selectedIndex].data = item
  }

  isValid(item: any, back: any) {
    return item ? item : back
  }

  leftToggle() {
    this.leftSidebar?.toggle();
    this.showFormulaBar = true
    this.showFormulaBar = false
  }
  rightToggle() {
    this.spreadsheetObj?.refresh()
    this.rightSidebar?.toggle();
  }

  showRightToggle(args?: any) {
    this.selectedId = args
    this.selectedIndex = this.dataMenuLeft.findIndex(item => { return item.id == args })
    this.spreadsheetObj?.refresh()
    this.rightSidebar?.show()
  }




}
