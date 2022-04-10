interface HTMLDropElement extends HTMLElement {
  isDropArea: boolean | undefined
  dropAreaHandler: Function | undefined
}

type DropHandler = (type: 'ENTER' | 'LEAVE' | 'DROP', value: any) => any

class DraggableElement {
  private readonly element: HTMLElement
  private payload: any
  private lastDropArea: HTMLDropElement | undefined
  private isIntersecting: boolean;

  constructor(element: HTMLElement, payload: any) {
    this.element = element
    this.payload = payload
    this.element.addEventListener('touchstart', (e) => this.touchDrag(e))
    this.element.addEventListener('mousedown', (e) => this.mouseDrag(e))
  }

  touchDrag(touchStartEvent: TouchEvent){
    touchStartEvent.preventDefault()
    const { pageX, pageY } = touchStartEvent.changedTouches[0]
    this.element.classList.add('v-draggable-drag')
    const { width, height } = this.element.getClientRects()[0]
    this.element.style.left = pageX - width / 2 + 'px'
    this.element.style.top = pageY - height / 2 + 'px'

    const handleTouchMove = (touchMoveEvent: TouchEvent) => {
      const { pageX, pageY } = touchMoveEvent.changedTouches[0]
      this.element.style.left = pageX - width / 2 + 'px'
      this.element.style.top = pageY - height / 2 + 'px'

      const targetElements = document.elementsFromPoint(pageX, pageY) as HTMLDropElement[]
      const dropArea = targetElements.find((element) => element?.isDropArea)
      
      if (dropArea && !this.isIntersecting) {
        this.payload?.arg('ENTER', dropArea)
        this.lastDropArea = dropArea
        this.isIntersecting = true
        dropArea?.dropAreaHandler({type: 'ENTER', value: this.payload.value})
      }

      if (!dropArea && this.isIntersecting) {
        this.payload?.arg('LEAVE', this.lastDropArea)
        this.isIntersecting = false
        this.lastDropArea?.dropAreaHandler({type: 'LEAVE', value: this.payload.value})
        this.lastDropArea = undefined
      }
    }

    const handleTouchEnd = (touchEndEvent: TouchEvent) => {
      touchEndEvent.preventDefault()
      this.element.classList.remove('v-draggable-drag')
      this.element.style.left = null
      this.element.style.top = null
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchcancel', handleTouchEnd)
      this.touchDrop(touchEndEvent)
    }

    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('touchcancel', handleTouchEnd)
  }

  touchDrop(event: TouchEvent) {
    const { pageX, pageY } = event.changedTouches[0]
    const targetElements = document.elementsFromPoint(pageX, pageY) as HTMLDropElement[]
    const dropArea = targetElements.find((element) => element?.isDropArea)
    
    if (dropArea) {
      this.payload?.arg('DROP', dropArea)
      dropArea?.dropAreaHandler({type: 'DROP', value: this.payload.value})
    }
  }

  mouseDrag(mouseStartEvent: MouseEvent) {
    mouseStartEvent.preventDefault()
    const { pageX, pageY } = mouseStartEvent
    this.element.classList.add('v-draggable-drag')
    const { width, height } = this.element.getClientRects()[0]
    this.element.style.left = pageX - width / 2 + 'px'
    this.element.style.top = pageY - height / 2 + 'px'

    const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
      const { pageX, pageY } = mouseMoveEvent
      this.element.style.left = pageX - width / 2 + 'px'
      this.element.style.top = pageY - height / 2 + 'px'

      const targetElements = document.elementsFromPoint(pageX, pageY) as HTMLDropElement[]
      const dropArea = targetElements.find((element) => element?.isDropArea)
      
      if (dropArea && !this.isIntersecting) {
        this.payload?.arg('ENTER', dropArea)
        this.lastDropArea = dropArea
        this.isIntersecting = true
        dropArea?.dropAreaHandler({type: 'ENTER', value: this.payload.value})
      }

      if (!dropArea && this.isIntersecting) {
        this.payload?.arg('LEAVE', this.lastDropArea)
        this.isIntersecting = false
        this.lastDropArea?.dropAreaHandler({type: 'LEAVE', value: this.payload.value})
        this.lastDropArea = undefined
      }
    }

    const handleMouseEnd = (mouseEndEvent: MouseEvent) => {
      mouseEndEvent.preventDefault()
      this.element.classList.remove('v-draggable-drag')
      this.element.style.left = null
      this.element.style.top = null
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseEnd)
      this.mouseDrop(mouseEndEvent)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseEnd)
  }

  mouseDrop(event: MouseEvent) {
    const { pageX, pageY } = event
    const targetElements = document.elementsFromPoint(pageX, pageY) as HTMLDropElement[]
    const dropArea = targetElements.find((element) => element?.isDropArea)
    
    if (dropArea) {
      this.payload?.arg('DROP', dropArea)
      dropArea?.dropAreaHandler({type: 'DROP', value: this.payload.value})
    }
  }
}

class DroppableElement {
  private element: HTMLDropElement
  private readonly handler: DropHandler
  
  constructor(element: HTMLDropElement, handler: DropHandler){
    this.element = element
    this.handler = handler
    this.element.isDropArea = true
    this.element.dropAreaHandler = this.handler
  }
}

export default {
  install(app) {
    app.directive("draggable", {
      mounted(element: HTMLElement, payload){
        new DraggableElement(element, payload)
      }
    })
  
    app.directive("droppable", {
      mounted(element: HTMLElement, handler){
        new DroppableElement(element as HTMLDropElement, handler.value as DropHandler);
      }
    })
  }
}
