import { Collapse } from "antd";
import { checkPermission } from "../../../common/commonFunc";
import Permission from "./components/Permission";
import UserReports from "./components/UserReports";

const { Panel } = Collapse;
export default function UserManagement() {
    const panelStyle = {
        background: '#E1EBF8',
        borderRadius: 8,
        // border: 'none',
    };

    return (
        <>
            <div style={{ padding: '5px 25px' }}>
                {
                    checkPermission("/foradmin", "Screen Permission") ?
                        <div style={{ marginBottom: 10 }}>
                            <Collapse
                                defaultActiveKey={null}
                            >
                                <Panel header="Permissions" key="1" style={panelStyle}>
                                    <Permission />
                                </Panel>
                            </Collapse>

                        </div>
                        : null
                }

                <div style={{ marginBottom: 20 }}>
                    <Collapse
                        defaultActiveKey={['1']}
                    >
                        <Panel header="User Reports" key="1" style={panelStyle}>
                            <UserReports />
                        </Panel>
                    </Collapse>
                </div>
                <div>

                </div>
            </div>

        </>
    )
}