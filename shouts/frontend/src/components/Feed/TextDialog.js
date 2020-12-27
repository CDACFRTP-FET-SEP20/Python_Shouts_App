import { Dialog, DialogTitle } from '@material-ui/core'
import React from 'react'

function TextDialog(props) {
    const{openPopup,setOpenPopup}=props
    return (
        <Dialog open={openPopup}>
            <DialogTitle>
                Woww
            </DialogTitle>
        </Dialog>
    )
}

export default TextDialog
