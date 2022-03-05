import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';

import { enableRipple,detach  } from '@syncfusion/ej2-base';
enableRipple(true);
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType, isNullOrUndefined } from '@syncfusion/ej2-base';


@Component({
  selector: 'form-dialog',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class formComponent implements OnInit {
  @ViewChild('templateDialogForm') templateDialogForm!: DialogComponent;
  // Create element reference for dialog target element.
  @ViewChild('containerDialogForm', { read: ElementRef }) containerDialogForm!: ElementRef;
  // The Dialog shows within the target element.
  public targetElement!: HTMLElement;
  public proxy: any = this;
public position: object={ X: 'left', Y: 'top' };
  //To get all element of the dialog component after component get initialized.
  ngOnInit() {

    setTimeout(() => {
      this.initilaizeTarget();
    }, 1000);
    
  }

  // Initialize the Dialog component target element.
  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.containerDialogForm.nativeElement.parentElement;
  }
  public height: string = '250px';
  public dialogOpen: EmitType<object> = () => {
      (document.getElementById('sendButton') as any).keypress = (e: any) => {
          if (e.keyCode === 13) { this.updateTextValue(); }
      };
      (document.getElementById('inVal')as HTMLElement).onkeydown = (e: any) => {
          if (e.keyCode === 13) { this.updateTextValue(); }
      };
      document.getElementById('sendButton')!.onclick = (): void => {
          this.updateTextValue();
      };
  }

  public updateTextValue: EmitType<object> = () => {
      let enteredVal: HTMLInputElement = document.getElementById('inVal') as HTMLInputElement;
      let dialogTextElement: HTMLElement = document.getElementsByClassName('dialogText')[0] as HTMLElement;
      let dialogTextWrap : HTMLElement = document.getElementsByClassName('dialogContent')[0] as HTMLElement;
      if (!isNullOrUndefined(document.getElementsByClassName('contentText')[0])) {
          detach(document.getElementsByClassName('contentText')[0]);
      }
      if (enteredVal.value !== '') {
          dialogTextElement.innerHTML = enteredVal.value;
      }
      enteredVal.value = '';
  }

  // Sample level code to handle the button click action
  public onOpenDialogForm (): void {
    console.log("abriendo dialogo")
      // Call the show method to open the Dialog
      this.changePosition('center','center')
      this.templateDialogForm.show();      
  }

  public onCloseDialog(){
    
  }

  public changePosition(posX:string,posY:string){
    this.templateDialogForm!.position = { X: posX, Y: posY };
    document.getElementById("inVal")!.innerHTML = 'Position: {X: "' + posX + '", Y: "' + posY + '"}';
  }
}