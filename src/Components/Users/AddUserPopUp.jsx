import TextField from "@mui/material/TextField";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Fragment, useState, forwardRef, useImperativeHandle } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from '@mui/material/Button';

const AddUserPopUp = forwardRef((props, ref) => {

    const [addUserData, setAddUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [modalOpen, setModalState] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)

    async function handleSubmit() {
        setBtnLoading(true)
        await props.addNewUser(addUserData)
        setModalState(false)
        setBtnLoading(false)
        setAddUserData(data => ({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }))
    }

    useImperativeHandle(ref, () => ({

        handleModalState(isOpen) {
            setModalState(isOpen)
        }

    }));

    return (
        <Fragment>
            <div className={'row'}>
                <Dialog open={modalOpen} onClose={() => setModalState(false)} fullWidth={true}>
                    <DialogTitle>Add User</DialogTitle>
                    <DialogContent>
                        <div className={'row'}>
                            <div className={'col-sm-6'}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name={'firstname'}
                                    label="First Name"
                                    value={addUserData.firstName}
                                    onChange={(e) => setAddUserData(data => ({ ...data, firstName: e.target.value }))}
                                    type="text"
                                    fullWidth
                                    required={true}
                                    variant="outlined"
                                />
                            </div>
                            <div className={'col-sm-6'}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name={'lastname'}
                                    label="Last Name"
                                    type="text"
                                    fullWidth
                                    required={true}
                                    value={addUserData.lastName}
                                    onChange={(e) => setAddUserData(data => ({ ...data, lastName: e.target.value }))}
                                    variant="outlined"
                                />
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'col-sm-6'}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name={'email'}
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    required={true}
                                    value={addUserData.email}
                                    onChange={(e) => setAddUserData(data => ({ ...data, email: e.target.value }))}
                                    variant="outlined"
                                />
                            </div>
                            <div className={'col-sm-6'}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name={'password'}
                                    label="Password"
                                    type="text"
                                    fullWidth
                                    required={true}
                                    value={addUserData.designation}
                                    onChange={(e) => setAddUserData(data => ({ ...data, password: e.target.value }))}
                                    variant="outlined"
                                />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setModalState(false)}>Cancel</Button>
                        <LoadingButton
                            loadingPosition="center"
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={!addUserData.firstName || !addUserData.lastName || !addUserData.email || !addUserData.password}
                            loading={btnLoading}
                        >
                            Submit
                        </LoadingButton>
                    </DialogActions>
                </Dialog>
            </div>
        </Fragment>
    )
})
export default AddUserPopUp