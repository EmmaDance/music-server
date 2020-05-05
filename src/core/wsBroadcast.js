import WebSocket from "ws";

let wss;
export const init = webSocketServer => {
    wss = webSocketServer;
}
export const broadcast = data => {
    if (!wss)
        return;
    wss.clients.forEach((ws)=>{
        // console.log('user: ',ws.user);
        if(ws.readyState === WebSocket.OPEN){
            ws.send(JSON.stringify(data));
        }
    });
}
