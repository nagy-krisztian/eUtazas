import Felszállás from "./Felszállás";

export default class FelszállásJegy extends Felszállás {
    private _jegyekSzáma: number;

    public get érvényesFelszállás(): boolean {
        return this._jegyekSzáma > 0;
    }

    constructor(sor: string) {
        super(sor);
        this._jegyekSzáma = parseInt(sor.split(" ")[4]);
    }
}
