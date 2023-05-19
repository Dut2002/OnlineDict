import { Button, Divider, Form, Image, Input } from 'antd'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppNotification } from '../common/AppNotification';
import { onChangeValue, validateNullOrEmptyString } from '../common/commonFunc';
import MyFooter from '../common/MyFooter';
import '../css/Login.css';
import logo from '../image/Logo.png';
import { LoginService } from '../services/LoginService';

export default function Login() {
    const [data, setData] = useState({ username: {}, password: {} });
    const service = new LoginService();
    const notify = new AppNotification();
    const navigate = useNavigate();

    async function handleLogin(e) {
        var da = { ...data };
        e.preventDefault();
        var validate = validateNullOrEmptyString(da, ['username', 'password']);
        if (!validate.isValid) {
            da = validate.data;
            setData(da);
            return;
        }
        await service.login({
            username: da.username.value,
            password: da.password.value
        }).then(res => {
            if (res && res.status === 200 && res?.data?.status === 200) {
                localStorage.setItem('loginInfo', JSON.stringify(res?.data?.data));
                navigate("/home");
            }
            else {
                notify.error(res?.data?.message, 'Login failed')
            }
        })
    }

    function onChangeData(name, value) {
        var da = { ...data };
        da = onChangeValue(da, name, value);
        setData(da);
    }

    return (
        <>
            <div className="content">
                <div style={{ fontSize: 24, fontWeight: 'bold' }}>
                    WELCOME TO
                </div>
                <div style={{ fontSize: 50, fontWeight: 'bold' }}>
                    IT DICTIONARY
                </div>
                <div className="login-form" style={{ marginTop: 30 }}>
                    <Form layout='vertical'>
                        <Form.Item
                            label="Username"
                            validateStatus={data?.username?.error}
                            help={data?.username?.help}
                        >
                            <Input
                                style={{ width: '50%' }}
                                value={data?.username?.value}
                                onChange={e => onChangeData('username', e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            validateStatus={data?.password?.error}
                            help={data?.password?.help}
                        >
                            <Input.Password
                                style={{ width: '50%' }}
                                value={data?.password?.value}
                                onChange={e => onChangeData('password', e.target.value)}
                            />
                        </Form.Item>
                    </Form>
                </div>

            </div>
            <div style={{ marginLeft: '45%' }}>
                <Button className='submit-button'
                    type='ghost'
                    onClick={(e) => handleLogin(e)}
                >
                    Login
                </Button>
            </div>

            <div style={{ marginLeft: '31%', marginTop: '15px' }}>
                If you don’t have account, please try to
                <Link to='/register' style={{ textDecoration: 'none', color: '#0872FF' }}> Sign Up</Link>
                <Divider type='vertical' style={{ fontWeight: 'bold' }} />
                <Link to='/forgot' style={{ textDecoration: 'none', color: '#0872FF' }}>Forgot password</Link>
            </div>
            <div style={{ marginLeft: '70%', marginTop: '-8%' }}>
                <Image src={logo} preview={false} height={150} style={{ borderRadius: '50%' }} />
            </div>
            <div >
                <MyFooter />
            </div>

        </>

    )
}