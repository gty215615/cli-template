class TargetEvent {
    private static instance: TargetEvent
    eventList:[]
    constructor() {
        eventList:[]
    }
    static getInstance() {

        if (!this.instance) {
            this.instance = new TargetEvent()
        }
        return this.instance
    }
}