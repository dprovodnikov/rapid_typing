class Counter {
  constructor(start = 0) { this.count = start }

  get() {
    return this.count
  }

  set(count) {
    this.count = count
  }

  up() {
    return ++this.count
  }

  reset() {
    this.count = 0
  }

}

window.counter = Counter;