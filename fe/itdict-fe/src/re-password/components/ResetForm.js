import { Col, Form, Input, Row } from "antd";

export default function ResetForm(props) {
    return (
        <>
            <Form layout="vertical">
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label='Old Password'
                        >
                            <Input.Password
                                value={props?.data?.currentPassword?.value}
                                onChange={e => props?.onChangeData('currentPassword', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label='New Password'
                        >
                            <Input.Password
                                value={props?.data?.newPassword?.value}
                                onChange={e => props?.onChangeData('newPassword', e.target.value)}

                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label='Re-Password'
                        >
                            <Input.Password
                                value={props?.data?.rePassword?.value}
                                onChange={e => props?.onChangeData('rePassword', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}