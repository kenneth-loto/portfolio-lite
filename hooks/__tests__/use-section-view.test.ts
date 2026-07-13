import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";
import { act, createElement, useState } from "react";
import { createRoot } from "react-dom/client";
import { useSectionView } from "../use-section-view";

const capture = mock(() => {});
mock.module("posthog-js", () => ({
  default: { capture },
}));

let lastCallback: IntersectionObserverCallback | undefined;
let lastOptions: IntersectionObserverInit | undefined;
let observeSpy = mock((_target: Element) => {});
let unobserveSpy = mock((_target: Element) => {});
let disconnectSpy = mock(() => {});

const OriginalIntersectionObserver = globalThis.IntersectionObserver;

// The mock only needs to satisfy the subset of the IntersectionObserver
// surface the hook actually calls (constructor + observe/disconnect).
// Casting through `unknown` here is a deliberate, single, documented
// exception rather than implementing the full browser interface
// (root, rootMargin, thresholds, takeRecords semantics, etc.), which
// would add noise without adding test value.
function installMockObserver() {
  lastCallback = undefined;
  lastOptions = undefined;
  observeSpy = mock((_target: Element) => {});
  unobserveSpy = mock((_target: Element) => {});
  disconnectSpy = mock(() => {});

  class MockIntersectionObserver {
    constructor(
      cb: IntersectionObserverCallback,
      opts?: IntersectionObserverInit,
    ) {
      lastCallback = cb;
      lastOptions = opts;
    }

    observe(target: Element) {
      observeSpy(target);
    }

    unobserve(target: Element) {
      unobserveSpy(target);
    }

    disconnect() {
      disconnectSpy();
    }

    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }

  globalThis.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;
}

// Fails fast with a clear message instead of a bare non-null assertion,
// which would just throw "undefined is not a function" with no context.
function getCallback(): IntersectionObserverCallback {
  if (!lastCallback) {
    throw new Error(
      "IntersectionObserver callback was not captured — did the component mount and observe an element?",
    );
  }
  return lastCallback;
}

// Centralizes the one necessary `as` cast: the hook only reads
// `entry.isIntersecting`, so a partial entry is sufficient and a full
// IntersectionObserverEntry (boundingClientRect, rootBounds, target, etc.)
// would be unused boilerplate.
function makeEntry(isIntersecting: boolean): IntersectionObserverEntry {
  return { isIntersecting } as IntersectionObserverEntry;
}

function makeObserverInstance(): IntersectionObserver {
  return {} as IntersectionObserver;
}

function TestComponent({ name }: { name: string }) {
  const ref = useSectionView(name);

  return createElement(
    "div",
    { ref: ref as React.RefObject<HTMLDivElement> },
    "test",
  );
}

function NoRefComponent({ name }: { name: string }) {
  useSectionView(name);

  return createElement("div", null, "no ref attached");
}

function DynamicNameComponent() {
  const [name, setName] = useState("first");
  const ref = useSectionView(name);

  return createElement(
    "div",
    { ref: ref as React.RefObject<HTMLDivElement> },
    createElement("button", {
      type: "button",
      onClick: () => setName("second"),
      "data-testid": "switch",
    }),
  );
}

async function render(element: ReturnType<typeof createElement>) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  await act(async () => {
    root.render(element);
  });

  return { container, root };
}

describe("useSectionView", () => {
  beforeEach(() => {
    capture.mockClear();
    installMockObserver();
  });

  afterEach(() => {
    globalThis.IntersectionObserver = OriginalIntersectionObserver;
  });

  test("registers observer with 0.5 threshold and observes the element", async () => {
    await render(createElement(TestComponent, { name: "hero" }));

    expect(lastCallback).toBeDefined();
    expect(lastOptions).toEqual({ threshold: 0.5 });
    expect(observeSpy).toHaveBeenCalledTimes(1);
  });

  test("captures section_viewed when intersecting", async () => {
    await render(createElement(TestComponent, { name: "skills" }));
    await act(async () => {
      getCallback()([makeEntry(true)], makeObserverInstance());
    });

    expect(capture).toHaveBeenCalledTimes(1);
    expect(capture).toHaveBeenCalledWith("section_viewed", {
      section: "skills",
    });
  });

  test("does not capture when not intersecting", async () => {
    await render(createElement(TestComponent, { name: "about" }));
    await act(async () => {
      getCallback()([makeEntry(false)], makeObserverInstance());
    });

    expect(capture).not.toHaveBeenCalled();
  });

  test("fires only once even if called with isIntersecting:true repeatedly", async () => {
    await render(createElement(TestComponent, { name: "contact" }));

    const observer = makeObserverInstance();

    await act(async () => {
      getCallback()([makeEntry(true)], observer);
    });

    await act(async () => {
      getCallback()([makeEntry(true)], observer);
    });

    expect(capture).toHaveBeenCalledTimes(1);
  });

  test("disconnects the observer immediately after firing", async () => {
    await render(createElement(TestComponent, { name: "footer" }));
    await act(async () => {
      getCallback()([makeEntry(true)], makeObserverInstance());
    });

    expect(disconnectSpy).toHaveBeenCalledTimes(1);
  });

  test("disconnects on unmount even if never intersected", async () => {
    const { container, root } = await render(
      createElement(TestComponent, { name: "faq" }),
    );

    await act(async () => {
      root.unmount();
    });

    expect(disconnectSpy).toHaveBeenCalledTimes(1);
    expect(capture).not.toHaveBeenCalled();
    container.remove();
  });

  test("does nothing when the ref is never attached to an element", async () => {
    await render(createElement(NoRefComponent, { name: "ghost" }));

    expect(lastCallback).toBeUndefined();
    expect(observeSpy).not.toHaveBeenCalled();
  });

  test("re-observes with a new callback when sectionName changes", async () => {
    const { container } = await render(createElement(DynamicNameComponent));
    const firstCallback = lastCallback;

    expect(disconnectSpy).toHaveBeenCalledTimes(0);

    const button = container.querySelector('[data-testid="switch"]');

    if (!(button instanceof HTMLButtonElement)) {
      throw new Error("Expected switch button to be rendered");
    }

    await act(async () => {
      button.click();
    });

    expect(disconnectSpy).toHaveBeenCalledTimes(1);
    expect(lastCallback).toBeDefined();
    expect(lastCallback).not.toBe(firstCallback);

    await act(async () => {
      getCallback()([makeEntry(true)], makeObserverInstance());
    });

    expect(capture).toHaveBeenCalledWith("section_viewed", {
      section: "second",
    });
  });

  test("uses only the first entry when multiple entries are passed", async () => {
    await render(createElement(TestComponent, { name: "multi" }));
    await act(async () => {
      getCallback()(
        [makeEntry(true), makeEntry(false)],
        makeObserverInstance(),
      );
    });

    expect(capture).toHaveBeenCalledTimes(1);
    expect(capture).toHaveBeenCalledWith("section_viewed", {
      section: "multi",
    });
  });

  test("captures with an empty string sectionName without throwing", async () => {
    await render(createElement(TestComponent, { name: "" }));
    await act(async () => {
      getCallback()([makeEntry(true)], makeObserverInstance());
    });

    expect(capture).toHaveBeenCalledWith("section_viewed", { section: "" });
  });
});
