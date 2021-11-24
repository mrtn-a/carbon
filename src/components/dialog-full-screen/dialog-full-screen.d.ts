import * as React from "react";
import Modal, { ModalProps } from "../modal/modal";

export interface DialogFullScreenProps extends ModalProps {
  /** Prop to specify the aria-describedby property of the DialogFullscreen component */
  "aria-describedby"?: string;
  /**
   * Prop to specify the aria-label of the DialogFullscreen component.
   * To be used only when the title prop is not defined, and the component is not labelled by any internal element.
   */
  "aria-label"?: string;
  /**
   * Prop to specify the aria-labeledby property of the DialogFullscreen component
   * To be used when the title prop is a custom React Node,
   * or the component is labelled by an internal element other than the title.
   */
  "aria-labelledby"?: string;
  /** Child elements */
  children?: React.ReactNode;
  /** remove padding from content */
  disableContentPadding?: boolean;
  /** Container for components to be displayed in the header */
  headerChildren?: React.ReactNode;
  /** For legacy styling when used with Pages component. Do not use this unless using Pages within a DialogFullScreen */
  pagesStyling?: boolean;
  /** Determines if the close icon is shown */
  showCloseIcon?: boolean;
  /** Subtitle displayed at top of dialog */
  subtitle?: string;
  /** Title displayed at top of dialog */
  title?: React.ReactNode;
  /** The ARIA role to be applied to the DialogFulscreen container */
  role?: string;
}

declare class DialogFullScreen extends Modal<DialogFullScreenProps> {}

export default DialogFullScreen;
