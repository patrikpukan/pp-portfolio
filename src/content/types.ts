// Content shapes, defined once. Locale-invariant data `satisfies` these in
// src/content/*.ts; per-locale prose does the same in src/content/<locale>/.

export type Profile = {
  name: string
  email: string
}
