import { Button, Col, Image, Row } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { AppNotification } from "../common/AppNotification";
import { initdata, onChangeValue, mapdata } from "../common/commonFunc";
import MyFooter from "../common/MyFooter";
import logo from '../image/Logo.png';
import { UserService } from "../services/UserService";
import ResetForm from "./components/ResetForm";

export default function ResetPassword() {
    const state = useLocation();
    const [data,setData] = useState(initdata(null,{username: state?.state?.username},
        ['currentPassword','newPassword','rePassword','username']));
    const service = new UserService();
    const notify = new AppNotification();
    const navigate = useNavigate();

    async function handleSubmit(){
        var da = { ...data };
        await service.reset(mapdata(da,['username','currentPassword','newPassword','rePassword'])).then(res => {
            if (res && res.status === 200 && res?.data?.status === 200) {
                localStorage.setItem('loginInfo', JSON.stringify(res?.data?.data));
                navigate("/home");
            }
            else {
                notify.error(res?.data?.message, 'Reset password failed')
            }
        })
    }

    return (
        <>
            <Row>
                <Col span={8}></Col>
                <Col span={8}>
                    <Row style={{ marginTop: '10%' }}>
                        <Col span={18} style={{ marginTop: 70 }}>
                            <div style={{ fontSize: 24, fontWeight: 'bold' }}>
                                WELCOME {state?.state?.username},
                            </div>
                        </Col>
                        <Col span={6}>
                            <Image src={logo} preview={false} height={120} style={{ borderRadius: '50%' }} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 30 }}>
                        <Col span={24}>
                            <ResetForm 
                            data={data}
                            onChangeData = {(name,value) => {
                                var da = {...data};
                                da = onChangeValue(da,name,value);
                                setData(da);
                            }}

                            />
                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'center', marginTop: 20 }}>
                        <Col span={24}>
                            <Button className='submit-button'
                                type='ghost'
                                style={{ width: 150 }}
                                onClick={() => handleSubmit()}
                            >
                                Submit
                            </Button>
                        </Col>

                    </Row>
                </Col>
                <Col span={8}></Col>
            </Row>
            <MyFooter />
        </>
    )
}