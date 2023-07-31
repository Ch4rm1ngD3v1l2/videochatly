using Microsoft.AspNetCore.SignalR;

namespace videochatlyb.Hubs
{
    public class ChatHub : Hub
    {
        // async return hiidgumu
        public async Task SendMessage(object message)
        {
            await Clients.Others.SendAsync("ReceiveMessage", message);
        }

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            return base.OnDisconnectedAsync(exception);
        }
    }
}
