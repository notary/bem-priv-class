import { IBemJson } from './behavior'

export interface ICompositioin {
    addComposition<T extends IBemJson>(block: T);
    addCompositions<T extends IBemJson>(blocks: T[]);
    nestedJson() : object;
}

export abstract class Composition implements IBemJson {
    private compositions: IBemJson[];

    public json() : object {
        if (this.compositions.length) {
            this.compositions.forEach((composition) => {
                this.content.push(composition.json());
            });
        }

        super.json();

        return this._bemjson;
    }

    addComposition<T extends IBemJson>(block: T) {
        this.compositions.push(block);
    }

    addCompositions<T extends IBemJson>(blocks: T[]) {
        blocks.forEach((block) => {
            this.addComposition(block);
        });
    }
}
