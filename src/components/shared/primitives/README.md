# Shared Primitives

Reusable atomic components that encode the Icons design language. Import from the barrel:

```tsx
import { MonoLabel, Avatar, StickerCard, FadeIn } from "@/components/shared/primitives";
```

## When to use what

### Visual atoms

| Component    | Replaces                                                              | When                                                  |
|--------------|------------------------------------------------------------------------|-------------------------------------------------------|
| `MonoLabel`  | `font-mono text-[10px] uppercase tracking-[0.18em]` everywhere        | Any uppercase tracked label, timestamp, eyebrow       |
| `Avatar`     | `rounded-full border-2 ... .db-chat-avatar` etc.                      | User/brand initials, profile pictures                 |
| `Chip`       | `font-mono text-[8px] uppercase ... px-2 py-0.5 rounded-full border` | Status pills, filters, tags                           |
| `FileChip`   | `.db-chat-file-chip` inline pattern                                   | Attachment labels in messages/cards                   |
| `IconButton` | `inline-flex w-9 h-9 rounded-full border-2 ...`                       | Icon-only actions (close, send, attach, back)         |

### Containers

| Component     | Replaces                                                       | When                                              |
|---------------|----------------------------------------------------------------|---------------------------------------------------|
| `StickerCard` | The sticker shadow pattern: border + offset shadow            | Milestone cards, callouts, CTAs, notification cards |
| `EmptyState`  | Centered icon + display title + caption (×7 places in codebase) | Empty lists, no-results, "select a conversation"  |

### Feedback

| Component       | When                                                  |
|-----------------|-------------------------------------------------------|
| `InlineToast`   | Confirmation pill local to a panel (e.g. chat send)  |
| `ToastProvider` | App-wide toast queue (wrap in `_app.tsx`)            |
| `useToast()`    | Trigger global toasts from anywhere                  |

### Motion

| Component         | Replaces                                                | When                                          |
|-------------------|----------------------------------------------------------|-----------------------------------------------|
| `FadeIn`          | Ad-hoc `gsap.fromTo` for entrance fade+slide            | Single-element entrance                       |
| `StaggerChildren` | `gsap.utils.toArray + stagger`                          | List/grid entrance with staggered items       |
| `Reveal`          | Mask-up, split-words, scale-pop patterns                | Cinematic text reveals, sticker pop-ins       |

All motion uses tokens from `src/lib/motion.ts` — never hardcode durations.

## Examples

### Chat thread item

```tsx
<button className="thread-row">
  <Avatar initial={t.initial} size="md" />
  <div className="flex-1">
    <MonoLabel weight="semibold">{t.name}</MonoLabel>
    <MonoLabel size="xs" opacity={45}>{t.lastTime}</MonoLabel>
    <p>{t.lastMessage}</p>
    <div className="flex gap-1">
      {t.milestones.map(m => (
        <Chip asSpan variant={m.status === "active" ? "active" : "done"} size="xs">
          {m.label}
        </Chip>
      ))}
    </div>
  </div>
  {t.unread > 0 && <Chip variant="solid" size="xs">{t.unread}</Chip>}
</button>
```

### Milestone card

```tsx
<StickerCard radius="md" padding="md">
  <MonoLabel weight="semibold">✦ Draft submitted</MonoLabel>
  <FileChip name="draft.mp4" type="video" onOpen={openFile} />
  <div className="flex gap-2 mt-3">
    <button className="btn-primary" onClick={approve}>Approve</button>
    <button className="btn-ghost" onClick={revise}>Request revision</button>
  </div>
</StickerCard>
```

### Empty state with action

```tsx
<EmptyState
  icon={<Inbox />}
  title="No campaigns yet"
  caption="Your applied briefs will appear here"
  action={<Link href="/briefs" className="btn-primary">Browse briefs</Link>}
  size="lg"
/>
```

### Scroll-triggered entrance

```tsx
<StaggerChildren selector=".card" stagger="cards" onScroll>
  {items.map(item => <Card key={item.id} {...item} />)}
</StaggerChildren>

<Reveal variant="split-words" onScroll>
  Real briefs. Real rates. Public.
</Reveal>
```

### Global toast

```tsx
// _app.tsx
<ToastProvider>
  <Application />
</ToastProvider>

// Any component
const { show } = useToast();
show("Saved successfully", "success");
```
