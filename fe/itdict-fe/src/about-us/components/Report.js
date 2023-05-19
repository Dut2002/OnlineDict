import { Badge, Breadcrumb, Button, Card, Col, Rate, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import { useEffect, useState } from "react";
import { AppNotification } from "../../common/AppNotification";
import { FeedbackService } from "../../services/FeedbackService";

export default function Report() {
    const service = new FeedbackService();
    const [list, setList] = useState([]);
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        loadData();
        loadFeedback(0);
    }, [])

    async function loadData() {
        await service.getReport().then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                // new AppNotification().success("Thanks for your feedback.")
                setList(res?.data?.list);
            }
            else {
                new AppNotification().error(res?.data?.message)
            }
        })
    }

    async function loadFeedback(rate) {
        await service.getFeedback(rate).then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                // new AppNotification().success("Thanks for your feedback.")
                setFeedback(res?.data?.list);
            }
            else {
                new AppNotification().error(res?.data?.message)
            }
        })
    }
    return (
        <>
            <div style={{ padding: '0px 2%', marginTop: 70 }}>
                <div>
                    <Card>
                        <Row>
                            <Col span={22}>
                                <span style={{ fontSize: 28 }}>SYSTEM FEEDBACK REPORT</span>
                            </Col>
                        </Row>
                        <Row>
                            {
                                list ?
                                    list.map((item) => {
                                        return (
                                            <>
                                                {
                                                    item?.rate > 0 ?
                                                        <Button type="ghost" onClick={() => loadFeedback(item?.rate)}>
                                                            <Badge count={item?.count} overflowCount={1000000000}>
                                                                <Rate value={item?.rate} disabled />
                                                            </Badge>
                                                        </Button>
                                                        :
                                                        <Button type="ghost" onClick={() => loadFeedback(item?.rate)}>
                                                            <Badge count={item?.count} overflowCount={1000000000}>
                                                                All Feedbacks
                                                            </Badge>
                                                        </Button>
                                                }
                                            </>

                                        );
                                    }) :
                                    null
                            }

                        </Row>
                    </Card>
                </div>
                <div style={{ marginTop: 20, height: 550, overflow:'auto' }}>
                    {
                        feedback && feedback.length > 0 ?
                            feedback.map((item) => {
                                return (
                                    <>
                                        <Card style={{ marginBottom: '10px' }}>
                                            <Row>
                                                <Col span={6}>
                                                    <div>{item.createdBy} at {moment(item.created).format('DD/MM/YYYY HH:mm:ss')}</div>
                                                    <Rate value={item?.rate} disabled />
                                                </Col>
                                                <Col span={18}>
                                                    <TextArea
                                                        autoSize={{ maxRows: 4, minRows: 4 }}
                                                        value={item?.description}
                                                        disabled
                                                    />
                                                </Col>
                                            </Row>
                                        </Card>
                                    </>
                                );
                            })
                            : null
                    }
                </div>
            </div>

        </>
    )
}