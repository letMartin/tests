import { factory } from "@mswjs/data";
import { userModel } from "./userModel";
import { randUuid, randFullName } from "@ngneat/falso";

const db = factory({
  user: userModel,
});

db.user.create({ name: randFullName(), id: randUuid() });
db.user.create({ name: randFullName(), id: randUuid() });

export default db;
