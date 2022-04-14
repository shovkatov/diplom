import {Button, Checkbox, Form, Input, message} from "antd";
import axios from "axios";
import {CircularProgress} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const Auth = () =>{
    const navigate = useNavigate()
    const [error , setError] = useState(false)
    const [loading , setLoading] = useState("")

    const onFinish = (values) => {
        setLoading(true)
        console.log(values);
        axios({
            method: 'post',
            url: 'http://f0607823.xsph.ru/elyor/public/api/user/login',
            data:values,
            headers: { Accept: 'application/json' },
        })
            .then(res=>{
                console.log(res.data)
                setLoading(false)
                setError("")
                navigate('/admin/elyor')
            })
            .catch(err=>{
                setLoading(false)
                console.log(err)
                setError("error")
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return <div className="w-96 mt-56 m-auto">
        {loading?
            <CircularProgress color="success" />:
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Логин"
                name="login"
                validateStatus={error}
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Пароль"
                name="password"
                validateStatus={error}
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button className="bg-amber-300 text-black" type="primary" htmlType="submit">
                    Войти
                </Button>
                {error==="error"&&<p className="text-red-500 mt-1">Ошибка логин или пароль</p>}
            </Form.Item>
        </Form>
        }
    </div>
}