# measured-graphite-reporter

Simple measured-core graphite reporter

## Usage

### Environment Variable

| Name          | Description                           |
| ------------- | ------------------------------------- |
| GRAPHITE_HOST | Graphite Host, default is `localhost` |
| GRAPHITE_PORT | Graphite Port, default is `2003`      |

### Use in TypeScript

```ts
import { GraphiteReporter } from 'measured-graphite-reporter';

const reporter = new GraphiteReporter();

const rapidReporter = new GraphiteReporter(1000); // Report every 1s

const customReporter = new GraphiteReporter(1000, 'graphite', '2011', 'my_prefix');

reporter.start();

// Log Count
reporter.logCount('my.awesome.event');

// Log Duration
reporter.logDuration('my.awesome.event', 1000);
```

### Use in JavaScript

```js
const GraphiteReporter = require('measured-graphite-reporter').GraphiteReporter;

const reporter = new GraphiteReporter();

const rapidReporter = new GraphiteReporter(1000); // Report every 1s

const customReporter = new GraphiteReporter(1000, 'graphite', '2011', 'my_prefix');

reporter.start();

// Log Count
reporter.logCount('my.awesome.event');

// Log Duration
reporter.logDuration('my.awesome.event', 1000);
```
