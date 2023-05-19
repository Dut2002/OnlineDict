import { Button, Card, Checkbox, Col, Form, Row, Select } from "antd";
import { useNavigate } from "react-router-dom";

export default function ImportFromDict(props) {
    const navigate = useNavigate();
    return (
        <>
            <Card title='Import from your dictionary' style={{ height: 570 }}>
                <Form layout="vertical">
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label='Dictionary'
                            >
                                <Select
                                    style={{ width: '100' }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label='Word'
                            >
                                <Select
                                    style={{ width: '100' }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 200 }}></Row>
                    <Row>
                        <Checkbox
                            style={{ marginRight: 5 }}
                            checked={props?.data?.isConfirmed?.value}
                            onChange={(e) => props?.onChange('isConfirmed',e.target.checked)}
                        /> I confirmed ....
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                        <Col span={6}></Col>
                        <Col span={12}>
                            <Button
                                type='ghost'
                                style={{ width: 100, borderRadius: 8, backgroundColor: '#032757', color: '#fff' }}
                                onClick={() => props?.handleSubmit()}
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