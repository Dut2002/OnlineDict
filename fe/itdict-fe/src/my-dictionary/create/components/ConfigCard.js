import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { edits, views } from "../../../common/Constants";

export default function ConfigCard(props) {
    const navigate = useNavigate();
    return (
        <>
            <Card style={{ height: 570 }}>
                <Form layout="vertical">
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label='Who can view'
                                validateStatus={props?.data?.viewBy?.error}
                                help={props?.data?.viewBy?.help}
                            >
                                <Select
                                    style={{ width: '100' }}
                                    options={views.map((item) => ({
                                        label: item.name,
                                        value: item.value,
                                    }))}
                                    onChange={(value) => {
                                        props?.onChange('viewBy', value);
                                        if(value === 3){
                                            props?.onChange('editBy', 3);
                                        }
                                    }
                                    }
                                    value={props?.data?.viewBy?.value}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label='Who can edit'
                                validateStatus={props?.data?.editBy?.error}
                                help={props?.data?.editBy?.help}
                            >
                                <Select
                                    style={{ width: '100' }}
                                    options={edits.map((item) => ({
                                        label: item.name,
                                        value: item.value,
                                    }))}
                                    disabled={props?.data?.viewBy?.value === 3}
                                    onChange={((value) => props?.onChange('editBy', value))}
                                    value={props?.data?.editBy?.value}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label='Password'
                                validateStatus={props?.data?.password?.error}
                                help={props?.data?.password?.help}
                            >
                                <Input.Password
                                    disabled={!(props?.data?.viewBy?.value === 2 || props?.data?.editBy?.value === 2)}
                                    onChange={((e) => props?.onChange('password', e.target.value))}
                                    value={props?.data?.password?.value}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 200 }}></Row>
                    <Row style={{ marginTop: 20 }}>
                        <Col span={6}></Col>
                        <Col span={12}>
                            <Button
                                type='ghost'
                                style={{ width: 100, borderRadius: 8, backgroundColor: '#032757', color: '#fff' }}
                                onClick={() => {
                                    const handleSubmit = props?.handleSubmit;
                                    if(handleSubmit){
                                        handleSubmit();
                                    }
                                }}
                            >
                                Save
                            </Button>
                            <Button
                                type='ghost'
                                style={{ width: 100, borderRadius: 8, borderColor: '#EDE8E8', marginLeft: 8 }}
                                onClick={() => navigate("/myDict")}
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