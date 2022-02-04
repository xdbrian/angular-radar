export class radar {
    public title:string=''
    public icon:string=''
    public nodeId:number= 1
    public primaryXAxis: any
    public primaryYAxis: any
    public data: Object[] = []
    public tooltip: any
    
}

  

    
export let DATAMOCK: Object[] = 
    [{
      title: 'Team Enrolamiento',
      icon: "folder",      
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
        { text: 'Japan', x: 'JPN', y: 1 },
        { text: 'Indonesia', x: 'IDN', y: 2 },
        { text: 'China', x: 'CHN', y: 2 },
        { text: 'India', x: 'IND', y: 2 },
        { text: 'Russia', x: 'RUS', y: 1 },
        { text: 'Vietnam', x: 'VNM', y: 4 },
        { text: 'Pakistan', x: 'PAK', y: 5 },
        { text: 'Nigeria', x: 'NGA', y: 3 },
        { text: 'Germany', x: 'DEU', y: 0 },
        { text: 'Bangladesh', x: 'BGS', y: 1 },
        { text: 'Philippines', x: 'PHL', y: 1 },
        { text: 'Mexico', x: 'MEX', y: 1 }
      ]
    },
   
   
    {
        title: 'EXCELENCIA OPERACIONAL',
        icon: "folder",        
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
  