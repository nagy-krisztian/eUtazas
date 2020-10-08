import fs from "fs";
import Felszállás from "./Felszállás";
import FelSzállásBérlet from "./FelszállásBérlet";
import FelszállásJegy from "./FelSzállásJegy";

interface ImaxKeresés {
    maxFelszálló: number;
    maxElsőMegálló: number;
}
export default class Megoldás {
    private _utasAdatok: Felszállás[] = [];

    public get felszállókSzáma(): number {
        return this._utasAdatok.length;
    }

    public get érvénytelenFelszállás(): number {
        return this._utasAdatok.filter(x => !x.érvényesFelszállás).length;
    }

    public get maxKeresArray(): ImaxKeresés {
        const max: ImaxKeresés = { maxFelszálló: -1, maxElsőMegálló: -1 };
        const statArray: number[] = new Array(30).fill(0);
        this._utasAdatok.forEach(i => {
            statArray[i.megállóSorszáma]++;
        });
        max.maxFelszálló = Math.max(...statArray);
        for (const i in statArray) {
            if (statArray[i] === max.maxFelszálló) {
                max.maxElsőMegálló = parseInt(i);
                break;
            }
        }
        return max;
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
