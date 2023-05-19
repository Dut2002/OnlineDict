import { Button, Card, Checkbox, Col, Form, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
    const navigate = useNavigate();
    return (
        <>
            <Card title='Notes' style={{ height: 570 }}>
                <Form layout="vertical">
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label='Comment'
                            >
                                <TextArea
                                    autoSize={{ minRows: 14, maxRows: 14 }}
                                    value={props?.data?.comment?.value}
                                    onChange={(e) => props?.onChange('comment', e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Checkbox
                            style={{ marginRight: 5 }}
                            checked={props?.data?.isConfirmed?.value}
                            onChange={(e) => props?.onChange('isConfirmed', e.target.checked)}
                        /> I confirmed ....
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                        <Col span={6}></Col>
                        <Col span={12}>
                            <Button
                                type='ghost'
                                style={{ width: 100, borderRadius: 8, backgroundColor: '#032757', color: '#fff' }}
                                onClick={() => props?.handleSave()}
                            >
                                Save
                            </Button>
                            <Button
                                type='ghost'
                                style={{ width: 100, borderRadius: 8, borderColor: '#EDE8E8', marginLeft: 8 }}
                                onClick={() => navigate("/home")}
                            >
                                Cancel
                            </Button>
                        </Col>
                        <Col span={6}></Col>

                    </Row>
                </Form>
            </Card>
        </>
    )
}