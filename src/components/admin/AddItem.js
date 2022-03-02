import { FormatListBulleted } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Form, Input, notification } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
   const navigateTo = useNavigate();
   const [user, setuser] = useState({
      address: '',
      category: '',
      info: '',
      contact: '',
      date: '',
      image: '',
      location: '',
      place: '',
      price: null,
      title: '',
   });

   const openNotification = (type) => {
      if (type == 'error') {
         notification[type]({
            message: 'Failed',
         });
      } else {
         notification[type]({
            message: 'Succes',
         });
      }
   };

   function created() {
      const data = new FormData();

      data.append('title', user.title);
      data.append('address', user.address);
      data.append('category', user.category);
      data.append('place', user.place);
      data.append('price', user.price);
      data.append('contact', user.contact);
      data.append('date', user.date);
      data.append('location', user.location);
      data.append('info', user.info);
      data.append('image', user.image);

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
            url: 'http://f0607823.xsph.ru/elyor/public/api/event',
            data: data,
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

   const onFinish = () => {
      if (!address || !category || !info || !contact || !date || !image || !location || !price || !place || !title) {
         openNotification('error');
         return false;
      } else {
         created();
         openNotification('success');
         setTimeout(() => {
            navigateTo('/admin/elyor');
         }, 500);
      }
   };

   const inputToUser = (e) => {
      let { name, value } = e.target;
      setuser({ ...user, [name]: value });
   };

   const { address, category, info, contact, date, image, location, place, title, price } = user;

   return (
      <div className="addUser">
         <h2 className="text-4xl font-bold mb-5">Add User</h2>
         <Button
            variant="contained"
            startIcon={<FormatListBulleted />}
            onClick={() => {
               navigateTo('/admin/elyor');
            }}
            type="primary"
            size="large"
         >
            List of Users
         </Button>
         <Form
            className="w-80 pt-8"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
         >
            <Form.Item label="Adress" rules={[{ required: true, message: 'Please input your username!' }]}>
               <Input value={address} name="address" onChange={inputToUser} />
            </Form.Item>

            <Form.Item label="Category" rules={[{ required: true, message: 'Please input your username!' }]}>
               <Input value={category} name="category" onChange={inputToUser} />
            </Form.Item>

            <Form.Item label="Info" rules={[{ required: true, message: 'Please input your username!' }]}>
               <Input minLength={10} value={info} name="info" onChange={inputToUser} />
            </Form.Item>

            <Form.Item label="Contact" rules={[{ required: true, message: 'Please input your username!' }]}>
               <Input minLength={3} value={contact} name="contact" onChange={inputToUser} />
            </Form.Item>

            <Form.Item label="Date" rules={[{ required: true, message: 'Please input your username!' }]}>
               <Input type={'date'} value={date} name="date" onChange={inputToUser} />
            </Form.Item>

            <Form.Item label="Image" rules={[{ required: true, message: 'Please input your username!' }]}>
               <Input type={'file'} name="image" onChange={(e) => setuser({ ...user, image: e.target.files[0] })} />
            </Form.Item>

            <Form.Item label="Location" rules={[{ required: true, message: 'Please input your username!' }]}>
               <Input minLength={3} value={location} name="location" onChange={inputToUser} />
            </Form.Item>

            <Form.Item label="Price" rules={[{ required: true, message: 'Please input your username!' }]}>
               <Input minLength={5} type={'number'} value={price} name="price" onChange={inputToUser} />
            </Form.Item>

            <Form.Item label="Place" rules={[{ required: true, message: 'Please input your username!' }]}>
               <Input minLength={3} value={place} name="place" onChange={inputToUser} />
            </Form.Item>

            <Form.Item label="Title" rules={[{ required: true, message: 'Please input your username!' }]}>
               <Input minLength={9} value={title} name="title" onChange={inputToUser} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 7, span: 16 }}>
               <Button variant="contained" color="success" type="primary" type="submit">
                  ADD
               </Button>
               <Button variant="outlined" color="error" type="primary" type="reset">
                  RESET
               </Button>
            </Form.Item>
         </Form>
      </div>
   );
};

export default AddItem;
