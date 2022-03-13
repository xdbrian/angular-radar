import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';

import { enableRipple, detach } from '@syncfusion/ej2-base';
enableRipple(true);
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType, isNullOrUndefined } from '@syncfusion/ej2-base';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'form-dialog',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class formComponent implements OnInit {
  @ViewChild('templateDialogForm') templateDialogForm!: DialogComponent;
  // Create element reference for dialog target element.
  @ViewChild('containerDialogForm', { read: ElementRef })
  containerDialogForm!: ElementRef;
  // The Dialog shows within the target element.
  public targetElement!: HTMLElement;
  public proxy: any = this;
  public position: object = { X: 'left', Y: 'top' };
  //To get all element of the dialog component after component get initialized.

  profileForm: FormGroup;

  ngOnInit() {
    setTimeout(() => {
      this.initilaizeTarget();
    }, 1000);
  }

  // Initialize the Dialog component target element.
  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.containerDialogForm.nativeElement.parentElement;
  };
  public height: string = '250px';

  data = {
    radarName: 'Nancy',
    address: { teamType: '123 Drew Street' },
    dimensiones: [
      { dimensionName: 'hola',
        preguntas: [ 
          { pregunta: 'pregunta', opciones: [{ opcion: 'asd' }] 
        } ]
      }
    ],
  };

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      radarName: ['', Validators.required],
      description: [''],
      address: this.fb.group({
        teamType: [''],
      }),
      dimensiones: this.fb.array([
        this.fb.group({
          dimensionName: [''],
          preguntas: this.fb.array([
            this.fb.group({ 
              pregunta: [''],
              opciones: this.fb.array([
                this.fb.group({ opcion: [''] })
              ])}),
          ]),
        }),
      ]),
    });
  }

  
  addOption(): FormGroup {
    return this.fb.group({
      option: ['', Validators.required],
      value: ['', Validators.required],
    });
  }
  dimensiones(): FormArray {
    return this.profileForm.get('dimensiones') as FormArray;
  }


  updateProfile() {
    this.profileForm.patchValue({
      radarName: 'Nancy',
      address: {
        teamType: '123 Drew Street',
      },
    });
  }

  addDimension() {

    this.data.dimensiones.push({
      dimensionName: 'hola',
      preguntas: [
        {
          pregunta:'',
          opciones: [{ opcion:''}]
        }
      ],
    });
  }

  addQuestion(asd: any) {
    //this.data.dimensiones[asd].preguntas.push()
  }

  deleteLesson(lessonIndex: number) {
    this.dimensiones().removeAt(lessonIndex);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.profileForm.value);
  }

  public dialogOpen: EmitType<object> = () => {
    (document.getElementById('sendButton') as any).keypress = (e: any) => {
      if (e.keyCode === 13) {
        this.updateTextValue();
      }
    };
    (document.getElementById('inVal') as HTMLElement).onkeydown = (e: any) => {
      if (e.keyCode === 13) {
        this.updateTextValue();
      }
    };
    document.getElementById('sendButton')!.onclick = (): void => {
      this.updateTextValue();
    };
  };

  public updateTextValue: EmitType<object> = () => {
    let enteredVal: HTMLInputElement = document.getElementById(
      'inVal'
    ) as HTMLInputElement;
    let dialogTextElement: HTMLElement = document.getElementsByClassName(
      'dialogText'
    )[0] as HTMLElement;
    let dialogTextWrap: HTMLElement = document.getElementsByClassName(
      'dialogContent'
    )[0] as HTMLElement;
    if (!isNullOrUndefined(document.getElementsByClassName('contentText')[0])) {
      detach(document.getElementsByClassName('contentText')[0]);
    }
    if (enteredVal.value !== '') {
      dialogTextElement.innerHTML = enteredVal.value;
    }
    enteredVal.value = '';
  };

  // Sample level code to handle the button click action
  public onOpenDialogForm(): void {
    console.log('abriendo dialogo');
    // Call the show method to open the Dialog
    this.changePosition('center', 'center');
    this.templateDialogForm.show();
  }

  public onCloseDialog() {}

  public changePosition(posX: string, posY: string) {
    this.templateDialogForm!.position = { X: posX, Y: posY };
    document.getElementById('inVal')!.innerHTML =
      'Position: {X: "' + posX + '", Y: "' + posY + '"}';
  }
}
