import { Button, Card, Col, Row } from "antd";

export default function PopularCard(props) {
    return (
        <>
            <Card title={'POPULAR SEARCHES'} style={{height:470}}>
                <Row style={{ paddingBottom: 5 }}>
                    {
                        props?.data?.words? props?.data?.words.map((item) => {
                            return (
                                <>
                                    <Col span={5} style={{ marginBottom: 20 }}>
                                        <Button
                                            type="link"
                                            style={{
                                                width: '100%', textAlign: 'center', backgroundColor: '#E6EAEF',
                                                height: 30, color: '#032757', borderRadius: 20,
                                                textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'
                                            }}
                                        >
                                            <span>{item.keyword}</span>
                                        </Button>
                                    </Col>
                                    <Col span={1}></Col>
                                </>

                            )
                        })
                        : null
                    }
                </Row>
            </Card>
        </>
    );
}