/**
 * Make some member in one object mutual exclusive.
 *
 * @param FromType Create type contains mutual exclusive member from this type
 * @param ExcludeNameUnion Use union type of key to choose mutual exclusive member
 * 
 * @example MutualExclude<{a: number, b: number, c:number}, "b"|"c">
 * = {a: number, b: number, c?: undefined} | {a: number, b?: undefined, c: number} 
 */
export type MutualExclude<FromType, ExcludeNameUnion extends keyof FromType> =
    Pick<FromType, Exclude<keyof FromType, ExcludeNameUnion>>
    & ObjectToOnlyOneEffective<Pick<FromType, ExcludeNameUnion>, UnionToTuple<ExcludeNameUnion>>;

/**
 * Try to break object like: {a: number, b: number}
 * to: {a: number, b?: undefined} | {a?: undefined, b: number}
 */
type ObjectToOnlyOneEffective<FromObject, WithKey> =
    WithKey extends [...infer RestKey, infer LastKey]
    ? LastKey extends keyof FromObject
    ? (Pick<FromObject, LastKey> & Partial<Record<Exclude<keyof FromObject, LastKey>, undefined>>)
    | ObjectToOnlyOneEffective<FromObject, RestKey>
    : never
    : never
    ;

type UnionToTuple<FromUnion> =
    PopLastOfUnion<FromUnion> extends infer LastOfUnion
    ? Exclude<FromUnion, LastOfUnion> extends never
    ? [LastOfUnion]
    : [...UnionToTuple<Exclude<FromUnion, LastOfUnion>>, LastOfUnion]
    : never;

type PopLastOfUnion<Union> =
    InferFunctionsParam<
        InferFunctionsParam<
            UnionToIntersectParamTypeFunctions<
                UnionToIntersectParamTypeFunctions<Union>
            >
        >
    >;

type InferFunctionsParam<FunctionsGroup> =
    [FunctionsGroup] extends [(arg: infer ArgType) => any]
    ? ArgType
    : never;

type UnionToIntersectParamTypeFunctions<Union> =
    Union extends any ? (arg: Union) => any : never;