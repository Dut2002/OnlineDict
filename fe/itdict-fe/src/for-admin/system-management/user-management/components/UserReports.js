import { Button, Col, Form, Image, Input, Pagination, Row } from "antd";
import { useState } from "react";
import searchIc from '../../../../image/search-ic.png';
import ReportTable from "./ReportTable";

export default function UserReports() {
    const [filter, setFilter] = useState({ username: '' });
    return (
        <>
            <div className="filter">
                <Form layout="vertical">
                    <Row>
                        <Col span={4}>
                            <Form.Item
                                label='Username'
                            >
                                <Input
                                    value={filter.username}
                                    onChange={(e) => {
                                        var fil = { ...filter };
                                        fil.username = e.target.value;
                                        setFilter(fil);
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={4} style={{ marginLeft: 10, marginTop: 29 }}>
                            <Button
                                type='ghost'
                                style={{ width: 100, borderRadius: 8, backgroundColor: '#032757', color: '#fff' }}
                            // onClick={() => loadData()}
                            >
                                <Image preview={false} height={15} src={searchIc}></Image>
                                <span style={{ marginLeft: 5 }}>Search</span>
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div>
                <ReportTable />
                <div style={{ marginTop: 20, float: 'right' }}>
                    <Pagination
                        showSizeChanger={false}
                        showTotal={(total, range) => { return (<span>Showing {range[0]} - {range[1]} of {total} records.</span>) }}
                        // onChange={(value) => loadData(value)}
                        defaultCurrent={1}
                        total={100}
                        current={1}
                        defaultPageSize={10}
                    />
                </div>
            </div>
        </>
    )
}