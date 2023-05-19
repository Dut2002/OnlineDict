import { Button, Col, Image, Menu, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../image/Logo.png';
import userIcon from '../image/user-ic.png';

const guestMenu = [
    {
        key: '/home',
        label: 'Home'
    }
]
export default function MyHeader(props) {
    const navigate = useNavigate();
    const [app, setApp] = useState();

    useEffect(() => {
        var da = {...app};
        da = JSON.parse(localStorage.getItem('loginInfo'));
        setApp(da);
    }, JSON.parse(localStorage.getItem('loginInfo')));

    function renderMenu() {
        var da = {...app};
        var returnMenu = [];
        if(da?.menu){
            for(var item of da?.menu){
                if (item?.key != "/updateProfile"){
                    returnMenu.push(item);
                }
            }
            return returnMenu;
        }
        return guestMenu;
    }

    return (
        <>
            <div className="header">
                <Row style={{ marginLeft: 20 }}>
                    <Col span={1}>
                        <Image src={logo} preview={false} height={50} />
                    </Col>
                    <Col span={19}>
                        <Menu
                            theme="dark"
                            style={{ backgroundColor: '#032757', height: '100%' }}
                            mode="horizontal"
                            defaultSelectedKeys={props?.activeNav}
                            items={renderMenu()}
                            onClick={(value) => {
                                navigate(value.key);
                            }}
                        />
                    </Col>
                    <Col span={4} style={{ marginTop: 8 }}>
                        <Image src={userIcon} preview={false} height={25} />
                        {
                            app ?
                                <>
                                    <Button type="link" style={{ color: '#fff' }}
                                        onClick={() => { 
                                            navigate("/updateProfile")
                                        }}
                                    >
                                        {app?.username}
                                    </Button>
                                    <span style={{ color: '#fff' }}>|</span>
                                    <Button type="link" style={{ color: '#fff' }}
                                        onClick={() => { 
                                            localStorage.removeItem("loginInfo");
                                            navigate("/home");
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </>

                                :
                                <Button type="link" style={{ color: '#fff' }}
                                    onClick={() => { navigate('/login') }}
                                >
                                    Log in / Sign up
                                </Button>
                        }

                    </Col>
                </Row>

            </div>
        </>
    )
}