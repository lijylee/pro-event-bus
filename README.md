# pro-event-bus

## npm install

```javascript
 npm i pro-event-bus
```

## node

```javascript
const EventBus = require('pro-event-bus')

const eventBus = new EventBus()

eventBus.on('test', () => {
    console.log('test pro-event-bus');
})

eventBus.once('once', () => {
    console.log('test pro-event-bus-once');
})

eventBus.emit('test')
eventBus.emit('test')
eventBus.emit('once')
eventBus.emit('once')

eventBus.offAll()
eventBus.emit('test')

/* 
    test pro-event-bus
    test pro-event-bus     
    test pro-event-bus-once
*/
```

## web

```javascript
<script src="./pro-event-bus/index.js"></script>
    <script>
        const eventBus = new proEventBus()

        eventBus.on('test', () => {
            console.log('test pro-event-bus');
        })

        eventBus.once('once', () => {
            console.log('test pro-event-bus-once');
        })

        eventBus.emit('test')
        eventBus.emit('test')
        eventBus.emit('once')
        eventBus.emit('once')

        eventBus.offAll()
        eventBus.emit('test')

        /*
            ② test pro-event-bus
            test pro-event-bus-once
        */
    </script>
```

## API

#### on

#### once

#### off

#### offAll

#### emit