import { ModelAPI } from "@mswjs/data/lib/glossary";

declare module "@mswjs/data/lib/glossary" {
  interface ModelAPI<
    Dictionary extends ModelDictionary,
    ModelName extends keyof Dictionary,
  > {
    createMany: (
      count: number,
      overrides?: any,
    ) => Entity<Dictionary, ModelName>[];
    fetchById: (id: string) => Entity<Dictionary, ModelName>;
  }
}
