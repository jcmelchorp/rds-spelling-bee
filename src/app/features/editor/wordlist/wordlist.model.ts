export interface Wordlist {
    id?:string;
    level?:string;
    description?: string;
    words?: Word[];
    timestamp?:number;
}

export interface Word {
    id?:string;
    label?:string;
    staged?:boolean;
}

export const Grades:any = [
    'Secundaria',
    '6° de Primaria',
    '5° de Primaria',
    '4° de Primaria',
    '3° de Primaria',
    '2° de Primaria',
    '1° de Primaria',
]
    