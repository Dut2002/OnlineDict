import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { formatDate } from "../../common/commonFunc";
import { UserService } from "../../services/UserService";

export default function UpdateForm(props) {
    const [jobs, setJobs] = useState([]);
    const service = new UserService();
    useEffect(() => {
        loadJob();
    }, props);

    async function loadJob() {
        await service.getAllJobs().then(res => {
            if (res && res.status === 200 && res?.data?.list) {
                setJobs(res?.data?.list);
            }
        })
    }
    return (
        <>
            <Form layout="vertical">
                <Row>
                    <Col span={11}>
                        <Form.Item
                            label='Username'
                            required
                            validateStatus={props?.data?.username?.error}
                            help={props?.data?.username?.help}
                        >
                            <Input
                                value={props?.data?.username?.value}
                                readOnly={true}

                            />
                        </Form.Item>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                        <Form.Item
                            label='Full Name'
                            required
                            validateStatus={props?.data?.fullname?.error}
                            help={props?.data?.fullname?.help}
                        >
                            <Input
                                value={props?.data?.fullname?.value}
                                onChange={e => props?.onChangeData('fullname', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={11}>
                        <Form.Item
                            label='Phone'
                            validateStatus={props?.data?.phone?.error}
                            help={props?.data?.phone?.help}
                        >
                            <Input
                                value={props?.data?.phone?.value}
                                onChange={e => props?.onChangeData('phone', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                        <Form.Item
                            label='Email'
                            validateStatus={props?.data?.email?.error}
                            help={props?.data?.email?.help}
                        >
                            <Input
                                value={props?.data?.email?.value}
                                onChange={e => props?.onChangeData('email', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={11}>
                        <Form.Item label='DOB'>
                            {
                                props?.data?.dob?.value ?
                                    <DatePicker
                                        allowClear={false}
                                        style={{ width: '100%' }}
                                        value={dayjs(props?.data?.dob?.value)}
                                        format="DD/MM/YYYY"
                                        onChange={(value) => props?.onChangeData('dob', formatDate(value))}
                                    />
                                    :
                                    <DatePicker
                                        allowClear={false}
                                        style={{ width: '100%' }}
                                        format="DD/MM/YYYY"
                                        onChange={(value) => props?.onChangeData('dob', formatDate(value))}
                                    />

                            }

                        </Form.Item>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                        <Form.Item label='Job'>
                            <Select
                                value={props?.data?.jobId?.value}
                                onChange={(value) => props?.onChangeData('jobId', value)}
                            >
                                {
                                    jobs ?
                                        jobs.map((it) => {
                                            return (
                                                <Select.Option key={it.id} value={it.id}>{it.name}</Select.Option>
                                            )
                                        })
                                        : null
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>


            </Form>
        </>
    )
}