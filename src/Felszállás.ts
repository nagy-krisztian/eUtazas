export default abstract class Felszállás {
    protected _megállóSorszáma: number;
    protected _idő: Date;
    protected _kártyaAzon: string;

    public static napokszáma(e1: number, h1: number, n1: number, e2: number, h2: number, n2: number): number {
        h1 = (h1 + 9) % 12;
        e1 = e1 - ~~(h1 / 10);
        const d1 = 365 * e1 + ~~(e1 / 4) - ~~(e1 / 100) + ~~(e1 / 400) + ~~((h1 * 306 + 5) / 10) + n1 - 1;
        h2 = (h2 + 9) % 12;
        e2 = e2 - ~~(h2 / 10);
        const d2 = 365 * e2 + ~~(e2 / 4) - ~~(e2 / 100) + ~~(e2 / 400) + ~~((h2 * 306 + 5) / 10) + n2 - 1;
        return d2 - d1;
    }

    public get érvényesFelszállás(): boolean {
        return false;
    }

    public get megállóSorszáma(): number {
        return this._megállóSorszáma;
    }

    public get kedvezményesUtazás(): boolean {
        return false;
    }

    public get ingyenesUtazás(): boolean {
        return false;
    }

    public get lejárHáromNap(): boolean {
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
