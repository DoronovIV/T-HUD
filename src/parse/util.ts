export function addProperty(obj: object, key: string, value: unknown): void {
  Object.defineProperty(obj, key, { value, writable: true, enumerable: true });
}

export function addProperties(obj: object, props: Record<string, unknown>): void {
  Object.defineProperties(
    obj,
    Object.fromEntries(
      Object.entries(props).map(([key, value]) => [
        key,
        { value, writable: true, enumerable: true },
      ]),
    ),
  );
}
