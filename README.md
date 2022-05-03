# **warning**: this package is not yet complete and is missing almost all commands.

# `mc-rcon` package

`mc-rcon` provides TypeScript first interfaces for communicating with Minecraft RCON connections. Providing methods for all Minecraft Java edition commands, `mc-rcon` allows you to communicate with your server in an asynchronous way.

## Installation

```bash
npm install @polymer-co/mc-rcon
```

## Example

```typescript
import { McRconAdmin } from 'mc-rcon'

// Create a new instance of `McRcon`.
// The `McRconAdmin` class provides all administrator commands conveniently
// wrapped in interfaces.
const rcon = new McRconAdmin({
  host: '127.0.0.1',
  password: 'myRconPassword',
  port: 25575
})

// Attempt to connect to the server
rcon.connect().then(async () => {
  // Get a list of all the players
  const players = await rcon.list();

  // Print all uuids
  players.forEach(player => console.log(player.uuid))

  // Disconnect from the RCON server. Must call, or-else will listen endlessly.
  rcon.disconnect()
})
```
