import ChatHistory from '../components/ChatHistory';
import { logout } from '../utils/logout';

function Chat() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Chat</h1>

          <button
            onClick={logout}
            className="text-sm text-red-600 underline cursor-pointer"
          >
            Logout
          </button>
        </div>
        <ChatHistory />
        <form className="mt-4">
          <fieldset className="border p-4 rounded dark:border-gray-700">
            <legend className="text-lg font-semibold">New Message</legend>
            <div className="flex flex-col space-y-2">
              <textarea
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                rows={3}
                placeholder="Type your message here..."
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button className="mt-2 bg-blue-600 text-white p-2 rounded">
                Send
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default Chat;
