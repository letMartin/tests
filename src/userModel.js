import { primaryKey } from "@mswjs/data";
import { randUuid, randFullName } from "@ngneat/falso";

export const userModel = {
  id: primaryKey(() => randUuid()),
  name: () => randFullName(),
};
