export interface IQuestion{
    id: number,
    udln: Date,
    u_cr: number,
    d_cr: Date,
    u_upd: number,
    d_upd: Date,

    idTest: number,
    name: string,
    multiplOptions: number,
    sort: number,
    answerCount: number,
    answerTrueCount: number,
}
