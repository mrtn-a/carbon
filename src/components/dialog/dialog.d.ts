import * as React from "react";
import Modal, { ModalProps } from "../modal/modal";

export interface DialogProps extends ModalProps {
  /** Prop to specify the aria-describedby property of the Dialog component */
  "aria-describedby"?: string;
  /**
   * Prop to specify the aria-label of the Dialog component.
   * To be used only when the title prop is not defined, and the component is not labelled by any internal element.
   */
  "aria-label"?: string;
  /**
   * Prop to specify the aria-labeledby property of the Dialog component
   * To be used when the title prop is a custom React Node,
   * or the component is labelled by an internal element other than the title.
   */
  "aria-labelledby"?: string;
  /* Disables auto focus functionality on child elements */
  disableAutoFocus?: boolean;
  /* Disables the focus trap when the dialog is open */
  disableFocusTrap?: boolean;
  /* Function or reference to first element to focus */
  focusFirstElement?: () => void;
  /** Allows developers to specify a specific height for the dialog. */
  height?: string;
  /** A custom close event handler */
  onCancel?: (
    ev: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLButtonElement>
  ) => void;
  /** Determines if the close icon is shown */
  showCloseIcon?: boolean;
  /** Size of dialog, default size is 750px */
  size?: string;
  /** Subtitle displayed at top of dialog */
  subtitle?: string;
  /** Title displayed at top of dialog */
  title?: React.ReactNode;
  /** The ARIA role to be applied to the Dialog container */
  role?: string;
}

declare class Dialog extends Modal<DialogProps> {}

export default Dialog;
