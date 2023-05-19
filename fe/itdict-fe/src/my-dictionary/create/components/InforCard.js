import { Button, Card, Col, Divider, Form, Input, Row, Select, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { AppNotification } from '../../../common/AppNotification';
import { CategoryService } from '../../../services/CategoryService';

export default function InforCard(props) {
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
            <Card style={{ height: 570 }}>
                <Form layout='vertical'>
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
                </Form>

            </Card>
        </>
    )
}