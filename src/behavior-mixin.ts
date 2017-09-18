import { IBemJson } from './composition';

export interface IBemJsonSetter {
    bemjson: object
}

export interface IBehavior {
  addBehavior: void
}

export class Behavior implements IBemJson, IBemJsonSetter {
    private behaviors: IBemJson[] = [];
    private _bemjson: object;

    constructor() {
        this.behaviors = [];
        this._bemjson = {};
    }

    public json(): object {
        if (this.behaviors.length) {
            this.behaviors.forEach((behavior) => {
                behavior.json();
            });
        }

        return this._bemjson;
    }

    public get bemjson(): object {
        return this._bemjson;
    }

    public set bemjson(bemjson: object) {
        this._bemjson = bemjson;
    }

    public addBehavior<T extends IBemJson & IBemJsonSetter>(block: T) {
        block.bemjson = this.bemjson;
        this.behaviors.push(block);
    }
}
