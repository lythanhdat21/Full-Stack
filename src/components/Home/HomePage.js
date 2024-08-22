import videoHomepage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux"; // Để lấy State của Redux
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const HomePage = (props) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const navigate = useNavigate()
  const {t} = useTranslation()

  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      
      <div className = "homepage-content">
        <div className = 'title-1'>
          {t('homepage.title1')}
        </div>
        <div className = 'title-2'>
          {t('homepage.title2')}
        </div>
        <div className = 'title-3'>
          {isAuthenticated === false ? // Người dùng chưa đăng nhập thì...
            <button onClick = {() => navigate('/login')}>
              {/* Get started - it's free */}
              {t('homepage.title3.login')}
            </button>
            :
            <button onClick = {() => navigate('/users')}>
              {/* Doing Quiz Now */}
              {t('homepage.title3.doing')}
            </button>
          }
        </div>
      </div>
    </div>
  );
};
export default HomePage;



