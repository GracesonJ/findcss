import React, { useState } from 'react';

// ---------------------------------------------------------------------------
// CSS Code Prediction — event game
// Shows the rendered output of a CSS rule. Player guesses what produced it.
// Clicking "Show answer" reveals the actual CSS code.
// ---------------------------------------------------------------------------

export default function Dashboard() {
  const [started, setStarted] = useState(false);
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="cp-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Inter:wght@400;500;600;700&display=swap');

        .cp-root {
          --bg: #0a0d12;
          --panel: #12161c;
          --panel-2: #161b22;
          --border: #262c36;
          --border-soft: #1d222b;
          --accent: #7ee787;
          --accent-dim: #2e4a35;
          --text: #e6edf3;
          --text-dim: #8b949e;
          --text-faint: #5b6470;

          width: 100%;
          min-height: 100vh;
          background:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(126,231,135,0.07), transparent),
            var(--bg);
          color: var(--text);
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .cp-root *, .cp-root *::before, .cp-root *::after {
          box-sizing: border-box;
        }

        @media (prefers-reduced-motion: reduce) {
          .cp-root * { animation: none !important; transition: none !important; }
        }

        /* ---------- Header ---------- */
        .cp-header {
          width: 100%;
          text-align: center;
          padding: 48px 24px 0;
        }

        .cp-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-faint);
          margin-bottom: 10px;
        }

        .cp-eyebrow::before {
          content: '$ ';
          color: var(--accent);
        }

        .cp-title {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 800;
          font-size: clamp(28px, 5vw, 42px);
          letter-spacing: -0.01em;
          color: var(--text);
          display: inline-flex;
          align-items: center;
          gap: 2px;
          margin: 0;
        }

        .cp-title .cp-accent { color: var(--accent); }

        .cp-cursor {
          display: inline-block;
          width: 3px;
          height: 0.85em;
          background: var(--accent);
          margin-left: 6px;
          animation: blink 1s steps(1) infinite;
          vertical-align: middle;
        }

        @keyframes blink { 50% { opacity: 0; } }

        .cp-subtitle {
          font-size: 15px;
          color: var(--text-dim);
          margin: 12px 0 0;
        }

        /* ---------- Output stage (the rendered preview) ---------- */
        .cp-stage {
          flex: 1;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 56vh;
        }

        .cp-preview-frame {
          width: 100%;
          max-width: 820px;
          margin: 0 24px;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: 0 20px 60px -20px rgba(0,0,0,0.6);
        }

        .cp-preview-chrome {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 10px 14px;
          background: var(--panel);
          border-bottom: 1px solid var(--border);
        }

        .cp-preview-body {
          background: #ffffff;
          height: 360px;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          animation: pop 0.5s ease forwards;
          animation-delay: 0.15s;
        }

        .cp-preview-body span {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 26px;
          color: #111111;
        }

        @keyframes pop {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* ---------- Trigger / button area ---------- */
        .cp-actions {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 0 24px 64px;
        }

        .cp-btn {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.01em;
          padding: 14px 32px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: transform 0.12s ease, box-shadow 0.2s ease, background 0.15s ease;
        }

        .cp-btn--primary {
          background: var(--accent);
          color: #0a1f0e;
          box-shadow: 0 0 0 1px rgba(126,231,135,0.3), 0 8px 24px -8px rgba(126,231,135,0.5);
        }

        .cp-btn--primary:hover {
          background: #8ff09a;
          transform: translateY(-1px);
        }

        .cp-btn--primary:active {
          transform: translateY(0);
        }

        .cp-btn--ghost {
          background: transparent;
          color: var(--text-dim);
          border: 1px solid var(--border);
        }

        .cp-btn--ghost:hover {
          color: var(--text);
          border-color: var(--text-faint);
        }

        .cp-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        /* ---------- Answer card ---------- */
        .cp-answerwrap {
          width: 100%;
          max-width: 480px;
          padding: 0 24px 64px;
        }

        .cp-codecard {
          background: var(--panel-2);
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 20px 50px -20px rgba(0,0,0,0.6);
          opacity: 0;
          transform: translateY(8px);
          animation: rise 0.35s ease forwards;
        }

        @keyframes rise {
          to { opacity: 1; transform: translateY(0); }
        }

        .cp-titlebar {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 11px 16px;
          background: var(--panel);
          border-bottom: 1px solid var(--border);
        }

        .cp-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          display: inline-block;
        }
        .cp-dot--red { background: #ff5f56; }
        .cp-dot--yellow { background: #ffbd2e; }
        .cp-dot--green { background: #27c93f; }

        .cp-filename {
          margin-left: 8px;
          font-size: 12.5px;
          color: var(--text-faint);
          font-family: 'JetBrains Mono', monospace;
        }

        .cp-pre {
          margin: 0;
          padding: 22px 24px 26px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 14.5px;
          line-height: 1.85;
          overflow-x: auto;
        }

        .cp-line { white-space: pre; }
        .cp-line--tag { color: var(--text); font-weight: 500; }
        .cp-prop { color: #9cdcfe; }
        .cp-punc { color: var(--text-dim); }
        .cp-val { color: #ce9178; }
      `}</style>

      <header className="cp-header">
        <div className="cp-eyebrow">luminar-technolab - Web Wizards</div>
        <h1 className="cp-title">
          <span className="cp-accent">CSS</span> Code Prediction
          <span className="cp-cursor" />
        </h1>
        <p className="cp-subtitle">Look at the image given. Guess html & css code to develop a web page like this</p>
      </header>

      {!started ? (
        <>
          <div className="cp-stage" />
          <div className="cp-actions">
            <button className="cp-btn cp-btn--primary" onClick={() => setStarted(true)}>
              ▶ Start the game
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="cp-stage">
            <div className="cp-preview-frame">
              <div className="cp-preview-chrome">
                <span className="cp-dot cp-dot--red" />
                <span className="cp-dot cp-dot--yellow" />
                <span className="cp-dot cp-dot--green" />
              </div>
              <div className="cp-preview-body">
                <span>Luminar Technolab</span>
              </div>
            </div>
          </div>

          <div className="cp-actions">
            <button
              className="cp-btn cp-btn--ghost"
              onClick={() => setRevealed((r) => !r)}
            >
              {revealed ? 'Hide answer' : 'Show answer'}
            </button>
          </div>

          {revealed && (
            <div className="cp-answerwrap">
              <div className="cp-codecard">
                <div className="cp-titlebar">
                  <span className="cp-dot cp-dot--red" />
                  <span className="cp-dot cp-dot--yellow" />
                  <span className="cp-dot cp-dot--green" />
                  <span className="cp-filename">style.css</span>
                </div>
                <pre className="cp-pre">
                  <code>
                    <div className="cp-line cp-line--tag">div {'{'}</div>
                    <div className="cp-line">
                      <span className="cp-prop">  display</span>
                      <span className="cp-punc">: </span>
                      <span className="cp-val">flex</span>
                      <span className="cp-punc">;</span>
                    </div>
                    <div className="cp-line">
                      <span className="cp-prop">  justify-content</span>
                      <span className="cp-punc">: </span>
                      <span className="cp-val">center</span>
                      <span className="cp-punc">;</span>
                    </div>
                    <div className="cp-line">
                      <span className="cp-prop">  align-items</span>
                      <span className="cp-punc">: </span>
                      <span className="cp-val">center</span>
                      <span className="cp-punc">;</span>
                    </div>
                    <div className="cp-line">
                      <span className="cp-prop">  height</span>
                      <span className="cp-punc">: </span>
                      <span className="cp-val">95vh</span>
                      <span className="cp-punc">;</span>
                    </div>
                    <div className="cp-line cp-line--tag">{'}'}</div>
                  </code>
                </pre>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}