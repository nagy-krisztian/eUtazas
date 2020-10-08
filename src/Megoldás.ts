import fs from "fs";
import Felszállás from "./Felszállás";
import FelSzállásBérlet from "./FelszállásBérlet";
import FelszállásJegy from "./FelSzállásJegy";

export default class Megoldás {
    private _utasAdatok: Felszállás[] = [];

    public get felszállókSzáma(): number {
        return this._utasAdatok.length;
    }

    public get érvénytelenFelszállás(): number {
        return this._utasAdatok.filter(x => !x.érvényesFelszállás).length;
    }

    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor: string = i.trim();
                const aktTipus: string = aktSor.split(" ")[3];
                if (aktTipus == "JGY") {
                    this._utasAdatok.push(new FelszállásJegy(aktSor));
                } else if (["FEB", "TAB", "NYB", "NYP", "RVS", "GYK"].includes(aktTipus)) {
                    this._utasAdatok.push(new FelSzállásBérlet(aktSor));
                }
            });
    }
}
