import { Button, Col, Form, Input, Row } from "antd";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import { AppNotification } from "../../common/AppNotification";
import { initdata, mapdata, onChangeValue, validateNullOrEmptyString } from "../../common/commonFunc";
import { UserService } from '../../services/UserService';


export default function ForgotForm() {
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [data,setData] = useState(initdata(null,null,['username','phone','email']));
    const [display,setDisplay] = useState('none');
    const service = new UserService();
    const notify = new AppNotification();

    function onChangeData(name,value){
        var d = {...data};
        d = onChangeValue(d,name,value);
        setData(d);
    }

    async function forgot() {
        var da = { ...data };
        var validate = validateNullOrEmptyString(da, ['username']);
        if (!validate.isValid) {
            da = validate.data;
            setData(da);
            return;
        }
        await service.forgot(mapdata(da,['username','email','phone'])).then(res => {
            if (res && res.status === 200 && res?.data?.status === 200) {
                localStorage.setItem('loginInfo', JSON.stringify(res?.data?.data));
                setDisplay('inline');
                da = initdata(da,res?.data?.data,['username','password','roleId','fullname']);
                setData(da);
            }
            else {
                notify.error(res?.data?.message, 'Forgot failed')
            }
        })
    }
    return (
        <>
            <Form layout="vertical">
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="Username"
                            required
                            validateStatus={data?.username?.error}
                            help={data?.username?.help}
                        >
                            <Input 
                            value={data?.username?.value}
                            onChange={e => onChangeData('username', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="Phone"
                            validateStatus={data?.phone?.error}
                            help={data?.phone?.help}
                        >
                            <Input 
                            value={data?.phone?.value}
                            onChange={e => onChangeData('phone', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="Email"
                            validateStatus={data?.email?.error}
                            help={data?.email?.help}
                        >
                            <Input 
                            value={data?.email?.value}
                            onChange={e => onChangeData('email', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} >
                        <Form.Item
                            label="Captcha"
                        >
                            <ReCAPTCHA
                                sitekey={"6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                                onChange={() => setDisableSubmit(false)}
                                className='recap'
                                size="normal"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Row style={{ textAlign: 'center', marginTop: 50 }}>
                <Col span={24}>
                    <Button className={disableSubmit ? 'disable-button' : 'submit-button'}
                        type='ghost'
                        style={{ width: 150 }}
                        disabled={disableSubmit}
                        onClick={() => forgot()}
                    >
                        Confirm
                    </Button>
                </Col>
            </Row>

            <Row style={{ marginTop: 10 }}>
                <Col span={24}>
                    <span style={{display: display}}>
                        Your new password is : <span style={{ fontWeight: 'bold' }}>{data?.password?.value}</span>. Please, click
                        <Link to="/reset" state={{ username: data?.username?.value }}> here </Link>
                        to reset password.
                    </span>
                </Col>
            </Row>
        </>
    )
}