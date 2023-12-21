import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MeetingHeader from './MeetingHeader';
import Context from '../../context';
import {CometChat} from '@cometchat/chat-sdk-javascript'

const Meeting = () => { 

  const { meeting } = useContext(Context);
  const navigate = useNavigate();
  let startDirectCall =null
  useEffect(() => {
    if (meeting && CometChat) {

      startDirectCall();
    }
  }, [meeting,startDirectCall]);

   startDirectCall = () => {
   
    if (CometChat && meeting) {
        const sessionID = meeting.meeting_uid;
        console.log("this is the session id",sessionID)
      const audioOnly = false;
      const defaultLayout = true;
      const callSettings = new CometChat.CallSettingsBuilder()
        .enableDefaultLayout(defaultLayout)
        .setSessionID(sessionID)
        .setIsAudioOnlyCall(audioOnly)
        .build();
      CometChat.startCall(
        callSettings,
        document.getElementById("call__screen"),
        new CometChat.OngoingCallListener({
          onUserListUpdated: userList => {
          },
          onCallEnded: call => {
            navigate('/');
          },
          onError: error => {
            navigate('/');
          },
          onMediaDeviceListUpdated: deviceList => {
          },
          onUserMuted: (userMuted, userMutedBy) => {
          },
          onScreenShareStarted: () => {
          },
          onScreenShareStopped: () => {
          }
        })
      );
    }
  };

  if (!meeting || !CometChat) {
    return <></>;
  }

  return (
    <>
      <MeetingHeader />
      <div className="meeting">
        <div className="meeting__left">
          <div id="call__screen"></div>
        </div>
        <div className="meeting__right">
          <p> Meeting Chats will be shown here </p>
        </div>
      </div>
    </>
  );
};

export default Meeting;