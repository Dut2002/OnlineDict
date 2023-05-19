
import { checkPermission } from "../common/commonFunc";
import MyFooter from "../common/MyFooter";
import MyHeader from "../common/MyHeader";
import Feedback from "./components/Feedback";
import Report from "./components/Report";

export default function AboutUs() {
    return (
        <>
            <div>
                <MyHeader activeNav='/aboutUs' />
            </div>
            <div style={{ marginTop: 100 }}>
                {
                    checkPermission("/aboutUs", "Feedback") ?
                        <Feedback />
                        :
                        null
                }
                {
                    checkPermission("/aboutUs", "Report") ?
                        <Report />
                        :
                        null
                }
            </div>
            <div>
                <MyFooter />
            </div>
        </>
    )
}