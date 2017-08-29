export interface IBemJson {
    prepareBemJson(): void;
    json: object;
}

export abstract class Composition implements IBemJson {
    private compositions: IBemJson[];
    protected _bemjson: object;

    constructor() {
        this.compositions = [];
        this._bemjson = {};
    }

    public prepareBemJson() {
        if (!this.compositions.length) return;

        this.compositions.forEach((composition) => {
            composition.prepareBemJson()
        });
    }

    public get json() : object {
        this.prepareBemJson();
        return this._bemjson;
    }

    public set json(bemjson: object) {
        this._bemjson = bemjson;
    }

    addComposition<T extends IBemJson>(block: T) {
        block.json = this.json;
        this.compositions.push(block);
    }
}
