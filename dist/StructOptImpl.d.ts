import { Instance, IStructOpt, IOption } from './interfaces';
export declare class StructOptImpl<T> {
    key: string;
    name: string;
    about: string;
    version: string;
    options: IOption[];
    allowTrailing: boolean;
    type: T;
    constructor({ key, name, about, version, allowTrailing }: IStructOpt);
    allPositionalsFilled(parsed: Record<string, any>): boolean;
    addOption(option: IOption): void;
    parse([x, ...xs]: string[], parsed?: Record<string, any>): Instance<T>;
    validate(result: Instance<T>): void;
}
//# sourceMappingURL=StructOptImpl.d.ts.map