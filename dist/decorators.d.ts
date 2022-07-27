import 'reflect-metadata';
import { IStructOpt, IOption } from './interfaces';
export declare function StructOpt(args?: Omit<IStructOpt, 'key'>): (constructor: Function) => void;
export declare type OptionsArgs<T> = Omit<IOption<T>, 'key' | 'type' | 'repeated'> & Partial<Pick<IOption<T>, 'type'>>;
export declare function Option<T>(args?: OptionsArgs<T>): (target: any, propertyKey: string) => void;
//# sourceMappingURL=decorators.d.ts.map