import { Card, Col, Image, Row } from "antd";

import st from "../../image/top1.png";
import nd from "../../image/top2.png";
import rd from "../../image/top3.png";

export default function ContributorCard(props) {
    return (
        <>
            <Card title={'TOP CONTRIBUTORS'} style={{ height: 470 }}>
                {
                    props?.data?.counts ? props?.data?.counts.map((it, index) => {
                        const key = index + 1;
                        return (
                            <Row style={{ marginBottom: 10 }}>
                                <Col span={2}>
                                    {
                                        key <= 3 ?
                                            <Image preview={false} height={20}
                                                src={key === 1 ? st : (key === 2 ? nd : (key === 3 ? rd : ''))} />
                                            : null
                                    }

                                </Col>
                                <Col span={14}>
                                    <span style={{ fontWeight: 'bold' }}>{it.username}</span>
                                </Col>
                                <Col span={8}>
                                    <span>{it.counter} times</span>
                                </Col>
                            </Row>
                        )
                    })
                    : null
                }
            </Card>
        </>
    )
}