import { Breadcrumb, Button, Card, Col, Divider, Image, Input, Row, Tag } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyFooter from "../common/MyFooter";
import MyHeader from "../common/MyHeader";
import searchIc from '../image/search-ic.png';
import { DictionaryService } from "../services/DictionaryService";
import lockIc from '../image/lock-ic.png';
import deleteIc from '../image/remove-ic.png';

export default function MyDictionary() {
    const navigate = useNavigate();
    const service = new DictionaryService();
    const [myDicts, setMyDicts] = useState([]);
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        loadMyDict();
    }, [])

    async function loadMyDict() {
        await service.getAllBy(JSON.parse(localStorage.getItem('loginInfo'))?.username).then(res => {
            if (res && res?.status === 200 && res?.data?.list) {
                setMyDicts(res?.data?.list);
            }
        })
    }

    async function onSearch() {
        await service.search(searchName).then(res => {
            if (res && res?.status === 200 && res?.data?.list) {
                setMyDicts(res?.data?.list);
            }
        })
    }
    return (
        <>
            <div>
                <MyHeader
                    role={1}
                    activeNav='/myDict'
                />
            </div>
            <div style={{ padding: '0px 2%', marginTop: 70 }}>
                <div>
                    <Card>
                        <Row>
                            <Col span={22}>
                                <span style={{ fontSize: 28 }}>MY DICTIONARY</span>
                                <Breadcrumb>
                                    <Breadcrumb.Item>List Dictionaries</Breadcrumb.Item>
                                </Breadcrumb>
                            </Col>
                            <Col span={2} style={{ marginTop: 20 }}>
                                <Button
                                    type='ghost'
                                    style={{ width: 100, borderRadius: 8, backgroundColor: '#032757', color: '#fff' }}
                                    onClick={() => {
                                        navigate("/createDict");
                                    }}
                                >
                                    <span>Create</span>
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </div>

                <div style={{ marginTop: 20 }}>
                    <Row>
                        <Col span={17}></Col>
                        <Col span={5}>
                            <Input
                                style={{ width: '95%', height: 34 }}
                                placeholder="All"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                            />
                        </Col>
                        <Col span={2}>
                            <Button
                                type='ghost'
                                style={{ width: 100, borderRadius: 8, backgroundColor: '#032757', color: '#fff' }}
                                onClick={() =>
                                    onSearch()
                                }
                            >
                                <Image preview={false} height={15} src={searchIc}></Image>
                                <span style={{ marginLeft: 5 }}>Search</span>
                            </Button>

                        </Col>
                    </Row>
                    <Divider type="horizontal" />
                </div>
                <div style={{ overflow: 'auto', height: 500 }}>
                    <Row>
                        {
                            myDicts ? myDicts.map((item) => {
                                return (
                                    <>
                                        <Col span={5} style={{ marginBottom: 20 }}>
                                            <Card style={{ height: 170 }} onClick={() => {
                                                navigate("/detail", { state: { data: item } })
                                            }}>
                                                <Row>
                                                    <Col span={24} style={{ textAlign: 'right' }}>
                                                        {moment(item?.created).format("DD MMM YYYY")}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col span={24}>
                                                        {
                                                            item?.categories ? item?.categories.map(i => {
                                                                return (
                                                                    <Tag>{i}</Tag>
                                                                )
                                                            })
                                                                : null
                                                        }

                                                    </Col>
                                                </Row>
                                                <Row style={{ marginTop: 10 }}>
                                                    <Col span={24}>
                                                        <span style={{ fontSize: 16, fontWeight: 'bold' }}>{item?.name}</span>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col span={24}>
                                                        {item?.numOfWords} word(s) | {item?.createdBy} {

                                                            item.viewBy === 2 ?
                                                                <span> |
                                                                    <Image preview={false} src={lockIc} height={10} /> </span> : null}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col span={24} style={{ textAlign: 'right' }}>
                                                        {
                                                            item.createdBy === JSON.parse(localStorage.getItem('loginInfo'))?.username ?
                                                                <Image preview={false} src={deleteIc} height={20} />
                                                                : null
                                                        }

                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Col>
                                        <Col span={1}></Col>
                                    </>
                                )
                            })
                                : null
                        }
                    </Row>
                </div>

            </div>

            <div>
                <MyFooter />
            </div>
        </>
    )
}