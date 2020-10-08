export default abstract class Felszállás {
    protected _megállóSorszáma: number;
    protected _idő: Date;
    protected _kártyaAzon: string;

    public get érvényesFelszállás(): boolean {
        return false;
    }

    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this._megállóSorszáma = parseInt(m[0]);
        // Felszállás időpontja: ééééhhnn-óópp
        const év: number = parseInt(m[1].substr(0, 4));
        const hónap: number = parseInt(m[1].substr(4, 2)) - 1; // TS-JS hónapok számozása 0-val indul
        const nap: number = parseInt(m[1].substr(6, 2));
        const óra: number = parseInt(m[1].substr(9, 2));
        const perc: number = parseInt(m[1].substr(11, 2));
        this._idő = new Date(év, hónap, nap, óra, perc, 0, 0);
        this._kártyaAzon = m[2];
    }
}
