import { describe, expect, test } from "bun:test";
import { camelToConstantCase, getAutoGridColumnWidth } from "../utils";

describe("getAutoGridColumnWidth", () => {
  test("sizes to the longest item plus default padding", () => {
    // "TailwindCSS" is 11 chars, default padding is 4 -> 15ch
    expect(getAutoGridColumnWidth(["Next.js", "React", "TailwindCSS"])).toBe(
      "15ch",
    );
  });

  test("uses a custom padding value", () => {
    expect(getAutoGridColumnWidth(["React"], 0)).toBe("5ch");
    expect(getAutoGridColumnWidth(["React"], 10)).toBe("15ch");
  });

  test("returns just the padding when items is empty (maxLength defaults to 0)", () => {
    expect(getAutoGridColumnWidth([])).toBe("4ch");
    expect(getAutoGridColumnWidth([], 0)).toBe("0ch");
  });

  test("ignores empty strings mixed in with real items", () => {
    expect(getAutoGridColumnWidth(["ab", "", "abc"])).toBe("7ch");
  });

  test("works with a single item", () => {
    expect(getAutoGridColumnWidth(["a"], 0)).toBe("1ch");
  });

  test("is unaffected by item order", () => {
    const longestFirst = getAutoGridColumnWidth(["TailwindCSS", "React"]);
    const longestLast = getAutoGridColumnWidth(["React", "TailwindCSS"]);

    expect(longestFirst).toBe(longestLast);
  });

  test("counts length in UTF-16 code units, not visual characters", () => {
    // Each emoji here is a surrogate pair (length 2), so "😀😀" has .length 4,
    // not 2. This documents real behavior rather than assuming grapheme-aware
    // sizing, since getting this wrong would silently under-size the column
    // for any non-BMP characters (emoji, some CJK/extended symbols).
    expect(getAutoGridColumnWidth(["😀😀"], 0)).toBe("4ch");
  });

  test("does not mutate the input array", () => {
    const items = ["React", "Next.js"];
    const copy = [...items];

    getAutoGridColumnWidth(items);
    expect(items).toEqual(copy);
  });
});

describe("camelToConstantCase", () => {
  test("converts a simple camelCase string", () => {
    expect(camelToConstantCase("machineLearning")).toBe("MACHINE_LEARNING");
  });

  test("handles multiple camelCase boundaries", () => {
    expect(camelToConstantCase("someLongVariableName")).toBe(
      "SOME_LONG_VARIABLE_NAME",
    );
    expect(camelToConstantCase("helloWorldFoo")).toBe("HELLO_WORLD_FOO");
  });

  test("uppercases a single lowercase word with no boundaries", () => {
    expect(camelToConstantCase("value")).toBe("VALUE");
  });

  test("returns an empty string unchanged", () => {
    expect(camelToConstantCase("")).toBe("");
  });

  test("uppercases a single character", () => {
    expect(camelToConstantCase("a")).toBe("A");
  });

  test("does not insert a leading underscore for PascalCase input", () => {
    // The regex requires a lowercase char *before* the uppercase one, so a
    // leading capital (no preceding lowercase) is left alone -- this only
    // fixes internal boundaries, it doesn't detect "start of word".
    expect(camelToConstantCase("MachineLearning")).toBe("MACHINE_LEARNING");
  });

  test("treats consecutive uppercase letters (acronyms) as a single boundary", () => {
    // "userID": only the r->I transition (lower->upper) is a boundary.
    // I->D is upper->upper, so it is NOT split into "user_I_D".
    expect(camelToConstantCase("userID")).toBe("USER_ID");
  });

  test("does not treat digits as camelCase boundaries", () => {
    // Neither digit->uppercase nor lowercase->digit is matched by
    // /([a-z])([A-Z])/, so no underscore is inserted around the "2".
    expect(camelToConstantCase("value2Test")).toBe("VALUE2TEST");
  });

  test("leaves already-uppercase strings unchanged (aside from case)", () => {
    expect(camelToConstantCase("ABC")).toBe("ABC");
  });

  test("leaves existing underscores untouched", () => {
    expect(camelToConstantCase("already_snake")).toBe("ALREADY_SNAKE");
  });

  test("is idempotent when run on its own output", () => {
    const once = camelToConstantCase("machineLearning");
    const twice = camelToConstantCase(once);

    expect(twice).toBe(once);
  });
});
