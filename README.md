# Vue 3 Drag and drop plugin
This plugin was created to make drag and drop in vue easier and also handle dragging without ugly native shadow elements.

## Instalation:

Add plugin to your application instance
```javascript
const app = createApp()
app.use(dragAndDrop)
```

Add this global css function to your project
```vue
<style>
.v-draggable-drag {
  position: fixed;
  user-select: none;
  pointer-events: none;
}
</style>
```

## Docs:

### Create draggable element
You can use mouse or touch to drag element on screen.
```vue
<template>
  <div class="myDraggableElement" v-draggable="payload"></div>
</template>

<script setup>
import { ref } from 'vue'

const payload = ref('hello world!')
</script>
```

### Create droppable element
Bind a function to v-droppable directive to handle your own logic.

Event parameter is an object that contains type and value keys. There are three types of events:
- DROP - when draggable element is droppen on dropzone.
- ENTER - when draggable element enters dropzone.
- LEAVE - when draggable element leaves dropzone.
event.value always contains payload attached to v-draggable element.
```vue
<template>
  <div class="myDragZoneElement" v-droppable="handleDrop"></div>
</template>

<script setup>
import { ref } from 'vue'

function handleDrop(event) {
  console.log(event.type, event.value)
}
</script>
```

### Listen to events on v-draggable element
To listen to events on draggable element you have to attach function to directive arguments

Event parameter is an object that contains type and value keys. There are three types of events:
- DROP - when draggable element is droppen on dropzone.
- ENTER - when draggable element enters dropzone.
- LEAVE - when draggable element leaves dropzone.
event.value conains HTMLElement of v-droppable element.
```vue
<template>
  <div class="myDragZoneElement" v-draggable:[handleDrag]="'hello world'">
    DRAGGABLE
  </div>
  <div>DROP ZONE</div>
</template>

<script setup>
// example
function handleDrag(event) {
  if (event.type === 'ENTER') {
    console.log(event.value) // <div>DROP ZONE</div>
  }
}
</script>
```

