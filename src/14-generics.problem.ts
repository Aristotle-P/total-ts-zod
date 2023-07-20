// CODE

import { it } from "vitest";
import { z } from "zod";
import { Equal, Expect } from "./helpers/type-utils";

const genericFetch = async (url: string, schema: z.ZodSchema): Promise<{name: string}> => {
  //                 ^ 🕵️‍♂️
    const res = await fetch(url);
    const data = await res.json();
    const result = schema.parse(data);
    console.log(result);
    return result;
};

// TESTS

it("Should fetch from the Star Wars API", async () => {
  const result = await genericFetch(
    "https://www.totaltypescript.com/swapi/people/1.json",
    z.object({
      name: z.string(),
    }),
  );

  type cases = [
    // Result should equal { name: string }, not any
    Expect<Equal<typeof result, { name: string }>>,
  ];
});
