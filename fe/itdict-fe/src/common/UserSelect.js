import { Divider, Select, Space } from "antd";
import { useState } from "react";
import { UserManagementService } from "../services/UserManagementService";
import { AppNotification } from "./AppNotification";
import { compare } from "./commonFunc";
import ConfirmPopUp from "./ConfirmPopUp";

export default function UserSelect(props) {
    const service = new UserManagementService();
    const notify = new AppNotification();
    const [addDialog, setAddDialog] = useState();

    const [searchData, setSearchData] = useState([]);
    const [removeDialog, setRemoveDialog] = useState();

    function openAddPopup(value) {
        var dia = { ...addDialog };
        dia.open = true;
        dia.content = "Are you sure to add " + value + " become " + props?.role + "?";
        dia.username = value;
        setAddDialog(dia);
    }

    function openRemoveDialog(value) {
        var removeValue = compare(props?.options, value);
        if (removeValue !== "") {
            var dia = { ...removeDialog };
            dia.open = true;
            dia.content = "Are you sure to remove " + removeValue + " out " + props?.role + " group?";
            dia.username = removeValue;
            setRemoveDialog(dia);
        }
    }

    async function onSearch(value, role) {
        await service.getData({
            role: role,
            username: value
        }).then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                setSearchData(res?.data?.list);
            } else {
                notify.error(res?.data?.message, 'Internal error');
            }
        })
    }

    async function changePermission() {
        var dia = { ...addDialog };
        await service.changePermission(props?.role !== "Active" ? props?.role : "Inactive", dia.username).then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                notify.success("Change permission successfully!");
            }
            else {
                notify.error(res?.data?.message, "Error");
            }
        });
        dia.open = false;
        dia.username = '';
        setAddDialog(dia);
        setSearchData([]);
        props?.onReload();
    }

    async function onChange() {
        var dia = { ...removeDialog };
        await service.changePermission(props?.role !== "Active" ? "User" : "Active", dia.username).then(res => {
            if (res && res?.status === 200 && res?.data?.status === 200) {
                notify.success("Change permission successfully!");
            }
            else {
                notify.error(res?.data?.message, "Error");
            }
        })
        dia.open = false;
        dia.username = '';
        setRemoveDialog(dia);
        props?.onReload();
    }

    return (
        <>
            <Select
                mode="tags"
                value={props?.options}
                style={{ width: '100%' }}
                onChange={(value) => { openRemoveDialog(value) }}
                dropdownRender={(menu) => (
                    <>
                        {menu}
                        <Divider
                            style={{
                                margin: '8px 0',
                            }}
                        />
                        <Space
                            style={{
                                padding: '0 8px 4px',
                            }}
                        >
                            <Select
                                showSearch
                                mode="combobox"
                                style={{ width: 600 }}
                                onSearch={(value) => onSearch(value, props?.role)}
                                onChange={(value) => openAddPopup(value)}
                            >
                                {
                                    searchData ? searchData.map(it => {
                                        return (
                                            <Select.Option value={it}>{it}</Select.Option>
                                        )
                                    }) : null
                                }
                            </Select>
                        </Space>
                    </>
                )}
            />
            <ConfirmPopUp
                {...addDialog}
                handleCancel={() => {
                    var dia = { ...addDialog };
                    dia.open = false;
                    dia.username = '';
                    setAddDialog(dia);
                }}
                handleOK={() => changePermission()}
            />
            <ConfirmPopUp
                {...removeDialog}
                handleCancel={() => {
                    var dia = { ...removeDialog };
                    dia.open = false;
                    dia.username = '';
                    setRemoveDialog(dia);
                }}
                handleOK={() => onChange()}
            />
        </>
    )
}