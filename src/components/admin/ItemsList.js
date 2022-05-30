import {
   Box,
   Button,
   CircularProgress,
   Paper,
   Table,
   TableBody,
   TableCell,
   tableCellClasses,
   TableContainer,
   TableHead,
   TableRow,
   TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react';
import { Delete, Preview, AddCircle, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { getInfo } from '../../redux/actions';
import axios from 'axios';

function ItemsList() {
   const navigateTo = useNavigate();
   const state = useSelector((state) => state.users);
   const [searchState, setSearchState] = useState([]);
   const loading = useSelector((state) => state.loading);
   const dispatch = useDispatch();

   useEffect(() => {
      if (state.length === 0) {
         dispatch(getInfo());
      }
   }, []);

   console.log(state)

   const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
         backgroundColor: theme.palette.common.black,
         color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
         fontSize: 14,
      },
   }));

   const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
         backgroundColor: 'rgb(196, 196, 196)',
      },
      '&:last-child td, &:last-child th': {
         border: 0,
      },
   }));

   function DeleteItem(value) {
      openNotification('success');
      axios({
         method: 'post',
         url: 'http://f0607823.xsph.ru/elyor/public/api/user/login',
         data: {
            login: 'elyor',
            password: 'Qwer1234',
         },
         headers: { Accept: 'application/json' },
      }).then((response) => {
         let token = response.data.token;
         axios({
            method: 'post',
            url: `http://f0607823.xsph.ru/elyor/public/api/event/${value}`,
            data: {
               _method: 'delete',
            },
            headers: {
               Accept: 'application/json',
               'Content-Type': 'multipart/form-data',
            },
            headers: { Authorization: 'Bearer ' + token },
         }).then((response) => {
            console.log(response.data);
         });
      });
   }

   const searchValueInput = (e) => {
      if (e !== '') {
         const newItem = state.filter((i) => {
            return Object.values(i).join(' ').toLowerCase().includes(e.toLowerCase());
         });
         setSearchState(newItem);
      } else {
         setSearchState([]);
      }
   };

   const openNotification = (type) => {
      notification[type]({
         message: 'User has been deleted',
      });
   };

   return loading ? (
      <div className="flex justify-center items-center h-screen">
         <CircularProgress color="success" size={150} />
      </div>
   ) : (
      <div>
         <h2 className="text-4xl font-bold mb-5">All Items</h2>
         <div className="flex justify-between py-4">
            <Button
               variant="contained"
               startIcon={<AddCircle />}
               onClick={() => {
                  navigateTo('/admin/add');
               }}
            >
               ADD USER
            </Button>
            <Box
               sx={{
                  width: 800,
                  maxWidth: '100%',
               }}
            >
               <TextField onChange={(e) => searchValueInput(e.target.value)} fullWidth label="Search" />
            </Box>
         </div>
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <StyledTableCell>Title</StyledTableCell>
                     <StyledTableCell align="right">Category</StyledTableCell>
                     <StyledTableCell align="right">Date</StyledTableCell>
                     <StyledTableCell align="right">Image</StyledTableCell>
                     <StyledTableCell align="right">Info</StyledTableCell>
                     <StyledTableCell align="right">Place</StyledTableCell>
                     <StyledTableCell align="right">Action</StyledTableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {(searchState.length ? searchState : state).map((row) => (
                     <StyledTableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell component="th" scope="row">
                           {row.title}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.category}</StyledTableCell>
                        <StyledTableCell align="right">{row.date}</StyledTableCell>
                        <StyledTableCell align="right">
                           <img className='w-52' src={`http://f0607823.xsph.ru/elyor/public/storage/event/${row.id}/${row.id}.jpg`} alt="img" />
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.info}</StyledTableCell>
                        <StyledTableCell align="right">{row.place}</StyledTableCell>
                        <StyledTableCell align="right">
                           <div className="flex flex-col action_btn">
                              <Link to={`/admin/view/${row.id}`}>
                                 <Button type="primary" variant="contained" color="success" startIcon={<Preview />}>
                                    VIEW
                                 </Button>
                              </Link>
                              <Link to={`/admin/edit/${row.id}`}>
                                 <Button variant="contained" color="secondary" startIcon={<Edit />}>
                                    EDIT
                                 </Button>
                              </Link>
                              <Button onClick={() => DeleteItem(row.id)} variant="contained" color="error" startIcon={<Delete />}>
                                 DELETE
                              </Button>
                           </div>
                        </StyledTableCell>
                     </StyledTableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   );
}

export default ItemsList;
