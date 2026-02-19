export interface PipeData {
  id: number;
  x: number;
  topHeight: number;
  passed: boolean;
}

export interface MapData {
  id: string;
  name: string;
  pipes: PipeData[];
}
