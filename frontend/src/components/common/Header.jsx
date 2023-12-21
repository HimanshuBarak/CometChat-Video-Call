import { useContext } from 'react';
import Context from '../../context';
import { useNavigate } from 'react-router-dom';
import {CometChat} from '@cometchat/chat-sdk-javascript'

function Header(props) {
  const { toggleCreate, toggleJoin } = props;

  const { user, setUser } = useContext(Context);

  const navigate = useNavigate();

  const showCreate = () => {
    toggleCreate(true);
  };

  const showJoin = () => {
    toggleJoin(true);
  };

  const logout = async () => {
    const isLogout = window.confirm('Do you want to log out ?');
    if (isLogout) {
      await CometChat.logout();
      setUser(null);
      localStorage.removeItem('auth');
      navigate('/login');
    }
  }

  return (
    <div className="header">
      <div className="header__left">
        <span className="header__app-name">Zoom Clone</span>
        {
          user && (
            <div className="header__right">
              <img src={user.user_avatar} alt={user.user_email}/>
              <span>Hello, {user.user_full_name}</span>
            </div>
          )
        }
        <span className="header__option" onClick={showCreate}>Create Meeting</span>
        <span className="header__option" onClick={showJoin}>Join Meeting</span>
      </div>
      <span className="header__logout" onClick={logout}><span>Logout</span></span>
    </div>
  );
}

export default Header;