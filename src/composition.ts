export interface IBemJson {
    json(): object;
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
                this.content.push(composition.json());
            });
        }

        return this._bemjson;
    }

    public abstract get content() : object[]

    addComposition<T extends IBemJson>(block: T) {
        this.compositions.push(block);
    }

    addCompositions<T extends IBemJson>(blocks: T[]) {
        blocks.forEach((block) => {
            this.addComposition(block);
        });
    }
}
