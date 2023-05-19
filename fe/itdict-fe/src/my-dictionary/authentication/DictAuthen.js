import { Button, Card, Col, Input, Row } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppNotification } from "../../common/AppNotification";
import MyFooter from "../../common/MyFooter";
import MyHeader from "../../common/MyHeader";
import { DictionaryDetailService } from "../../services/DictionaryDetailService";

export default function DictAuthen() {
    const state = useLocation();
    const navigate = useNavigate();
    const [password, setPassword] = useState([]);
    const service = new DictionaryDetailService();

    async function handleAccess() {
        await service.checkAccess(state?.state?.data?.id, password).then(res => {
            if(res && res?.status === 200 && res?.data?.status === 200){
                // debugger;
                navigate("/detail", {
                    state: {
                        data: state?.state?.data, 
                        isAuthen: true
                    }
                })
            }
            else{
                new AppNotification().error(res?.data?.message)
            }
        })
    }

    return (
        <>
            <div>
                <MyHeader activeNav='/myDict' />
            </div>
            <div style={{ marginTop: '20%' }}>
                <Row>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Card style={{ height: 200 }}>
                            <div style={{ marginTop: 40 }}>
                                This dictionary need password to view, please enter the password:
                            </div>
                            <div style={{ marginTop: 10 }}>
                                <Input.Password
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div style={{ textAlign: 'center', marginTop: 10 }}>
                                <Button className="submit-button" onClick={() => handleAccess()}>Access</Button>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}></Col>
                </Row>

            </div>
            <div>
                <MyFooter />
            </div>
        </>
    )

}