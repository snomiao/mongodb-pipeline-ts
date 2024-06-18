import type { AutoPath } from "ts-toolbelt/out/Function/AutoPath";
import type { Path } from "ts-toolbelt/out/Object/Path";
import type { Split } from "ts-toolbelt/out/String/Split";

declare function get<O extends object, P extends string>(
  object: O,
  path: AutoPath<O, P>
): Path<O, Split<P, ".">>;
declare const user: User;
type User = {
  name: string;
  friends: User[];
};
// works
const friendName = get(user, "friends.40.name.");
const friendFriendName = get(user, "friends.40.friends.12.name");
// errors
const friendNames = get(user, "friends.40.");
const friendFriendNames = get(user, "friends.40.friends.12.names");
