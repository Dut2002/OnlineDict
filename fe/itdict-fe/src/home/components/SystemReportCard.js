import { Card, Col, Image, Row, Statistic } from "antd";
import upIC from '../../image/icons8-up-64.png';
import blockIC from '../../image/icons8-unavailable-50.png';
import { LikeOutlined } from '@ant-design/icons';
import { DislikeOutlined } from '@ant-design/icons';
import { ArrowUpOutlined } from '@ant-design/icons';
import { ArrowDownOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { HomeService } from "../../services/HomeService";
export default function SystemReportCard() {
    const [data, setData] = useState({});
    const homeService = new HomeService();

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        await homeService.getReport().then(res => {
            if (res && res?.status === 200 && res?.data?.data) {
                setData(res?.data?.data);
            }
        })
    }

    return (
        <>
            <Card title={'SYSTEM REPORT'} style={{ height: 470 }}>
                <Row>
                    <Col span={7}>
                        <Card style={{ height: 160 }}>
                            <Statistic title="Active Users" value={data?.totalUser} />
                            <div>
                                <Image preview={false} src={upIC} height={20} />
                                <span style={{ color: '#178C46', marginLeft: 5 }}>{data?.newUser} user(s) / 7 days</span>
                            </div>
                            <div>
                                <Image preview={false} src={blockIC} height={20} />
                                <span style={{ color: '#FF0303', marginLeft: 5 }}>{data?.inactiveUser} user(s) / 7 days</span>
                            </div>
                        </Card>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={7}>
                        <Card style={{ height: 160 }}>
                            <Statistic title="Public Dictionary" value={data?.totalWord} />
                            <div>
                                <Image preview={false} src={upIC} height={20} />
                                <span style={{ color: '#178C46', marginLeft: 5 }}>{data?.newWord} word(s) / 7 days</span>
                            </div>
                        </Card>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={7}>
                        <Card style={{ height: 160 }}>
                            <Statistic title="Feedback" value={data?.like} prefix={<LikeOutlined />} />
                            <Statistic value={data?.dislike} prefix={<DislikeOutlined />} />
                        </Card>
                    </Col>
                </Row>
                <Row style={{ marginTop: 25 }}>
                    <Col span={23}>
                        <Card style={{ height: 140 }}>
                            <Row>
                                <Col span={8}>
                                    <Statistic title="Contribution" value={data?.totalContribution} />
                                    <div>In this month: {data?.contributionInMonth}</div>
                                </Col>
                                <Col span={8}>
                                    <Statistic title="Approved Rate"
                                        value={data?.approvedRate}
                                        prefix={<ArrowUpOutlined />}
                                        suffix="%"
                                        valueStyle={{ color: '#178C46' }}
                                    />
                                </Col>
                                <Col span={8}>
                                    <Statistic title="Rejected Rate"
                                        value={data?.rejectedRate}
                                        prefix={<ArrowDownOutlined />}
                                        suffix="%"
                                        valueStyle={{ color: '#FF0303' }}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Card>
        </>
    )
}