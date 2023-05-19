import { Button, Card, Col, Divider, Form, Image, Input, Row, Select, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { AppNotification } from '../../../common/AppNotification';
import createIcon from '../../../image/create-ic.png';
import { CategoryService } from '../../../services/CategoryService';
export default function WordDetail(props) {
    const [categories, setCategories] = useState();
    const [name, setName] = useState('');
    const service = new CategoryService();
    const notify = new AppNotification();

    useEffect(() => {
        loadCate();
    }, []);

    async function loadCate() {
        await service.getAll().then(res => {
            if (res && res?.status === 200 && res?.data?.list) {
                setCategories(res?.data?.list);
            }
        })
    }

    async function addCate() {
        var n = name;
        if (n) {
            if (n.trim().length > 0) {
                await service.create(n).then(res => {
                    if (res && res?.status === 200 && res?.data?.status === 200) {
                        loadCate();
                        setName('');
                    }
                })
            } else {
                notify.error("Category Name is required.", 'Error');
            }
        } else {
            notify.error("Category Name is required.", 'Error');
        }
    }

    return (
        <>
            <Card title=
                {
                    <div>
                        <Image preview={"false"} src={createIcon} height={18} />
                        <span style={{ marginLeft: 5 }}>Word Detail</span>
                    </div>
                }
                style={{ height: 570 }}
            >
                <Form layout='vertical'>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label='Sub Title'
                                validateStatus={props?.data?.subTitle?.error}
                                help={props?.data?.subTitle?.help}
                            >
                                <Input 
                                value={props?.data?.subTitle?.value}
                                onChange={(e) => props?.onChange('subTitle', e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={11}>
                            <Form.Item
                                label='Category'
                            >
                                <Select
                                    mode='tags'
                                    value={props?.data?.cateIds?.value ? props?.data?.cateIds?.value : []}
                                    onChange={(value) => props?.onChange('cateIds', value)}
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider style={{ margin: '8px 0' }} />
                                            <Space
                                                style={{
                                                    padding: '0 8px 4px',
                                                }}
                                            >
                                                <Input
                                                    placeholder="New Category"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                                <Button type="text" className='submit-button' onClick={() => addCate()}>
                                                    Add item
                                                </Button>
                                            </Space>
                                        </>
                                    )}
                                    options={categories ? categories.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    })) : null}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label='Definition'
                                validateStatus={props?.data?.defination?.error}
                                help={props?.data?.defination?.help}
                            >
                                <TextArea
                                    autoSize={{ minRows: 10, maxRows: 10 }}
                                    value={props?.data?.defination?.value}
                                    onChange={(e) => props?.onChange('defination', e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={11}>
                            <Form.Item
                                label='Syntax'
                            >
                                <TextArea
                                    autoSize={{ minRows: 10, maxRows: 10 }}
                                    value={props?.data?.syntax?.value}
                                    onChange={(e) => props?.onChange('syntax', e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </Card>
        </>
    )
}