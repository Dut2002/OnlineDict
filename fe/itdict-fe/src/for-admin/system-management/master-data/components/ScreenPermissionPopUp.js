import { Col, Form, Input, Modal, Row, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { AppNotification } from "../../../../common/AppNotification";
import { mapdata, validateNullOrEmpty } from "../../../../common/commonFunc";
import { screenPermission } from "../../../../common/Constants";
import { MasterDataService } from "../../../../services/MasterDataService";


export default function ScreenPermissionPopUp(props) {
    const [keys, setKeys] = useState([]);
    const masterDataService = new MasterDataService();
    const notify = new AppNotification();

    const data = props?.data;

    useEffect(() => {
        loadKey();
    }, []);


    async function loadKey() {
        await masterDataService.getKeys().then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                setKeys(res?.data?.list);
            }
        })
    }

    async function handleOK() {
        if (!validate()) {
            return;
        }
        var da = { ...data };
        var map = mapdata(da, screenPermission);
        map.id = props?.data?.id ? props.data.id : null;
        await masterDataService.savePermission(map).then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                notify.success(res?.data?.message);
                props?.handleCancel();
                props?.reload();
            }
            else {
                notify.error(res?.data?.message, "Error");
            }
        });

    }

    function validate() {
        var da = { ...data };
        var validateData = validateNullOrEmpty(da, ['key', 'name']);
        if (validateData.isValid) {
            if (validateData.data.key.value === "menu") {
                validateData = validateNullOrEmpty(validateData.data, ['value']);
            }
        }
        props?.onValidate(validateData.data);
        return validateData.isValid;
    }

    function onChangeData(name, value) {
        props?.onChange(name,value);
    }
    return (
        <>
            <Modal title="Screen Permission"
                open={props?.open}
                onOk={() => handleOK()}
                onCancel={() => props?.handleCancel()}
            >
                <Form layout="vertical">
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label="Key"
                                validateStatus={data?.key?.error}
                                help={data?.key?.help}
                            >
                                <Select
                                    value={data?.key?.value}
                                    options={keys ? keys.map(k => ({
                                        label: k, value: k
                                    })) : null}
                                    onChange={(value) => onChangeData('key', value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label="Screen Name"
                                validateStatus={data?.name?.error}
                                help={data?.name?.help}
                            >
                                <Input
                                    value={data?.name?.value}
                                    onChange={(e) => onChangeData('name', e.target.value)}
                                    maxLength={100}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label="Value"
                                validateStatus={data?.value?.error}
                                help={data?.value?.help}
                            >
                                <Input
                                    value={data?.value?.value}
                                    onChange={(e) => onChangeData('value', e.target.value)}
                                    placeholder="If key is menu, please input link to menu in this field."
                                    maxLength={50}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label="Permission Configuration"
                            >
                                <Row>
                                    <Col span={2}><Switch checked={data?.user?.value} size="small" onChange={e => onChangeData('user', e)} /></Col>
                                    <Col span={10}>User</Col>
                                    <Col span={2}><Switch checked={data?.approver?.value} size="small" onChange={e => onChangeData('approver', e)} /></Col>
                                    <Col span={10}>Approver</Col>
                                </Row>
                                <Row>
                                    <Col span={2}><Switch checked={data?.administrator?.value} size="small" onChange={e => onChangeData('administrator', e)} /></Col>
                                    <Col span={10}>Administrator</Col>
                                    <Col span={2}><Switch checked={data?.systemAdmin?.value} size="small" onChange={e => onChangeData('systemAdmin', e)} /></Col>
                                    <Col span={10}>System Admin</Col>
                                </Row>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
}