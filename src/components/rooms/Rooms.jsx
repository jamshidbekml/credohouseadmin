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

const Room = () => {
    const [rooms, setRooms] = React.useState([]);
    const [room, setRoom] = React.useState([]);
    const [obj, setObj] = React.useState('');
    const [complex, setComplex] = React.useState([]);
    const [complexId, setComplexId] = React.useState('');
    const [roomId, setRoomId] = React.useState('');
    const [count, setCount] = React.useState('');
    const [square, setSquare] = React.useState('');
    const [price, setPrice] = React.useState('');
    React.useEffect(() => {
        const ac = new AbortController();
        fetch('https://creadohouse.herokuapp.com/admin/rooms')
            .then((res) => res.json())
            .then((data) => setRooms(data));

        return function cleanup() {
            ac.abort();
        };
    }, [rooms]);

    React.useEffect(() => {
        if (complexId) {
            fetch('https://creadohouse.herokuapp.com/rooms', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                    id: complexId,
                },
            })
                .then((res) => res.json())
                .then((data) => setRoom(data))
                .catch((err) => console.log(err));
        }
    }, [complexId]);

    React.useEffect(() => {
        fetch('https://creadohouse.herokuapp.com/admin/copmlex')
            .then((res) => res.json())
            .then((data) => setComplex(data));
    }, []);

    const handleClose = () => {
        setOpenCreate(false);
        setOpenDelete(false);
        setOpenUpdate(false);
        setObj('');
        setComplexId('');
        setRoomId('');
        setCount('');
        setSquare('');
        setPrice('');
    };

    //CREATEMODAL
    const [openCreate, setOpenCreate] = React.useState(false);

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };
    const createRoom = () => {
        if (complexId && count && square && price) {
            fetch('https://creadohouse.herokuapp.com/admin/rooms', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    count,
                    square,
                    price,
                    id: complexId,
                }),
            })
                .then((res) => res)
                .then((data) => data);
            setOpenCreate(false);
            setComplexId('');
            setCount('');
            setSquare('');
            setPrice('');
        } else {
            alert('inputs not filled');
        }
    };

    //DELETEMODAL
    const [openDelete, setOpenDelete] = React.useState(false);
    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };
    const deleteRoom = () => {
        if (roomId) {
            fetch('https://creadohouse.herokuapp.com/admin/rooms', {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    id: roomId,
                }),
            })
                .then((res) => res)
                .then((data) => data);
            setOpenDelete(false);
            setRoomId('');
        } else {
            alert('select not filled');
        }
    };

    //UPDATEMODAL
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const handleClickOpenUpdate = () => {
        setOpenUpdate(true);
    };
    const updateRoom = () => {
        if (roomId && count && square && price) {
            fetch('https://creadohouse.herokuapp.com/admin/rooms', {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    id: roomId,
                    count,
                    square,
                    price,
                }),
            })
                .then((res) => res)
                .then((data) => data);
            setOpenUpdate(false);
            setRoomId('');
            setCount('');
            setSquare('');
            setPrice('');
        } else {
            alert('select not filled');
        }
    };

    const updateRender = (e) => {
        const id = e.target.value;
        setRoomId(id);
        setObj(room?.find((e) => e.roomid === id));
        setCount('');
        setSquare('');
        setPrice('');
    };

    React.useEffect(() => {
        if (obj) {
            document.getElementById('updateform')?.classList.remove('d-none');
            if (document.getElementById('count')) {
                document.getElementById('count').value = obj.count;
                setCount(obj.count);
            }
            if (document.getElementById('square')) {
                document.getElementById('square').value = obj.square;
                setSquare(obj.square);
            }
            if (document.getElementById('price')) {
                document.getElementById('price').value = obj.price;
                setPrice(obj.price);
            }
        } else {
            if (!document.getElementById('updateform')?.matches('.d-none')) {
                document.getElementById('updateform')?.classList.add('d-none');
            }
            if (document.getElementById('count')) {
                document.getElementById('count').value = '';
            }
            if (document.getElementById('square')) {
                document.getElementById('square').value = '';
            }
            if (document.getElementById('price')) {
                document.getElementById('price').value = '';
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
                            <th>Room count</th>
                            <th>
                                Square m<sup>2</sup>{' '}
                            </th>
                            <th>
                                Price 1m<sup>2</sup>
                            </th>
                            <th>Complex</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms &&
                            rooms.map((e, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{e.room}</td>
                                    <td>{e.square}</td>
                                    <td>{e.price}</td>
                                    <td>{e.complex}</td>
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
                        tooltipTitle={'New room'}
                    />
                    <SpeedDialAction
                        onClick={handleClickOpenDelete}
                        icon={<DeleteIcon />}
                        tooltipTitle={'Delete room'}
                    />
                    <SpeedDialAction
                        onClick={handleClickOpenUpdate}
                        icon={<TuneIcon />}
                        tooltipTitle={'Update room'}
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
                        {'Create new room'}
                    </DialogTitle>
                    <DialogContent className="">
                        <select
                            className="form-select me-3 mt-2 mb-2"
                            defaultValue={'company'}
                            onChange={(e) => {
                                setComplexId(e.target.value);
                                document.getElementById('createcount').value =
                                    '';
                                document.getElementById('createsquare').value =
                                    '';
                                document.getElementById('createprice').value =
                                    '';
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
                        <div>
                            <div className="d-flex mb-2">
                                <input
                                    id="createcount"
                                    onChange={(e) => {
                                        setCount(e.target.value);
                                    }}
                                    className="form-control me-2"
                                    type="number"
                                    placeholder="count"
                                />
                                <input
                                    id="createsquare"
                                    onChange={(e) => {
                                        setSquare(e.target.value);
                                    }}
                                    className="form-control"
                                    type="text"
                                    placeholder="square"
                                />
                            </div>
                            <input
                                id="createprice"
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}
                                className="form-control"
                                type="number"
                                placeholder="price"
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={createRoom}>Create</Button>
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
                        {'Delete Room'}
                    </DialogTitle>
                    <DialogContent className="mt-2">
                        <select
                            className="form-select mb-2 mt-2"
                            defaultValue={'company'}
                            onChange={(e) => {
                                setComplexId(e.target.value);
                                document.getElementById('deleteroom').value =
                                    document.getElementById(
                                        'deleteroom'
                                    )[0].value;
                            }}
                        >
                            <option value="company" disabled>
                                Select complex
                            </option>
                            {complex &&
                                complex.map((e, i) => (
                                    <option key={i} value={e.id}>
                                        {e.complex}
                                    </option>
                                ))}
                        </select>
                        <select
                            id="deleteroom"
                            className="form-select"
                            defaultValue={'company'}
                            onChange={(e) => {
                                setRoomId(e.target.value);
                            }}
                        >
                            <option value="company" disabled>
                                Select room
                            </option>
                            {room &&
                                room.map((e, i) => (
                                    <option key={i} value={e.roomid}>
                                        {e.count}
                                    </option>
                                ))}
                        </select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={deleteRoom}>Delete</Button>
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
                        {'Update Room'}
                    </DialogTitle>
                    <DialogContent className="mt-2">
                        <select
                            className="form-select mb-2 mt-2"
                            defaultValue={'company'}
                            onChange={(e) => {
                                setComplexId(e.target.value);
                                setRoomId('');
                                setObj('');
                                setCount('');
                                setSquare('');
                                setPrice('');
                                document.getElementById('selectroom').value =
                                    document.getElementById(
                                        'selectroom'
                                    )[0].value;
                            }}
                        >
                            <option value="company" disabled>
                                Select complex
                            </option>
                            {complex &&
                                complex.map((e, i) => (
                                    <option key={i} value={e.id}>
                                        {e.complex}
                                    </option>
                                ))}
                        </select>
                        <select
                            id="selectroom"
                            className="form-select mb-2"
                            defaultValue={'company'}
                            onChange={updateRender}
                        >
                            <option value="company" disabled>
                                Select room
                            </option>
                            {room &&
                                room.map((e, i) => (
                                    <option key={i} value={e.roomid}>
                                        {e.count}
                                    </option>
                                ))}
                        </select>
                        <div id="updateform" className="d-none">
                            <div className="d-flex mb-2">
                                <div className="me-2">
                                    <label className="d-block" htmlFor="count">
                                        Count:
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setCount(e.target.value)
                                        }
                                        id="count"
                                        className="form-control me-2"
                                        type="number"
                                    />
                                </div>
                                <div>
                                    <label className="d-block" htmlFor="square">
                                        Square:
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setSquare(e.target.value)
                                        }
                                        id="square"
                                        className="form-control"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <label className="d-block" htmlFor="price">
                                Price:
                            </label>
                            <input
                                onChange={(e) => setPrice(e.target.value)}
                                id="price"
                                className="form-control"
                                type="number"
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={updateRoom}>Update</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};
export default Room;
