import { Collection, FindCursor, type Document, type Filter } from "mongodb";
import type {
  FieldArrayPath,
  FieldArrayPathValue,
  FieldPath,
  FieldPathValue,
  FieldValue,
} from "react-hook-form";
import { $flatten } from "./$flatten";
type NODOT<T extends string = string> = T extends `${infer K}.${infer _}`
  ? never
  : T;
// k in string extends FieldArrayPath<Filter<TSchema>>
// type SetArrayPath<TSchema extends Document> =  `${FAP}.$.${FieldPath<Filter<TSchema>, FieldArrayPathValue<TSchema, FAP>> }`
type $Path<TSchema extends Document> = `$${FieldPath<TSchema>}`;
// type $set<TSchema> = Record<NODOT<keyof TSchema>, FieldValue<TSchema>>;
// type ArrayKey<T, K> = T[K] extends ReadonlyArray ? K : never;
// type FieldArrayKey<T> = FieldArray
export type UnwrapArrayValue<V> = NonNullable<V> extends any[]
  ? NonNullable<V>[number]
  : V;
export declare type $Set<TSchema extends Document> = {
  [P in keyof TSchema]?:
    | (TSchema[P] extends Record<string, any>
        ? $Set<UnwrapArrayValue<TSchema[P]>>
        : TSchema[P])
    | $Path<TSchema>;
} & Record<string, any>;
export type $SetResult<TSchema extends Document, Set extends $Set<TSchema>> = {
  [P in keyof TSchema]?: Set[P] extends `$${infer K extends FieldPath<TSchema>}`
    ? FieldPathValue<TSchema, K>
    : Set[P] extends Record<string, any>
    ? $SetResult<FieldPathValue<Set[P], FieldPath<Set[P]>>, Set[P]>
    : Set[P];
};
export type $Project<TSchema extends Document> = {
  [P in FieldPath<TSchema>]?: 1 | 0 | $Path<TSchema>;
};
export type $ProjectResult<
  TSchema extends Document,
  Project extends $Project<TSchema>
> = {
  [P in FieldPath<TSchema>]?: Project[P] extends 1
    ? TSchema[P]
    : Project[P] extends 0
    ? never
    : Project[P] extends `$${infer K extends FieldPath<TSchema>}`
    ? FieldPathValue<TSchema, K>
    : never;
};

export function $pipeline<TSchema extends Document>(
  coll?: Collection<TSchema>,
  pipeline = [] as readonly Document[]
) {
  const _coll = coll as any;
  return {
    aggregate() {
      if (!coll) throw new Error("Collection not provided");
      return coll.aggregate([...pipeline]) as unknown as FindCursor<TSchema>;
    },
    _peek(fn = <T>(e: Readonly<T>): T => e) {
      return $pipeline<TSchema>(_coll, fn(pipeline));
    },
    project<P extends $Project<TSchema>>($project: P) {
      return $pipeline<$ProjectResult<TSchema, P>>(_coll, [
        ...pipeline,
        { $project },
      ]);
    },
    set<T extends $Set<TSchema>>($set: T) {
      return $pipeline<TSchema & T>(_coll, [...pipeline, { $set }]);
    },
    setFlat<
      T extends {
        [k in FieldPath<TSchema>]:
          | FieldValue<TSchema>
          | `$${FieldPath<TSchema>}`;
      } & Record<`${FieldPath<TSchema>}.${string}`, any> &
        Record<string, any>
    >($set: T) {
      return $pipeline<TSchema & T>(_coll, [...pipeline, { $set }]);
    },
    setFlatten<T extends $Set<TSchema>>($set: T) {
      return $pipeline<$SetResult<TSchema, T>>(_coll, [
        ...pipeline,
        { $set: $flatten($set) },
      ]);
    },
    match(filter: Filter<TSchema>) {
      return $pipeline<TSchema>(_coll, [...pipeline, { $match: filter }]);
    },
    matchFlatten(filter: Filter<TSchema>) {
      return $pipeline<TSchema>(_coll, [
        ...pipeline,
        { $match: $flatten(filter) },
      ]);
    },
    unwind<Path extends FieldArrayPath<TSchema>>($unwind: `$${Path}`) {
      type Unwinded = {
        [k in Path]: NonNullable<FieldArrayPathValue<TSchema, Path>>[number];
      };
      return $pipeline<Unwinded>(_coll, [...pipeline, { $unwind }]);
    },
    replaceRoot<Path extends FieldPath<TSchema>>(opt: { newRoot: `$${Path}` }) {
      type Replaced = NonNullable<
        FieldPathValue<TSchema, Path> | TSchema[Path]
      >;
      return $pipeline<Replaced>(_coll, [...pipeline, { $replaceRoot: opt }]);
    },
  };
}
