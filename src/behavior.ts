export interface IBemJson {
    json(): object;
}

export interface IBehavior {
    bemjson: object;
}

export type BehaviorBlock = IBehavior & IBemJson;

export abstract class Behavior implements IBehavior{
    private behaviors: BehaviorBlock[] = [];
    protected _bemjson: object = {};

    public json() : object {
        if (this.behaviors.length) {
            this.behaviors.forEach((behavior) => {
                return behavior.json();
            });
        }

        return this._bemjson;
    }

    public set bemjson(bemjson: object) {
        this._bemjson = bemjson;
    }

    addBehavior<T extends BehaviorBlock>(block: T) {
        block.bemjson = this._bemjson;
        this.behaviors.push(block);
    }
}
