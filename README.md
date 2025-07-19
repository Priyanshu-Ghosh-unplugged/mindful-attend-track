# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/b5daa3b3-f504-432c-b509-6e5ee0f61dfc

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b5daa3b3-f504-432c-b509-6e5ee0f61dfc) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b5daa3b3-f504-432c-b509-6e5ee0f61dfc) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Events Table Schema

The `events` table enables multi-event support and links all engagement, session, and participant data to a specific event.

| Column      | Type      | Description                                 |
|-------------|-----------|---------------------------------------------|
| id          | UUID      | Primary key, unique event identifier        |
| name        | TEXT      | Name of the event                          |
| description | TEXT      | Optional description of the event           |
| start_time  | TIMESTAMPTZ | Event start date/time                     |
| end_time    | TIMESTAMPTZ | Event end date/time                       |
| created_at  | TIMESTAMPTZ | Row creation timestamp                    |
| updated_at  | TIMESTAMPTZ | Row update timestamp                      |

### Relationships
- **engagement_logs.event_id** → `events.id`
- **sessions.event_id** → `events.id`
- **participants.event_id** → `events.id`

#### Entity Relationship Diagram (ERD)

```
[events] <--- [engagement_logs]
   |             ^
   |             |
   +--- [sessions]
   |
   +--- [participants]
```

- Each engagement log, session, and participant is linked to a single event via `event_id`.
- Deleting an event cascades to remove related logs, sessions, and participants (if ON DELETE CASCADE is set).

---

## MultiEvent UI: API Calls & Business Logic

The MultiEvent UI enables users to manage, compare, and analyze multiple events. All data operations use the Supabase client in React.

### Event Operations

#### 1. Fetch Events
```js
const { data } = await supabase.from('events').select('*').order('created_at', { ascending: false });
```

#### 2. Create Event
```js
const { data, error } = await supabase.from('events').insert([
  { name, description, start_time, end_time }
]).select();
```

#### 3. Clone Event
```js
const { data, error } = await supabase.from('events').insert([
  { name: orig.name + ' (Clone)', description: orig.description, start_time: orig.start_time, end_time: orig.end_time }
]).select();
```

#### 4. Select Event
- UI state: `selectedEventId` is set to the chosen event's `id`.
- All engagement logs, sessions, and participants are filtered or created with this `event_id`.

#### 5. Compare Events (Metrics)
For each event in the comparison set:
```js
const { count: attendance } = await supabase.from('participants').select('id', { count: 'exact', head: true }).eq('event_id', eid);
const { count: engagement } = await supabase.from('engagement_logs').select('id', { count: 'exact', head: true }).eq('event_id', eid);
const { count: sessions } = await supabase.from('sessions').select('id', { count: 'exact', head: true }).eq('event_id', eid);
```

### Business Logic
- All engagement, session, and participant records must include the correct `event_id`.
- The UI supports event creation, cloning, selection, and comparison.
- Metrics are fetched live for each event and displayed in a comparison dashboard.
- All API calls are performed using the Supabase JS client.

---
