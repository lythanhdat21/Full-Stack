import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useTranslation} from "react-i18next";
import UserInfor from './UserInfor';
import Password from './Password';
import History from './History';

const Profile = (props) => {
    const {t} = useTranslation()
    const {show, setShow} = props
    const handleClose = () => setShow(false);

    return (
        <>
            <Modal
                show = {show}
                onHide = {handleClose}
                size = "xl"
                backdrop = "static"
                className = "modal-profile"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('profile.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="home" title="Main Infor">
                            {/* Your Information */}
                            <UserInfor/>
                        </Tab>
                        <Tab eventKey="profile" title="Password">
                            {/* Change Password */}
                            <Password/>
                        </Tab>
                        <Tab eventKey="history" title="History">
                            {/* Doing Quiz */}
                            <History/>
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </>
  );
}

export default Profile;

