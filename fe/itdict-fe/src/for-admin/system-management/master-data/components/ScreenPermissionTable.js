import { Button, Image, Switch, Table } from "antd";
import { useState } from "react";
import { checkPermission, initdata } from "../../../../common/commonFunc";
import ConfirmPopUp from "../../../../common/ConfirmPopUp";
import { screenPermission } from "../../../../common/Constants";
import editIcon from '../../../../image/edit-ic.png';
import removeIcon from '../../../../image/remove-ic.png';
import ScreenPermissionPopUp from "./ScreenPermissionPopUp";

export default function ScreenPermissionTable(props) {
    const [dialog, setDialog] = useState();
    const [delDialog, setDelDialog] = useState();

    const cols = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            width: '4%',
            render: (value, record, index) => <div style={{ textAlign: 'center' }}>{++index}</div>
        },
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
            width: '10%',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '10%',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            width: '10%',
        },
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            width: '10%',
            render: (val) => <div style={{ textAlign: 'center' }}><Switch checked={val} disabled size="small" /></div>
        },
        {
            title: 'Approver',
            dataIndex: 'approver',
            key: 'approver',
            width: '10%',
            render: (val) => <div style={{ textAlign: 'center' }}><Switch checked={val} disabled size="small" /></div>
        },
        {
            title: 'Admin',
            dataIndex: 'administrator',
            key: 'admin',
            width: '10%',
            render: (val) => <div style={{ textAlign: 'center' }}><Switch checked={val} disabled size="small" /></div>
        },
        {
            title: 'System Admin',
            dataIndex: 'systemAdmin',
            key: 'systemAdmin',
            width: '10%',
            render: (val) => <div style={{ textAlign: 'center' }}><Switch checked={val} disabled size="small" /></div>
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: '10%',
            render: (_, record) => {
                return (
                    <div style={{ textAlign: 'center' }}>
                        {checkPermission("/foradmin", "Screen Permission") ?
                            <>
                                <Button type="ghost" onClick={() => {
                                    var d = { ...dialog };
                                    d.open = true;
                                    d.data = initdata(null, record, screenPermission);
                                    d.data.id = record.id;
                                    setDialog(d);
                                }}>
                                    <Image src={editIcon} preview={false} height={15} />
                                </Button>
                                <Button type="ghost" onClick={() => {
                                    var d = { ...delDialog };
                                    d.open = true;
                                    d.content = "Are you sure to delete this screen permission?";
                                    d.id = record.id;
                                    setDelDialog(d);
                                }}>
                                    <Image src={removeIcon} preview={false} height={18} />
                                </Button>
                            </>
                            : null
                        }
                    </div>

                )
            }
        },
    ]
    return (
        <>
            <Table
                className="my-table"
                dataSource={props?.src}
                columns={cols}
                size={'small'}
                bordered
                scroll={{ y: 330 }}
                style={{ height: 350 }}
                pagination={false}
            />
            <ScreenPermissionPopUp
                {...dialog}
                handleCancel={() => {
                    var da = { ...dialog };
                    da.open = false;
                    da.data = null;
                    setDialog(da);
                }}
                onChange={(name, value) => {
                    var da = { ...dialog };
                    da.data[name].value = value;
                    da.data[name].error = '';
                    da.data[name].help = '';
                    if (name === "key" && value !== "menu") {
                        da.data.value.error = '';
                        da.data.value.help = '';
                    }
                    setDialog(da);
                }}
                onValidate={(data) => {
                    var da = { ...dialog };
                    da.data = data;
                    setDialog(da);
                }}
                reload={() => props?.reload()}
            />
            <ConfirmPopUp
                {...delDialog}
                handleCancel={() => {
                    var d = { ...delDialog };
                    d.open = false;
                    d.content = "";
                    d.id = 0;
                    setDelDialog(d);
                }}
                handleOK={() => {
                    var d = {...delDialog};
                    props?.onDeletePermission(d.id);
                    d.open = false;
                    d.content = "";
                    d.id = 0;
                    setDelDialog(d);
                }}
            />
        </>
    )
}