// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const BaseMenuItem = z.object({
  //             ^ 🕵️‍♂️
  link: z.string(),
  label: z.string(),
});

type MenuItem = z.infer<typeof BaseMenuItem> & {
  children: MenuItem[];
};

const menuItemSchema: z.ZodType<MenuItem> = BaseMenuItem.extend({
  children: z.lazy(() => menuItemSchema.array()),
});

// TESTS

it("Should succeed when it encounters a correct structure", async () => {
  const menuItem = {
    link: "/",
    label: "Home",
    children: [
      {
        link: "/somewhere",
        label: "Somewhere",
        children: [],
      },
    ],
  };
  expect(menuItemSchema.parse(menuItem)).toEqual(menuItem);
});

it("Should error when it encounters an incorrect structure", async () => {
  const menuItem = {
    children: [
      {
        link: "/somewhere",
        label: "Somewhere",
        children: [],
      },
    ],
  };
  expect(() => menuItemSchema.parse(menuItem)).toThrowError();
});
