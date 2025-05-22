type EventCallback = (...args: any[]) => void

export const EVENTS = {
  DATA_LOADING: "data_loading",
  DATA_UPDATED: "data_updated",
  DATA_ERROR: "data_error",
  PROVIDER_FILTERED: "provider_filtered",
}

class EventBus {
  private events: Record<string, EventCallback[]> = {}

  subscribe(event: string, callback: EventCallback): () => void {
    if (!this.events[event]) {
      this.events[event] = []
    }

    this.events[event].push(callback)

    // Return unsubscribe function
    return () => {
      this.events[event] = this.events[event].filter((cb) => cb !== callback)
    }
  }

  publish(event: string, ...args: any[]): void {
    if (!this.events[event]) {
      return
    }

    this.events[event].forEach((callback) => {
      callback(...args)
    })
  }
}

export const eventBus = new EventBus()
