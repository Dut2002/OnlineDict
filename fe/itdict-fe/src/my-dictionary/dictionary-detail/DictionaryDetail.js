import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppNotification } from "../../common/AppNotification";
import { checkPermission, initdata, mapdata, onChangeValue, validateNullOrEmpty, validateNullOrEmptyString } from "../../common/commonFunc";
import { createDicts, newDicts } from "../../common/Constants";
import MyFooter from "../../common/MyFooter";
import MyHeader from "../../common/MyHeader";
import { DictionaryDetailService } from "../../services/DictionaryDetailService";
import { DictionaryService } from "../../services/DictionaryService";
import Configuration from "./components/config/Configuration";
import FlashCard from "./components/flash-card/FlashCard";
import ListWord from "./components/list-word/ListWord";

export default function DictionaryDetail() {
    const state = useLocation();
    const navigate = useNavigate();
    const dictData = state.state.data;
    const [list, setList] = useState([]);

    const [drawer, setDrawer] = useState();

    useEffect(() => {
        if (!checkPermission("/myDict", "Dictionary Detail")) {
            navigate("/accessDenied");
        }
        if (dictData?.viewBy === 2 && JSON.parse(localStorage.getItem('loginInfo'))?.username !== dictData?.createdBy) {
            if (!state.state.isAuthen) {
                navigate("/dictAuthen", {
                    state: {
                        data: dictData
                    }
                });
            }
        }
        init();

    }, []);

    const service = new DictionaryDetailService();

    async function init() {
        await service.get(dictData?.id).then(res => {
            if (res && res.status === 200 && res.data?.list) {
                setList(res.data.list);
            }
        })
    }

    async function handleSubmit() {
        if (!validate()) {
            return;
        }
        var d = { ...drawer };
        var en = mapdata(d.data, createDicts);
        en.id = d.data.id;
        en.categories = en.categoryList;
        en.categoryList = null;
        en.createdBy = JSON.parse(localStorage.getItem('loginInfo'))?.username;
        await new DictionaryService().update(en).then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                new AppNotification().success("Update Successfully.");
                d.open = false;
                setDrawer(d);
            } else {
                new AppNotification().error("Update failed!")
            }
        })

    }
    function validate() {
        var d = { ...drawer };
        var da = d.data;
        var valData = validateNullOrEmptyString(da, ['name']);
        valData = validateNullOrEmpty(valData.data, ['viewBy', 'editBy'])
        if (valData.isValid) {
            if (valData?.data?.viewBy?.value === 2 || valData?.data?.editBy?.value === 2) {
                valData = validateNullOrEmptyString(valData.data, ['password']);
            }
        }
        d.data = valData.data;
        setDrawer(d);
        return valData.isValid;
    }
    return (
        <>
            <MyHeader
                activeNav="/myDict"
            />
            <div style={{ padding: '0px 2%', marginTop: 70 }}>
                <div style={{ fontWeight: 700, fontSize: '30px', lineHeight: '36px', marginBottom: 10 }}>
                    {dictData?.name ? dictData.name.toUpperCase() : ''}
                </div>
                <div>
                    {dictData?.createdBy} | {list ? list.length : 0} word(s)
                </div>
                <div style={{ marginTop: 30 }}>
                    <Row>
                        <Col span={12}>
                            <FlashCard
                                handleConfig={() => {
                                    var d = { ...drawer };
                                    d.open = true;
                                    d.data = initdata(null, dictData, newDicts);
                                    d.data.id = dictData.id;
                                    d.data.categoryList.value = dictData.categories;
                                    setDrawer(d);
                                }}
                                dictData={dictData}
                                list={list}

                            />
                        </Col>
                        <Col span={12}>
                            <ListWord
                                data={dictData}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
            <MyFooter />
            <Configuration
                {...drawer}
                onClose={() => {
                    var d = { ...drawer };
                    d.open = false;
                    d.data = null;
                    setDrawer(d);
                }}
                handleSubmit={() => {
                    handleSubmit()
                }}
                onChange={(name, value) => {
                    var d = { ...drawer };
                    d.data = onChangeValue(d.data, name, value);
                    setDrawer(d);
                }}
            />
        </>
    )
}