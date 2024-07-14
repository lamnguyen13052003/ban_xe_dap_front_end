import {ReactNode} from "react";

export interface DialogType {
    open: boolean;
    handleClose: () => void;
    title: string;
    content: ReactNode;
    actions: ReactNode;
}
