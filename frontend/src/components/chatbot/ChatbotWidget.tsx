import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { faqs, type FAQ } from './faqs';

type Role = 'user' | 'bot';
type Message = { id: string; role: Role; text: string };

// Persistent WhatsApp button settings
const WA_NUMBER_E164 = '923296273720'; // +92 329 6273720 without plus and spaces
const WA_URL = `https://wa.me/${WA_NUMBER_E164}?text=${encodeURIComponent('Hi Healthspire! I have a question.')}`;

const styles: { [k: string]: React.CSSProperties } = {
  fab: {
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    width: '56px',
    height: '56px',
    borderRadius: '28px',
    background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
    color: 'white',
    border: 'none',
    boxShadow: '0 10px 24px rgba(2, 132, 199, 0.35)',
    cursor: 'pointer',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 180ms ease, box-shadow 200ms ease',
  },
  fabHover: {
    transform: 'translateY(-2px) scale(1.03)',
    boxShadow: '0 14px 28px rgba(2, 132, 199, 0.45)',
  },
  header: {
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '6px 14px',
    background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
    color: 'white',
    fontWeight: 700,
    gap: '10px',
    borderBottom: '1px solid rgba(255,255,255,0.15)',
  },
  headerTitle: {
    fontSize: '16px',
    fontWeight: 800,
    letterSpacing: '0.2px',
    textShadow: '0 1px 0 rgba(0,0,0,0.15)',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  iconBtn: {
    background: 'transparent',
    border: 'none',
    color: 'inherit',
    cursor: 'pointer',
    padding: 4,
  },
  panel: {
    position: 'fixed',
    right: '20px',
    bottom: '90px',
    width: '360px',
    maxHeight: '60vh',
    background: 'rgba(255,255,255,0.92)',
    color: '#0f172a',
    borderRadius: '16px',
    boxShadow: '0 24px 48px rgba(2, 6, 23, 0.18)',
    border: '1px solid rgba(2, 6, 23, 0.06)',
    backdropFilter: 'saturate(140%) blur(10px)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 1000,
    transition: 'opacity 200ms ease, transform 200ms ease',
  },
  body: {
    padding: '10px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    minHeight: '140px',
    background: 'transparent',
  },
  faqWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '8px',
  },
  faqBtn: {
    border: '1px solid #d6dee6',
    background: '#ffffff',
    color: '#0f172a',
    borderRadius: '999px',
    padding: '8px 12px',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'transform 120ms ease, background 150ms ease, box-shadow 150ms ease',
    boxShadow: '0 1px 2px rgba(2,6,23,0.06)',
  },
  msg: {
    padding: '10px 12px',
    borderRadius: '14px',
    maxWidth: '80%',
    whiteSpace: 'pre-wrap',
    lineHeight: 1.35,
    fontSize: '15px',
    boxShadow: '0 1px 2px rgba(2,6,23,0.06)',
  },
  userMsg: {
    alignSelf: 'flex-end',
    background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
    color: 'white',
    borderTopRightRadius: '4px',
  },
  botMsg: {
    alignSelf: 'flex-start',
    background: '#f8fafc',
    borderTopLeftRadius: '4px',
  },
  hint: {
    alignSelf: 'center',
    color: '#64748b',
    fontSize: '13px',
    marginTop: '8px',
  },
  inputRow: {
    display: 'flex',
    gap: '8px',
    padding: '12px',
    borderTop: '1px solid rgba(2,6,23,0.06)',
    background: 'rgba(255,255,255,0.9)',
  },
  textarea: {
    flex: 1,
    resize: 'none' as any,
    borderRadius: '999px',
    border: '1px solid #cbd5e1',
    padding: '10px 14px',
    fontSize: '14px',
    outline: 'none',
    background: '#ffffff',
  },
  sendBtn: {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
    color: 'white',
    border: 'none',
    borderRadius: '999px',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 8px 18px rgba(2, 132, 199, 0.28)',
    transition: 'transform 120ms ease, box-shadow 160ms ease, opacity 120ms ease',
  },
  footerNote: {
    borderTop: '1px dashed #e2e8f0',
    padding: '6px 10px',
    fontSize: '12px',
    color: '#64748b',
    background: '#f8fafc',
  },
  waBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    border: 'none',
    background: '#25D366',
    color: '#ffffff',
    borderRadius: '999px',
    padding: '8px 12px',
    fontSize: '13px',
    fontWeight: 800,
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(3, 200, 100, 0.3)',
  },
  closeBtn: {
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.35)',
    borderRadius: '999px',
    color: 'white',
  },
};

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [hoverFab, setHoverFab] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen((v: boolean) => !v);

  const pushPair = (q: string, a: string) => {
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', text: q };
    const botMsg: Message = { id: crypto.randomUUID(), role: 'bot', text: a };
    setMessages((prev: Message[]) => [...prev, userMsg, botMsg]);
  };

  const onFaqClick = (f: FAQ) => {
    pushPair(f.question, f.answer);
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || sending) return;

    setInput('');
    setSending(true);

    try {
      // Try to find a matching FAQ by simple text inclusion
      const t = text.toLowerCase();
      const matched =
        faqs.find((f) => f.question.toLowerCase().includes(t)) ||
        faqs.find((f) => t.includes(f.question.toLowerCase()));

      if (matched) {
        pushPair(matched.question, matched.answer);
      } else {
        const fallback =
          "Please select a question from the suggestions below, or contact us on WhatsApp.";
        const userMsg: Message = { id: crypto.randomUUID(), role: 'user', text };
        const botMsg: Message = { id: crypto.randomUUID(), role: 'bot', text: fallback };
        setMessages((prev: Message[]) => [...prev, userMsg, botMsg]);
      }
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Allow transition to pick up
      const t = setTimeout(() => setAnimateIn(true), 10);
      return () => clearTimeout(t);
    } else {
      setAnimateIn(false);
    }
  }, [isOpen]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isOpen]);

  return (
    <>
      {/* Floating action button */}
      <button
        aria-label="Open chat"
        onClick={toggleOpen}
        onMouseEnter={() => setHoverFab(true)}
        onMouseLeave={() => setHoverFab(false)}
        style={{
          ...styles.fab,
          ...(hoverFab ? styles.fabHover : null),
          transition: 'transform 180ms ease, box-shadow 200ms ease',
        }}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          style={{
            ...styles.panel,
            opacity: animateIn ? 1 : 0,
            transform: animateIn ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.98)',
          }}
        >
          <div style={styles.header}>
            <div style={styles.headerTitle}>Healthspire Chat</div>
            <div style={styles.headerRight}>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.waBtn}
                aria-label="Chat on WhatsApp"
              >
                WhatsApp
              </a>
              <button aria-label="Close chat" onClick={toggleOpen} style={styles.closeBtn}>
                <X size={18} />
              </button>
            </div>
          </div>

          <div style={styles.body}>
            {/* FAQ suggestions always visible at the top */}
            <div style={styles.faqWrap}>
              <div style={{ width: '100%', fontSize: '12px', color: '#64748b' }}>Suggested</div>
              {faqs.map((f) => (
                <button key={f.question} style={styles.faqBtn} onClick={() => onFaqClick(f)}>
                  {f.question}
                </button>
              ))}
            </div>

            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  ...styles.msg,
                  ...(m.role === 'user' ? styles.userMsg : styles.botMsg),
                }}
              >
                {m.text}
              </div>
            ))}
            {sending && (
              <div style={{ ...styles.msg, ...styles.botMsg, opacity: 0.7 }}>Typing…</div>
            )}
            <div ref={scrollRef} />
          </div>

          <div style={styles.inputRow}>
            <textarea
              placeholder="Type a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              rows={1}
              style={styles.textarea}
            />
            <button
              onClick={sendMessage}
              disabled={sending || !input.trim()}
              style={{ ...styles.sendBtn, opacity: sending || !input.trim() ? 0.6 : 1 }}
              aria-label="Send"
              title="Send"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default ChatbotWidget;
