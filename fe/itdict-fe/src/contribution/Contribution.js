import { Breadcrumb, Button, Card, Col, Image, Input, Pagination, Row } from "antd";
import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { AppNotification } from "../common/AppNotification";
import { checkPermission } from "../common/commonFunc";
import MyFooter from "../common/MyFooter";
import MyHeader from "../common/MyHeader";
import { ContributionManagementService } from "../services/ContributionManagementService";
import WaitingContributionTable from "./components/WaitingContributionTable";
import searchIc from '../image/search-ic.png';
import MyContributionTable from "./components/MyContributionTable";

export default function Contribution() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!checkPermission("/contribution", "My Contributions") && !checkPermission("/contribution", "Waiting Contributions")) {
            navigate("/accessDenied");
        }
        loadData();
    }, [])

    const service = new ContributionManagementService();
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({ currentPage: 1, keyword: '', username: '' });
    const [total, setTotal] = useState(0);
    const notify = new AppNotification();

    async function loadData(currentPage = 1) {
        var fil = { ...filter };
        var da = [...data];
        fil.currentPage = currentPage;
        if (checkPermission("/contribution", "My Contributions")) {
            fil.username = JSON.parse(localStorage.getItem('loginInfo'))?.username;
        }
        await service.getData(fil).then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                da = res?.data?.list;
                setData(da);
                setFilter(fil);
            } else {
                notify.error(res?.data?.message, 'Internal error');
            }
        });
        await service.getTotal(fil).then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                setTotal(res?.data?.data);
            } else {
                notify.error(res?.data?.message, 'Internal error');
            }
        });


    }

    function onChangeTableValue(name, value, index) {
        var da = [...data];
        da[index][name] = value;
        setData(da);
    }

    async function onApprove(id) {
        var da = [...data];
        var en = da[id];
        en.updatedBy = JSON.parse(localStorage.getItem('loginInfo'))?.username;
        await service.approve(en).then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                notify.success(res?.data?.message);
                en.status = true;
                da[id] = en;
                setData(da);
            } else {
                notify.error(res?.data?.message, 'Internal error');
            }
        });
    }

    async function onReject(id) {
        var da = [...data];
        var en = da[id];
        await service.reject(en.id, JSON.parse(localStorage.getItem('loginInfo'))?.username).then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                notify.success(res?.data?.message);
                en.status = false;
                da[id] = en;
                setData(da);
            } else {
                notify.error(res?.data?.message, 'Internal error');
            }
        });
    }

    async function onSaveNotes(index) {
        console.log("approve", index);
        var da = [...data];
        var en = da[index];
        en.updatedBy = JSON.parse(localStorage.getItem('loginInfo'))?.username;
        en.notes = en?.newNotes;
        en.isEditNote = false;
        await service.saveNotes(en).then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                notify.success(res?.data?.message);
                da[index] = en;
                setData(da);
            } else {
                notify.error(res?.data?.message, 'Internal error');
            }
        });
    }

    async function onDelete(id) {
        await service.delete(id).then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                notify.success(res?.data?.message);
                loadData();
            } else {
                notify.error(res?.data?.message, 'Internal error');
            }
        });
    }

    return (
        <>
            <MyHeader
                activeNav='/contribution'
            />
            <div style={{ padding: '0px 2%', marginTop: 80 }}>
                <div>
                    <Card>
                        <span style={{ fontSize: 28 }}>PUBLIC DICTIONARY</span>
                        <Breadcrumb>
                            <Breadcrumb.Item>Contribution</Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {
                                    checkPermission("/contribution", "My Contributions") ?
                                        "My Contributions"
                                        : checkPermission("/contribution", "Waiting Contributions") ?
                                            "Waiting Contributions"
                                            : null}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Card>
                </div>
                <div style={{ marginTop: 20, height: 570 }}>
                    <Card style={{ height: 570 }}>
                        <>
                            <div className="filter" style={{ marginBottom: 20 }}>
                                <Row>
                                    <Col span={4}>
                                        <Input
                                            value={filter.keyword}
                                            placeholder="Keyword"
                                            onChange={(e) => {
                                                var fil = { ...filter };
                                                fil.keyword = e.target.value;
                                                setFilter(fil);
                                            }}
                                        />
                                    </Col>
                                    <Col span={4} style={{ marginLeft: 10 }}>
                                        <Button
                                            type='ghost'
                                            style={{ width: 100, borderRadius: 8, backgroundColor: '#032757', color: '#fff' }}
                                            onClick={() => loadData()}
                                        >
                                            <Image preview={false} height={15} src={searchIc}></Image>
                                            <span style={{ marginLeft: 5 }}>Search</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                            <div>
                                {

                                    checkPermission("/contribution", "My Contributions") ?
                                        <>
                                            <MyContributionTable
                                                src={data}
                                                onDelete={(id) => onDelete(id)}
                                            />
                                        </>
                                        : checkPermission("/contribution", "Waiting Contributions") ?
                                            <>

                                                <WaitingContributionTable
                                                    src={data}
                                                    onChange={(name, value, index) => onChangeTableValue(name, value, index)}
                                                    onApprove={(id) => onApprove(id)}
                                                    onReject={(id) => onReject(id)}
                                                    onSaveNotes={(index) => onSaveNotes(index)}
                                                />

                                            </>

                                            : null
                                }
                            </div>
                            <div style={{ marginTop: 30, float: 'right' }}>
                                <Pagination
                                    showSizeChanger={false}
                                    showTotal={(total, range) => { return (<span>Showing {range[0]} - {range[1]} of {total} records.</span>) }}
                                    onChange={(value) => loadData(value)}
                                    defaultCurrent={1}
                                    total={total}
                                    current={filter.currentPage}
                                    defaultPageSize={10}
                                    size="small"
                                />
                            </div>
                        </>

                    </Card>
                </div>
            </div>
            <MyFooter />
        </>
    )
}