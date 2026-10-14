# Postly Chrome extension — private email-first MVP

This is the Chrome-extension shell for the workflow you described:

1. Install the extension.
2. Add your name, email, voice, facts, topics, and weekly check-in time once.
3. A private server emails the weekly check-in.
4. You reply with rough notes.
5. The server replies with drafts.
6. You approve, edit, or skip by email.
7. The server publishes only explicitly approved content through LinkedIn's official API.

## Load it in Chrome

1. Open `chrome://extensions`.
2. Turn on **Developer mode**.
3. Choose **Load unpacked**.
4. Select this `linkedin-email-extension` folder.
5. Pin **Postly** and open it. Choose **Set up Postly**.

The popup and settings storage work now. The email-test button intentionally remains unavailable until a server URL is configured; browser extensions must not contain email credentials, AI keys, or LinkedIn client secrets.

## What still needs building for a real private deployment

- A small server (for example, Node/Express or Python/FastAPI)
- An email provider or a Gmail account with an App Password
- An AI provider API key
- A LinkedIn developer app with OAuth and the official Posts API permissions
- A small database for profiles, drafts, approvals, schedules, and encrypted tokens

## Needed from you before real integrations

1. **Email source:** do you want mail sent from your own Gmail, or should we use a transactional service such as Resend?
2. **AI provider:** Anthropic is already used by the original Python prototype; OpenAI is also possible.
3. **Hosting:** a small private server needs a place to run (for example, Railway, Render, or your own computer).

Do not add LinkedIn browser automation, page scraping, or content injection. The extension only stores configuration and talks to your private server. The server uses official LinkedIn OAuth/API calls after a user has explicitly approved a post.
