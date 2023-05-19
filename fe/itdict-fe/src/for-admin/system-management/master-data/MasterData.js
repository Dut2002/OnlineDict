import { Button, Col, Form, Image, Row } from "antd";
import { useEffect, useState } from "react";
import { AppNotification } from "../../../common/AppNotification";
import SelectAdd from "../../../common/SelectAdd";
import { MasterDataService } from "../../../services/MasterDataService";
import ScreenPermissionTable from "./components/ScreenPermissionTable";
import addIcon from '../../../image/add-ic.png';
import { checkPermission, initdata } from "../../../common/commonFunc";
import ScreenPermissionPopUp from "./components/ScreenPermissionPopUp";
import { screenPermission } from "../../../common/Constants";


export default function MasterData() {
    const masterDataService = new MasterDataService();
    const notify = new AppNotification();


    const [data, setData] = useState();
    const [dialog, setDialog] = useState();

    useEffect(() => {
        init();
    }, []);

    async function init() {
        await masterDataService.init().then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                setData(res?.data?.data);
            } else {
                notify.error(res?.data?.message, 'Internal error');
            }
        })
    }

    async function addCate(name) {
        await masterDataService.createCate({
            name: name,
            createdBy: JSON.parse(localStorage.getItem('loginInfo')).username
        }).then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                notify.success("Add category successfully.");
                init();
            } else {
                notify.error(res?.data?.message, 'Internal error');
            }
        })
    }

    async function deleteCate(name) {
        await masterDataService.deleteCate(name).then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                notify.success("Delete category successfully.");
                init();
            } else {
                notify.error(res?.data?.message, 'Internal error');
            }
        })
    }

    async function addJob(name) {
        await masterDataService.createJob({
            name: name,
            createdBy: JSON.parse(localStorage.getItem('loginInfo')).username
        }).then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                notify.success("Add job successfully.");
                init();
            } else {
                notify.error(res?.data?.message, 'Internal error');
            }
        })
    }

    async function deleteJob(name) {
        await masterDataService.deleteJob(name).then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                notify.success("Delete job successfully.");
                init();
            } else {
                notify.error(res?.data?.message, 'Internal error');
            }
        })
    }

    async function onDeletePermission(id) {
        await masterDataService.deletePermission(id).then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                notify.success("Delete successfully.");
                init();
            } else {
                notify.error(res?.data?.message, 'Internal error');
            }
        })
    }

    return (
        <>
            <div style={{ padding: '5px 25px' }}>
                <Form layout="vertical">
                    <Row>
                        <Col span={12}>
                            <Form.Item label="Categories">
                                <div style={{ width: '98%' }}>
                                    <SelectAdd
                                        placeholder="Input category name"
                                        options={data?.categories}
                                        onAddItem={(name) => {
                                            addCate(name);
                                        }}
                                        onRemoveItem={(name)=> {
                                            deleteCate(name);
                                        }}
                                    />
                                </div>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Jobs">
                                <div>
                                    <SelectAdd
                                        placeholder="Input job name"
                                        options={data?.jobs}
                                        onAddItem={(name) => {
                                            addJob(name);
                                        }}
                                        onRemoveItem={(name)=> {
                                            deleteJob(name);
                                        }}
                                    />
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label={
                                <div>
                                    Screen Permission
                                    {
                                        checkPermission("/foradmin", "Screen Permission") ?
                                            <Button type="ghost" onClick={() => {
                                                var d = { ...dialog };
                                                d.open = true;
                                                d.data = initdata(null,null,screenPermission);
                                                setDialog(d);
                                            }}>
                                                <Image src={addIcon} preview={false} height={20} />

                                            </Button>
                                            : null
                                    }

                                </div>}>
                                <ScreenPermissionTable
                                    src={data?.permissions}
                                    reload = {() => init()}
                                    onDeletePermission = {(id) => onDeletePermission(id)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
            <ScreenPermissionPopUp
                {...dialog}
                handleCancel={() => {
                    var da = {...dialog};
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
                onValidate = {(data) => {
                    var da = {...dialog};
                    da.data = data;
                    setDialog(da);
                }}
                reload = {() => init()}
            />
        </>
    )
}