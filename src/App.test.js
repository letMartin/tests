import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import db from "./factory";

const queryClient = new QueryClient();

function setup() {
  return render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

test("renders users, deletes and adds user", async () => {
  const users = db.user.getAll();
  const initialUsersCount = db.user.count();

  setup();

  await waitForElementToBeRemoved(screen.queryByText("Loading..."));

  users.forEach(({ name }) => {
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  const [{ name: firstUserName }] = users;

  fireEvent.click(screen.getByText(firstUserName));

  await waitForElementToBeRemoved(screen.queryByText(firstUserName)); // one user less

  fireEvent.click(screen.getByRole("button"));

  await waitFor(
    () => expect(screen.getAllByTestId("user")).toHaveLength(initialUsersCount) // one user more
  );
});
