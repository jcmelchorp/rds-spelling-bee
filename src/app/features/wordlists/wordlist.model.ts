export interface Wordlist {
    id?:string;
    level?:string;
    words?: string[];
    createdTime:number;
}

export enum Grades {
    PRE1 = '1° de Preescolar',
    PRE2 = '2° de Preescolar',
    PRE3 = '3° de Preescolar',
    PRI1 = '1° de Primaria',
    PRI2 = '1° de Primaria',
    PRI3 = '1° de Primaria',
    PRI4 = '1° de Primaria',
    PRI5 = '1° de Primaria',
    PRI6 = '1° de Primaria',
    SEC1 = '1° de Secundaria',
    SEC2 = '2° de Secundaria',
    SEC3 = '3° de Secundaria',
}