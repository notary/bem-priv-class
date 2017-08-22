function extend(old: {}, value: {}) : {} {
    const keys = Object.getOwnPropertyNames(value);
    keys.forEach((key: string) => {
        old[key] = value[key];
    });

    return old;
}

export default class Component {
    private static readonly MODS_KEY: string = 'mods';

    private bemjson: {};

    constructor() {
        this.bemjson = {};
    }

    public get mods() : {} {
        return this._getMods();
    }

    public set mods(mods: {}) {
        extend(this._getMods(), mods);
    }

    public hasMod(name: string, value?: string) : boolean {
        let mods = this.mods;
        let modVal = mods[name];

        if (!mods.hasOwnProperty(name)) {
            return false;
        }

        if (value === null) {
            return Boolean(mods[name]);
        }

        return Boolean(modVal === value);
    }

    private _getMods() : {} {
        if (!this.bemjson[Component.MODS_KEY]) {
            this.bemjson[Component.MODS_KEY] = {};
        }

        return this.bemjson[Component.MODS_KEY];
    }
}
