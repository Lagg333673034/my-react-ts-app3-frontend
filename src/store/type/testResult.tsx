export interface ITestResult{
    id: number,
    udln: Date,
    u_cr: number,
    d_cr: Date,
    u_upd: number,
    d_upd: Date,

    idUserOwner: number,
    testName: string,
    emailRegistred: string,
    emailNotRegistred: string,
    timeStart:string,
    timeStart0:string,
    timeFinish:string,
    timeFinish0:string,
    sort: number,
    questionCount:number,
}

