export enum WeightCategory {
  Min = 52,
  Flyweight = 57,
  Bantamweight = 61,
  Featherweight = 66,
  Lightweight = 70,
  Welterweight = 77,
  Middleweight = 84,
  LightHeavyweight = 93,
  Heavyweight = 120
}

export namespace WeightCategoryUtil {
  export function toString(category: WeightCategory): string {
    return WeightCategory[category] as string;
  }

  export function parse(category: string): WeightCategory {
    return WeightCategory[category as keyof typeof WeightCategory] as WeightCategory;
  }
}
