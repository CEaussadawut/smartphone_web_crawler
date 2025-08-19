import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { brandsPhoneApiBrandsGetOptions } from "@/client/@tanstack/react-query.gen";

export const Route = createFileRoute("/about")({
  component: About
});

function About() {
  const phoneBrandsQuery = useSuspenseQuery(brandsPhoneApiBrandsGetOptions());
  const phoneBrands = phoneBrandsQuery.data;

  // lao
  // const test_fetch = async () => {
  //   const res = await fetch("http://localhost:8000/process");
  //   const json = await res.json();
  //   console.log(json);
  // };

  // useEffect(() => {
  //   test_fetch();
  // });

  return (
    <div className="p-2">
      <ol>
        {phoneBrands.map((brand, i) => (
          <li key={i}>
            <a href={brand.href} target="__blank">
              {brand.name}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
