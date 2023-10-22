import { rest } from "msw";
import db from "./factory";
import { randUuid, randFullName } from "@ngneat/falso";

const handlers = [
  rest.get("https://jsonplaceholder.typicode.com/users", (req, res, ctx) => {
    return res(ctx.json(db.user.getAll()));
  }),

  rest.delete(
    "https://jsonplaceholder.typicode.com/users/:id",
    (req, res, ctx) => {
      const deletedUser = db.user.delete({
        where: {
          id: {
            equals: req.params.id,
          },
        },
      });

      return res(ctx.json(deletedUser));
    }
  ),

  rest.post("https://jsonplaceholder.typicode.com/users", (req, res, ctx) => {
    const user = db.user.create({ id: randUuid(), name: randFullName() });

    return res(ctx.json(user));
  }),
];

export default handlers;
