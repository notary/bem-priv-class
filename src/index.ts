import extend from './extend';
import {Composition} from './Composition';

export interface IDefaultParams {
    defaultParams: object;
}

export abstract class Block extends Composition implements IDefaultParams {
    private static readonly MODS_KEY: string = 'mods';
    private static readonly MIX_KEY: string = 'mix';
    private static readonly ATTRS_KEY: string = 'attrs';
    private static readonly PARAMS_KEY: string = 'js';
    private static readonly CONTENT_KEY: string = 'content';

    constructor(params?: object) {
        super();

        this._bemjson = extend({
            block: this.block
        }, this.defaultParams);

        if (params) {
            this._bemjson = extend(this._bemjson, params);
        }
    }

    public get block() {
        return (<any>this).constructor.name.toLowerCase();
    }

    public abstract get defaultParams() : object;

    public get mods() : object {
        return this._getProp(Block.MODS_KEY);
    }

    public set mods(mods: object) {
        this._bemjson[Block.MODS_KEY] = mods;
    }

    public addMods(mods: object) : void {
        this._extendProp(Block.MODS_KEY, mods);
    }

    public get mix() : object | [object] {
        return this._getProp(Block.MIX_KEY);
    }

    public set mix(mix: object | [object]) {
        this._bemjson[Block.MIX_KEY] = mix;
    }

    public addMix(mix: object | [object]) : void {
        let currentMix = this._getProp(Block.MIX_KEY);

        if (Array.isArray(mix)) {
            currentMix = (currentMix as [object]).concat(mix);
        } else {
            (currentMix as [object]).push(mix);
        }

        this._bemjson[Block.MIX_KEY] = currentMix;
    }

    public get attrs() : object {
        return this._getProp(Block.ATTRS_KEY);
    }

    public set attrs(attrs: object) {
        this._bemjson[Block.ATTRS_KEY] = attrs;
    }

    public addAttrs(attrs: object) : void {
        this._extendProp(Block.ATTRS_KEY, attrs);
    }

    public get params() : object {
        return this._getProp(Block.PARAMS_KEY);
    }

    public set params(params: object) {
        this._extendProp(Block.PARAMS_KEY, params);
    }

    public get content() : object | [object] {
        return this._getProp(Block.CONTENT_KEY);
    }

    public set content(content: object | [object]) {
        this._bemjson[Block.CONTENT_KEY] = content;
    }

    public addProps(props: object) : void {
        extend(this._bemjson, props);
    }

    private _getProp(key: string) : object | [object] {
        if (!this._bemjson[key]) {
            this._bemjson[key] = key === Block.MIX_KEY ? [] : {};
        }

        return this._bemjson[key];
    }

    private _extendProp(key: string, value: object) : void {
        extend(this._getProp(key), value);
    }
}
