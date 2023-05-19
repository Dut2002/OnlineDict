import { Select, Table } from "antd";
import { useState } from "react";
import ConfirmPopUp from "../../../../common/ConfirmPopUp";

export default function ReportTable(props) {
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
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
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
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact',
            width: '15%',
        },
        {
            title: 'Rejected Rate',
            dataIndex: 'rejRate',
            key: 'rejRate',
            width: '15%',
            render: (value) => <div style={{ textAlign: 'center' }}>{value}</div>
        },
        {
            title: 'Reporter',
            dataIndex: 'reporter',
            key: 'reporter',
            width: '8%',
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            key: 'reason',
            width: '15%'
        },
        {
            title: 'Action',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            render: (val, record, index) => {
                if (val === null) {
                    return (
                        <div>
                            <Select value={val} style={{ width: '100%' }}
                                onChange={(v) => {
                                    var dia = { ...dialog };
                                    dia.open = true;
                                    if (v) {
                                        dia.content = "Are you sure to inactive " + record?.username + "?"
                                    } else {
                                        dia.content = "Are you sure to cancel report about " + record?.username + "?";
                                    }
                                    dia.id = index;
                                    setDialog(dia);

                                }}
                            >
                                <Select.Option value={true}>Inactive</Select.Option>
                                <Select.Option value={false}>Cancel</Select.Option>
                            </Select>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            {
                                val ?
                                    <span style={{ color: 'red' }}>Inactive</span>
                                    :
                                    <span>Canceled</span>
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
                scroll={{ y: 200 }}
                style={{ height: 240 }}
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
                    dia.open = false;
                    dia.type = '';
                    dia.id = 0;
                    setDialog(dia);
                }}
            />
        </>
    )
}