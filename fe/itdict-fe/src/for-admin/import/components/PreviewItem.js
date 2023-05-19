import { Card, Checkbox, Col, Input, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

export default function PreviewItem(props) {
    return (
        <>
            <Card style={{ marginBottom: 10 }}>
                <Row>
                    <Col span={1}>
                        <Checkbox checked={props?.data?.validate} disabled={true} />
                        <span>
                            {props?.index ? (props.index < 9 ? '0' + (props.index + 1) : (props.index + 1) + '.') : '01.'}
                        </span>
                    </Col>
                    <Col span={7}>
                        <Input value={props?.data?.keyword}
                            onChange={e => props?.onChange(props?.index, 'keyword', e.target.value)}
                        />
                    </Col>
                    <Col span={16}></Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                    <Col span={2}>
                        <span>Sub title</span>
                    </Col>
                    <Col span={9}>
                        <Input
                            value={props?.data?.subTitle}
                            onChange={e => props?.onChange(props?.index, 'subTitle', e.target.value)}
                        />
                    </Col>
                    <Col span={1}></Col>
                    <Col span={2}>
                        <span>Category</span>
                    </Col>
                    <Col span={9}>
                        <Select
                            mode="tags"
                            value={props?.data?.categories}
                            style={{ width: '100%' }}
                            onChange={value => props?.onChange(props?.index, 'categories', value)}
                            options={props?.categories ? props?.categories?.map(k => ({
                                label: k, value: k
                            })) : null}
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                    <Col span={2}>
                        <span>Definition</span>
                    </Col>
                    <Col span={9}>
                        <TextArea
                            value={props?.data?.defination}
                            autoSize={{ minRows: 4, maxRows: 4 }}
                            onChange={e => props?.onChange(props?.index, 'defination', e.target.value)}
                        />
                    </Col>
                    <Col span={1}></Col>
                    <Col span={2}>
                        <span>Syntax</span>
                    </Col>
                    <Col span={9}>
                        <TextArea
                            value={props?.data?.syntax}
                            autoSize={{ minRows: 4, maxRows: 4 }}
                            onChange={e => props?.onChange(props?.index, 'syntax', e.target.value)}
                        />
                    </Col>
                </Row>
            </Card>


        </>
    )
}