import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { DictionaryDetailService } from "../../../../services/DictionaryDetailService";

export default function ListWord(props) {
    const [list, setList] = useState([]);

    const service = new DictionaryDetailService();

    useEffect(() => {
        init();
    }, [])

    async function init() {
        await service.get(props?.data?.id).then(res => {
            if (res && res.status === 200 && res.data?.list) {
                setList(res.data.list);
            }
        })
    }
    return (
        <>
            <div style={{ paddingLeft: 10, height: 600, overflow: 'auto' }}>
                {
                    list.map((item) => {
                        return (
                            <Card>
                                <Row>
                                    <Col span={6}>
                                        <Card>{item.keyword}</Card>
                                    </Col>
                                    <Col span={18}>
                                        <div style={{ paddingLeft: 10 }}>
                                            <Card>{item.definition}</Card>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        );
                    })
                }

            </div>

        </>
    )
}