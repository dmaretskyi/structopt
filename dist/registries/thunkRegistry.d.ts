import { StructOptImpl } from '../StructOptImpl';
declare type StructOptThunk = (structOpt: StructOptImpl<any>) => void;
export declare function addThunk(thunk: StructOptThunk): void;
export declare function flushThunk(structOpt: StructOptImpl<any>): void;
export {};
//# sourceMappingURL=thunkRegistry.d.ts.map