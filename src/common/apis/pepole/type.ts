export type List = ApiResponseData<{
  value:string,
  label:string
}>

export type audit = ApiResponseData<{
  List: {
    id: string
    name: string
    gender: string
    jobName: string
    primaryStructureName: boolean
    secondaryStructureName: string
    tertiaryStructureName: string
  }[],
  number:number
}>
