import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="title">Portfolio</p>
        <nav>
          <ul className="navigation-list">
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>

      <main className="main">
        <h1>About me</h1>
        <div className="code">
          <div className="container">
            <div className="line"><span className="const margin-right">const</span><span className="variable margin-right">WHOAMI</span><span className="formula margin-right">=</span>{"{"}</div>
            <div className="line margin-left"><span className="property">name</span>:<span className="margin-left value">"Shunta Yamamoto"</span>,</div>
            <div className="line margin-left"><span className="property">aliases</span>:<span className="margin-left"> {"["}</span><span className="value">"atnuhs"</span>,<span className="margin-left value">"tako"</span>{"],"}</div>
            <div className="line margin-left"><span className="property">age</span>:<span className="margin-left number">20</span>,</div>
            <div className="line margin-left"><span className="property">location</span>:<span className="margin-left value">"Osaka"</span>,</div>
            <div className="line margin-left"><span className="property">hobby</span>:<span className="margin-left"> {"["}</span><span className="value">"Music"</span>,<span className="margin-left value">"Game"</span>{"],"}</div>
            <div className="line">{"};"}</div>
          </div>
        </div>
        <div className="contact">
          <div className="contact-card"><a href="https://example.com">X</a></div>
          <div className="contact-card"><a href="https://example.com">GitHub</a></div>
          <div className="contact-card"><a href="https://example.com">Mail</a></div>
          <div className="contact-card"><a href="https://example.com">Link</a></div>
        </div>
      </main>
    </div>
  );
}

export default App;
