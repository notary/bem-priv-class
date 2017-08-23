import extend from './extend';

export interface IDefaultParams {
    defaultParams: object;
}

export abstract class BEMPRIV implements IDefaultParams {
    private static readonly MODS_KEY: string = 'mods';
    private static readonly MIX_KEY: string = 'mix';
    private static readonly ATTRS_KEY: string = 'attrs';
    private static readonly PARAMS_KEY: string = 'js';
    private static readonly CONTENT_KEY: string = 'content';

    private _bemjson: object;

    constructor() {
        this._bemjson = {
            block: this.block,
            js: this.defaultParams
        };
    }

    public get block() {
        return (<any>this).constructor.name.toLowerCase();
    }

    public abstract get defaultParams() : object;

    public get json() : object {
        return this._bemjson;
    }

    public get mods() : object {
        return this._getProp(BEMPRIV.MODS_KEY);
    }

    public set mods(mods: object) {
        this._bemjson[BEMPRIV.MODS_KEY] = mods;
    }

    public addMods(mods: object) : void {
        this._extendProp(BEMPRIV.MODS_KEY, mods);
    }

    public get mix() : object | [object] {
        return this._getProp(BEMPRIV.MIX_KEY);
    }

    public set mix(mix: object | [object]) {
        this._bemjson[BEMPRIV.MIX_KEY] = mix;
    }

    public addMix(mix: object | [object]) : void {
        let currentMix = this._getProp(BEMPRIV.MIX_KEY);

        if (Array.isArray(mix)) {
            currentMix = (currentMix as [object]).concat(mix);
        } else {
            (currentMix as [object]).push(mix);
        }

        this._bemjson[BEMPRIV.MIX_KEY] = currentMix;
    }

    public get attrs() : object {
        return this._getProp(BEMPRIV.ATTRS_KEY);
    }

    public set attrs(attrs: object) {
        this._bemjson[BEMPRIV.ATTRS_KEY] = attrs;
    }

    public addAttrs(attrs: object) : void {
        this._extendProp(BEMPRIV.ATTRS_KEY, attrs);
    }

    public get params() : object {
        return this._getProp(BEMPRIV.PARAMS_KEY);
    }

    public set params(params: object) {
        this._extendProp(BEMPRIV.PARAMS_KEY, params);
    }

    public get content() : object | [object] {
        return this._getProp(BEMPRIV.CONTENT_KEY);
    }

    public set content(content: object | [object]) {
        this._bemjson[BEMPRIV.CONTENT_KEY] = content;
    }

    public addProps(props: object) : void {
        extend(this._bemjson, props);
    }

    private _getProp(key: string) : object | [object] {
        if (!this._bemjson[key]) {
            this._bemjson[key] = key === BEMPRIV.MIX_KEY ? [] : {};
        }

        return this._bemjson[key];
    }

    private _extendProp(key: string, value: object) : void {
        extend(this._getProp(key), value);
    }
}
