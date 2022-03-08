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

const Bank = () => {
    const [banks, setBanks] = React.useState([]);
    const [id, setId] = React.useState('');
    const [name, setName] = React.useState('');
    const [sum, setSum] = React.useState('');
    const [service, setService] = React.useState('');
    const [obj, setObj] = React.useState('');
    React.useEffect(() => {
        const ac = new AbortController();
        fetch('https://creadohouse.herokuapp.com/admin/banks')
            .then((res) => res.json())
            .then((data) => setBanks(data));

        return function cleanup() {
            ac.abort();
        };
    }, [banks]);

    const handleClose = () => {
        setOpenCreate(false);
        setOpenDelete(false);
        setOpenUpdate(false);
        setId('');
        setName('');
        setSum('');
        setService('');
        setObj('');
    };

    //CREATEMODAL
    const [openCreate, setOpenCreate] = React.useState(false);

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };
    const createBank = () => {
        if ((name, sum, service)) {
            fetch('https://creadohouse.herokuapp.com/admin/banks', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    name,
                    sum,
                    service,
                }),
            })
                .then((res) => res)
                .then((data) => data);
            setOpenCreate(false);
            setName('');
            setSum('');
            setService('');
        } else {
            alert('input not filled');
        }
    };

    //DELETEMODAL
    const [openDelete, setOpenDelete] = React.useState(false);
    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };
    const deleteBank = () => {
        if (id) {
            fetch('https://creadohouse.herokuapp.com/admin/banks', {
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
    const UpdateBank = () => {
        console.log(id, name, sum, service);
        if (id && name && sum && service) {
            fetch('https://creadohouse.herokuapp.com/admin/banks', {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    id,
                    name,
                    sum,
                    service,
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

    const updateBank = (e) => {
        const bankId = e.target.value;
        setId(bankId);
        setObj(banks.find((e) => e.bank_id === bankId));
    };

    React.useEffect(() => {
        if (obj) {
            document.getElementById('updatebank')?.classList.remove('d-none');
            if (document.getElementById('bankname')) {
                document.getElementById('bankname').value = obj.bank_name;
                setName(obj.bank_name);
            }
            if (document.getElementById('banksum')) {
                document.getElementById('banksum').value = obj.bank_max_sum;
                setSum(obj.bank_max_sum);
            }
            if (document.getElementById('bankservice')) {
                document.getElementById('bankservice').value =
                    obj.bank_services;
                setService(obj.bank_services);
            }
        } else {
            if (!document.getElementById('updatebank')?.matches('.d-none')) {
                document.getElementById('updatebank')?.classList.add('d-none');
            }
            if (document.getElementById('bankname')) {
                document.getElementById('bankname').value = '';
            }
            if (document.getElementById('banksum')) {
                document.getElementById('banksum').value = '';
            }
            if (document.getElementById('bankservice')) {
                document.getElementById('bankservice').value = '';
            }
        }
    }, [obj]);

    return (
        <>
            <div style={{ height: '90vh', overflowY: 'auto' }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Bank Name</th>
                            <th>Maximal Summa</th>
                            <th>Service</th>
                        </tr>
                    </thead>
                    <tbody>
                        {banks &&
                            banks.map((e, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{e.bank_name}</td>
                                    <td>{e.bank_max_sum}</td>
                                    <td>{e.bank_services} %</td>
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
                        {'Create new bank'}
                    </DialogTitle>
                    <DialogContent className="d-flex align-items-center">
                        <div>
                            <div>
                                <input
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control mt-2"
                                    type="text"
                                    placeholder="Bank name"
                                />
                            </div>
                            <div className="d-flex mt-2">
                                <input
                                    onChange={(e) => setSum(e.target.value)}
                                    className="form-control me-2"
                                    type="number"
                                    placeholder="Maximaml creadit sum"
                                />
                                <input
                                    onChange={(e) => setService(e.target.value)}
                                    className="form-control"
                                    type="number"
                                    placeholder="Service"
                                />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={createBank}>Create</Button>
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
                        {'Delete bank'}
                    </DialogTitle>
                    <DialogContent>
                        <select
                            className="form-select mt-2"
                            defaultValue={'company'}
                            onChange={(e) => {
                                setId(e.target.value);
                            }}
                        >
                            <option value="company" disabled>
                                Select bank
                            </option>
                            {banks &&
                                banks.map((e) => (
                                    <option key={e.bank_id} value={e.bank_id}>
                                        {e.bank_name}
                                    </option>
                                ))}
                        </select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={deleteBank}>Delete</Button>
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
                        {'Update bank'}
                    </DialogTitle>
                    <DialogContent className="d-flex align-items-center">
                        <div>
                            <div>
                                <select
                                    className="form-select mt-2"
                                    defaultValue={'company'}
                                    onChange={updateBank}
                                >
                                    <option value="company" disabled>
                                        Select bank
                                    </option>
                                    {banks &&
                                        banks.map((e) => (
                                            <option
                                                key={e.bank_id}
                                                value={e.bank_id}
                                            >
                                                {e.bank_name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div id="updatebank" className="d-none">
                                <div>
                                    <input
                                        className="form-control mt-2"
                                        id="bankname"
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Bank name"
                                    />
                                </div>
                                <div className="d-flex mt-2">
                                    <input
                                        className="form-control me-2"
                                        id="banksum"
                                        onChange={(e) => setSum(e.target.value)}
                                        type="number"
                                        placeholder="Bank max credit"
                                    />
                                    <input
                                        className="form-control"
                                        id="bankservice"
                                        onChange={(e) =>
                                            setService(e.target.value)
                                        }
                                        type="number"
                                        placeholder="Bank service"
                                    />
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={UpdateBank}>Update</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};
export default Bank;
