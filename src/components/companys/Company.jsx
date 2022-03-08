import * as React from 'react';
import { Table } from 'react-bootstrap';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TuneIcon from '@mui/icons-material/Tune';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const Company = () => {
    const [company, setCompany] = React.useState([]);
    const [name, setName] = React.useState('');
    const [id, setId] = React.useState('');
    React.useEffect(() => {
        fetch('https://creadohouse.herokuapp.com/company')
            .then((res) => res.json())
            .then((data) => setCompany(data));
    }, [company]);

    const handleClose = () => {
        setOpenCreate(false);
        setOpenDelete(false);
        setOpenUpdate(false);
        setName('');
        setId('');
    };

    //CREATEMODAL
    const [openCreate, setOpenCreate] = React.useState(false);

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };
    const createComapny = () => {
        if (name) {
            fetch('https://creadohouse.herokuapp.com/admin/company', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    name,
                }),
            })
                .then((res) => res)
                .then((data) => data);
            setOpenCreate(false);
            setName('');
        } else {
            alert('input not filled');
        }
    };

    //DELETEMODAL
    const [openDelete, setOpenDelete] = React.useState(false);
    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };
    const deleteCompany = () => {
        if (id) {
            fetch('https://creadohouse.herokuapp.com/admin/company', {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    id,
                }),
            })
                .then((res) => res)
                .then((data) => data);
            setOpenDelete(false);
            setId('');
        } else {
            alert('select not filled');
        }
    };

    //UPDATEMODAL
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const handleClickOpenUpdate = () => {
        setOpenUpdate(true);
    };
    const updateCompany = () => {
        if (id && name) {
            fetch('https://creadohouse.herokuapp.com/admin/company', {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    id,
                    name,
                }),
            })
                .then((res) => res)
                .then((data) => data);
            setOpenUpdate(false);
            setId('');
            setName('');
        } else {
            alert('select not filled');
        }
    };

    return (
        <>
            <div style={{ height: '90vh', overflowY: 'auto' }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Company Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {company &&
                            company.map((e, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{e.name}</td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </div>
            <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                >
                    <SpeedDialAction
                        onClick={handleClickOpenCreate}
                        icon={<AddBoxIcon />}
                        tooltipTitle={'New company'}
                    />
                    <SpeedDialAction
                        onClick={handleClickOpenDelete}
                        icon={<DeleteIcon />}
                        tooltipTitle={'Delete company'}
                    />
                    <SpeedDialAction
                        onClick={handleClickOpenUpdate}
                        icon={<TuneIcon />}
                        tooltipTitle={'Update company'}
                    />
                </SpeedDial>
            </Box>

            {/* CREATE COMPANY MODAL */}
            <div>
                <Dialog
                    open={openCreate}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {'Create new company'}
                    </DialogTitle>
                    <DialogContent>
                        <input
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            className="form-control mt-2"
                            type="text"
                            placeholder="Company Name"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={createComapny}>Create</Button>
                    </DialogActions>
                </Dialog>
            </div>

            {/* DELETE COMPANY MODAL */}
            <div>
                <Dialog
                    open={openDelete}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {'Delete company'}
                    </DialogTitle>
                    <DialogContent className="mt-2">
                        <select
                            className="form-select"
                            defaultValue={'company'}
                            onChange={(e) => {
                                setId(e.target.value);
                            }}
                        >
                            <option value="company" disabled>
                                Select company
                            </option>
                            {company &&
                                company.map((e) => (
                                    <option key={e.id} value={e.id}>
                                        {e.name}
                                    </option>
                                ))}
                        </select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={deleteCompany}>Delete</Button>
                    </DialogActions>
                </Dialog>
            </div>

            {/* UPDATE COMPANY MODAL */}
            <div>
                <Dialog
                    open={openUpdate}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {'Update company'}
                    </DialogTitle>
                    <DialogContent className="d-flex align-items-center">
                        <select
                            className="form-select me-3 mt-2"
                            defaultValue={'company'}
                            onChange={(e) => {
                                setId(e.target.value);
                            }}
                        >
                            <option value="company" disabled>
                                Select company
                            </option>
                            {company &&
                                company.map((e) => (
                                    <option key={e.id} value={e.id}>
                                        {e.name}
                                    </option>
                                ))}
                        </select>
                        <input
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            className="form-control mt-2"
                            type="text"
                            placeholder="New Name"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={updateCompany}>Update</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};
export default Company;
