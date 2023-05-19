import { Button, Image, Table } from "antd";
import { useState } from "react";
import closeIC from '../../image/icons8-unavailable-50.png';
import ConfirmPopUp from "../../common/ConfirmPopUp";

export default function MyContributionTable(props) {
    const [dialog, setDialog] = useState();
    const cols = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            width: '4%',
            render: (value, record, index) => <div style={{ textAlign: 'center' }}>{++index}</div>
        },
        {
            title: 'Keyword',
            dataIndex: 'keyword',
            key: 'keyword',
            width: '8%',
            render: (value) =>
                <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {value}
                    {/* <Button type="ghost">
                        <Image preview={false} src={editIC} height={15} />
                    </Button> */}
                </div>
        },
        {
            title: 'Detail Change',
            dataIndex: 'detailChange',
            key: 'detailChange',
            width: '20%',
            render: (_, record) => {
                var oCate = record.orgWord.categoryList ? record.orgWord.categoryList.reduce((result, item) => {
                    return `${result}${item.name}; `
                }, "") : '';
                var nCate = record.newWord.categoryList ? record.newWord.categoryList.reduce((result, item) => {
                    return `${result}${item.name}; `
                }, "") : '';
                return (
                    <div>
                        <div>SubTitle: {record.orgWord.subTitle} {' -> '} <span style={{ color: 'red' }}>{record.newWord.subTitle}</span></div>
                        <div>Definition: {record.orgWord.defination} {' -> '} <span style={{ color: 'red' }}>{record.newWord.defination}</span></div>
                        <div>Syntax: {record.orgWord.syntax} {' -> '} <span style={{ color: 'red' }}>{record.newWord.syntax}</span></div>
                        <div>Category: {oCate !== '' ? oCate.substring(0, oCate.length - 2) : ''} {' -> '}
                            <span style={{ color: 'red' }}>{nCate !== '' ? nCate.substring(0, nCate.length - 2) : ''}</span></div>
                    </div>
                );
            }
        },
        {
            title: 'Approver Response',
            dataIndex: 'notes',
            key: 'notes',
            width: '15%',
            render: (value) => <div style={{ textAlign: 'center' }}>{value}</div>
        },
        {
            title: 'Approver',
            dataIndex: 'updatedBy',
            key: 'updatedBy',
            width: '8%',
        },
        {
            title: 'Contact',
            dataIndex: 'approverContact',
            key: 'approverContact',
            width: '15%'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            render: (val) =>
                <div>
                    {
                        val ?
                            <span style={{ color: '#3AB56B' }}>Approved</span>
                            :
                            val === null ?
                                <span>Waiting</span>
                                :
                                <span style={{ color: 'red' }}>Rejected</span>
                    }
                </div>

        },
        {
            title: 'Action',
            dataIndex: 'status',
            key: 'status',
            render: (val, record) => {
                return (
                    <>
                        {
                            val === null ?
                                <Button type="ghost" onClick={() => props?.onDelete(record.id)} title="Delete Contribution">
                                    <Image src={closeIC} preview={false} height={15} />
                                </Button>
                                : null
                        }
                    </>
                )
            }
        }
    ]

    return (
        <>
            <Table
                className="my-table"
                dataSource={props?.src}
                columns={cols}
                size={'small'}
                bordered
                scroll={{ y: 370 }}
                style={{ height: 400 }}
                pagination={false}
            />

            <ConfirmPopUp
                {...dialog}
                handleCancel={() => {
                    var dia = { ...dialog };
                    dia.open = false;
                    dia.type = '';
                    dia.id = 0;
                    setDialog(dia);
                }}
                handleOK={() => {
                    var dia = { ...dialog };
                    if (dia.type === "Approve") {
                        props?.onApprove(dia.id);
                    }
                    if (dia.type === "Reject") {
                        props?.onReject(dia.id);
                    }
                    dia.open = false;
                    dia.type = '';
                    dia.id = 0;
                    setDialog(dia);
                }}
            />
        </>
    )
}