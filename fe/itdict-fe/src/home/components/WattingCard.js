import { Button, Card, Col, Row, Image } from "antd";
import { useEffect, useState } from "react";
import { ContributionManagementService } from "../../services/ContributionManagementService";
import approveIC from '../../image/icons8-ok-48.png';
import rejectIC from '../../image/close-ic.png';
import ConfirmPopUp from "../../common/ConfirmPopUp";
import { AppNotification } from "../../common/AppNotification";

export default function WattingCard() {
    const [list, setList] = useState([]);
    const service = new ContributionManagementService();
    const [dialog, setDialog] = useState();
    const notify = new AppNotification();

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        await service.list().then(res => {
            if (res && res?.status === 200 && res?.data?.list) {
                setList(res?.data?.list);
            }
        })
    }

    async function onApprove(data) {
        data.updatedBy = JSON.parse(localStorage.getItem('loginInfo'))?.username;
        await service.approve(data).then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                notify.success(res?.data?.message);
                loadData();
            } else {
                notify.error(res?.data?.message, 'Internal error');
            }
        });
    }

    async function onReject(data) {
        await service.reject(data.id, JSON.parse(localStorage.getItem('loginInfo'))?.username).then(res => {
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
            <Card title={'WAITING FOR APPROVE'} style={{ height: 470 }}>
                <div style={{ height: 370, overflow: 'auto' }}>
                    {
                        list ? list.map((record, index) => {
                            var oCate = record.orgWord.categoryList ? record.orgWord.categoryList.reduce((result, item) => {
                                return `${result}${item.name}; `
                            }, "") : '';
                            var nCate = record.newWord.categoryList ? record.newWord.categoryList.reduce((result, item) => {
                                return `${result}${item.name}; `
                            }, "") : '';
                            return (
                                <>
                                    <Row>
                                        <Col span={24}>
                                            <Card style={{marginBottom: 10}}>
                                                <div style={{ float: 'right' }}>
                                                    <Button type="ghost"><Image preview={false} height={20} src={approveIC}
                                                        onClick={() => {
                                                            var dia = { ...dialog };
                                                            dia.open = true;
                                                            dia.type = "Approve";
                                                            dia.content = "Are you sure to Approve this contribution?";
                                                            dia.data = record;
                                                            setDialog(dia);
                                                        }}
                                                    /></Button>
                                                    <Button type="ghost"><Image preview={false} height={20} src={rejectIC}
                                                        onClick={() => {
                                                            var dia = { ...dialog };
                                                            dia.open = true;
                                                            dia.type = "Reject";
                                                            dia.content = "Are you sure to Reject this contribution?";
                                                            dia.data = record;
                                                            setDialog(dia);
                                                        }}
                                                    /></Button>
                                                </div>
                                                <div>
                                                    <div>
                                                        {(index + 1)}. <span style={{ fontWeight: 'bold' }}>{record.keyword}</span> changed by <span style={{ fontWeight: 'bold' }}>{record.createdBy}</span>
                                                    </div>
                                                    <div>
                                                        Detail changes: <br />
                                                        <div>
                                                            <div>Sub Title: {record.orgWord.subTitle} {' -> '} <span style={{ color: 'red' }}>{record.newWord.subTitle}</span></div>
                                                            <div>Definition: {record.orgWord.defination} {' -> '} <span style={{ color: 'red' }}>{record.newWord.defination}</span></div>
                                                            <div>Syntax: {record.orgWord.syntax} {' -> '} <span style={{ color: 'red' }}>{record.newWord.syntax}</span></div>
                                                            <div>Category: {oCate !== '' ? oCate.substring(0, oCate.length - 2) : ''} {' -> '}
                                                                <span style={{ color: 'red' }}>{nCate !== '' ? nCate.substring(0, nCate.length - 2) : ''}</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Col>
                                    </Row>
                                </>
                            )
                        })
                            : null
                    }
                </div>
            </Card>
            <ConfirmPopUp
                {...dialog}
                handleCancel={() => {
                    var dia = { ...dialog };
                    dia.open = false;
                    dia.type = '';
                    dia.data = null;
                    setDialog(dia);
                }}
                handleOK={() => {
                    var dia = { ...dialog };
                    if (dia.type === "Approve") {
                        onApprove(dia.data);
                    }
                    if (dia.type === "Reject") {
                        onReject(dia.data);
                    }
                    dia.open = false;
                    dia.type = '';
                    dia.data = null;
                    setDialog(dia);
                }}
            />
        </>
    )
}