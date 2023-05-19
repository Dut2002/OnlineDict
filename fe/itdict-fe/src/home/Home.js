import { Button, Col, Image, Row } from "antd";
import MyFooter from "../common/MyFooter";
import MyHeader from "../common/MyHeader";
import logo from "../image/Logo.png";
import createIcon from '../image/create-ic.png';
import SearchBox from "../common/SearchBox";
import PopularCard from "./components/PopularCard";
import ContributorCard from "./components/ContributorCard";
import { useEffect, useState } from "react";
import { HomeService } from "../services/HomeService";
import { AppNotification } from "../common/AppNotification";
import { useNavigate } from "react-router-dom";
import { checkPermission } from "../common/commonFunc";
import SystemReportCard from "./components/SystemReportCard";
import WattingCard from "./components/WattingCard";

export default function Home() {
    const [data, setData] = useState();
    const [searchValue, setSearchValue] = useState('');
    const service = new HomeService();
    const notify = new AppNotification();
    const navigate = useNavigate();

    useEffect(() => {
        initData();
    }, []);

    async function initData() {
        // var da = { ...data };
        await service.init().then(res => {
            if (res && res.status === 200 && res?.data?.status === 200) {
                setData(res?.data?.data);
            }
            else {
                notify.error(res?.data?.message, 'Internal error')
            }
        })
    }

    return (
        <>
            <div>
                <MyHeader
                    activeNav='/home'
                />
            </div>
            <div style={{ marginTop: 70 }}>
                <div style={{ textAlign: 'center' }}>
                    <Image src={logo} preview={false} height={120} style={{ borderRadius: '50%' }} />
                </div>
                <div style={{ marginLeft: '23%' }}>
                    <SearchBox
                        data={data}
                        searchValue={searchValue}
                        onChangeSearch={value => setSearchValue(value)}
                        handleSearch={() => {
                            if (!searchValue || searchValue?.trim().length === 0) {
                                notify.error("Please type something for search!");
                            } else {
                                navigate("/search", {
                                    state: {
                                        searchValue: searchValue,
                                        data: data
                                    }
                                })
                            }
                        }}
                    />
                    <Row>
                        <Col span={4}>
                            <Image src={createIcon} preview={false} height={20} />
                            <Button type="link" style={{ marginLeft: -8 }} onClick={() => { navigate("/addWord") }}>New word</Button>
                        </Col>
                        <Col span={10}></Col>
                        <Col span={4} style={{ marginTop: 6 }}>
                            <span style={{ padding: 4, fontStyle: 'italic' }}>Total {data?.totalWords} words</span>
                        </Col>
                    </Row>
                </div>
                <div style={{ marginTop: 20 }}>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={12}>
                            {
                                checkPermission("/home", "Popular Searching") ?
                                    <PopularCard
                                        data={data}
                                    />
                                    :
                                    null
                            }
                            {
                                checkPermission("/home", "Watting For Approved") ?
                                    <>
                                        <WattingCard />
                                    </>
                                    :
                                    null
                            }
                            {
                                checkPermission("/home", "System Report") ?
                                    <>
                                        <SystemReportCard />
                                    </>
                                    :
                                    null
                            }

                        </Col>
                        <Col span={1}></Col>
                        <Col span={7}>
                            <ContributorCard
                                data={data}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
            <div>
                <MyFooter />
            </div>
        </>
    )
}