import {
  Message
} from "element-ui"

class MTMessage {
  constructor() {
    this.config = {
      showClose: true,
      duration: 2000
    }
  }

  show() {
    Message(JSON.parse(JSON.stringify(this.config)))
  }

  success(message = "success") {
    this.config.type = "success"
    this.config.message = message
    this.show()
  }

  info(message = "info") {
    this.config.type = 'info'
    this.config.message = message
    this.show()
  }

  warning(message = "warning") {
    this.config.type = 'warning'
    this.config.message = message
    this.show()
  }

  error(message = "error") {
    this.config.type = 'error'
    this.config.message = message
    this.show()
  }
}


export default new MTMessage()
