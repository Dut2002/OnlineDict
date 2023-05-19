import { Col, Form, Row } from "antd";
import { useEffect, useState } from "react";
import { AppNotification } from "../../../../common/AppNotification";
import UserSelect from "../../../../common/UserSelect";
import { UserManagementService } from "../../../../services/UserManagementService";

export default function Permission() {
    const service = new UserManagementService();
    const notify = new AppNotification();

    const [permission, setPermission] = useState([]);

    useEffect(() => {
        loadPermission();
    }, []);

    async function loadPermission() {
        await service.getPermission().then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                setPermission(res?.data?.data);
            } else {
                notify.error(res?.data?.message, 'Internal error');
            }
        });
    }
    return (
        <>
            <Form layout="vertical">
                <Row>
                    <Col span={12} >
                        <Form.Item label="Approvers">
                            <div style={{ width: '95%' }}>
                                <UserSelect
                                    options={permission?.approvers}
                                    role="Approver"
                                    onReload={() => loadPermission()}
                                />
                            </div>

                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Administrators">
                            <UserSelect
                                options={permission?.admins}
                                role="Administrator"
                                onReload={() => loadPermission()}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="Inactive users">
                            <UserSelect
                                options={permission?.inactive}
                                role="Active"
                                onReload={() => loadPermission()}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

        </>
    )
}