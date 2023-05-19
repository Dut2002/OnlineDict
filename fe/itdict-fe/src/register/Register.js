import { Button, Col, Image, Row } from "antd";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppNotification } from "../common/AppNotification";
import { initdata, mapdata, onChangeValue, validateNullOrEmptyString } from "../common/commonFunc";
import { registerData } from "../common/Constants";
import MyFooter from "../common/MyFooter";

import logo from '../image/Logo.png';
import { LoginService } from "../services/LoginService";
import RegisterForm from "./components/RegisterForm";

export default function Register() {
    const [data, setData] = useState(initdata(null, null, registerData));
    const notify = new AppNotification();
    const service = new LoginService();
    const navigate = useNavigate();

    // console.log(data);
    function validate() {
        var da = { ...data };
        var valData = validateNullOrEmptyString(da, ['username', 'password', 'fullname', 'rePassword']);
        if(valData.isValid){
            if(!valData.data.phone.value && !valData.data.email.value){
                valData.isValid = false;
                notify.error('Need phone or email.','Error');
            }
            else{
                if(valData.data.password.value !== valData.data.rePassword.value){
                    valData.isValid = false;
                    valData.data.rePassword.error = 'error';
                    valData.data.rePassword.help = 'Re-password not same with password.'
                }else{
                    if(!valData.data.isConfirmed.value){
                        valData.data.isConfirmed.error = 'error';
                        valData.data.isConfirmed.help = 'You need confirmed with Terms.'
                    }
                }
                if(moment(valData.data.dob.value) > moment()){
                    valData.isValid = false;
                    notify.error('DOB is greater than current date.','Error');
                }
            }
        }
        setData(valData.data);
        return valData.isValid;
    }

    async function register(){
        var da = {...data};
        var en = mapdata(da, ['username', 'password', 'fullname', 'phone', 'email', 'dob','jobId']);
        await service.register(en).then(res => {
            if (res && res.status === 200 && res?.data?.status === 200) {
                localStorage.setItem('loginInfo', JSON.stringify(res?.data?.data));
                navigate("/home");
            }
            else {
                notify.error(res?.data?.message, 'Register failed')
            }
        })
    }
    return (
        <>
            <Row>
                <Col span={6}></Col>
                <Col span={12}>
                    <Row style={{ marginTop: '5%' }}>
                        <Col span={20} style={{ marginTop: 25 }}>
                            <div style={{ fontSize: 24, fontWeight: 'bold' }}>
                                WELCOME TO JOIN WITH US
                            </div>
                            <div style={{ fontSize: 50, fontWeight: 'bold' }}>
                                IT DICTIONARY
                            </div>
                        </Col>
                        <Col span={4}>
                            <Image src={logo} preview={false} height={120} style={{ borderRadius: '50%' }} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 30 }}>
                        <Col span={24}>
                            <RegisterForm
                                data={data}
                                onChangeData={(name, value) => {
                                    var up = { ...data };
                                    up = onChangeValue(up, name, value);
                                    setData(up);
                                }}
                            />
                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'center', marginTop: 20 }}>
                        <Col span={24}>
                            <Button className='submit-button'
                                type='ghost'
                                style={{ width: 150 }}
                                onClick={() => {
                                    if (!validate()) {
                                        return;
                                    }
                                    register();
                                }}
                            >
                                Register
                            </Button>
                        </Col>

                    </Row>
                </Col>
                <Col span={6}></Col>
            </Row>
            <MyFooter />
        </>
    )
}