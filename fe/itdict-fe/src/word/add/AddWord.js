import { Card, Breadcrumb, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppNotification } from "../../common/AppNotification";
import { initdata, mapdata, onChangeValue, validateNullOrEmptyString } from "../../common/commonFunc";
import { contributes } from "../../common/Constants";
import MyFooter from "../../common/MyFooter";
import MyHeader from "../../common/MyHeader";
import { WordService } from "../../services/WordService";
import ImportFromDict from "./components/ImportFormDict";
import WordDetail from "./components/WordDetail";

export default function AddWord() {
    const [data, setData] = useState(initdata(null, null, contributes));
    const notify = new AppNotification();
    const service = new WordService();

    const navigate = useNavigate();

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('loginInfo'))?.username) {
            navigate("/login");
        }
    }, [])

    async function handleSubmit() {
        if (!validate()) {
            return;
        }
        var d = { ...data };
        var en = mapdata(d,contributes);
        en.createdBy = JSON.parse(localStorage.getItem('loginInfo'))?.username;
        await service.create(en).then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                notify.success("Many thanks for your contribution!");
            }
            else {
                notify.error(res?.data?.message, "Error");
            }
        })

    }

    function validate() {
        var d = { ...data };
        if (!d?.isConfirmed?.value) {
            notify.error("Please confirm with our Terms first.", "Save error");
            return false;
        } else {
            var vData = validateNullOrEmptyString(d, ['keyword', 'newSubTitle', 'newDefinition']);
            if (!vData.isValid) {
                setData(vData.data);
            }
            return vData.isValid;
        }
    }
    return (
        <>
            <MyHeader
                activeNav='dictionary'
            />
            <div style={{ padding: '0px 2%', marginTop: 80 }}>
                <div>
                    <Card>
                        <span style={{ fontSize: 28 }}>DICTIONARY</span>
                        <Breadcrumb>
                            <Breadcrumb.Item>Contribute dictionary</Breadcrumb.Item>
                            <Breadcrumb.Item>Add New Word</Breadcrumb.Item>
                        </Breadcrumb>
                    </Card>
                </div>
                <div style={{ marginTop: 20 }}>
                    <Row>
                        <Col span={15}>
                            <WordDetail
                                data={data}
                                onChange={
                                    (name, value) => {
                                        var da = { ...data };
                                        da = onChangeValue(da, name, value);
                                        setData(da);
                                    }
                                }
                            />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={8}>
                            <ImportFromDict
                                data={data}
                                handleSubmit={() => handleSubmit()}
                                onChange={
                                    (name, value) => {
                                        var da = { ...data };
                                        da = onChangeValue(da, name, value);
                                        setData(da);
                                    }
                                }
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