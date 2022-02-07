import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SheetComponent } from './sheet/sheet.component';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { ChartModule, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { AreaSeriesService, LineSeriesService, ExportService, ColumnSeriesService, StackingColumnSeriesService, StackingAreaSeriesService, RangeColumnSeriesService, ScatterSeriesService, PolarSeriesService, CategoryService, RadarSeriesService, ILoadedEventArgs, SplineSeriesService} from '@syncfusion/ej2-angular-charts';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns'; 

//import { YesNoPipe } from './yes-no.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SheetComponent,
    //YesNoPipe,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    SpreadsheetAllModule,

    TabModule,

    ChartModule, 
    ButtonModule, 
    ChartAllModule,

    SidebarModule,

    TreeViewModule,

    AutoCompleteModule,

    BrowserModule,
  ],
  providers: [ AreaSeriesService, LineSeriesService, ExportService, ColumnSeriesService, StackingColumnSeriesService, StackingAreaSeriesService, RangeColumnSeriesService, ScatterSeriesService, PolarSeriesService, CategoryService, RadarSeriesService, SplineSeriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
