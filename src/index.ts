import { Behavior } from './behavior';

export abstract class Block extends Behavior {
    private static readonly MODS_KEY: string = 'mods';
    private static readonly MIX_KEY: string = 'mix';
    private static readonly ATTRS_KEY: string = 'attrs';
    private static readonly PARAMS_KEY: string = 'js';
    private static readonly CONTENT_KEY: string = 'content';

    protected params: object;

    constructor(params?: object) {
        super();

        this.params = Object.assign(this.defaultParams, params);

        this._bemjson = {
            block: this.block
        };
    }

    protected get defaultParams() : object {
        return {};
    }

    public get block() {
        return (<any>this).constructor.name.toLowerCase();
    }

    public get mods() : object {
        return this._getProp(Block.MODS_KEY);
    }

    public set mods(mods: object) {
        this._bemjson[Block.MODS_KEY] = mods;
    }

    public get mix() : object[] {
        return <object[]>this._getProp(Block.MIX_KEY);
    }

    public set mix(mix: object[]) {
        this._bemjson[Block.MIX_KEY] = mix;
    }

    public get attrs() : object {
        return this._getProp(Block.ATTRS_KEY);
    }

    public set attrs(attrs: object) {
        this._bemjson[Block.ATTRS_KEY] = attrs;
    }

    public get js() : object {
        return this._getProp(Block.PARAMS_KEY);
    }

    public set js(params: object) {
        this._extendProp(Block.PARAMS_KEY, params);
    }

    public get content() : object[] {
        return <object[]>this._getProp(Block.CONTENT_KEY);
    }

    public set content(content: object[]) {
        this._bemjson[Block.CONTENT_KEY] = content;
    }

    public addProps(props: object) : void {
        Object.assign(this._bemjson, props);
    }

    private _getProp(key: string) : object | object[] {
        if (!this._bemjson[key]) {
            this._bemjson[key] = key === Block.MIX_KEY || key === Block.CONTENT_KEY ? [] : {};
        }

        return this._bemjson[key];
    }

    private _extendProp(key: string, value: object) : void {
        Object.assign(this._getProp(key), value);
    }

    static createBlock<T extends Block>(BlockImpl: new (args?: object) => T, params?: object, ...compositions: Composition[]) {
        const block = new BlockImpl(params);
        block.addCompositions(compositions);
        return block;
    }
}
