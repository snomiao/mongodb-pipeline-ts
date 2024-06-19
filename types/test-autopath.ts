import { get as _get } from "lodash-es";
import type { AutoPath } from "ts-toolbelt/out/Function/AutoPath";
import type { Path } from "ts-toolbelt/out/Object/Path";
import type { Split } from "ts-toolbelt/out/String/Split";

declare type get = <O extends object, P extends string>(object: O, path: AutoPath<O, P>) => Path<O, Split<P, ".">>;
// declare const user: User;
type User = {
  name: string;
  friends?: User[];
};

const user: User = {
  name: "snomiao",
  friends: [{ name: "test1" }, { name: "test2", friends: [{ name: "test3" }] }],
};
// works
const get = _get;
const name = get(user, "name");
console.log(name);
const friendName = get(user, "friends.$.name");
console.log(friendName);
const friendFriendName = get(user, "friends.1.friends.0.name");
console.log(friendFriendName);
// errors
const friendNames = get(user, "friends.40.names");
console.log(friendNames);
const friendFriendNames = get(user, "friends.40.friends.12.names");
console.log(friendFriendNames);
