import { useState, type FormEvent } from 'react';
import { createOfflineReply } from '@enterprise-d/rules';

type Message = {
  id: number;
  sender: 'you' | 'computer';
  text: string;
};

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, sender: 'computer', text: createOfflineReply() },
  ]);
  const [draft, setDraft] = useState('');

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();

    if (text.length === 0) {
      return;
    }

    setMessages((current) => [
      ...current,
      { id: current.length + 1, sender: 'you', text },
      {
        id: current.length + 2,
        sender: 'computer',
        text: createOfflineReply(),
      },
    ]);
    setDraft('');
  }

  return (
    <main className="shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">NIGHT WATCH · DEVELOPMENT BUILD</p>
          <h1>Shipboard systems</h1>
        </div>
        <span className="status"><span aria-hidden="true" /> LOCAL MODE</span>
      </header>

      <section className="workspace" aria-label="Development workspace">
        <section className="viewport" aria-labelledby="viewport-title">
          <div className="viewport-grid" aria-hidden="true" />
          <div className="viewport-copy">
            <p className="eyebrow">DECK 06 · SYSTEMS CORRIDOR</p>
            <h2 id="viewport-title">Renderer placeholder</h2>
            <p>Babylon.js scene and movement are planned for the next slice.</p>
          </div>
          <span className="coordinate">SCENE OFFLINE</span>
        </section>

        <aside className="chat" aria-labelledby="chat-title">
          <div className="chat-heading">
            <div>
              <p className="eyebrow">SHIP COMPUTER</p>
              <h2 id="chat-title">Local channel</h2>
            </div>
            <span className="channel-dot" aria-hidden="true" />
          </div>

          <p className="notice">Messages stay in this browser. No server or model is connected.</p>
          <ol className="messages" aria-live="polite">
            {messages.map((message) => (
              <li className={`message message--${message.sender}`} key={message.id}>
                <span>{message.sender === 'you' ? 'YOU' : 'COMPUTER'}</span>
                <p>{message.text}</p>
              </li>
            ))}
          </ol>

          <form className="composer" onSubmit={sendMessage}>
            <label className="visually-hidden" htmlFor="message">Message</label>
            <input
              autoComplete="off"
              id="message"
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Enter a message"
              value={draft}
            />
            <button type="submit">Send</button>
          </form>
        </aside>
      </section>
      <footer>MONOREPO SKELETON · NO GAME STATE IS PERSISTED</footer>
    </main>
  );
}
