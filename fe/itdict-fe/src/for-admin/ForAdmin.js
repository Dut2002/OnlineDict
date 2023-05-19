import { Tabs } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkPermission } from "../common/commonFunc";
import MyFooter from "../common/MyFooter";
import MyHeader from "../common/MyHeader";
import Import from "./import/Import";
import SystemManagement from "./system-management/SystemManagement";

const items =
    [
        {
            label: <div style={{width: 150, textAlign:'center'}}>System Management</div>,
            key: 'system',
            children: <SystemManagement />
        },
        {
            label: <div style={{width: 150, textAlign:'center'}}>Import .xls</div>,
            key: 'import',
            children: <Import/>
        }
    ]
export default function ForAdmin() {
    const navigate = useNavigate();

    useEffect(() => {
        if(!checkPermission("/foradmin","System")){
            navigate("/accessDenied");
        }
    }, [])
    return (
        <>
            <div>
                <MyHeader
                    role={1}
                    activeNav='/foradmin'
                />
            </div>
            <div style={{ marginTop: 60 }}>
                <Tabs
                    defaultActiveKey="system"
                    type="card"
                    style={{ backgroundColor: '#fff', borderRadius: 10 }}
                    items={items}
                />
            </div>
            <div>
                <MyFooter />
            </div>
        </>
    )
}