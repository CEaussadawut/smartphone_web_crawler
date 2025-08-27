import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About
});

function About() {
  // lao
  // const test_fetch = async () => {
  //   const res = await fetch("http://localhost:8000/process");
  //   const json = await res.json();
  //   console.log(json);
  // };

  // useEffect(() => {
  //   test_fetch();
  // });

  return <div className="p-2">about</div>;
}
