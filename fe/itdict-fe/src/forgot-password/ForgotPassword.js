import { Col, Image, Row } from "antd";
import MyFooter from "../common/MyFooter";
import logo from '../image/Logo.png'
import ForgotForm from "./components/ForgotForm";

export default function ForgotPassword() {
    return (
        <>
            <Row style={{ marginTop: '2%' }}>
                <Col span={24}>
                    <div style={{ textAlign: 'center' }}>
                        <Image src={logo} preview={false} height={120} style={{ borderRadius: '50%' }} />
                    </div>
                </Col>
            </Row>
            <Row style={{ marginTop: '1%' }}>
                <Col span={8}></Col>
                <Col span={8}>
                    <ForgotForm />
                </Col>
                <Col span={8}></Col>
            </Row>
            <MyFooter />
        </>
    )
}