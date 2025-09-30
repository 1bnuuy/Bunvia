import { SVG_Dict, SVG_Notebook, SVG_Progress, SVG_World } from "@/app/addOn";
import { SVGTypes } from "./globalTypes";

export const SVG_Component: Record<SVGTypes, React.ReactElement> = {
  wordbook: <SVG_Dict />,
  progress: <SVG_Progress />,
  notebook: <SVG_Notebook />,
  world: <SVG_World />,
};
