import { Breadcrumb, Card, Col, Row } from "antd";
import { useState } from "react";
import { initdata, mapdata, onChangeValue, validateNullOrEmpty, validateNullOrEmptyString } from "../../common/commonFunc";
import { createDicts, newDicts } from "../../common/Constants";
import MyFooter from "../../common/MyFooter";
import MyHeader from "../../common/MyHeader";
import ConfigCard from "./components/ConfigCard";
import InforCard from "./components/InforCard";
import { DictionaryService } from '../../services/DictionaryService'
import { AppNotification } from "../../common/AppNotification";
import { useNavigate } from "react-router-dom";

export default function CreateDictionary() {
    const [data, setData] = useState(initdata(null, null, newDicts));
    const service = new DictionaryService();
    const notify = new AppNotification();
    const navigate = useNavigate();

    async function handleSubmit() {
        if (!validate()) {
            return;
        }
        var d = { ...data };
        var en = mapdata(d, createDicts);
        en.createdBy = JSON.parse(localStorage.getItem('loginInfo'))?.username;
        await service.create(en).then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                notify.success("Create Successfully.");
                navigate("/myDict");
            } else {
                notify.error("Create failed!")
            }
        })

    }
    function validate() {
        var da = { ...data };
        var valData = validateNullOrEmptyString(da, ['name']);
        valData = validateNullOrEmpty(valData.data, ['viewBy', 'editBy'])
        if (valData.isValid) {
            if (valData?.data?.viewBy?.value === 2 || valData?.data?.editBy?.value === 2) {
                valData = validateNullOrEmptyString(valData.data, ['password']);
            }
        }
        setData(valData.data);
        return valData.isValid;
    }
    return (
        <>
            <MyHeader
                activeNav='myDictionary' />
            <div style={{ padding: '0px 2%', marginTop: 70 }}>
                <div>
                    <Card>
                        <Row>
                            <Col span={22}>
                                <span style={{ fontSize: 28 }}>MY DICTIONARY</span>
                                <Breadcrumb>
                                    <Breadcrumb.Item>Create Dictionary</Breadcrumb.Item>
                                </Breadcrumb>
                            </Col>
                        </Row>
                    </Card>
                </div>
                <div style={{ marginTop: 20 }}>
                    <Row>
                        <Col span={15}>
                            <InforCard
                                data={data}
                                onChange={(name, value) => {
                                    var da = { ...data };
                                    da = onChangeValue(da, name, value);
                                    setData(da);
                                }}
                            />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={8}>
                            <ConfigCard
                                data={data}
                                onChange={(name, value) => {
                                    var da = { ...data };
                                    da = onChangeValue(da, name, value);
                                    setData(da);
                                }}
                                handleSubmit={() => handleSubmit()}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
            <MyFooter />
        </>
    )
}