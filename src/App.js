import { useQuery, useMutation, useQueryClient } from "react-query";

export default function App() {
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/users/").then((res) =>
        res.json()
      ),
  });

  const { mutate: deleteUser } = useMutation({
    mutationFn: (id) => {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      });
    },
  });

  const { mutate: addNewUser } = useMutation({
    mutationFn: () => {
      fetch(`https://jsonplaceholder.typicode.com/users`, {
        method: "POST",
        body: JSON.stringify({ name: "new user" }),
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      });
    },
  });

  return (
    <div className="App">
      {isLoading && <div>Loading...</div>}
      {data.map(({ name, id }) => (
        <div key={id} onClick={() => deleteUser(id)} data-testid="user">
          {name}
        </div>
      ))}
      <button onClick={addNewUser}>Add new user</button>
    </div>
  );
}
