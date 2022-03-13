
import { Component, OnInit, ViewChild,ViewEncapsulation  } from '@angular/core'
import { SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet'
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations'
import { radar, DATAMOCK } from './mock'
import { TreeView } from '@syncfusion/ej2-navigations';
import { NodeCheckEventArgs  } from '@syncfusion/ej2-angular-navigations'
//import { AngularFirestore } from '@angular/fire/firestore'
import { ChartComponent, SeriesModel } from '@syncfusion/ej2-angular-charts';
import { DataManager, Query, Predicate } from '@syncfusion/ej2-data';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SheetComponent implements OnInit {

  // maps the appropriate column to fields property
  public fields: Object = { value: "title" };
  // set the placeholder to the AutoComplete input
  public text: string = "Buscar radar";
  //enable the highlight property to highlight the matched character in suggestion list
  public highlight: Boolean = true;
  public valueFilter: string = ""
  //Habilita la opción de seleccionar multiples radar y mostrarlos en un sólo
  public isShowCheckBox: Boolean = true

  @ViewChild('treevalidate') tree?: TreeView;
  @ViewChild('chart') public chart: ChartComponent | undefined;
  @ViewChild('spreadsheetObj') spreadsheetObj: SpreadsheetComponent | undefined;  
  @ViewChild('leftSidebar') leftSidebar: SidebarComponent | undefined;
  @ViewChild('formSidebar') formSidebar: SidebarComponent | undefined;
  
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
  public position: string = 'Left';
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

   // this.changeDataSource(this.dataMenuLeft)

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

  ngOnInit(): void {
    setTimeout(() => {
      this.leftToggle()
    })

    this.formSidebar?.toggle
  }

  changeDataSource(arg:any) {
    if(this.valueFilter=== "" || this.valueFilter === null){
      this.field = { dataSource: this.dataMenuLeft, id: 'nodeId'};
      //this.dataMenuLeft.forEach(item => item.isChecked =false)

      return
    }

    console.log('this.valueFilter')
    console.log(this.valueFilter)

    console.log('buscando cambios')

    let predicate = new Predicate('title', 'contains', this.valueFilter, true);
    let filteredList = new DataManager(this.dataMenuLeft).executeLocal(new Query().where(predicate));
    let predicats = [], _array = [], _filter = [];
    
    //let query = new Query().where(new Predicate.or(filteredList));
    
    console.log('filteredList')
    console.log(filteredList)

    if(filteredList )
    if(this.tree)
    this.field = { dataSource: filteredList, id: 'nodeId'};
   /* this.tree.fields = {
        dataSource: filteredList, id: 'nodeId', text: 'title'
    }*/
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

  showFormToogle() {
    this.spreadsheetObj?.refresh()
    this.formSidebar?.toggle()
  }

      // defined the array of data
      public localData: Object[] = [
        { id: 1, name: 'Steven Buchanan', eimg: '10', job: 'CEO'  },
       { id: 2, name: 'Laura Callahan', eimg: '2', job: 'Product Manager' },
       { id: 3,  name: 'Andrew Fuller', eimg: '7', job: 'Team Lead' },
   ];
   public fieldList:Object ={ dataSource: this.localData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
   

}
