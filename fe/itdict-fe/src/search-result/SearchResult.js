import { Button, Card, Col, Image, List, Pagination, Result, Row } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppNotification } from "../common/AppNotification";
import MyFooter from "../common/MyFooter";
import MyHeader from "../common/MyHeader";
import SearchBox from "../common/SearchBox";
import { HomeService } from "../services/HomeService";
import editIc from '../image/create-ic.png';

export default function SearchResult() {
    const state = useLocation();
    const [searchValue, setSearchValue] = useState();
    const [data, setData] = useState();
    const [searchResult, setSearchResult] = useState();
    const [relateds, setRelateds] = useState();
    const service = new HomeService();
    const notify = new AppNotification();
    const [currIdx, setCurrIdx] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setSearchValue(state?.state?.searchValue);
        var da = { ...data };
        da = state?.state?.data;
        setData(da);
        onSearch(state?.state?.searchValue);
    }, []);

    async function onSearch(key) {
        await service.search(key).then(res => {
            if (res && res.status === 200 && res?.data?.status === 200) {
                setSearchResult(res?.data?.list);
                if (res?.data?.list && res?.data?.list.length > 0) {
                    onSearchRelated(res?.data?.list[0].id);
                }
            }
            else {
                setSearchResult([]);
            }
        });
    }

    async function onSearchRelated(id) {
        await service.getRelated(id).then(res => {
            if (res && res.status === 200 && res?.data?.status === 200) {
                setRelateds(res?.data?.list);
            }
            else {
                notify.error(res?.data?.message, 'Internal error')
            }
        });
    }


    return (
        <>
            <div>
                <MyHeader
                    role={JSON.parse(localStorage.getItem('loginInfo'))?.roleId}
                    activeNav='dictionary'
                />
            </div>
            <div style={{ marginTop: 100, marginLeft: '23%' }}>
                <SearchBox
                    searchValue={searchValue}
                    data={data}
                    onChangeSearch={value => {
                        setSearchValue(value)
                    }}
                    handleSearch={() => {
                        var sV = searchValue;
                        if (!sV || sV?.trim().length === 0) {
                            notify.error("Please type something for search!");
                        } else {
                            onSearch(sV);
                        }
                    }}
                />
            </div>
            <div style={{ marginTop: 30 }}>
                <Row>
                    <Col span={2}></Col>
                    {
                        searchResult && searchResult.length > 0 ?
                            <>
                                <Col span={4}>
                                    <Card style={{ height: 480 }}>
                                        <div style={{ overflow: 'auto', height: 450 }}>
                                            <List
                                                itemLayout="horizontal"
                                                dataSource={searchResult}
                                                renderItem={(item) => (
                                                    <List.Item>
                                                        <List.Item.Meta
                                                            title={
                                                                <Button type="ghost" style={{ marginLeft: -17, color: 'red' }}
                                                                    onClick={() => {
                                                                        onSearch(item.keyword);
                                                                        setSearchValue(item.keyword);
                                                                        onSearchRelated(item.id);
                                                                    }}
                                                                >
                                                                    {item.keyword}
                                                                </Button>
                                                            }
                                                            description={item.subTitle}
                                                        />
                                                    </List.Item>
                                                )}
                                            />
                                        </div>

                                    </Card>
                                </Col>
                                <Col span={1}></Col>
                                <Col span={10}>
                                    <Card style={{ height: 480 }}
                                        title={
                                            <div style={{ marginTop: 20, marginBottom: 10 }}>
                                                <span style={{ color: 'red', fontSize: 24 }}>{
                                                    searchResult && searchResult.length > 0 ?
                                                        <>
                                                            {searchResult[currIdx]?.keyword}
                                                            <Button type="ghost"
                                                                onClick={() => {
                                                                    navigate("/updateWord", {
                                                                        state: {
                                                                            data: searchResult[currIdx]
                                                                        }
                                                                    });
                                                                }}
                                                            >
                                                                <Image src={editIc} preview={false} height={20} />
                                                            </Button>
                                                        </> : null}
                                                </span>
                                                <br></br>
                                                <span style={{ fontStyle: 'italic' }}>{
                                                    searchResult && searchResult.length > 0 ? searchResult[currIdx]?.subTitle : null}
                                                </span>
                                            </div>
                                        }
                                    >
                                        <h3>1. Defination</h3>
                                        <p>
                                            {searchResult && searchResult.length > 0 ? searchResult[currIdx]?.defination : null}
                                        </p>
                                        <h3>2. Syntax</h3>
                                        <Card>
                                            {searchResult && searchResult.length > 0 ? searchResult[currIdx]?.syntax : null}
                                        </Card>
                                    </Card>
                                </Col>
                                <Col span={1}></Col>
                                <Col span={4}>
                                    <Card style={{ height: 480 }}>
                                        <div style={{ overflow: 'auto', height: 450 }}>
                                            <List
                                                itemLayout="horizontal"
                                                dataSource={relateds}
                                                renderItem={(item) => (
                                                    <List.Item>
                                                        <List.Item.Meta
                                                            title={
                                                                <Button type="ghost" style={{ marginLeft: -17, color: 'red' }}
                                                                    onClick={() => {
                                                                        onSearch(item.keyword);
                                                                        setSearchValue(item.keyword);
                                                                        onSearchRelated(item.id);
                                                                    }}
                                                                >
                                                                    {item.keyword}
                                                                </Button>
                                                            }
                                                            description={item.subTitle}
                                                        />
                                                    </List.Item>
                                                )}
                                            />
                                        </div>
                                    </Card>
                                </Col>
                            </>
                            :
                            <>
                                <Col span={20}>
                                    <Card style={{ height: 480 }}>
                                        <Result
                                            status={500}
                                            title="Not Found!"
                                            subTitle="Key word not found in our system!"
                                        />
                                    </Card>
                                </Col>
                            </>
                    }

                </Row>
            </div>
            <div>
                <MyFooter />
            </div>
        </>
    )
}