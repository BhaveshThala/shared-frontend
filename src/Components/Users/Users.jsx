import axios from "axios";
import { useState, useEffect, Fragment,useRef } from "react";
import { USERS_LIST_ENDPOINT,ADD_USER_ENDPOINT } from "../../siteSettings";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { UserTableColumnDefiniton } from "./UserstTableColumnDefinition";
import Button from '@mui/material/Button';
import AddUserPopUp from "./AddUserPopUp";

function Users() {

    const [userData, setUserData] = useState([])
    const [isUserAdded, setIsUserAdded] = useState(false)

    const addUserRef = useRef();

    useEffect(() => {
        axios.get(USERS_LIST_ENDPOINT,{timeout: 10000})
            .then((res) => {
                setUserData(res.data.data)
            })
            .catch((err) => {
                console.log("Api Failed")
            })
    }, [isUserAdded])

    async function addNewUser(userObject)
    {
        await axios.post(ADD_USER_ENDPOINT,userObject,{timeout: 30000})
        .then((res) => {
            if (res.status === 200){
                setIsUserAdded(true)
            }
            else{
                window.alert("Something went wrong")
            }
        })
        .catch((err) => {
            console.log("Error")
            window.alert("Something went wrong")
        })
        addUserRef.current.handleModalState(false)
    }

    return (
        <Fragment>
            <div className="container">
                <div className="row">
                <Button variant="contained" style={{float :'right'}} onClick={() => addUserRef.current.handleModalState(true)}>Add User</Button>
                </div>
                <div className="row" style={{ marginTop: '10px' }}>
                    <div
                        className="ag-theme-quartz"
                        style={{ height: 500, width: '100%' }}
                    >
                        <AgGridReact
                            rowData={userData}
                            columnDefs={UserTableColumnDefiniton}
                            pagination={true}
                            paginationPageSize={10}
                            paginationPageSizeSelector={[10, 25, 50]}
                        />
                    </div>
                </div>
            </div>
            <AddUserPopUp ref={addUserRef} addNewUser = {addNewUser}/> 
        </Fragment>
    );
}

export default Users;