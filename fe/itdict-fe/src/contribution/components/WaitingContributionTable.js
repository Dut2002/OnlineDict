import { Button, Image, Select, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import editIC from '../../image/edit-ic.png';
import tickIC from '../../image/tick-ic.png';
import closeIC from '../../image/close-ic.png';
import ConfirmPopUp from "../../common/ConfirmPopUp";

export default function WaitingContributionTable(props) {
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
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
            width: '15%',
            render: (value) => <div style={{ textAlign: 'center' }}>{value}</div>
        },
        {
            title: 'Modifier',
            dataIndex: 'createdBy',
            key: 'createdBy',
            width: '8%',
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact',
            width: '15%'
        },
        {
            title: 'Action',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            render: (val, _, index) => {
                if (val === null) {
                    return (
                        <div>
                            <Select value={val} style={{ width: '100%' }}
                                onChange={(v) => {
                                    var dia = { ...dialog };
                                    dia.open = true;
                                    dia.type = v ? "Approve" : "Reject";
                                    dia.content = "Are you sure to " + dia.type + " this contribution?";
                                    dia.id = index;
                                    setDialog(dia);

                                }}
                            >
                                <Select.Option value={true}>Approve</Select.Option>
                                <Select.Option value={false}>Reject</Select.Option>
                            </Select>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            {
                                val ?
                                    <span style={{ color: '#3AB56B' }}>Approved</span>
                                    :
                                    <span style={{ color: 'red' }}>Rejected</span>
                            }
                        </div>
                    )
                }
            }
        },
        {
            title: 'Note',
            dataIndex: 'isEditNote',
            key: 'isEditNote',
            render: (value, record, index) => {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <TextArea
                            autoSize={{ minRows: 3, maxRows: 3 }}
                            readOnly={!value}
                            value={!value ? record.notes : record.newNotes}
                            maxLength={500}
                            onChange={(e) => props?.onChange('newNotes', e.target.value, index)}
                        />
                        <div style={{ float: 'right' }}>
                            {
                                value ?
                                    <>
                                        <Button type="ghost" onClick={() => props?.onSaveNotes(index)}>
                                            <Image preview={false} src={tickIC} height={15} />
                                        </Button>
                                        <Button type="ghost" onClick={() => {
                                            props?.onChange('isEditNote', false, index);
                                        }}>
                                            <Image preview={false} src={closeIC} height={15} />
                                        </Button>
                                    </>
                                    :
                                    <>
                                        <Button type="ghost" onClick={() => {
                                            props?.onChange('isEditNote', true, index);
                                            props?.onChange('newNotes', record.notes, index);
                                        }}>
                                            <Image preview={false} src={editIC} height={15} />
                                        </Button>
                                    </>
                            }

                        </div>
                    </div>
                );
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