import { Button, Col, Image, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppNotification } from "../common/AppNotification";
import { checkPermission, initdata, mapdata, onChangeValue, validateNullOrEmptyString } from "../common/commonFunc";
import MyFooter from "../common/MyFooter";
import UpdateForm from "./components/UpdateForm";
import logo from '../image/Logo.png';
import { registerData } from "../common/Constants";
import { UserService } from "../services/UserService";
import moment from "moment";

export default function UpdateProfile() {
    const [data, setData] = useState(initdata(null, null, registerData));
    const notify = new AppNotification();
    const service = new UserService();
    const navigate = useNavigate();

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('loginInfo'))?.username) {
            navigate("/login");
        } else {
            if (checkPermission("/updateProfile","Update Profile")) {
                loadUser();
            }
            else{
                navigate("/accessDenied");
            }
        }
    }, data)

    // console.log(data);
    function validate() {
        var da = { ...data };
        var valData = validateNullOrEmptyString(da, ['username', 'fullname']);
        if (valData.isValid) {
            if (!valData.data.phone.value && !valData.data.email.value) {
                valData.isValid = false;
                notify.error('Need phone or email.', 'Error');
            }
            if (moment(valData.data.dob.value) > moment()) {
                valData.isValid = false;
                notify.error('DOB is greater than current date.', 'Error');
            }
        }
        setData(valData.data);
        return valData.isValid;
    }

    async function update() {
        var da = { ...data };
        var en = mapdata(da, ['username', 'fullname', 'phone', 'email', 'dob', 'jobId']);
        await service.update(en).then(res => {
            if (res && res.status === 200 && res?.data?.status === 200) {
                notify.success("Update successfully")
            }
            else {
                notify.error(res?.data?.message, 'Register failed')
            }
        })
    }

    async function loadUser() {
        var da = { ...data }
        await service.getUser(JSON.parse(localStorage.getItem('loginInfo'))?.username).then(res => {
            if (res && res.status === 200 && res?.data?.data) {
                da = initdata(da, res?.data?.data, registerData);
                setData(da);
            }
            else {
                notify.error(res?.data?.message, 'Error')
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
                                Update Profile
                            </div>
                        </Col>
                        <Col span={4}>
                            <Image src={logo} preview={false} height={120} style={{ borderRadius: '50%' }} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 30 }}>
                        <Col span={24}>
                            <UpdateForm
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
                                    update();
                                }}
                            >
                                Update
                            </Button>
                            <Button className='submit-button'
                                type='ghost'
                                style={{ width: 150, marginLeft: 15 }}
                                onClick={() => {
                                    navigate("/reset", {
                                        state: {
                                            username: JSON.parse(localStorage.getItem('loginInfo'))?.username
                                        }
                                    })
                                }}
                            >
                                Change Password
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