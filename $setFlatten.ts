// import type { MatchKeysAndValues } from "mongodb";
// import type { UnwrapArrayDeep } from "./UnwrapArrayDeep";

// /**
//  * This function flattens the set object, used for mongodb partial set.
//  * otherwise, mongodb will match the nested object as a whole.
//  * @example
//  * ```ts
//  * $flatten({ a: { b: 1 } }) // { "a.b": 1 }
//  *
//  * coll.updateOne({},{$set: { a: { b: 1 } }}) // coll.updateOne({ "a.b": 1 })
//  * // this will match the document { a: { b: 1 } } and { a: { b: 1, c: 2 } }
//  * // but not { a: { b: 2 } }
//  *
//  * // by comparison:
//  * coll.find({ a: { b: 1 } }) // coll.find({ a: { b: 1 } })
//  * // this will only match the document { a: { b: 1 } }
//  * // but not { a: { b: 1, c: 2 } } or { a: { b: 2 } }
//  * ```
//  */
// export function $setFlatten<TSchema extends Document>(
//     $set: UnwrapArrayDeep<MatchKeysAndValues<TSchema>>
//   ): {$set: MatchKeysAndValues<TSchema>};