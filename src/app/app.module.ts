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


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBHVA1H7en_yKKCNxIS3bQ201SFz7LzMXQ",
    authDomain: "firechat-ef0de.firebaseapp.com",
    databaseURL: "https://firechat-ef0de-default-rtdb.firebaseio.com",
    projectId: "firechat-ef0de",
    storageBucket: "firechat-ef0de.appspot.com",
    messagingSenderId: "779540722689",
    appId: "1:779540722689:web:caab861e662e4f915d3c00"
  }
};

@NgModule({
  declarations: [
    AppComponent,
    SheetComponent,    
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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [ AreaSeriesService, LineSeriesService, ExportService, ColumnSeriesService, StackingColumnSeriesService, StackingAreaSeriesService, RangeColumnSeriesService, ScatterSeriesService, PolarSeriesService, CategoryService, RadarSeriesService, SplineSeriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
