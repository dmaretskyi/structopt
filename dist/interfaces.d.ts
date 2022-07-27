export interface IStructOpt {
    key: string;
    name?: string;
    about?: string;
    version?: string;
    allowTrailing?: boolean;
}
export interface IOption<T = any> {
    defaultValue?: string;
    description?: string;
    fromOsStr?: boolean;
    long?: string | boolean;
    name?: string;
    required?: boolean;
    requiredIf?: (option: T) => boolean;
    short?: string | boolean;
    type: PrimitiveType;
    key: string;
    repeated: boolean;
}
export declare type PrimitiveType = 'boolean' | 'string' | 'number';
export declare type Instance<T> = (T extends new () => infer C ? C : never) & {
    '_': string[];
};
//# sourceMappingURL=interfaces.d.ts.map