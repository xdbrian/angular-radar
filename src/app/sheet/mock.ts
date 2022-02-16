export class radar {
    public id:string=''
    public title:string=''
    public icon:string=''
    public nodeId:number= 1
    public primaryXAxis: any
    public primaryYAxis: any
    public data: Object[] = []
    public tooltip: any   
    public isChecked: boolean = false
}

export let DATAMOCK: Object[] = 
    [{
      id:'2021',
      title: 'Team Enrolamiento',
      icon: "folder",     
      isChecked: false,
      primaryXAxis: {
        valueType: 'Category',
        labelPlacement: 'OnTicks',        
        interval: 1
      },
      primaryYAxis: {
        minimum: 0, 
        maximum: 5,         
        interval: 1,
        title: 'Efficiency',
        labelFormat: '{value}'
      },
      tooltip: {
        enable: true, 
        format: '${point.text} : <b>${point.y}</b>'
      },
      data: [
        { text: 'ENERO', x: 'ENE', y: 1 },
        { text: 'FEBRERO', x: 'FEB', y: 2 },
        { text: 'MARZO', x: 'MAR', y: 1 },
        { text: 'ABRIL', x: 'ABR', y: 2 },
        { text: 'MAYO', x: 'MAY', y: 3 },
        { text: 'JUNIO', x: 'JUN', y: 3 },
        { text: 'JULIO', x: 'JUL', y: 4 },
        { text: 'AGOSTO', x: 'AGO', y: 5 },
        { text: 'SEPTIEMBRE', x: 'SEP', y: 5 },
        { text: 'OCTUBRE', x: 'OCT', y: 1 },
        { text: 'NOVIEMBRE', x: 'NOV', y: 2 },
        { text: 'DICIEMBRE', x: 'DIC', y: 1 }
      ]
    },
    {
      id:'2022',
        title: 'EXCELENCIA OPERACIONAL',
        icon: "folder",
        isChecked: true,
        primaryXAxis: {
          valueType: 'Category',
          labelPlacement: 'OnTicks',        
          interval: 1
        },
        primaryYAxis: {
          minimum: 0, 
          maximum: 5,         
          interval: 1,
          title: 'Efficiency',
          labelFormat: '{value}'
        },
        tooltip: {
          enable: true, 
          format: '${point.text} : <b>${point.y}</b>'
        },
        data: [
          { text: 'ENERO', x: 'ENE', y: 5 },
          { text: 'FEBRERO', x: 'FEB', y: 5 },
          { text: 'MARZO', x: 'MAR', y: 5 },
          { text: 'ABRIL', x: 'ABR', y: 5 },
          { text: 'MAYO', x: 'MAY', y: 5 },
          { text: 'JUNIO', x: 'JUN', y: 5 },
          { text: 'JULIO', x: 'JUL', y: 5 },
          { text: 'AGOSTO', x: 'AGO', y: 5 },
          { text: 'SEPTIEMBRE', x: 'SEP', y: 5 },
          { text: 'OCTUBRE', x: 'OCT', y: 5 },
          { text: 'NOVIEMBRE', x: 'NOV', y: 5 },
          { text: 'DICIEMBRE', x: 'DIC', y: 5 }
        ]
      }
]
  