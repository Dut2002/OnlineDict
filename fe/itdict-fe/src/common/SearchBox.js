import { AutoComplete, Button, Col, Row, Select } from 'antd';
import '../css/common.css';


export default function SearchBox(props) {
    return (
        <>
            <div className="search-box">
                <div style={{ marginLeft: 20 }}>
                    <Row>
                        {/* <Col span={4} style={{ marginTop: 18 }}>
                            <Select
                                defaultValue={1}
                                bordered={false}
                                style={{ width: '100%' }}
                            >
                                {props?.data?.categories ? props?.data?.categories.map(elm => {
                                    return (
                                        <Select.Option key={elm.id} value={elm.id}>{elm.name}</Select.Option>
                                    )
                                }) : null}
                            </Select>
                        </Col>
                        <Col span={1} style={{ marginTop: 22 }}>
                            <Divider type="vertical" style={{ height: 25, borderColor: '#032757' }} />
                        </Col> */}
                        <Col span={20} style={{ marginTop: 18 }}>
                            <AutoComplete
                                bordered={false}
                                style={{ width: '100%' }}
                                placeholder={'Enter a word'}
                                value={props?.searchValue}
                                onChange={(val) => props?.onChangeSearch(val)}
                            >
                                {props?.data?.words ? props?.data?.words.map(elm => {
                                    return (
                                        <Select.Option key={elm.id} value={elm.keyword}>{elm.keyword}</Select.Option>
                                    )
                                }) : null}
                            </AutoComplete>
                        </Col>
                        <Col span={3} style={{ marginTop: 16, marginLeft: 10 }}>
                            <Button className='submit-button'
                                type='ghost'
                                onClick={()=> props?.handleSearch()}
                            >
                                Search
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}