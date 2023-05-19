import { Col, Row, Card, Rate, Form, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { AppNotification } from "../../common/AppNotification";
import { FeedbackService } from "../../services/FeedbackService";
export default function Feedback() {
    const [rate, setRate] = useState(0);
    const [description, setDescription] = useState('');

    const service = new FeedbackService();

    async function handleSend() {
        await service.sendFeedback({
            rate: rate,
            description: description,
            createdBy: JSON.parse(localStorage.getItem('loginInfo'))?.username
        }).then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                new AppNotification().success("Thanks for your feedback.")
            }
            else {
                new AppNotification().error(res?.data?.message)
            }
        })
    }
    return (
        <>
            <Row>
                <Col span={7}></Col>
                <Col span={10}>
                    <Card title="Your Feedback">
                        <Form layout="vertical">
                            <Form.Item
                                label="Do you comfortable using IT-Dict?"
                            >
                                <Rate
                                    value={rate}
                                    onChange={(value) => setRate(value)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Description more about your feedback"
                            >
                                <TextArea
                                    autoSize={{ maxRows: 4, minRows: 4 }}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Item>
                        </Form>
                        <div style={{ float: 'right' }}>
                            <Button className="submit-button" onClick={()=> handleSend()}>Send</Button>
                        </div>
                        <div style={{ marginTop: 90 }}>
                            If you have any problems, please contact email <span style={{
                                fontWeight:
                                    'bold'
                            }}>itdict.system.admin@gmail.com</span> immediately to receive support soon. Many thanks!
                        </div>
                    </Card>
                </Col>
                <Col span={7}></Col>
            </Row>
        </>
    )
}