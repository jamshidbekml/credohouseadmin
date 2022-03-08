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

const Complex = () => {
    const [complex, setComplex] = React.useState([]);
    const [company, setCompany] = React.useState([]);
    const [name, setName] = React.useState('');
    const [id, setId] = React.useState('');
    const [companyId, setCompanyId] = React.useState('');
    React.useEffect(() => {
        const ac = new AbortController();
        fetch('https://creadohouse.herokuapp.com/admin/copmlex')
            .then((res) => res.json())
            .then((data) => setComplex(data));

        return function cleanup() {
            ac.abort();
        };
    }, [complex]);

    React.useEffect(() => {
        fetch('https://creadohouse.herokuapp.com/company')
            .then((res) => res.json())
            .then((data) => setCompany(data));
    }, []);

    const handleClose = () => {
        setOpenCreate(false);
        setOpenDelete(false);
        setOpenUpdate(false);
        setName('');
        setId('');
        setCompanyId('');
    };

    //CREATEMODAL
    const [openCreate, setOpenCreate] = React.useState(false);

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };
    const createComplex = () => {
        if (name && companyId) {
            fetch('https://creadohouse.herokuapp.com/admin/complex', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    name,
                    id: companyId,
                }),
            })
                .then((res) => res)
                .then((data) => data);
            setOpenCreate(false);
            setName('');
            setCompanyId('');
        } else {
            alert('input not filled');
        }
    };

    //DELETEMODAL
    const [openDelete, setOpenDelete] = React.useState(false);
    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };
    const deleteComplex = () => {
        if (id) {
            fetch('https://creadohouse.herokuapp.com/admin/complex', {
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
    const updateComplex = () => {
        if (id && name) {
            fetch('https://creadohouse.herokuapp.com/admin/complex', {
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
                            <th>Complex Name</th>
                            <th>Company Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complex &&
                            complex.map((e, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{e.complex}</td>
                                    <td>{e.company}</td>
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
                        tooltipTitle={'New complex'}
                    />
                    <SpeedDialAction
                        onClick={handleClickOpenDelete}
                        icon={<DeleteIcon />}
                        tooltipTitle={'Delete complex'}
                    />
                    <SpeedDialAction
                        onClick={handleClickOpenUpdate}
                        icon={<TuneIcon />}
                        tooltipTitle={'Update complex'}
                    />
                </SpeedDial>
            </Box>

            {/* CREATE COMPLEX MODAL */}
            <div>
                <Dialog
                    open={openCreate}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {'Create new complex'}
                    </DialogTitle>
                    <DialogContent className="d-flex align-items-center">
                        <select
                            className="form-select me-3 mt-2"
                            defaultValue={'company'}
                            onChange={(e) => {
                                setCompanyId(e.target.value);
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
                        <Button onClick={createComplex}>Create</Button>
                    </DialogActions>
                </Dialog>
            </div>

            {/* DELETE COMPLEX MODAL */}
            <div>
                <Dialog
                    open={openDelete}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {'Delete complex'}
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
                                Select complex
                            </option>
                            {complex &&
                                complex.map((e) => (
                                    <option key={e.id} value={e.id}>
                                        {e.complex}
                                    </option>
                                ))}
                        </select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={deleteComplex}>Delete</Button>
                    </DialogActions>
                </Dialog>
            </div>

            {/* UPDATE COMPLEX MODAL */}
            <div>
                <Dialog
                    open={openUpdate}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {'Update complex'}
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
                                Select complex
                            </option>
                            {complex &&
                                complex.map((e) => (
                                    <option key={e.id} value={e.id}>
                                        {e.complex}
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
                        <Button onClick={updateComplex}>Update</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};
export default Complex;
