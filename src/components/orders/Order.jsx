import * as React from 'react';
import { Table } from 'react-bootstrap';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const Orders = () => {
    const [orders, setOrders] = React.useState([]);
    const [id, setId] = React.useState('');
    React.useEffect(() => {
        fetch('https://creadohouse.herokuapp.com/admin/orders')
            .then((res) => res.json())
            .then((data) => setOrders(data));
    }, [orders]);

    const handleClose = () => {
        setOpenDelete(false);
        setId('');
    };

    //DELETEMODAL
    const [openDelete, setOpenDelete] = React.useState(false);
    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };
    const deleteOrder = () => {
        if (id) {
            fetch('https://creadohouse.herokuapp.com/admin/orders', {
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

    return (
        <>
            <div style={{ height: '90vh', overflowY: 'auto' }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Bank</th>
                            <th>Service</th>
                            <th>Duration</th>
                            <th>Complex</th>
                            <th>Rooms</th>
                            <th>Square</th>
                            <th>Price sum</th>
                            <th>S-payment</th>
                            <th>M-payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders &&
                            orders.map((e, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{e.name}</td>
                                    <td>{e.phone}</td>
                                    <td>{e.bank}</td>
                                    <td>{e.service}</td>
                                    <td>{e.duration} year</td>
                                    <td>{e.complex}</td>
                                    <td>{e.room}</td>
                                    <td>{e.square}</td>
                                    <td>{e.price}</td>
                                    <td>{e.startingpayment}</td>
                                    <td>{e.monthlypayment}</td>
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
                        onClick={handleClickOpenDelete}
                        icon={<DeleteIcon />}
                        tooltipTitle={'Delete order'}
                    />
                </SpeedDial>
            </Box>

            {/* DELETE COMPANY MODAL */}
            <div>
                <Dialog
                    open={openDelete}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {'Delete order'}
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
                                Select holder
                            </option>
                            {orders &&
                                orders.map((e) => (
                                    <option key={e.id} value={e.id}>
                                        {e.name}
                                    </option>
                                ))}
                        </select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={deleteOrder}>Delete</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};
export default Orders;
