export class Cifra {
    constructor(
        public id?: number,
        public nome?: string,
        public artista?: string,
        public concluido?: boolean,
        public baixado?: boolean,
        public comentarios?: string,
        
        // tirar esse abaixo depois
        public price?: number,
        public details?: Details
    ) {}
}

export class Details {
    constructor(public supplier?: string, public keywords?: string[]) { }
}