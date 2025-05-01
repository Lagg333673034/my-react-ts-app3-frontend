export interface ISchedule{
    id: number,
    udln: Date,
    u_cr: number,
    d_cr: Date,
    u_upd: number,
    d_upd: Date,
    
    idTest: number,
    testTimeStart: Date,
    testTimeEnd: Date,
    totalTimeForTesting: number,
    sort: number
}
