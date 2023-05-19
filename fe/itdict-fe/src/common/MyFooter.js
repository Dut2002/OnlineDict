import { Image } from 'antd';
import fuLogo from '../image/fu-logo.png';
import mailIcon from '../image/mail-ic.png';
export default function MyFooter() {
    return (
        <>
            <div className="footer">
                <div className='foo-left'>
                    <Image src={fuLogo} preview={false} height={30} />
                    <span style={{ fontSize: 10, marginLeft: 5 }}>© SP23 SE1641_SWP391_G1</span>
                </div>
                <div className='foo-right'>
                    <Image src={mailIcon} preview={false} height={20} />
                    <span style={{ fontSize: 10, marginLeft: 5 }}>nhatbnhe140280@fpt.edu.vn</span>
                </div>
            </div>
        </>
    )
}