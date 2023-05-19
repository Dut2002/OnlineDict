import { Breadcrumb, Button, Card, Col, Form, Image, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppNotification } from "../../common/AppNotification";
import MyFooter from "../../common/MyFooter";
import MyHeader from "../../common/MyHeader";
import addIcon from '../../image/add-ic.png';
import { DictionaryDetailService } from "../../services/DictionaryDetailService";
import remove from '../../image/remove-ic.png'

export default function EditWordForDict() {
    const state = useLocation();
    const dictData = state.state.data;
    const [list, setList] = useState([]);

    const service = new DictionaryDetailService();
    const notify = new AppNotification();

    useEffect(() => {
        init();
    }, [])

    async function init() {
        await service.get(dictData?.id).then(res => {
            if (res && res.status === 200 && res.data?.list) {
                setList(res.data.list);
            }
        })
    }
    async function update() {
        var upData = [...list];
        await service.update(upData).then(res => {
            if (res && res.status === 200 && res?.data?.status === 200) {
                notify.success("Update successfully.");
                init();
            }
            else {
                notify.error("Error!");
            }
        })
    }

    async function onDelete(index) {
        var li = [...list];
        if (!li[index]?.id) {
            li.pop(index);
            setList(li);
        }
        else {
            await service.delete(li[index]?.id).then(res => {
                if (res && res.status === 200 && res?.data?.status === 200) {
                    notify.success("Delete successfully.");
                    init();
                }
                else {
                    notify.error("Error!");
                }
            })
        }
    }

    function onChangeList(index, name, value) {
        var l = [...list];
        l[index][name] = value;
        setList(l);
    }

    // console.log(list)
    return (
        <>
            <MyHeader
                activeNav="/myDict"
            />
            <div style={{ padding: '0px 2%', marginTop: 70 }}>
                <div>
                    <Card>

                        <Row>
                            <Col span={22}>
                                <span style={{ fontSize: 28 }}>{dictData?.name ? dictData.name.toUpperCase() : ''}</span>
                                <Breadcrumb>
                                    <Breadcrumb.Item>{dictData?.createdBy} | {list.length} words </Breadcrumb.Item>
                                </Breadcrumb>
                            </Col>
                            <Col span={2} style={{ marginTop: 20 }}>
                                <Button
                                    type='ghost'
                                    style={{ width: 100, borderRadius: 8, backgroundColor: '#032757', color: '#fff' }}
                                    onClick={() => {
                                        update();
                                    }}
                                >
                                    <span>Update</span>
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </div>
                <div style={{ marginTop: 10, maxHeight: 500, overflow: 'auto' }}>

                    {
                        list && list.length > 0 ?
                            list.map((item, index) => {
                                return (
                                    <>
                                        <Card style={{ marginBottom: '10px' }}>
                                            <Form layout="vertical">
                                                <Row>
                                                    <Col span={24}>
                                                        <div style={{ float: 'right' }}>
                                                            <Button type="ghost" onClick={(e) => onDelete(index)}>
                                                                <Image src={remove} preview={false} height={20} />
                                                            </Button>
                                                        </div>
                                                    </Col>

                                                </Row>
                                                <Row>
                                                    <Col span={6}>
                                                        <Form.Item
                                                            label="Key word"
                                                        >
                                                            <TextArea
                                                                autoSize={{ maxRows: 3, minRows: 3 }}
                                                                value={item?.keyword}
                                                                onChange={(e) => onChangeList(index, 'keyword', e.target.value)}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={18}>
                                                        <div style={{ paddingLeft: 10 }}>
                                                            <Form.Item
                                                                label="Definition"
                                                            >
                                                                <TextArea
                                                                    autoSize={{ maxRows: 3, minRows: 3 }}
                                                                    value={item?.definition}
                                                                    onChange={(e) => onChangeList(index, 'definition', e.target.value)}
                                                                />
                                                            </Form.Item>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </Card>
                                    </>
                                );
                            })
                            : null
                    }



                </div>
                <div style={{ marginTop: 10 }}>
                    <Card style={{ textAlign: 'center' }}
                        onClick={() => {
                            var l = [...list];
                            l.push({
                                keyword: '', definition: '', dictionaries: dictData, words: null
                            });
                            setList(l);
                        }}
                    >
                        <Image preview={false} src={addIcon} height={25} />Add word
                    </Card>
                </div>
            </div>
            <MyFooter />
        </>
    )
}