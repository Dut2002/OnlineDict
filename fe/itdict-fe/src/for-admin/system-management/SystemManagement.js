import { Collapse } from "antd";
import MasterData from "./master-data/MasterData";
import UserManagement from "./user-management/UserManagement";
const { Panel } = Collapse;

export default function SystemManagement() {
    const panelStyle = {
        background: '#E1EBF8',
        borderRadius: 8,
        // border: 'none',
    };
    return (
        <>
            <div style={{ padding: '10px 30px', height: 660, overflow: "auto" }}>
                <div style={{ marginBottom: 20 }}>
                    <Collapse
                        defaultActiveKey={['1']}
                    >
                        <Panel header="User Management" key="1" style={panelStyle}>
                            <UserManagement />
                        </Panel>
                    </Collapse>
                </div>
                <div style={{ marginBottom: 20 }}>
                    <Collapse
                        defaultActiveKey={null}
                    >
                        <Panel header="Master Data" key="1" style={panelStyle}>
                            <MasterData />
                        </Panel>
                    </Collapse>
                </div>


            </div>

        </>
    )
}