interface RefeicoesProps {
    horario: string;
    nome: string;
    alimentos: string[];
}

export interface Diet {
    altura: number;
    idade: number;
    nome: string;
    objetivo: string;
    peso: number;
    refeicoes: RefeicoesProps[];
    sexo: string;
    suplementos: string[];
}
