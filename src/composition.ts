export interface IBemJson {
    json(): object;
    bemjson: object;
}

export abstract class Composition implements IBemJson {
    private compositions: IBemJson[];
    protected _bemjson: object;

    constructor() {
        this.compositions = [];
        this._bemjson = {};
    }

    public json() : object {
        if (this.compositions.length) {
            this.compositions.forEach((composition) => {
                return composition.json();
            });
        }

        return this._bemjson;
    }

    public set bemjson(bemjson: object) {
        this._bemjson = bemjson;
    }

    addComposition<T extends IBemJson>(block: T) {
        block.bemjson = this._bemjson;
        this.compositions.push(block);
    }
}
