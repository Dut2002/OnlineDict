import { Drawer, Form, Row, Col, Select, Input, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { views, edits } from "../../../../common/Constants";
import { CategoryService } from "../../../../services/CategoryService";

export default function Configuration(props) {
    const navigate = useNavigate();
    const [categories, setCategories] = useState();
    const service = new CategoryService();

    useEffect(() => {
        loadCate();
    }, []);

    async function loadCate() {
        await service.getAll().then(res => {
            if (res && res?.status === 200 && res?.data?.list) {
                var list = [];
                if(res?.data?.list){
                    for(var it of res?.data?.list){
                        list.push(it.name);
                    }
                }
                setCategories(list);
            }
        })
    }

    return (
        <Drawer title="Configuration Dictionary" placement="right" open={props?.open} onClose={() => props?.onClose()}>
            <Form layout="vertical">
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label='Dictionary Name'
                            validateStatus={props?.data?.name?.error}
                            help={props?.data?.name?.help}
                        >
                            <Input
                                value={props?.data?.name?.value}
                                onChange={(e) => props?.onChange('name', e.target.value)}
                            />
                        </Form.Item>
                    </Col>

                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label='Category'
                        >
                            <Select
                                mode='tags'
                                value={props?.data?.categoryList?.value ? props?.data?.categoryList?.value : []}
                                onChange={(value) => props?.onChange('categoryList', value)}
                                options={categories ? categories.map((item) => ({
                                    label: item,
                                    value: item,
                                })) : null}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label='Description'
                        >
                            <TextArea
                                autoSize={{ minRows: 10, maxRows: 10 }}
                                value={props?.data?.description?.value}
                                onChange={(e) => props?.onChange('description', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label='Who can view'
                            validateStatus={props?.data?.viewBy?.error}
                            help={props?.data?.viewBy?.help}
                        >
                            <Select
                                style={{ width: '100' }}
                                options={views.map((item) => ({
                                    label: item.name,
                                    value: item.value,
                                }))}
                                onChange={(value) => {
                                    props?.onChange('viewBy', value);
                                    if (value === 3) {
                                        props?.onChange('editBy', 3);
                                    }
                                }
                                }
                                value={props?.data?.viewBy?.value}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Form.Item
                            label='Who can edit'
                            validateStatus={props?.data?.editBy?.error}
                            help={props?.data?.editBy?.help}
                        >
                            <Select
                                style={{ width: '100' }}
                                options={edits.map((item) => ({
                                    label: item.name,
                                    value: item.value,
                                }))}
                                disabled={props?.data?.viewBy?.value === 3}
                                onChange={((value) => props?.onChange('editBy', value))}
                                value={props?.data?.editBy?.value}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label='Password'
                            validateStatus={props?.data?.password?.error}
                            help={props?.data?.password?.help}
                        >
                            <Input.Password
                                disabled={!(props?.data?.viewBy?.value === 2 || props?.data?.editBy?.value === 2)}
                                onChange={((e) => props?.onChange('password', e.target.value))}
                                value={props?.data?.password?.value}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col span={24}>
                        <div  style={{float: 'right'}}>
                            <Button
                            type='ghost'
                            style={{ width: 100, borderRadius: 8, backgroundColor: '#032757', color: '#fff' }}
                            onClick={() => {
                                const handleSubmit = props?.handleSubmit;
                                if (handleSubmit) {
                                    handleSubmit();
                                }
                            }}
                        >
                            Save
                        </Button>
                        <Button
                            type='ghost'
                            style={{ width: 100, borderRadius: 8, borderColor: '#EDE8E8', marginLeft: 8 }}
                            onClick={() => props?.onClose()}
                        >
                            Cancel
                        </Button>
                        </div>
                        
                    </Col>
                    <Col span={6}></Col>

                </Row>
            </Form>
        </Drawer>
    )
}