export type BuilderModel = "bracelet" | "keychain";

export type PartId = "buckle" | "innerCore" | "outerEdge";

export interface PartPlacement {
  top: number;
  left?: number;
  right?: number;
}

export interface WeaveCanvasConfig {
  imageSrc: string;
  parts: Partial<Record<PartId, PartPlacement>>;
}

export interface WeaveOption {
  id: string;
  labelKey: string;
  imageSrc: string;
}

export interface BuckleOption {
  id: string;
  labelKey: string;
  imageSrc: string;
  overlayLines?: string[];
}

export interface ColorOption {
  id: string;
  imageSrc: string;
  labelKey: string;
}

export interface BuilderDict {
  collectionLabel: string;
  title: string;
  selectModel: string;
  selectModelToPreview: string;
  selectWeaveTypeToPreview: string;
  weaveType: string;
  buckle: string;
  innerCoreColor: string;
  outerEdgeColor: string;
  buildConfiguration: string;
  copyOptions: string;
  addToCart: string;
  basePrice: string;
  customizations: string;
  total: string;
  sizeAndFit: string;
  howToMeasure: string;
  addOns: string;
  models: Record<BuilderModel, string>;
  weaves: Record<string, string>;
  buckles: Record<string, string>;
  colors: Record<string, string>;
  sizes: Record<string, string>;
  fitDescription: Record<string, string>;
  customSizePlaceholder: string;
  measureGuideTitle: string;
  measureGuideClose: string;
  measureSteps: string[];
}
