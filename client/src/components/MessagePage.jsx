// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";

// const MessagePage = () => {
//   const params = useParams();
//   const socketConnection = useSelector((state) => state?.user?.socketConnection);
//   console.log(params.userId);

//   useEffect(() => {
//     if(socketConnection){
//       socketConnection.emit("message-page", params.userId);
//     }
//   }, [socketConnection]);

//   return( 
//     <div>
//       MessagePage
//     </div>
//     );
// };

// export default MessagePage;


import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../socketContext"; // ✅ Use context instead of Redux

const MessagePage = () => {
  const params = useParams();
  const { socket } = useSocket(); // ✅ Get socket from context

  console.log(params.userId);

  useEffect(() => {
    if (socket) {
      socket.emit("message-page", params.userId); // ✅ Send event to backend

      socket.on("message-user", (payload) => {
        console.log("Received message-user event:", payload);
      });
    }
  }, [socket]);

  return <div>MessagePage</div>;
};

export default MessagePage;
