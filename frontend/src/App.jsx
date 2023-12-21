import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Meeting from './components/meeting/Meeting';
import Loading from './components/common/Loading';
import PrivateRoute from './components/home/PrivateRoute';
import Context from './context';
import { CometChat } from '@cometchat/chat-sdk-javascript'


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [hasNewMeeting, setHasNewMeeting] = useState(false);
  const [meeting, setMeeting] = useState(null);
  const [cometChat, setCometChat] = useState(null);

  useEffect(() => {
    initAuthUser();
    initCometChat();
    initMeeting();
  }, []);

  const initAuthUser = () => {
    const authenticatedUser = localStorage.getItem('auth');
    if (authenticatedUser) {
      setUser(JSON.parse(authenticatedUser));
    }
  };
  
  const initCometChat = async () => {
    const appID = import.meta.env.VITE_REACT_APP_COMETCHAT_APP_ID;
    const region = import.meta.env.VITE_REACT_APP_COMETCHAT_REGION;
    let appSetting = new CometChat.AppSettingsBuilder()
                        .subscribePresenceForAllUsers()
                        .setRegion(region)
                        .autoEstablishSocketConnection(true)
                        .build();
    CometChat.init(appID, appSetting).then(
      () => {
        console.log("Initialization completed successfully");
      }, error => {
        console.log("Initialization failed with error:", error);
      }
    ); 
  };

  const initMeeting = () => { 
    const meeting = localStorage.getItem('meeting');
    if (meeting) {
      setMeeting(JSON.parse(meeting));
    }
  };

  return (
    <>
      <Context.Provider value={{ isLoading, setIsLoading, user, setUser, hasNewMeeting, setHasNewMeeting, meeting, setMeeting, cometChat,setCometChat }}>
      <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/meeting" element={<PrivateRoute><Meeting /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </Router>
      {isLoading && <Loading />}
    </Context.Provider>
    </>
  )
}

export default App
