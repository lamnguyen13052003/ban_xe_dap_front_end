import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import {DialogType} from "../../types/dialogType";


const ResponsiveDialog: React.FC<DialogType> = (prop: DialogType) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={prop.open}
                onClose={prop.handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{prop.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {prop.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {prop.actions}
                </DialogActions>
            </Dialog>
        </>
    )
}
export default ResponsiveDialog;
