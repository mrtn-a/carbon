import * as React from "react";
import { BoxProps } from "components/box/box";

export interface DismissibleBoxProps
  extends Omit<BoxProps, "display" | "justifyContent"> {
  /** Flag to control whether the thicker left border highlight should be rendered */
  hasBorderLeftHighlight?: boolean;
  /** The content to render in the component */
  children?: React.ReactNode;
  /** Callback to be called when the close icon button is clicked */
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  /** Set the base color variant */
  variant?: "light" | "dark";
}

declare function DismissibleBox(props: DismissibleBoxProps): JSX.Element;

export default DismissibleBox;
